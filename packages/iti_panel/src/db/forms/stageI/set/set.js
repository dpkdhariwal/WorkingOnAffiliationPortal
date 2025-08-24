
import { initDB } from "../../../db";
import * as C from "../../../../constants";


import * as get from "../get/get";


export const markAsCompleteStageStep = async (authUser, appId, step) => {
  const db = await initDB();
  const formattedDate = new Date().toISOString(); // "2025-08-05T07:25:13.123Z"
  try {
    const tx = db.transaction([C.APP_FORM_FLOW_STAGE_I], 'readwrite');
    const store = tx.objectStore(C.APP_FORM_FLOW_STAGE_I);
    let d1 = await store.index('appId_step').get([appId, step]);
    if (d1) {
      await store.put({ ...d1, stepStatus: C.ACTIVE, status: C.FILLED, submitDate: formattedDate, userId: authUser.id });
    }
    await tx.done;
  } catch (error) {
    console.log(error);
    return {}
  }
}

export const setActiveStage1NextStep = async (appId, step) => {
  // Update the app flow status
  const db = await initDB();
  let data, oldStep, newStep, currentState;
  try {
    const tx = db.transaction([C.APP_FORM_FLOW_STAGE_I], 'readwrite');
    const store = tx.objectStore(C.APP_FORM_FLOW_STAGE_I);
    currentState = await store.index("appId_step").get([appId, step]);
    await store.put({ ...currentState, stepStatus: C.ACTIVE });
    await tx.done;
  } catch (error) {
    return {}
  }
};

export const setNewStatusOfAppByStep = async (appId, step, newStatus) => {
  // Update the app flow status
  const db = await initDB();
  let currentState;
  try {
    const tx = db.transaction([C.APP_FLOW], 'readwrite');
    const store = tx.objectStore(C.APP_FLOW);
    currentState = await store.index("appId_step").get([appId, step]);
    await store.put({ ...currentState, status: newStatus, assessment_status: C.SL.ON_PROGRESS });
    await tx.done;
  } catch (error) {
    return {}
  }
};


export const set_da_status_possasion_of_land = async (appId, values) => {
  console.log(appId, values);
  const db = await initDB();
  let currentState, id, toStore;
  id = Date.now() + Math.random();
  try {
    const tx = db.transaction([C.DA_STAGE_I_VERIFICATIONS], 'readwrite');
    const store = tx.objectStore(C.DA_STAGE_I_VERIFICATIONS);
    currentState = await store.index("appId_key_isDraft").get([appId, C.DA1_KEYS.LAND_DOCUMENT, 'yes']);
    console.log(values);
    toStore = currentState?.appId ? { ...currentState, ...values } : { ...values, id: id, appId: appId, key: C.DA1_KEYS.LAND_DOCUMENT, isDraft: C.SL.YES };
    await store.put(toStore);
    await tx.done;
  } catch (error) {
    console.error(error);
    return {}
  }
};

export const get_da_status_possasion_of_land = async (appId) => {
  console.log(appId);
  const db = await initDB();
  let currentState, id;
  try {
    const tx = db.transaction([C.DA_STAGE_I_VERIFICATIONS], 'readwrite');
    const store = tx.objectStore(C.DA_STAGE_I_VERIFICATIONS);
    currentState = await store.index("appId_key_isDraft").getAll([appId, C.DA1_KEYS.LAND_DOCUMENT, 'yes']);
    await tx.done;
    console.log(currentState);
    return currentState;
  } catch (error) {
    console.error(error);
    return {}
  }
};


export const set_da_status_land_area = async (appId, values) => {
  console.log(appId, values);
  const db = await initDB();
  let currentState, id, toStore;
  id = Date.now() + Math.random();
  try {
    const tx = db.transaction([C.DA_STAGE_I_VERIFICATIONS], 'readwrite');
    const store = tx.objectStore(C.DA_STAGE_I_VERIFICATIONS);
    currentState = await store.index("appId_key_isDraft").get([appId, C.DA1_KEYS.LAND_AREA, 'yes']);
    console.log(values);
    toStore = currentState?.appId ? { ...currentState, ...values } : { ...values, id: id, appId: appId, key: C.DA1_KEYS.LAND_AREA, isDraft: C.SL.YES };
    await store.put(toStore);
    await tx.done;
  } catch (error) {
    console.error(error);
    return {}
  }
};

