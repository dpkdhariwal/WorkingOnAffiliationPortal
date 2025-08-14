
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
    await store.put({ ...currentState, status: newStatus });
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
    const tx = db.transaction([C.DA_LAND_DOCUMENTS], 'readwrite');
    const store = tx.objectStore(C.DA_LAND_DOCUMENTS);
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
    const tx = db.transaction([C.DA_LAND_DOCUMENTS], 'readwrite');
    const store = tx.objectStore(C.DA_LAND_DOCUMENTS);
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
    const tx = db.transaction([C.DA_LAND_DOCUMENTS], 'readwrite');
    const store = tx.objectStore(C.DA_LAND_DOCUMENTS);
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
    const tx = db.transaction([C.DA_LAND_DOCUMENTS], 'readwrite');
    const store = tx.objectStore(C.DA_LAND_DOCUMENTS);
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



// // Set Application Flow
// export const setAppFlow = async (authUser, appId) => {
//   const db = await initDB();
//   C.AppFlow.forEach(async (flow) => {
//     const flowData = { ...flow, id: Date.now() + Math.random(), appId: appId, userId: authUser.id };
//     await db.put(C.APP_FLOW, flowData);
//   });
//   await set_stage_i_form_flow(authUser, appId);
// };

// export const setEntityDetails = async (data, authUser, appId) => {
//   try {
//     const db = await initDB();
//     // Create New App and Save Current Status
//     const obj = { ...AppliInfoInitialValues, appId: appId, id: appId, userId: authUser.id, };
//     delete obj.app_flow_status; // or use destructuring for a new object

//     await db.put(APPLIST, obj);

//     const entityBasicDetail = (({ aff_category, aff_sub_category, category, name_of_applicant_entity, ApplicantEntityEmailId, isApplicantEntityEmailIdVerified, ApplicantContactNumber, Is_the_applicant_running_any_other_iti, }) => ({ aff_category, aff_sub_category, category, name_of_applicant_entity, ApplicantEntityEmailId, isApplicantEntityEmailIdVerified, ApplicantContactNumber, Is_the_applicant_running_any_other_iti, }))(data);
//     const entityAddress = (({ state_of_other_iti, ApplicantEntityState, ApplicantEntityDistrict, ApplicantEntityTown_City, ApplicantEntityBlock_Tehsil, ApplicantEntitySector_Village, ApplicantEntityPincode, ApplicantEntityPlotNumber_KhasaraNumber_GataNumber, ApplicantEntityLandmark, }) => ({ state_of_other_iti, ApplicantEntityState, ApplicantEntityDistrict, ApplicantEntityTown_City, ApplicantEntityBlock_Tehsil, ApplicantEntitySector_Village, ApplicantEntityPincode, ApplicantEntityPlotNumber_KhasaraNumber_GataNumber, ApplicantEntityLandmark, }))(data);
//     const other_itis = (({ run_ITIName, run_MISCode, run_State, run_District, run_TownCity, run_BlockTehsil, run_Pincode, run_PlotNumber_KhasaraNumber, run_Landmark, }) => ({ run_ITIName, run_MISCode, run_State, run_District, run_TownCity, run_BlockTehsil, run_Pincode, run_PlotNumber_KhasaraNumber, run_Landmark, }))(data);

//     // check if exist
//     try {
//       // Read-only transaction for multiple stores
//       const tx = db.transaction([APP_FORM_FLOW_STAGE_II, ENTITY_DETAILS, ENTITY_ADDRESS, OTHER_ITI], 'readwrite');
//       const store_1 = tx.objectStore(ENTITY_DETAILS);
//       const store_2 = tx.objectStore(ENTITY_ADDRESS);
//       const store_3 = tx.objectStore(OTHER_ITI);

//       // Entity Detail
//       let data_1 = await store_1.index("appId").get(appId);
//       if (data_1?.appId) {
//         await store_1.put({ ...data_1, ...entityBasicDetail });
//       }
//       else {
//         await store_1.put({ ...entityBasicDetail, id: Date.now() + Math.random(), appId: appId, });
//       }

//       // Entity Address
//       let data_2 = await store_2.index("appId").get(appId);
//       if (data_2?.appId) {
//         await store_2.put({ ...data_2, ...entityAddress });
//       }
//       else {
//         await store_2.put({ ...entityAddress, id: Date.now() + Math.random(), appId: appId, });
//       }

//       // Other ITI
//       let data_3 = await store_3.index("appId").get(appId);
//       if (data_3?.appId) {
//         await store_3.put({ ...data_3, ...other_itis });
//       }
//       else {
//         await store_3.put({ ...other_itis, id: Date.now() + Math.random(), appId: appId, });
//       }

//       //   const entityId = await db.put(ENTITY_DETAILS, { ...entityBasicDetail, id: Date.now() + Math.random(), appId: appId, });
//       // const entityAddressId = await db.put(ENTITY_ADDRESS, { ...entityAddress, id: Date.now() + Math.random(), appId: appId, });
//       // if (entityBasicDetail.Is_the_applicant_running_any_other_iti == "yes") {
//       //   const insertedId = await db.put(OTHER_ITI, { ...other_itis, id: Date.now() + Math.random(), appId: appId, });
//       // }


//       // console.log(data, authUser, appId);
//       await setAppFlow(authUser, appId);

//       await tx.done;
//     } catch (error) {
//       return {}
//     }



//   } catch (error) {
//     console.log(error);
//   }


//   // Mark As Filled
//   // try {
//   //   // Read-only transaction for multiple stores
//   //   const tx = db.transaction([APP_FLOW], 'readwrite');
//   //   const store = tx.objectStore(APP_FLOW);
//   //   currentState = await store.index("appId_step").get([appId, imp.BLD_BUILDING_PLAN]);
//   //   await store.put({ ...currentState, stepStatus: imp.ACTIVE });
//   //   await tx.done;
//   // } catch (error) {
//   //   return {}
//   // }

// };




// // Stage I
// export const set_stage_i_form_flow = async (authUser, appId) => {
//   const db = await initDB();

//   try {
//     const tx = db.transaction([C.APP_FORM_FLOW_STAGE_I], 'readwrite');
//     const store = tx.objectStore(C.APP_FORM_FLOW_STAGE_I);
//     for (const [index, flow] of C.STAGE_I_APP_FORM_FLOW.entries()) {
//       let step = await store.index('appId_step').get([appId, flow.step]);
//       if (!step) {
//         await store.put(C.APP_FORM_FLOW_STAGE_I, { ...flow, id: Date.now() + Math.random(), appId, userId: authUser.id, });
//       }
//     }
//     await tx.done;
//   } catch (error) {
//     console.lor(error);
//     return {}
//   }

// };



