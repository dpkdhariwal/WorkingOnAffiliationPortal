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
  INSPENCTION,
  STAGE_I__FILLED,
  STAGE_I__ASSESSMENT_COMPLETED,
  NOC_ISSUANCE_ISSUED,
  STAGE_II__PENDING,
  STAGE_II__FEE_PAID,
  STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS_COMPLETED,
  STAGE_II__DOCUMENT_UPLOADED,
  STAGE_II__SUBMITED,
  STAGE_II__ASSESSMENT_COMPLETED,
  STAFF_DETAILS_COMPLETED,
  INSP_SLOT_SELECTION_COMPLETED,
  STAGE_I__DOCUMENT_UPLOADED,
  STAGE_I__SUBMITED,
  STAGE_II__FILLED,
  BLD_BUILDING_PLAN,
  BLD_BCC,
  BLD_PHOTOS,
  FRONT_VIEW_PHOTO_OF_BUILDING,
  SIDE_VIEW_PHOTO_OF_BUILDING,
  ENTRANCE_GATE_PHOTO_OF_PLOT_WITH_SIGNAGE_BOARD,
  APP_FORM_FLOW_STAGE_II,
  TRADEWISE_WORKSHOP,
  tradeList,
  WorkshopName,
  ClassroomName,
  APP_FORM_SUB_CIVIL_INFRA,
  CIC,
  FILLED,
  ACTIVE,
  TRADEWISE_CLASSROOMS
} from "affserver";

import { initDB } from "./db";
import * as cons from "affserver";
import * as C from "affserver";

import { Building_Detail_initialValues } from "../reducers/newAppReducer";
import { markAsCompleteStageStep, setActiveStage1NextStep } from "./forms/stageI/set/set";


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
  let result = await db.getAllFromIndex(ENTITY_DETAILS, "userId", userId);

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
  let result = await db.getAll(PROPOSED_INSTI_DETAILS);

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
export const getAppListByRdsde = async (AuthUser) => {
  const db = await initDB();
  let result = await db.getAll(PROPOSED_INSTI_DETAILS);

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
  let app_flow = await db.getAllFromIndex(APP_FLOW, "appId", appId);
  let app_assessment_flow_stage_i = await db.getAllFromIndex(C.APP_ASSESSMENT_FLOW_STAGE_I, "appId", appId);
  let tbl_assessments_status = await db.getAllFromIndex(C.TBL_ASSESSMENTS_STATUS, "appId", appId);



  // process each item individually
  app_flow = await Promise.all(
    app_flow.map(async (item) => {
      switch (item.step) {
        case C.STAGE_I_FORM_FILLING:
          console.log(item);
          break;
        case C.STAGE_I_FEE:
          console.log(item);
          break;
        case C.STAGE_I_DOCUMENT_UPLAOD:
          console.log(item);
          break;
        case C.STAGE_I_SUBMIT:
          console.log(item);
          break;
        case C.STAGE_I__ASSESSMENT:
          {
            let aStatus = await db.getFromIndex(C.TBL_ASSESSMENTS_STATUS, "appId", appId);
            let assessmentFlowStageI = await db.getAllFromIndex(C.APP_ASSESSMENT_FLOW_STAGE_I, "appId", appId);
            console.log(aStatus, assessmentFlowStageI);
            item = { ...item, aStatus, assessmentFlowStageI }
          }
          break;
        case C.NOC_ISSUANCE:
          console.log(item);
          break;
        case STAGE_II_FORM_FILLING:
          console.log(item);
          break;
        case STAGE_II_FEE:
          console.log(item);
          break;
        case C.STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS:
          console.log(item);
          break;
        case C.STAGE_II_DOCUMENT_UPLAOD:
          console.log(item);
          break;
        case C.STAGE_II_SUBMIT:
          console.log(item);
          break;
        case C.STAGE_II__ASSESSMENT:
          console.log(item);
          break;
        case C.STAFF_DETAILS:
          console.log(item);
          break;
        case C.INSP_SLOT_SELECTION:
          console.log(item);
          break;
        case C.INSPENCTION:
          console.log(item);
          break;
        default:
          console.log(item);
          break;
      }
      return { ...item, };
    })
  );

  // sort by stepNo before returning
  app_flow.sort((a, b) => a.stepNo - b.stepNo);

  return { app_flow, app_assessment_flow_stage_i, tbl_assessments_status };
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
      // oldStatus = { ...oldStatus, ...{ app_status: STAGE_I__FEE_EXEMPTED, stage_I_fee_status: STAGE_I__FEE_EXEMPTED, app_status_awaiting: STAGE_I__DOCUMENT_PENDING, }, };
      // console.log(oldStatus);
      // await db.put(APPLIST, oldStatus);
      setAppFlow(appId, STAGE_I_FORM_FILLING);
      setAppFlow(appId, STAGE_I_FEE, type_of_institute);
      break;
    case "Private":
      // oldStatus = { ...oldStatus, ...{ app_status: STAGE_I__FEE_PAID, stage_I_fee_status: STAGE_I__FEE_PAID, app_status_awaiting: STAGE_I__DOCUMENT_PENDING, }, };
      // await db.put(APPLIST, oldStatus);
      setAppFlow(appId, STAGE_I_FORM_FILLING);
      setAppFlow(appId, STAGE_I_FEE);
      break;
  }
};


