// db.js
import { openDB } from "idb";

import {
  DB_NAME,
  USERS,
  SAMPLE_USERS,
  USER_ROLES,
  APPLIST,
  ENTITY_DETAILS,
  ENTITY_ADDRESS,
  OTHER_ITI,
  PROPOSED_INSTI_DETAILS,
  PROPOSED_INSTI_ADDRESSES,
  APP_FLOW,
  STAGE_I__FEE_EXEMPTED,
  STAGE_I__DOCUMENT_PENDING,
  STAGE_I__FEE_PAID,
  STAGE_I_FEE,
  STAGE_I_FORM_FILLING,
  STAGE_I_DOCUMENT_UPLAOD,
  STAGE_I_SUBMIT,
  STAGE_I__ASSESSMENT,
  NOC_ISSUANCE,
  STAGE_II_FORM_FILLING,
  STAGE_II_FEE,
  STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS,
  STAGE_II_DOCUMENT_UPLAOD,
  STAGE_II_SUBMIT,
  STAGE_II__ASSESSMENT,
  STAFF_DETAILS,
  INSP_SLOT_SELECTION,
  INSP_SHEDULE,
  STAGE_I__FILLED,
} from "../constants";
import { initDB } from "./db";

export const addNewUser = async (app) => {
  console.log(app);
  const db = await initDB();
  await db.put(USERS, app);
};

export const getUserById = async (id) => {
  const db = await initDB();
  return await db.get(USERS, id);
};

export const getAllUsers = async () => {
  const db = await initDB();
  return await db.getAll(USERS);
};

export const getUserByCredentials = async (email, password) => {
  const db = await initDB();
  const index = db.transaction(USERS).store.index("email_password");
  return await index.get([email, password]);
};

export const removeUser = async (id) => {
  const db = await initDB();
  await db.delete(USERS, id);
};

// Extra
export const setSampleUser = async () => {
  const db = await initDB();
  SAMPLE_USERS.forEach(async (user) => {
    const userId = Date.now() + Math.random();
    const obj = { ...user, id: userId }; // Ensure unique ID
    await db.put(USERS, obj);
  });
};

// Extra
export const getSetUserRoles = async () => {
  const db = await initDB();
  const userList = await db.getAll(USERS);
  userList.forEach(async (user) => {
    for (const role of user.role) {
      const id = Date.now() + Math.random();
      await db.put(USER_ROLES, { id: id, userid: user.id, role: role });
    }
  });
};

export const getAppListByUserId = async (userId) => {
  const db = await initDB();
  let result = await db.getAllFromIndex(APPLIST, "userId", userId);

  const enrichedApps = await Promise.all(
    result.map(async (app) => {
      const entityDetails = await getEntityDetailsByUserId(app.appId); // <-- await here!
      const proposedInstDetails = await getProposedInstDetailsByUserId(
        app.appId
      );
      return {
        ...app,
        entityDetails,
        proposedInstDetails,
      };
    })
  );

  return enrichedApps; // Now includes full entity details, not Promises
};
export const getAppListByStateAssessor = async (AuthUser) => {
  const db = await initDB();
  let result = await db.getAll(APPLIST);

  const enrichedApps = await Promise.all(
    result.map(async (app) => {
      const entityDetails = await getEntityDetailsByUserId(app.appId); // <-- await here!
      const proposedInstDetails = await getProposedInstDetailsByUserId(
        app.appId
      );
      return {
        ...app,
        entityDetails,
        proposedInstDetails,
      };
    })
  );

  
  return enrichedApps; // Now includes full entity details, not Promises
};

export const getEntityDetailsByUserId = async (appId) => {
  const db = await initDB();
  let l1 = await db.getAllFromIndex(ENTITY_DETAILS, "appId", appId);
  let l2 = await db.getAllFromIndex(ENTITY_ADDRESS, "appId", appId);
  let l3 = await db.getAllFromIndex(OTHER_ITI, "appId", appId);
  return {
    entity_details: l1[0] || {},
    entity_address: l2,
    other_iti: l3,
  };
};