export const get_da_status_land_area = async (appId) => {
  console.log(appId);
  const db = await initDB();
  let currentState, id;
  try {
    const tx = db.transaction([C.DA_STAGE_I_VERIFICATIONS], 'readwrite');
    const store = tx.objectStore(C.DA_STAGE_I_VERIFICATIONS);
    currentState = await store.index("appId_key_isDraft").getAll([appId, C.DA1_KEYS.LAND_AREA, 'yes']);
    await tx.done;
    console.log(currentState);
    return currentState;
  } catch (error) {
    console.error(error);
    return {}
  }
};

export const set_da_status = async (appId, values, stage, key) => {
  console.log(appId, values, stage, key);
  const db = await initDB();
  let currentState, id, toStore;
  id = Date.now() + Math.random();

  switch (stage) {
    case C.abbreviation.STAGE_I.key:
      console.log(appId, values, stage, key);
      try {
        const tx = db.transaction([C.DA_STAGE_I_VERIFICATIONS], 'readwrite');
        const store = tx.objectStore(C.DA_STAGE_I_VERIFICATIONS);
        currentState = await store.index("appId_key_isDraft").get([appId, key, 'yes']);
        console.log(values);
        toStore = currentState?.appId ? { ...currentState, ...values } : { ...values, id: id, appId: appId, key: key, isDraft: C.SL.YES };
        await store.put(toStore);
        await tx.done;
      } catch (error) {
        console.error(error);
        return {}
      }
      break;

    default:
      break;
  }
};

export const get_da_status = async (appId, stage, key) => {
  const db = await initDB();
  let currentState;
  switch (stage) {
    case C.abbreviation.STAGE_I.key:
      try {
        const tx = db.transaction([C.DA_STAGE_I_VERIFICATIONS], 'readwrite');
        const store = tx.objectStore(C.DA_STAGE_I_VERIFICATIONS);
        currentState = await store.index("appId_key_isDraft").getAll([appId, key, 'yes']);
        console.log(currentState);
        await tx.done;
        return currentState;
      } catch (error) {
        console.error(error);
        return {}
      }
    default:
      break;
  }

  return currentState;
};


export const setStageIAssessmentFlow = async (appId) => {
  const db = await initDB();
  try {
    const tx = db.transaction([C.TBL_ASSESSMENTS_STATUS, C.APP_ASSESSMENT_FLOW_STAGE_I, C.DA_STAGE_I_VERIFICATIONS_CHECKLIST], 'readwrite');
    const store = tx.objectStore(C.APP_ASSESSMENT_FLOW_STAGE_I);
    const vrfcn_store = tx.objectStore(C.DA_STAGE_I_VERIFICATIONS_CHECKLIST);
    const asmt_store = tx.objectStore(C.TBL_ASSESSMENTS_STATUS);

    let assessment_id = Date.now() + Math.random();

    let asmt_data = await asmt_store.index("appId").getAll(appId);

    if (asmt_data.length === 0) {

      await asmt_store.put({ ...C.ASSESSMENT_STATUS, assessment_id: assessment_id, id: Date.now() + Math.random(), appId: appId, assessment_status: C.SL.ON_PROGRESS, pendingAt: C.SL.PENDING_AT_ASSESSOR });

      for (const [index, flow] of C.ASSESSMENT_STAGE_I_FLOW.entries()) {
        let id = Date.now() + Math.random();
        await store.put({ ...flow, id: id, appId: appId, assessment_id: assessment_id, });
        if (flow?.VerificationList) {
          for (const [index, ver] of flow.VerificationList.entries()) {
            let id = Date.now() + Math.random();
            await vrfcn_store.put({ ...ver, id: id, appId: appId, assessment_id: assessment_id, });
          }
        }
      }
    }
    await tx.done;
  } catch (error) {
    console.error(error);
  }

};

export const markAsCompleteStageAssessmentFlow = async (appId, step) => {
  const db = await initDB();
  const formattedDate = new Date().toISOString(); // "2025-08-05T07:25:13.123Z"
  try {
    const tx = db.transaction([C.APP_ASSESSMENT_FLOW_STAGE_I], 'readwrite');
    const store = tx.objectStore(C.APP_ASSESSMENT_FLOW_STAGE_I);
    let d1 = await store.index('appId_step').get([appId, step]);
    if (d1) {
      await store.put({ ...d1, status: C.SL.COMPLETED, completionDate: formattedDate });
      console.log(d1);
      if (d1?.nextStep && d1?.nextStep != C.LAST) {
        let d2 = await store.index('appId_step').get([appId, d1?.nextStep]);
        await store.put({ ...d2, stepStatus: C.SL.ACTIVE });
      }
    }

    await tx.done;
  } catch (error) {
    console.log(error);
    return {}
  }
}