export const updateAppFlowStatus = async (appId, step, status) => {
  // Update the app flow status
  let info;
  const db = await initDB();
  try {
    const tx = db.transaction([C.APP_FLOW], 'readwrite');
    const store = tx.objectStore(C.APP_FLOW);
    info = await store.index('appId_step').get([appId, step]);
    console.log(info);
    await store.put({ ...info, status: status, stepStatus: C.SL.PENDING });
    await tx.done;
  } catch (error) {
    console.error(error);
  }
};

export const updateAssessmentStatus = async (appId, stage, status, pendingAt) => {
  // Update the app flow status
  let info;
  const db = await initDB();
  try {
    const tx = db.transaction([C.TBL_ASSESSMENTS_STATUS], 'readwrite');
    const store = tx.objectStore(C.TBL_ASSESSMENTS_STATUS);
    info = await store.index('[appId+stage]').get([appId, stage]);
    await store.put({ ...info, assessment_status: status, pendingAt: pendingAt });
    await tx.done;
  } catch (error) {
    console.error(error);
  }
};




export const setAppFlow = async (appId, step, type_of_institute = null) => {
  // Update the app flow status
  const db = await initDB();
  switch (step) {
    case STAGE_I_FORM_FILLING:
      var data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, STAGE_I_FORM_FILLING,]);
      var oldStep = data[0];
      var newStep = { ...oldStep, status: STAGE_I__FILLED, stepStatus: "completed", };
      await db.put(APP_FLOW, newStep);
      break;
    case STAGE_I_FEE:
      switch (type_of_institute) {
        case "Government":
          var g_data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, STAGE_I_FEE,]);
          var g_oldStep = g_data[0];
          var g_newStep = { ...g_oldStep, status: STAGE_I__FEE_EXEMPTED, stepStatus: "completed", };
          await db.put(APP_FLOW, g_newStep);
          setAppFlow(appId, STAGE_I_FORM_FILLING);
          setActiveAppFlowNextStep(appId, g_oldStep.nextStep);
          break;
        case "Private":
          var p_data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, STAGE_I_FEE,]);
          var p_oldStep = p_data[0];
          var p_newStep = { ...p_oldStep, status: STAGE_I__FEE_PAID, stepStatus: "completed", };
          await db.put(APP_FLOW, p_newStep);
          setAppFlow(appId, STAGE_I_FORM_FILLING);
          setActiveAppFlowNextStep(appId, p_oldStep.nextStep);
      }
      break;
    case STAGE_I_DOCUMENT_UPLAOD:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, STAGE_I_DOCUMENT_UPLAOD,]);
      data = data[0];
      data = { ...data, status: STAGE_I__DOCUMENT_UPLOADED, stepStatus: "completed" };
      await db.put(APP_FLOW, data);
      setActiveAppFlowNextStep(appId, data.nextStep);
      setAppFlow(appId, STAGE_I_SUBMIT);
      break;
    case STAGE_I_SUBMIT:
      var data2 = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, STAGE_I_SUBMIT,]);
      data2 = data2[0];
      data2 = { ...data2, status: STAGE_I__SUBMITED, stepStatus: "completed" };
      await db.put(APP_FLOW, data2);
      setActiveAppFlowNextStep(appId, data2.nextStep);
      break;
    case STAGE_I__ASSESSMENT:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, STAGE_I__ASSESSMENT,]);
      data = data[0];
      data = { ...data, status: STAGE_I__ASSESSMENT_COMPLETED, stepStatus: "completed" };
      await db.put(APP_FLOW, data);
      setActiveAppFlowNextStep(appId, data.nextStep);
      break;
    case NOC_ISSUANCE:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, NOC_ISSUANCE,]);
      data = data[0];
      data = { ...data, status: NOC_ISSUANCE_ISSUED, stepStatus: "completed" };
      await db.put(APP_FLOW, data);
      setActiveAppFlowNextStep(appId, data.nextStep);
      break;
    case STAGE_II_FORM_FILLING:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, STAGE_II_FORM_FILLING,]);
      data = data[0];
      data = { ...data, status: STAGE_II__FILLED, stepStatus: "completed" };
      await db.put(APP_FLOW, data);
      setActiveAppFlowNextStep(appId, data.nextStep);
      break;
    case STAGE_II_FEE:
      setAppFlow(appId, STAGE_II_FORM_FILLING);
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, STAGE_II_FEE,]);
      data = data[0];
      data = { ...data, status: STAGE_II__FEE_PAID, stepStatus: "completed" };
      await db.put(APP_FLOW, data);
      setActiveAppFlowNextStep(appId, data.nextStep);
      break;
    case STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS,]);
      data = data[0];
      data = { ...data, status: STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS_COMPLETED, stepStatus: "completed" };
      await db.put(APP_FLOW, data);
      setActiveAppFlowNextStep(appId, data.nextStep);
      break;
    case STAGE_II_DOCUMENT_UPLAOD:
      setAppFlow(appId, STAGE_II_SUBMIT);
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, STAGE_II_DOCUMENT_UPLAOD,]);
      data = data[0];
      data = { ...data, status: STAGE_II__DOCUMENT_UPLOADED, stepStatus: "completed" };
      await db.put(APP_FLOW, data);
      setActiveAppFlowNextStep(appId, data.nextStep);
      break;
    case STAGE_II_SUBMIT:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, STAGE_II_SUBMIT,]);
      data = data[0];
      data = { ...data, status: STAGE_II__SUBMITED, stepStatus: "completed" };
      await db.put(APP_FLOW, data);
      setActiveAppFlowNextStep(appId, data.nextStep);
      break;
    case STAGE_II__ASSESSMENT:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, STAGE_II__ASSESSMENT,]);
      data = data[0];
      data = { ...data, status: STAGE_II__ASSESSMENT_COMPLETED, stepStatus: "completed" };
      await db.put(APP_FLOW, data);
      setActiveAppFlowNextStep(appId, data.nextStep);
      break;
    case STAFF_DETAILS:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, STAFF_DETAILS,]);
      data = data[0];
      data = { ...data, status: STAFF_DETAILS_COMPLETED, stepStatus: "completed" };
      await db.put(APP_FLOW, data);
      setActiveAppFlowNextStep(appId, data.nextStep);
      break;
    case INSP_SLOT_SELECTION:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, INSP_SLOT_SELECTION,]);
      data = data[0];
      data = { ...data, status: INSP_SLOT_SELECTION_COMPLETED, stepStatus: "completed" };
      await db.put(APP_FLOW, data);
      setActiveAppFlowNextStep(appId, data.nextStep);
      break;
    case INSPENCTION:

      break;

    default:
      break;
  }
};