export const getProposedInstDetailsByUserId = async (appId) => {
  const db = await initDB();
  let l1 = await db.getAllFromIndex(PROPOSED_INSTI_DETAILS, "appId", appId);
  let l2 = await db.getAllFromIndex(PROPOSED_INSTI_ADDRESSES, "appId", appId);
  return {
    pro_insti_details: l1[0] || {},
    pro_insti_address: l2,
  };
};

export const getAppFlowByAppId = async (appId) => {
  const db = await initDB();
  let data = await db.getAllFromIndex(APP_FLOW, "appId", appId);
  data.sort((a, b) => a.stepNo - b.stepNo);
  return data;
};

export const getDbEntityDetails = async (appId) => {
  const db = await initDB();
  let l1 = await db.getAllFromIndex(ENTITY_DETAILS, "appId", appId);
  let l2 = await db.getAllFromIndex(ENTITY_ADDRESS, "appId", appId);
  let l3 = await db.getAllFromIndex(OTHER_ITI, "appId", appId);
  return {
    entityDetail: l1,
    entityAddress: l2,
    otherIti: l3,
  };
};

export const getAppCurrentStatus = async (appId) => {
  const db = await initDB();
  return await db.getAllFromIndex(APPLIST, "appId", appId);
};

export const setAppCurrentStatus = async (appId, type_of_institute) => {
  const db = await initDB();
  let result = await db.getAllFromIndex(APPLIST, "appId", appId);

  let oldStatus = result[0];
  switch (type_of_institute) {
    case "Government":
      oldStatus = {
        ...oldStatus,
        ...{
          app_status: STAGE_I__FEE_EXEMPTED,
          stage_I_fee_status: STAGE_I__FEE_EXEMPTED,
          app_status_awaiting: STAGE_I__DOCUMENT_PENDING,
        },
      };
      await db.put(APPLIST, oldStatus);
      setAppFlow(appId, STAGE_I_FORM_FILLING);
      setAppFlow(appId, STAGE_I_FEE, type_of_institute);
      break;
    case "Private":
      oldStatus = {
        ...oldStatus,
        ...{
          app_status: STAGE_I__FEE_PAID,
          stage_I_fee_status: STAGE_I__FEE_PAID,
          app_status_awaiting: STAGE_I__DOCUMENT_PENDING,
        },
      };
      await db.put(APPLIST, oldStatus);
      setAppFlow(appId, STAGE_I_FORM_FILLING);
      setAppFlow(appId, STAGE_I_FEE);

      break;
  }
};