export const setAsStageIAsmtasHistory = async (appId, forUser) => {
  const db = await initDB();
  try {
    const tx = db.transaction([C.APP_ASSESSMENT_FLOW_STAGE_I], 'readwrite');
    const store = tx.objectStore(C.APP_ASSESSMENT_FLOW_STAGE_I);
    // Marking as History
    let h1 = await store.index('appId_for_recordType').getAll([appId, forUser, C.SL.HISTORY]);
    for (const [index, flow] of h1.entries()) {
      await store.put({ ...flow, recordType: C.SL.HISTORY });
    }
    await tx.done;
  } catch (error) {
    console.log(error);
    return {}
  }
}
export const generateAssmentFlowForApplciant = async (appId) => {
  const db = await initDB();
  // const formattedDate = new Date().toISOString(); // "2025-08-05T07:25:13.123Z"
  try {
    const tx = db.transaction([C.APP_ASSESSMENT_FLOW_STAGE_I], 'readwrite');
    const store = tx.objectStore(C.APP_ASSESSMENT_FLOW_STAGE_I);
    // Marking as History
    let h1 = await store.index('appId_for_recordType').getAll([appId, C.SL.ASSESSOR, C.SL.PRESENT]);
    for (const [index, flow] of h1.entries()) {
      await store.put({ ...flow, completionDate: null, id: Date.now() + Math.random(), for: C.SL.APPLICANT, status: C.SL.PENDING, stepStatus: C.SL.IN_ACTIVE, recordType: C.SL.PRESENT });
    }
    await tx.done;
  } catch (error) {
    console.log(error);
    return {}
  }
}

export const getAssessmentStatus = async (appId) => {
  const db = await initDB();
  try {
    const tx = db.transaction([C.TBL_ASSESSMENTS_STATUS], 'readwrite');
    const store = tx.objectStore(C.TBL_ASSESSMENTS_STATUS);
    let d1 = await store.index('appId').get(appId);
    await tx.done;
    return d1;
  } catch (error) {
    console.log(error);
    return {}
  }
};

export const setAssessmentStatus = async (appId, status, pendingAt = null) => {
  const db = await initDB();
  try {
    const tx = db.transaction([C.TBL_ASSESSMENTS_STATUS], 'readwrite');
    const store = tx.objectStore(C.TBL_ASSESSMENTS_STATUS);
    let d1 = await store.index('appId').get(appId);

    await store.put({ ...d1, assessment_status: status, pendingAt: pendingAt });
    await tx.done;
    // return d1;
  } catch (error) {
    console.log(error);
    return {}
  }
};

export const getAssessmentStageIFlowById = async (appId, userType = null) => {
  const db = await initDB();
  try {
    const tx = db.transaction([C.APP_ASSESSMENT_FLOW_STAGE_I, C.TBL_ASSESSMENTS_STATUS], 'readwrite');

    // Getting the assessment status
    const store_2 = tx.objectStore(C.TBL_ASSESSMENTS_STATUS);
    let aInfo = await store_2.index('appId').get(appId);

    const store = tx.objectStore(C.APP_ASSESSMENT_FLOW_STAGE_I);
    let d1;
    d1 = await store.index('appId_for_recordType').getAll([appId, userType, C.SL.PRESENT]);
    d1.sort((a, b) => a.stepNo - b.stepNo);

    d1 = await d1.map((step) => {
      let status = false;
      switch (step?.status) {
        case C.SL.VERIFIED:
          status = true;
          break;
        case C.SL.COMPLETED:
          status = true;
          break;
        case C.SL.ON_PROGRESS:
          switch (aInfo?.pendingAt) {
            case C.SL.PENDING_AT_APPLICANT:
              status = true;
              break;
            case C.SL.PENDING_AT_ASSESSOR:
              status = true;
              break;
            case C.SL.PENDING_AT_RDSDE:
              status = true;
              break;
            default:
              status = false;
              break;
          }
          break;
        default:
          status = false;
          break;
      }
      return { ...step, completed: status };
    });
    await tx.done;
    return d1;
  } catch (error) {
    console.log(error);
    return {}
  } finally {
    db.close();
  }

};