export const setActiveAppFlowNextStep = async (appId, nextStep) => {
  // Update the app flow status
  const db = await initDB();
  let data, oldStep, newStep;
  switch (nextStep) {
    case STAGE_I_FORM_FILLING:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, STAGE_I_FORM_FILLING,]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    case STAGE_I_FEE:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, STAGE_I_FEE,]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    case STAGE_I_DOCUMENT_UPLAOD:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, STAGE_I_DOCUMENT_UPLAOD,]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    case STAGE_I_SUBMIT:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, STAGE_I_SUBMIT,]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    case STAGE_I__ASSESSMENT:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, STAGE_I__ASSESSMENT,]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    case NOC_ISSUANCE:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, NOC_ISSUANCE,]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    case STAGE_II_FORM_FILLING:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, STAGE_II_FORM_FILLING,]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    case STAGE_II_FEE:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, STAGE_II_FEE,]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    case STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, STAGE_II_MACHINE_EQUIPEMENT_TOOL_DETAILS,]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    case STAGE_II_DOCUMENT_UPLAOD:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, STAGE_II_DOCUMENT_UPLAOD,]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    case STAGE_II_SUBMIT:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, STAGE_II_SUBMIT,]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    case STAGE_II__ASSESSMENT:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, STAGE_II__ASSESSMENT,]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    case STAFF_DETAILS:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, STAFF_DETAILS,]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    case INSP_SLOT_SELECTION:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, INSP_SLOT_SELECTION,]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    case INSPENCTION:
      data = await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, INSPENCTION,]);
      oldStep = data[0];
      newStep = { ...oldStep, stepStatus: "pending" };
      await db.put(APP_FLOW, newStep);
      break;
    default:
      break;
  }
};