export const setAppFlow = async (appId, step, type_of_institute = null) => {
  // Update the app flow status
  const db = await initDB();
  switch (step) {
    case STAGE_I_FORM_FILLING:
      var data = await db.getAllFromIndex(APP_FLOW, "appId_step", [
        appId,
        STAGE_I_FORM_FILLING,
      ]);
      var oldStep = data[0];
      var newStep = {
        ...oldStep,
        status: STAGE_I__FILLED,
        stepStatus: "completed",
      };
      await db.put(APP_FLOW, newStep);
      // setActiveAppFlowNextStep(appId, oldStep.nextStep);
      break;
    case STAGE_I_FEE:
      switch (type_of_institute) {
        case "Government":
          var g_data = await db.getAllFromIndex(APP_FLOW, "appId_step", [
            appId,
            STAGE_I_FEE,
          ]);
          var g_oldStep = g_data[0];
          var g_newStep = {
            ...g_oldStep,
            status: STAGE_I__FEE_EXEMPTED,
            stepStatus: "completed",
          };
          await db.put(APP_FLOW, g_newStep);

          // setActiveAppFlowNextStep(appId, STAGE_I_FORM_FILLING);
          setActiveAppFlowNextStep(appId, g_oldStep.nextStep);
          break;
        case "Private":
          var p_data = await db.getAllFromIndex(APP_FLOW, "appId_step", [
            appId,
            STAGE_I_FEE,
          ]);
          var p_oldStep = p_data[0];

          var p_newStep = {
            ...p_oldStep,
            status: STAGE_I__FEE_PAID,
            stepStatus: "completed",
          };

          await db.put(APP_FLOW, p_newStep);
          // setActiveAppFlowNextStep(appId, STAGE_I_FORM_FILLING);
          setActiveAppFlowNextStep(appId, p_oldStep.nextStep);
      }
      break;
    case STAGE_I_DOCUMENT_UPLAOD:
    case STAGE_I_SUBMIT:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [
        appId,
        STAGE_I_DOCUMENT_UPLAOD,
      ]);
      var data2 = await db.getAllFromIndex(APP_FLOW, "appId_step", [
        appId,
        STAGE_I_SUBMIT,
      ]);

      data = data[0];
      data2 = data2[0];
      data = { ...data, stepStatus: "completed" };
      data2 = { ...data2, stepStatus: "completed" };

      await db.put(APP_FLOW, data);
      await db.put(APP_FLOW, data2);

      setActiveAppFlowNextStep(appId, data.nextStep);
      setActiveAppFlowNextStep(appId, data2.nextStep);
      break;
    case STAGE_I__ASSESSMENT:
      break;
    case NOC_ISSUANCE:
      break;
    case STAGE_II_FORM_FILLING:
      break;
    case STAGE_II_FEE:
      break;
    case STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS:
      break;
    case STAGE_II_DOCUMENT_UPLAOD:
      break;
    case STAGE_II_SUBMIT:
      break;
    case STAGE_II__ASSESSMENT:
      break;
    case STAFF_DETAILS:
      break;
    case INSP_SLOT_SELECTION:
      break;
    case INSP_SHEDULE:
      break;

    default:
      break;
  }

  // export const AppFlow = [
  //   {
  //     stepNo: 1,
  //     step: STAGE_I_FORM_FILLING,
  //     status: STAGE_I__NOT_FILLED, // STAGE_I__FILLED || STAGE_I__PENDING || ON_PROGRESS
  //     stepStatus: "pending", // inactive || pending || completed || on-progress
  //     stepTitle: "Stage I Form Filling",
  //     stepMsg: "Applicant Has to fill stage I Form",
  //     // stepMsgCompleted: "Stage I Form Completed",
  //     // stepMsgOnProgress: "stage I Form Filling On Progress",
  //     assignedTo: ["applicant"],
  //   },
  //   {
  //     stepNo: 2,
  //     step: STAGE_I_FEE,
  //     status: STAGE_I__FEE_PENDING, //  STAGE_I__FEE_PENDING || STAGE_I__FEE_PAID || STAGE_I__FEE_EXEMPTED
  //     stepStatus: "inactive", // inactive || pending || completed || on-progress
  //     stepTitle: "Stage I Fee",
  //     stepMsg: "Applicant Has to Pay Stage I Fee",
  //     assignedTo: ["applicant"],
  //   },
  //   {
  //     stepNo: 3,
  //     step: STAGE_I_DOCUMENT_UPLAOD,
  //     status: STAGE_I__DOCUMENT_PENDING, // STAGE_I__DOCUMENT_PENDING || STAGE_I__DOCUMENT_UPLOADED
  //     stepStatus: "inactive", // inactive || pending || completed || on-progress
  //     stepTitle: "Stage I Document Upload",
  //     stepMsg: "Applicant Has to Upload Stage I Documents",
  //     assignedTo: ["applicant"],
  //   },
  //   {
  //     stepNo: 4,
  //     step: STAGE_I_SUBMIT,
  //     status: STAGE_I__SUBMIT_PENDING, // STAGE_I__SUBMIT_PENDING || STAGE_I__SUBMITED
  //     stepStatus: "inactive", // inactive || pending || completed || on-progress
  //     stepTitle: "Stage I Submit",
  //     stepMsg: "Applicant Has to Submit Stage I Application",
  //     assignedTo: ["applicant"],
  //   },
  //   {
  //     stepNo: 5,
  //     step: STAGE_I__ASSESSMENT,
  //     status: STAGE_I__ASSESSMENT_PENDING, // STAGE_I__ASSESSMENT_PENDING || STAGE_I__ASSESSMENT_ON_PROGRESS || STAGE_I__ASSESSMENT_COMPLETED
  //     stepStatus: "inactive", // inactive || pending || completed || on-progress
  //     stepTitle: "Stage I Assessment",
  //     stepMsg: "State Has to Assess Stage I Application",
  //     assignedTo: ["state"],
  //   },
  //   {
  //     stepNo: 6,
  //     step: NOC_ISSUANCE,
  //     status: NOC_ISSUANCE_PENDING, // NOC_ISSUANCE_ISSUED || NOC_ISSUANCE_PENDING || NOC_ISSUANCE_REJECTED
  //     stepStatus: "inactive", // inactive || pending || completed || on-progress
  //     stepTitle: "NOC Issuance",
  //     stepMsg: "State Has to Issue No Objection Certificate (NOC)",
  //     assignedTo: ["state"],
  //   },
  //   {
  //     stepNo: 7,
  //     step: STAGE_II_FORM_FILLING,
  //     status: STAGE_II__PENDING, // STAGE_II__FILLED || STAGE_II__PENDING || STAGE_II__ON_PROGRESS
  //     stepStatus: "inactive", // inactive || pending || completed || on-progress
  //     stepTitle: "Stage II Form Filling",
  //     stepMsg: "Applicant Has to fill stage II Form",
  //     assignedTo: ["applicant"],
  //   },
  //   {
  //     stepNo: 8,
  //     step: STAGE_II_FEE,
  //     status: STAGE_II__FEE_PENDING, //  STAGE_II__FEE_PENDING || STAGE_II__FEE_PAID || STAGE_II__FEE_EXEMPTED
  //     stepStatus: "inactive", // inactive || pending || completed || on-progress
  //     stepTitle: "Stage II Fee",
  //     stepMsg: "Applicant Has to Pay Stage II Fee",
  //     assignedTo: ["applicant"],
  //   },
  //   {
  //     stepNo: 9,
  //     step: STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS,
  //     status: STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS_PENDING, // STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS_PENDING || STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS_COMPLETED || STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS_ON_PROGRESS
  //     stepStatus: "inactive", // inactive || pending || completed || on-progress
  //     stepTitle: "Stage II Machine Equipment Tool Details",
  //     stepMsg: "Applicant Has to fill Stage II Machine Equipment Tool Details",
  //     assignedTo: ["applicant"],
  //   },
  //   {
  //     stepNo: 3,
  //     step: STAGE_II_DOCUMENT_UPLAOD,
  //     status: STAGE_II__DOCUMENT_PENDING, // STAGE_II__DOCUMENT_PENDING || STAGE_II__DOCUMENT_UPLOADED
  //     stepStatus: "inactive", // inactive || pending || completed || on-progress
  //     stepTitle: "Stage II Document Upload",
  //     stepMsg: "Applicant Has to Upload Stage II Documents",
  //     assignedTo: ["applicant"],
  //   },
  //   {
  //     stepNo: 10,
  //     step: STAGE_II_SUBMIT,
  //     status: STAGE_II__SUBMIT_PENDING, // STAGE_II__SUBMIT_PENDING || STAGE_II__SUBMITED
  //     stepStatus: "inactive", // inactive || pending || completed || on-progress
  //     stepTitle: "Stage II Application Submit",
  //     stepMsg: "Applicant Has to Submit Stage II Application",
  //     assignedTo: ["applicant"],
  //   },
  //   {
  //     stepNo: 11,
  //     step: STAGE_II__ASSESSMENT,
  //     status: STAGE_II__ASSESSMENT_PENDING, // STAGE_II__ASSESSMENT_PENDING || STAGE_II__ASSESSMENT_ON_PROGRESS || STAGE_II__ASSESSMENT_COMPLETED
  //     stepStatus: "inactive", // inactive || pending || completed || on-progress
  //     stepTitle: "Stage II Assessment",
  //     stepMsg: "State has to Assess Stage II Application",
  //     assignedTo: ["state"],
  //   },
  //   {
  //     stepNo: 11,
  //     step: STAFF_DETAILS,
  //     status: STAFF_DETAILS_PENDING, // STAFF_DETAILS_PENDING || STAFF_DETAILS_COMPLETED
  //     stepStatus: "inactive", // inactive || pending || completed || on-progress
  //     stepTitle: "Stage II Staff Detail",
  //     stepMsg: "Applicant Has to fill Staff Details",
  //     assignedTo: ["applicant"],
  //   },
  //   {
  //     stepNo: 11,
  //     step: INSP_SLOT_SELECTION,
  //     status: INSP_SLOT_SELECTION_PENDING, // INSP_SLOT_SELECTION_PENDING || INSP_SLOT_SELECTION_COMPLETED
  //     stepStatus: "inactive", // inactive || pending || completed || on-progress
  //     stepTitle: "Inspection Slot Selection",
  //     stepMsg: "Applicant Has to Select Inspection Slot",
  //     assignedTo: ["applicant"],
  //   },
  //   {
  //     stepNo: 11,
  //     step: INSP_SHEDULE,
  //     status: STAFF_DETAILS_PENDING, // INSP_SHEDULED || INSP_PENDING
  //     stepStatus: "inactive", // inactive || pending || completed || on-progress
  //     stepTitle: "Inspection Scheduled",
  //     stepMsg: "Inspection Scheduled",
  //     assignedTo: ["RDSDE"],
  //   },
  // ];

  // let getStepInfo = (
  //   await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, STAGE_I_FEE])
  // )[0];
  // let newStepInfo = {
  //   ...getStepInfo,
  //   status: STAGE_I__FEE_EXEMPTED,
  //   stepStatus: "completed",
  // };
};