export const getAssessmentProgressStatus = async (appId) => {
  const db = await initDB();
  try {
    const tx = db.transaction([C.APP_ASSESSMENT_FLOW_STAGE_I, C.DA_STAGE_I_VERIFICATIONS, C.TBL_ASSESSMENTS_STATUS], 'readonly');
    const store = tx.objectStore(C.APP_ASSESSMENT_FLOW_STAGE_I);
    const store_1 = tx.objectStore(C.DA_STAGE_I_VERIFICATIONS);
    const store_2 = tx.objectStore(C.TBL_ASSESSMENTS_STATUS);

    // Getting the assessment status
    let assessmentStatus = await store_2.index("appId").get(appId);

    let steps = await store.index('appId_for').getAll([appId, C.SL.ASSESSOR]);
    let vStatus = [];

    // Removing the review assessment step from the steps
    steps = steps.filter(step => step.step !== C.ST1FC.REVIEW_ASSESSMENT.step);

    // check level 1 step is completed or not
    const allCompleted = steps.every(step => step.status == C.SL.COMPLETED); // 👈 check here
    vStatus.push(allCompleted);


    // Checking the verification status of each step
    steps = await Promise.all(
      steps.map(async (step) => {
        switch (step.step) {
          case C.ST1FC.APPLICANT_ENTITY_DETAILS.step:
          case C.ST1FC.DETAILS_OF_THE_PROPOSED_INSTITUTE.step:
          case C.ST1FC.DETAILS_OF_TRADE_UNIT_FOR_AFFILIATION.step:
          case C.ST1FC.DOCUMENTS_UPLOAD.step:
            vStatus.push(true);
            break;
          case C.ST1FC.DETAILS_OF_THE_LAND_TO_BE_USED_FOR_THE_ITI.step: {
            const d1 = await Promise.all([
              store_1.index("appId_key_isDraft").getAll([appId, C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_AUTHORIZED_SIGNATORY, "yes"]),
              store_1.index("appId_key_isDraft").getAll([appId, C.ASSESSMENT_STAGE_I_KEYS.REGISTRATION_CERTIFICATE_OF_APPLICANT_ORGANIZATION, "yes"]),
              store_1.index("appId_key_isDraft").getAll([appId, C.ASSESSMENT_STAGE_I_KEYS.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT, "yes"]),
              store_1.index("appId_key_isDraft").getAll([appId, C.ASSESSMENT_STAGE_I_KEYS.RESOLUTION_CERTIFICATE, "yes"]),
              store_1.index("appId_key_isDraft").getAll([appId, C.ASSESSMENT_STAGE_I_KEYS.LAND_AREA, "yes"])

            ]);

            console.log(d1);
            const allAsPerNorms = d1.flat().every(item => item.as_per_norms === "yes");
            vStatus.push(allAsPerNorms);
            break;
          }

          default:
            vStatus.push(true);
            break;
        }

        console.log("Verification Status:", vStatus);

        return {
          ...step,
          completed: step.status === C.SL.COMPLETED,
        };
      })
    );


    // Shorting the steps by stepNo
    steps.sort((a, b) => a.stepNo - b.stepNo);
    return {
      steps,
      allCompleted,
      vStatus: vStatus.every(Boolean),
      assessmentStatus
    };
  } catch (error) {
    console.error(error);
    return { steps: [], allCompleted: false };
  }
};


export const getDetails = async (appId, stage = null, entity = null) => {
  const db = await initDB();
  try {
    const tx = db.transaction([C.ENTITY_DETAILS, C.ENTITY_ADDRESS, C.OTHER_ITI, C.PROPOSED_INSTI_DETAILS, C.PROPOSED_INSTI_ADDRESSES, C.NEW_INSTI_TRADE_LIST], 'readwrite');
    const store_1 = tx.objectStore(C.ENTITY_DETAILS);
    const store_2 = tx.objectStore(C.ENTITY_ADDRESS);
    const store_3 = tx.objectStore(C.OTHER_ITI);
    const store_4 = tx.objectStore(C.PROPOSED_INSTI_DETAILS);
    const store_5 = tx.objectStore(C.PROPOSED_INSTI_ADDRESSES);
    const store_6 = tx.objectStore(C.NEW_INSTI_TRADE_LIST);


    let entity_details = await store_1.index("appId").get(appId);
    let entity_address = await store_2.index("appId").get(appId);
    let other_iti = await store_3.index("appId").getAll(appId);

    let proposed_insti_details = await store_4.index("appId").get(appId);
    let proposed_insti_addresses = await store_5.index("appId").get(appId);


    let new_insti_trade_list = await store_6.index("appId").getAll(appId);




    console.log(entity_details, entity_address, other_iti, proposed_insti_details, proposed_insti_addresses, new_insti_trade_list);
    await tx.done;
    return { entity_details, entity_address, other_iti, proposed_insti_details, proposed_insti_addresses, new_insti_trade_list };
  } catch (error) {
    console.error(error);
  }

};