export const getStepStatus = async (appId, step) => {
  const db = await initDB();
  return await db.getAllFromIndex(APP_FLOW, "appId_step", [appId, step]);
};


export const getBuildingDetail = async (appId) => {
  const db = await initDB();
  try {
    // Read-only transaction for multiple stores
    const tx = db.transaction([BLD_BUILDING_PLAN, BLD_BCC, BLD_PHOTOS], 'readonly');

    // Building Plan
    console.log(appId);
    const storePlan = tx.objectStore(BLD_BUILDING_PLAN);
    const bld_plan = await storePlan.index("appId").get(appId); // ✅ fixed

    // BCC Detail
    const storeBCC = tx.objectStore(BLD_BCC);
    const bcc = await storeBCC.index("appId").get(appId);

    // Building Photos
    const storePhotos = tx.objectStore(BLD_PHOTOS);
    const existing_BLD_PHOTOS = await storePhotos.index('appId').getAll(appId);

    existing_BLD_PHOTOS.forEach(item => {
      Building_Detail_initialValues[item.photoView] = item.photo_pth;
    });
    await tx.done;
    return { ...Building_Detail_initialValues, ...bld_plan, ...bcc };
  } catch (error) {
    console.error(error);
    return {}
  }
};


export const getStage1FormFlow = async (appId) => {
  const db = await initDB();
  try {
    const tx = db.transaction([cons.APP_FORM_FLOW_STAGE_I], 'readwrite');
    const list = tx.objectStore(cons.APP_FORM_FLOW_STAGE_I);
    const flow = await list.index('appId').getAll(appId);
    console.log(flow);
    flow.sort((a, b) => a.stepNo - b.stepNo);
    const finalList = await Promise.all(flow.map(async (item) => {

      switch (item.step) {
        case cons.ST1FC.DETAILS_OF_THE_LAND_TO_BE_USED_FOR_THE_ITI.step:
          // check possession_of_land
          console.log(item.step);
          return item;
        default:
          return item;
      }


    }));
    console.log(finalList);
    await tx.done;
    return finalList;
  } catch (error) {
    return []
  }
};
export const getStage2FormFlow = async (appId) => {
  const db = await initDB();
  try {
    // Read-only transaction for multiple stores
    const tx = db.transaction([APP_FORM_FLOW_STAGE_II, APP_FORM_SUB_CIVIL_INFRA], 'readonly');
    // Building Photos
    const storePhotos = tx.objectStore(APP_FORM_FLOW_STAGE_II);

    const flow = await storePhotos.index('appId').getAll(appId);
    flow.sort((a, b) => a.stepNo - b.stepNo);
    let subStepsStore, subSteps;
    const finalList = await Promise.all(
      flow.map(async (item) => {
        console.log(item);
        switch (item.step) {
          case cons.BUILDING_DETAIL:
            return item;
          case cons.CIVIL_INFRASTRUCTURE_DETAIL:
            subStepsStore = tx.objectStore(APP_FORM_SUB_CIVIL_INFRA);
            subSteps = await subStepsStore.index('appId').getAll(appId);
            return { ...item, subSteps };
          case cons.AMENITIES_AREA:
            return item;
          case cons.SIGNAGE_BOARDS:
            return item;
          case cons.ELECTRICITY_CONNECTION_DETAILS:
            return item;
          case cons.FEE_PAYMENT_FOR_STAGEII:
            return item;
          case cons.TRADEWISE_MACHINERY__TOOLS__EQUIPMENT_DETAILS:
            return item;
          case cons.DOCUMENT_UPLOADS:
            return item;
          default:
            return item;
        }
      })
    );


    setCommonCivilInfra(appId);


    console.log(finalList);
    await tx.done;
    return finalList;
  } catch (error) {
    return []
  }
};