export const setActiveAppFlowNextStep = async (appId, nextStep) => {
  // Update the app flow status
  const db = await initDB();
  let data, oldStep, newStep;
  switch (nextStep) {
    case STAGE_I_FORM_FILLING:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [
        appId,
        STAGE_I_FORM_FILLING,
      ]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    case STAGE_I_FEE:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [
        appId,
        STAGE_I_FEE,
      ]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    case STAGE_I_DOCUMENT_UPLAOD:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [
        appId,
        STAGE_I_DOCUMENT_UPLAOD,
      ]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    case STAGE_I_SUBMIT:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [
        appId,
        STAGE_I_SUBMIT,
      ]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    case STAGE_I__ASSESSMENT:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [
        appId,
        STAGE_I__ASSESSMENT,
      ]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    case NOC_ISSUANCE:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [
        appId,
        NOC_ISSUANCE,
      ]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    case STAGE_II_FORM_FILLING:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [
        appId,
        STAGE_II_FORM_FILLING,
      ]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    case STAGE_II_FEE:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [
        appId,
        STAGE_II_FEE,
      ]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    case STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [
        appId,
        STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS,
      ]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    case STAGE_II_DOCUMENT_UPLAOD:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [
        appId,
        STAGE_II_DOCUMENT_UPLAOD,
      ]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    case STAGE_II_SUBMIT:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [
        appId,
        STAGE_II_SUBMIT,
      ]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    case STAGE_II__ASSESSMENT:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [
        appId,
        STAGE_II__ASSESSMENT,
      ]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    case STAFF_DETAILS:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [
        appId,
        STAFF_DETAILS,
      ]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    case INSP_SLOT_SELECTION:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [
        appId,
        INSP_SLOT_SELECTION,
      ]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    case INSP_SHEDULE:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [
        appId,
        INSP_SHEDULE,
      ]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    default:
      break;
  }
};