// MultiPurpose Hall

export const setMultipurposeHall = async (authUser, appId) => {
  const db = await initDB();
  try {
    // Read-only transaction for multiple stores
    console.log(authUser, appId);
    const tx = db.transaction([cons.MULTIPURPOSE_HALL], 'readwrite');
    var newObj = { userId: authUser.id, tradeId: tradeId, particular: classroom, appId: appId, area: '', photo: '', submitDate: null, updateDate: null };

    // Fetching Tradewise classroom Detail If Exist
    const store = tx.objectStore(cons.MULTIPURPOSE_HALL);
    const twcs = await store.index("tradeId_classroom_appId").get([tradeId, classroom, appId]);
    const data_twws = twcs?.appId ? { ...twcs, ...newObj } : { ...newObj, id: Date.now() + Math.random() };
    await store.put(data_twws);

    await tx.done;
  } catch (error) {
    console.error(error);
  }

};

// export const setCommonCivilInfra = async (values, authUser, appId, particular) => {
//   const db = await initDB();
//   try {

//     console.log(values, authUser, appId, particular);


//     // // Read-only transaction for multiple stores
//     // console.log(appId);
//     // const tx = db.transaction([cons.COMMON_CIVIL_INFRASTRUCTURE], 'readwrite');

//     // console.log(cons.COMMON_AREA, cons.ADMINISTRATIVE_AREA);

//     // // Preparing Common Area
//     // for (const [index, obj] of cons.COMMON_AREA.entries()) {
//     //   console.log(obj);
//     //   const { particular } = obj;
//     //   const store = tx.objectStore(cons.COMMON_CIVIL_INFRASTRUCTURE);
//     //   const exist = await store.index("appId_particular").get([appId, particular]);
//     //   if (!exist?.appId) {
//     //     await store.put({ ...obj, appId, id: Date.now() + Math.random() });
//     //   }
//     // }

//     // // Preparing Administrative Area
//     // for (const [index, obj] of cons.ADMINISTRATIVE_AREA.entries()) {
//     //   const { particular } = obj;
//     //   const store = tx.objectStore(cons.COMMON_CIVIL_INFRASTRUCTURE);
//     //   const exist = await store.index("appId_particular").get([appId, particular]);
//     //   if (!exist?.appId) {
//     //     await store.put({ ...obj, appId, id: Date.now() + Math.random() });
//     //   }
//     // }

//     await tx.done;
//   } catch (error) {
//     console.error(error);
//   }

// };


export const getCommonAreaByParticular = async (appId, particular) => {
  const db = await initDB();
  try {
    console.log(appId, particular);
    const tx = db.transaction([cons.COMMON_CIVIL_INFRASTRUCTURE], 'readonly');
    console.log(tx);
    const infra = tx.objectStore(cons.COMMON_CIVIL_INFRASTRUCTURE);
    let finalList = await infra.index('appId_particular').getAll([appId, particular]);
    await tx.done;
    return finalList;
  } catch (error) {
    console.lor(error);
    return {}
  }
};


export const setCheckListTradewiseClassrooms = async (authUser, appId) => {
  const db = await initDB();
  try {
    // Read-only transaction for multiple stores
    console.log(authUser, appId);
    const tx = db.transaction([TRADEWISE_CLASSROOMS], 'readwrite');
    for (const [index, obj] of tradeList.entries()) {
      const { tradeId, tradeName, unitInShift1, unitInShift2, unitInShift3 } = obj;
      const maximum_unit = Math.max(unitInShift1, unitInShift2, unitInShift3);

      for (let index = 0; index < maximum_unit; index++) {
        const classroom = ClassroomName[index];

        var newObj = { userId: authUser.id, tradeId: tradeId, classroom: classroom, appId: appId, area: '', photo: '', submitDate: null, updateDate: null };

        // Fetching Tradewise classroom Detail If Exist
        const store = tx.objectStore(TRADEWISE_CLASSROOMS);
        const twcs = await store.index("tradeId_classroom_appId").get([tradeId, classroom, appId]);
        const data_twws = twcs?.appId ? { ...twcs, ...newObj } : { ...newObj, id: Date.now() + Math.random() };
        await store.put(data_twws);
      }
    }
    await tx.done;
  } catch (error) {
    console.error(error);
  }

};
export const getTradewiseClassRooms = async (appId) => {
  const db = await initDB();
  try {
    // Read-only transaction for multiple stores
    const tx = db.transaction([TRADEWISE_CLASSROOMS], 'readonly');
    // Building Photos
    const classrooms = tx.objectStore(TRADEWISE_CLASSROOMS);
    let allList = await classrooms.index('appId').getAll(appId);

    // allList = allList.map(async (item) => {
    //   const tradeInfo = await getTradeInfoByTradeId(item.tradeId); // <-- await here!
    //   return {...item, tradeInfo:tradeInfo};
    // })

    const finalList = await Promise.all(
      allList.map(async (item) => {
        const tradeInfo = await getTradeInfoByTradeId(item.tradeId);
        return { ...item, tradeInfo };
      })
    );


    // allList.sort((a, b) => a.stepNo - b.stepNo);

    await tx.done;
    return finalList;
  } catch (error) {
    return []
  }
};

export const setTradewiseClassRooms = async (values, authUser, appId) => {
  const db = await initDB();
  try {
    // Read-only transaction for multiple stores
    const tx = db.transaction([TRADEWISE_CLASSROOMS, APP_FORM_SUB_CIVIL_INFRA], 'readwrite');


    for (const key in values) {
      const splited = key.split('>');

      // // console.log(splited[0]);
      var tradeId = splited[1];
      var classroom = splited[2];
      console.log(splited, tradeId, classroom, appId);

      const store = tx.objectStore(TRADEWISE_CLASSROOMS);
      const twws = await store.index("tradeId_classroom_appId").get([tradeId, classroom, appId]);

      if (splited[0] === "area" && twws?.appId) {
        await store.put({ ...twws, area: values[key], submitDate: new Date().toISOString(), updateDate: new Date().toISOString() });
      } else if (splited[0] === "photo" && twws?.appId) {
        await store.put({ ...twws, photo: values[key], submitDate: new Date().toISOString(), updateDate: new Date().toISOString() });
      }
    }

    const store = tx.objectStore(APP_FORM_SUB_CIVIL_INFRA);
    const stepInfo = await store.index("appId_step").get([appId, CIC.TRADEWISE_CLASSROOMS]);
    await store.put({ ...stepInfo, status: FILLED, submitDate: new Date().toISOString(), updateDate: new Date().toISOString() });

    // Set Active Next Step
    console.log(stepInfo);
    await setActiveCivilInfraSubSteps(appId, stepInfo.nextStep);

    await tx.done;
  } catch (error) {
    console.error(error);
    return {}
  }

};

export const setCheckListTradewiseWorkShop = async (authUser, appId) => {
  const db = await initDB();
  try {
    // Read-only transaction for multiple stores
    const tx = db.transaction([TRADEWISE_WORKSHOP], 'readwrite');
    for (const [index, obj] of tradeList.entries()) {
      const { tradeId, tradeName, unitInShift1, unitInShift2, unitInShift3 } = obj;
      const maximum_unit = Math.max(unitInShift1, unitInShift2, unitInShift3);

      for (let index = 0; index < maximum_unit; index++) {
        const workshop = WorkshopName[index];
        console.log(workshop, appId);

        var newObj = { userId: authUser.id, tradeId: tradeId, workshop: workshop, appId: appId, area: '', photo: '', submitDate: null, updateDate: null };
        // Fetching Tradewise Workshop Detail If Exist
        const store = tx.objectStore(TRADEWISE_WORKSHOP);
        const twws = await store.index("tradeId_workshop_appId").get([tradeId, workshop, appId]);
        console.log(twws);
        const data_twws = twws?.appId ? { ...twws, ...newObj } : { ...newObj, id: Date.now() + Math.random() };
        await store.put(data_twws);
      }
    }

    await tx.done;
    // return { ...Building_Detail_initialValues, ...bld_plan, ...bcc };
  } catch (error) {
    console.error(error);
  }

};
export const getTradeInfoByTradeId = (tradeId) => {
  return tradeList.find((trade) => trade.tradeId === tradeId);

}
export const getTradewiseWorkShop = async (appId) => {
  const db = await initDB();
  try {
    // Read-only transaction for multiple stores
    const tx = db.transaction([TRADEWISE_WORKSHOP], 'readonly');
    // Building Photos
    const workshops = tx.objectStore(TRADEWISE_WORKSHOP);
    let allList = await workshops.index('appId').getAll(appId);

    // allList = allList.map(async (item) => {
    //   const tradeInfo = await getTradeInfoByTradeId(item.tradeId); // <-- await here!
    //   return {...item, tradeInfo:tradeInfo};
    // })

    const finalList = await Promise.all(
      allList.map(async (item) => {
        const tradeInfo = await getTradeInfoByTradeId(item.tradeId);
        return { ...item, tradeInfo };
      })
    );


    // allList.sort((a, b) => a.stepNo - b.stepNo);

    await tx.done;
    return finalList;
  } catch (error) {
    return []
  }
};
export const setTradewiseWorkShop = async (values, authUser, appId) => {
  const db = await initDB();
  try {
    // Read-only transaction for multiple stores
    const tx = db.transaction([TRADEWISE_WORKSHOP, APP_FORM_SUB_CIVIL_INFRA], 'readwrite');

    for (const key in values) {
      const splited = key.split('>');

      // console.log(splited[0]);
      var tradeId = splited[1];
      var workshop = splited[2];
      // console.log(keyString, photo, tradeId, workshop, area);
      const store = tx.objectStore(TRADEWISE_WORKSHOP);
      const twws = await store.index("tradeId_workshop_appId").get([tradeId, workshop, appId]);

      if (splited[0] === "area" && twws?.appId) {
        await store.put({ ...twws, area: values[key], submitDate: new Date().toISOString(), updateDate: new Date().toISOString() });
      } else if (splited[0] === "photo" && twws?.appId) {
        await store.put({ ...twws, photo: values[key], submitDate: new Date().toISOString(), updateDate: new Date().toISOString() });
      }
    }


    const store = tx.objectStore(APP_FORM_SUB_CIVIL_INFRA);
    const stepInfo = await store.index("appId_step").get([appId, CIC.TRADEWISE_WORKSHOP]);
    console.log(stepInfo);
    await store.put({ ...stepInfo, status: FILLED, submitDate: new Date().toISOString(), updateDate: new Date().toISOString() });

    // Set Active Next Step
    await setActiveCivilInfraSubSteps(appId, stepInfo.nextStep);

    await tx.done;
  } catch (error) {
    return {}
  }

};

export const setActiveCivilInfraSubSteps = async (appId, toActiveStep) => {
  // Update the app flow status
  const db = await initDB();
  let currentState;
  try {
    // Read-only transaction for multiple stores
    const tx = db.transaction([APP_FORM_SUB_CIVIL_INFRA], 'readwrite');
    const store = tx.objectStore(APP_FORM_SUB_CIVIL_INFRA);
    switch (toActiveStep) {
      case CIC.TRADEWISE_WORKSHOP:
        currentState = await store.index("appId_step").get([appId, CIC.TRADEWISE_WORKSHOP]);
        await store.put({ ...currentState, stepStatus: ACTIVE });
        break;
      case CIC.TRADEWISE_CLASSROOMS:
        currentState = await store.index("appId_step").get([appId, CIC.TRADEWISE_CLASSROOMS]);
        await store.put({ ...currentState, stepStatus: ACTIVE });
        break;
      case CIC.MULTIPURPOSE_HALL:
        currentState = await store.index("appId_step").get([appId, CIC.MULTIPURPOSE_HALL]);
        await store.put({ ...currentState, stepStatus: ACTIVE });
        break;
      case CIC.IT_LAB:
        currentState = await store.index("appId_step").get([appId, CIC.IT_LAB]);
        await store.put({ ...currentState, stepStatus: ACTIVE });
        break;
      case CIC.LIBRARY:
        currentState = await store.index("appId_step").get([appId, CIC.LIBRARY]);
        await store.put({ ...currentState, stepStatus: ACTIVE });
        break;
      case CIC.PLACEMENT_AND_COUNSELLING_ROOM:
        currentState = await store.index("appId_step").get([appId, CIC.PLACEMENT_AND_COUNSELLING_ROOM]);
        await store.put({ ...currentState, stepStatus: ACTIVE });
        break;
      case CIC.ADMINISTRATIVE_AREA:
        currentState = await store.index("appId_step").get([appId, CIC.ADMINISTRATIVE_AREA]);
        await store.put({ ...currentState, stepStatus: ACTIVE });
        break;
      default:
        break;
    }
    await tx.done;
  } catch (error) {
    return {}
  }





};





export const setCommonCivilInfra = async (values, authUser, appId) => {
  const db = await initDB();
  try {
    // Read-only transaction for multiple stores
    const tx = db.transaction([TRADEWISE_CLASSROOMS, APP_FORM_SUB_CIVIL_INFRA], 'readwrite');


    for (const key in values) {
      const splited = key.split('>');

      // // console.log(splited[0]);
      var tradeId = splited[1];
      var classroom = splited[2];
      console.log(splited, tradeId, classroom, appId);

      const store = tx.objectStore(TRADEWISE_CLASSROOMS);
      const twws = await store.index("tradeId_classroom_appId").get([tradeId, classroom, appId]);

      if (splited[0] === "area" && twws?.appId) {
        await store.put({ ...twws, area: values[key], submitDate: new Date().toISOString(), updateDate: new Date().toISOString() });
      } else if (splited[0] === "photo" && twws?.appId) {
        await store.put({ ...twws, photo: values[key], submitDate: new Date().toISOString(), updateDate: new Date().toISOString() });
      }
    }

    const store = tx.objectStore(APP_FORM_SUB_CIVIL_INFRA);
    const stepInfo = await store.index("appId_step").get([appId, CIC.TRADEWISE_CLASSROOMS]);
    await store.put({ ...stepInfo, status: FILLED, submitDate: new Date().toISOString(), updateDate: new Date().toISOString() });

    // Set Active Next Step
    console.log(stepInfo);
    await setActiveCivilInfraSubSteps(appId, stepInfo.nextStep);

    await tx.done;
  } catch (error) {
    console.error(error);
    return {}
  }

};