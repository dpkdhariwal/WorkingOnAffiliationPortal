// db.js
import { openDB } from "idb";

import { DB_NAME, APPLIST, ENTITY_DETAILS, ENTITY_ADDRESS, OTHER_ITI, PROPOSED_INSTI_DETAILS, PROPOSED_INSTI_ADDRESSES, NEW_INSTI_TRADE_LIST, LAND_INST_DETAILS, LAND_OWNED_LANDS_DETAILS, LAND_LEASED_LANDS_DETAILS, APP_FLOW, STAGE_II_APP_FORM_FLOW, APP_FORM_FLOW_STAGE_II, APP_FORM_SUB_CIVIL_INFRA, BUILDING_DETAIL, FRONT_VIEW_PHOTO_OF_BUILDING, SIDE_VIEW_PHOTO_OF_BUILDING, ENTRANCE_GATE_PHOTO_OF_PLOT_WITH_SIGNAGE_BOARD, BLD_BUILDING_PLAN, BLD_BCC, BLD_PHOTOS, FILLED } from "affserver";
import * as imp from "affserver";
import * as cons from "affserver";


import { initDB } from "./db";

import { AppliInfoInitialValues } from "../reducers/newAppReducer";
import { AppFlow } from "affserver";
import { markAsCompleteStageStep, setActiveStage1NextStep } from "./forms/stageI/set/set";

export const addNewApp = async (app) => {
  console.log(app);
  const db = await initDB();
  await db.put(APPLIST, app);
};

export const getAllApps = async () => {
  const db = await initDB();
  return await db.getAll(APPLIST);
};

export const removeApp = async (id) => {
  const db = await initDB();
  await db.delete(APPLIST, id);
};

export const getAppsByUserId = async (userId) => {
  const db = await initDB();
  const tx = db.transaction(APPLIST, "readonly");
  const index = tx.store.index("userId");
  const result = await index.getAll(userId);
  console.log("Apps for userId:", userId, result);
  result.then((data) => {
    console.log("Apps for userId:", userId, data);
  });
};

export const appSetup = async (authUser, appId) => {
  try {
    await setAppFlow(authUser, appId);
    await set_stage_i_form_flow(authUser, appId);
    await set_stage_ii_form_flow(authUser, appId);
  } catch (error) {
    console.error(error);
  }
}

export const setEntityDetails = async (data, authUser, appId) => {
  const db = await initDB();

  try {
    // appSetup(authUser, appId);
    const formattedDate = new Date().toISOString(); // "2025-08-05T07:25:13.123Z"

    const entityBasicDetail = (({ aff_category, aff_sub_category, category, name_of_applicant_entity, ApplicantEntityEmailId, isApplicantEntityEmailIdVerified, ApplicantContactNumber, Is_the_applicant_running_any_other_iti, }) => ({ aff_category, aff_sub_category, category, name_of_applicant_entity, ApplicantEntityEmailId, isApplicantEntityEmailIdVerified, ApplicantContactNumber, Is_the_applicant_running_any_other_iti, }))(data);
    const entityAddress = (({ state_of_other_iti, ApplicantEntityState, ApplicantEntityDistrict, ApplicantEntityTown_City, ApplicantEntityBlock_Tehsil, ApplicantEntitySector_Village, ApplicantEntityPincode, ApplicantEntityPlotNumber_KhasaraNumber_GataNumber, ApplicantEntityLandmark, }) => ({ state_of_other_iti, ApplicantEntityState, ApplicantEntityDistrict, ApplicantEntityTown_City, ApplicantEntityBlock_Tehsil, ApplicantEntitySector_Village, ApplicantEntityPincode, ApplicantEntityPlotNumber_KhasaraNumber_GataNumber, ApplicantEntityLandmark, }))(data);
    const other_itis = (({ run_ITIName, run_MISCode, run_State, run_District, run_TownCity, run_BlockTehsil, run_Pincode, run_PlotNumber_KhasaraNumber, run_Landmark, }) => ({ run_ITIName, run_MISCode, run_State, run_District, run_TownCity, run_BlockTehsil, run_Pincode, run_PlotNumber_KhasaraNumber, run_Landmark, }))(data);

    // Read-only transaction for multiple stores
    const tx = db.transaction([cons.APP_FORM_FLOW_STAGE_II, cons.ENTITY_DETAILS, cons.ENTITY_ADDRESS, cons.OTHER_ITI, cons.APP_FLOW, cons.APP_FORM_FLOW_STAGE_I, cons.APP_FORM_FLOW_STAGE_II, cons.APP_FORM_SUB_CIVIL_INFRA], 'readwrite');

    const store_1 = tx.objectStore(cons.ENTITY_DETAILS);
    const store_2 = tx.objectStore(cons.ENTITY_ADDRESS);
    const store_3 = tx.objectStore(cons.OTHER_ITI);
    const store_4 = tx.objectStore(cons.APP_FLOW);
    const store_5 = tx.objectStore(cons.APP_FORM_FLOW_STAGE_I);
    const store_6 = tx.objectStore(cons.APP_FORM_FLOW_STAGE_II);
    const store_7 = tx.objectStore(cons.APP_FORM_SUB_CIVIL_INFRA);

    // Setup Application Flow
    let list = await store_4.index('appId').getAll(appId);
    if (list.length === 0) {
      for (const [index, flow] of AppFlow.entries()) {
        let step = await store_4.index('appId').getAll(appId);
        await store_4.put({ ...flow, id: Date.now() + Math.random(), appId: appId, userId: authUser.id });
      }
    }


    // Setup Stage I Flow
    list = await store_5.index('appId').getAll(appId);
    if (list.length === 0) {
      list = await Promise.all(cons.STAGE_I_APP_FORM_FLOW.map(async (step) => {
        switch (step.step) {
          case cons.ST1FC.APPLICANT_ENTITY_DETAILS.step:
            return { ...step, status: cons.FILLED };
          case cons.ST1FC.DETAILS_OF_THE_PROPOSED_INSTITUTE.step:
            return { ...step, stepStatus: cons.ACTIVE };
          default:
            return step;
        }
      }))
      for (const [index, flow] of list.entries()) {
        let step = await store_5.index('appId_step').get([appId, flow.step]);
        if (!step) {
          await store_5.put({ ...flow, submitDate: formattedDate, id: Date.now() + Math.random(), appId, userId: authUser.id, });
        }
      }
    }



    // Setup Stage II Flow 
    list = await store_6.index('appId').getAll(appId);
    if (list.length === 0) {
      for (const [index, flow] of cons.STAGE_II_APP_FORM_FLOW.entries()) {
        let step = await store_6.index('appId_step').get([appId, flow.step]);
        if (!step) {
          await store_6.put({ ...flow, submitDate: formattedDate, id: Date.now() + Math.random(), appId, userId: authUser.id, });
        }
        // Setup Sub Flow
        if ("subSteps" in flow) {
          switch (flow.step) {
            case imp.CIVIL_INFRASTRUCTURE_DETAIL:
              {
                let exist = await store_7.index('appId').getAll(appId);
                if (exist.length === 0) {
                  for (const [index, subFlow] of flow.subSteps.entries()) {
                    await store_7.put({ ...subFlow, submitDate: formattedDate, id: Date.now() + Math.random(), appId, userId: authUser.id, });
                  }
                }
                break;
              }
            default:
              break;
          }
        }
      }
    }


    // Entity Detail
    let data_1 = await store_1.index("appId").get(appId);
    data_1?.appId ? store_1.put({ ...data_1, ...entityBasicDetail }) : store_1.put({ ...entityBasicDetail, id: Date.now() + Math.random(), appId: appId, userId: authUser.id })


    // Entity Address
    let data_2 = await store_2.index("appId").get(appId);
    data_2?.appId ? store_2.put({ ...data_2, ...entityAddress }) : await store_2.put({ ...entityAddress, id: Date.now() + Math.random(), appId: appId, userId: authUser.id });



    // // Other ITI
    let data_3 = await store_3.index("appId").get(appId);
    data_3?.appId ? store_3.put({ ...data_3, ...other_itis }) : await store_3.put({ ...other_itis, id: Date.now() + Math.random(), appId: appId, userId: authUser.id });

    // markAsCompleteStageStep(authUser, appId, imp.ST1FC.APPLICANT_ENTITY_DETAILS.step);
    // setActiveStage1NextStep(appId, imp.ST1FC.DETAILS_OF_THE_PROPOSED_INSTITUTE.step);
    await tx.done;
    return true;
  } catch (error) {
    console.log(error);
  }
};


export const setProposedInstDetails = async (step, data, appId, authUser) => {
  const db = await initDB();
  const formattedDate = new Date().toISOString(); // "2025-08-05T07:25:13.123Z"
  const proposedInstDetails = (({ name_of_applicant_institute, type_of_institute, institute_location, is_falls_under_hill_area_hill, Falls_Under_Hill_Area_Hill__Supporting_Doc, is_falls_under_border_district, Falls_Under_Border_District__Supporting_Doc, under_msti_category, Whether_the_institute_is_exclusive_for_women_trainees, latitude, Longitude, }) => ({ name_of_applicant_institute, type_of_institute, institute_location, is_falls_under_hill_area_hill, Falls_Under_Hill_Area_Hill__Supporting_Doc, is_falls_under_border_district, Falls_Under_Border_District__Supporting_Doc, under_msti_category, Whether_the_institute_is_exclusive_for_women_trainees, latitude, Longitude, }))(data);
  const proposedInstAddress = (({ cmp_post_state, cmp_post_address, cmp_post_district, cmp_post_city, cmp_post_block_or_tehsil, cmp_post_sector_village, cmp_post_pincode, cmp_post_plot_number_khasara_number, cmp_post_landmark, }) => ({ cmp_post_state, cmp_post_address, cmp_post_district, cmp_post_city, cmp_post_block_or_tehsil, cmp_post_sector_village, cmp_post_pincode, cmp_post_plot_number_khasara_number, cmp_post_landmark, }))(data);
  let currentStepInfo = step;

  try {
    // Check if exist
    const tx = db.transaction([cons.PROPOSED_INSTI_DETAILS, cons.PROPOSED_INSTI_ADDRESSES, cons.APP_FORM_FLOW_STAGE_I], 'readwrite');
    const store = tx.objectStore(cons.PROPOSED_INSTI_DETAILS);
    step = await store.index('appId_userId').get([appId, authUser.id]);
    if (step?.appId) {
      await store.put({ ...step, ...proposedInstDetails });
    }
    else {
      await store.put({ ...proposedInstDetails, id: Date.now() + Math.random(), appId: appId, userId: authUser.id });
    }
    const store2 = tx.objectStore(cons.PROPOSED_INSTI_ADDRESSES);
    let step2 = await store2.index('appId').get(appId);
    if (step2?.appId) {
      await store2.put({ ...step2, ...proposedInstAddress });
    }
    else {
      await store2.put({ ...proposedInstAddress, id: Date.now() + Math.random(), appId: appId });
    }


    // Marking up Steps Status 
    const store_1 = tx.objectStore(cons.APP_FORM_FLOW_STAGE_I);
    console.log(currentStepInfo);
    let d1 = await store_1.index('appId_step').get([appId, currentStepInfo.step]);
    if (d1) {
      await store_1.put({ ...d1, stepStatus: cons.ACTIVE, status: cons.FILLED, submitDate: formattedDate, userId: authUser.id });
    }

    // Marking Active Next Step
    let currentState = await store_1.index("appId_step").get([appId, currentStepInfo.nextStep.step]);
    await store_1.put({ ...currentState, stepStatus: cons.ACTIVE });

    await tx.done;
    return true
  } catch (error) {
    console.log(error);
  }

  // const id_proposedInstDetails = await db.put(PROPOSED_INSTI_DETAILS, { ...proposedInstDetails, id: Date.now() + Math.random(), appId: appId, userId: authUser.id });
  // const id_proposedInstAddress = await db.put(PROPOSED_INSTI_ADDRESSES, { ...proposedInstAddress, id: Date.now() + Math.random(), appId: appId });

  // markAsCompleteStageStep(authUser, appId, step.step)
  // setActiveStage1NextStep(appId, step.nextStep.step);
  // return { id_proposedInstDetails, id_proposedInstAddress, };
};

export const setInstTradeDetails = async (data, appId, step, authUser) => {
  const db = await initDB();
  const { tradeList, unit_in_shift1, unit_in_shift2, unit_in_shift3 } = data;
  for (let index = 0; index <= tradeList.length; index++) {
    const trade = tradeList[index];
    const us1 = unit_in_shift1[index];
    const us2 = unit_in_shift2[index];
    const us3 = unit_in_shift3[index];
    const id = await db.put(NEW_INSTI_TRADE_LIST, { trade, us1, us2, us3, id: Date.now() + Math.random(), appId, });
    console.log("Inserted trade record with ID:", id);
  }
  console.log(step);
  markAsCompleteStageStep(authUser, appId, step.step)
  setActiveStage1NextStep(appId, step.nextStep);
};

export const setInstLandDetails = async (data, appId, step, authUser) => {
  const db = await initDB();

  const land_landType = (({ possession_of_land, land_area_in_square_metres, }) => ({ possession_of_land, land_area_in_square_metres, }))(data);

  const land_owned = (({ land_owner_name, land_registration_number }) => ({ land_owner_name, land_registration_number, }))(data);

  const land_leased = (({ name_of_lessor, name_of_lessee, lease_deed_number, date_of_commencement, date_of_expiry, }) => ({ name_of_lessor, name_of_lessee, lease_deed_number, date_of_commencement, date_of_expiry, }))(data);

  const id_1 = await db.put(LAND_INST_DETAILS, { ...land_landType, id: Date.now() + Math.random(), appId: appId, });

  const id_2 = await db.put(LAND_OWNED_LANDS_DETAILS, { ...land_owned, id: Date.now() + Math.random(), appId: appId, });

  const id_3 = await db.put(LAND_LEASED_LANDS_DETAILS, { ...land_leased, id: Date.now() + Math.random(), appId: appId, });



  await markAsCompleteStageStep(authUser, appId, step.step)
  await setActiveStage1NextStep(appId, step.nextStep);

  // Setup Document Verification Info

  return { id_1, id_2, id_3, };
};

export const setAppFlow = async (authUser, appId) => {
  const db = await initDB();
  AppFlow.forEach(async (flow) => {
    const flowData = { ...flow, id: Date.now() + Math.random(), appId: appId, userId: authUser.id };
    await db.put(APP_FLOW, flowData);
  });
  // await set_stage_i_form_flow(authUser, appId);
  // await set_stage_ii_form_flow(authUser, appId);
};

// Stage I
export const set_stage_i_form_flow = async (authUser, appId) => {
  const db = await initDB();
  const formattedDate = new Date().toISOString(); // "2025-08-05T07:25:13.123Z"
  try {
    const tx = db.transaction([cons.APP_FORM_FLOW_STAGE_I], 'readwrite');
    const store = tx.objectStore(cons.APP_FORM_FLOW_STAGE_I);
    for (const [index, flow] of cons.STAGE_I_APP_FORM_FLOW.entries()) {
      let step = await store.index('appId_step').get([appId, flow.step]);
      if (!step) {
        await store.put({ ...flow, submitDate: formattedDate, id: Date.now() + Math.random(), appId, userId: authUser.id, });
      }
    }
    await tx.done;
  } catch (error) {
    console.lor(error);
    return {}
  }

};


// Stage II
export const set_stage_ii_form_flow = async (authUser, appId) => {

  const db = await initDB();
  const formattedDate = new Date().toISOString(); // "2025-08-05T07:25:13.123Z"
  try {
    const tx = db.transaction([cons.APP_FORM_FLOW_STAGE_II, cons.APP_FORM_SUB_CIVIL_INFRA], 'readwrite');
    const store = tx.objectStore(cons.APP_FORM_FLOW_STAGE_II);
    for (const [index, flow] of cons.STAGE_II_APP_FORM_FLOW.entries()) {
      let step = await store.index('appId_step').get([appId, flow.step]);
      if (!step) {
        await store.put({ ...flow, submitDate: formattedDate, id: Date.now() + Math.random(), appId, userId: authUser.id, });
      }

      console.log(flow);

      // Setup Sub Steps
      if ("subSteps" in flow) {
        switch (flow.step) {
          case imp.CIVIL_INFRASTRUCTURE_DETAIL:
            {
              let s1 = tx.objectStore(cons.APP_FORM_SUB_CIVIL_INFRA);
              let exist = await s1.index('appId').getAll(appId);
              console.log(exist);
              if (exist.length === 0) {
                for (const [index, subFlow] of flow.subSteps.entries()) {
                  await s1.put({ ...subFlow, submitDate: formattedDate, id: Date.now() + Math.random(), appId, userId: authUser.id, });
                }
              }
              break;
            }
          default:
            break;
        }
      }
    }
    await tx.done;
  } catch (error) {
    console.lor(error);
    return {}
  }



  ///////////////////////
  // STAGE_II_APP_FORM_FLOW.forEach(async (flow) => {
  //   const flowData = { ...flow, id: Date.now() + Math.random(), appId: appId, userId: authUser.id, };
  //   await db.put(APP_FORM_FLOW_STAGE_II, flowData);
  //   if ("subSteps" in flow) {
  //     switch (flow.step) {
  //       case imp.CIVIL_INFRASTRUCTURE_DETAIL:
  //         flow.subSteps.forEach(async (flow) => {
  //           const flowData = { ...flow, id: Date.now() + Math.random(), appId: appId, userId: authUser.id, };
  //           await db.put(APP_FORM_SUB_CIVIL_INFRA, flowData);
  //         });
  //         break;

  //       default:
  //         break;
  //     }
  //   }
  // });
};
export const setActiveStage2FlowNextStep = async (appId, toActiveStep) => {
  // Update the app flow status
  const db = await initDB();
  let data, oldStep, newStep, currentState;

  try {
    // Read-only transaction for multiple stores
    const tx = db.transaction([APP_FORM_FLOW_STAGE_II], 'readwrite');
    const store = tx.objectStore(APP_FORM_FLOW_STAGE_II);
    switch (toActiveStep) {
      case imp.BLD_BUILDING_PLAN:
        currentState = await store.index("appId_step").get([appId, imp.BLD_BUILDING_PLAN]);
        await store.put({ ...currentState, stepStatus: imp.ACTIVE });
        break;
      case imp.CIVIL_INFRASTRUCTURE_DETAIL:
        currentState = await store.index("appId_step").get([appId, imp.CIVIL_INFRASTRUCTURE_DETAIL]);
        await store.put({ ...currentState, stepStatus: imp.ACTIVE });
        break;
      case imp.AMENITIES_AREA:
        currentState = await store.index("appId_step").get([appId, imp.AMENITIES_AREA]);
        await store.put({ ...currentState, stepStatus: imp.ACTIVE });
        break;

      case imp.SIGNAGE_BOARDS:
        currentState = await store.index("appId_step").get([appId, imp.SIGNAGE_BOARDS]);
        await store.put({ ...currentState, stepStatus: imp.ACTIVE });
        break;

      case imp.ELECTRICITY_CONNECTION_DETAILS:
        currentState = await store.index("appId_step").get([appId, imp.ELECTRICITY_CONNECTION_DETAILS]);
        await store.put({ ...currentState, stepStatus: imp.ACTIVE });
        break;

      case imp.MISCELLANEOUS:
        currentState = await store.index("appId_step").get([appId, imp.MISCELLANEOUS]);
        await store.put({ ...currentState, stepStatus: imp.ACTIVE });
        break;

      case imp.FEE_PAYMENT_FOR_STAGEII:
        currentState = await store.index("appId_step").get([appId, imp.FEE_PAYMENT_FOR_STAGEII]);
        await store.put({ ...currentState, stepStatus: imp.ACTIVE });
        break;

      case imp.TRADEWISE_MACHINERY__TOOLS__EQUIPMENT_DETAILS:
        currentState = await store.index("appId_step").get([appId, imp.TRADEWISE_MACHINERY__TOOLS__EQUIPMENT_DETAILS]);
        await store.put({ ...currentState, stepStatus: imp.ACTIVE });
        break;

      case imp.DOCUMENT_UPLOADS:
        currentState = await store.index("appId_step").get([appId, imp.DOCUMENT_UPLOADS]);
        await store.put({ ...currentState, stepStatus: imp.ACTIVE });
        break;

      default:
        break;
    }
    await tx.done;
  } catch (error) {
    return {}
  }

};

export const setBuildingDetail = async (data, authUser, appId) => {
  const db = await initDB();
  const Building_Detail = (({ language_for_building_plan, document_of_building_plan, notarised_document_of_building_plan, }) => ({ language_for_building_plan, document_of_building_plan, notarised_document_of_building_plan, }))(data);
  const bld_bcc = (({ language_for_building_completion_certificate, building_completion_certificate, notarised_document_of_bcc, name_of_bcc_issued_authority, date_of_bcc_issued, }) => ({ language_for_building_completion_certificate, building_completion_certificate, notarised_document_of_bcc, name_of_bcc_issued_authority, date_of_bcc_issued, }))(data);
  const bld_photos = (({ front_view_photo_of_building, side_view_photo_of_building, entrance_gate_photo_of_plot_with_signage_board, }) => ({ front_view_photo_of_building, side_view_photo_of_building, entrance_gate_photo_of_plot_with_signage_board, }))(data);

  // Prepare Photo in Row
  const photo_list = [{ photoView: FRONT_VIEW_PHOTO_OF_BUILDING, photo_pth: bld_photos.front_view_photo_of_building, }, { photoView: SIDE_VIEW_PHOTO_OF_BUILDING, photo_pth: bld_photos.side_view_photo_of_building, }, { photoView: ENTRANCE_GATE_PHOTO_OF_PLOT_WITH_SIGNAGE_BOARD, photo_pth: bld_photos.entrance_gate_photo_of_plot_with_signage_board, },];


  console.log(data, authUser, appId);

  try {
    const tx = db.transaction([BLD_BUILDING_PLAN, BLD_BCC, BLD_PHOTOS, APP_FORM_FLOW_STAGE_II], 'readwrite');

    // Stage II Form Flow Prepar
    const FormFlowStageII = tx.objectStore(APP_FORM_FLOW_STAGE_II);
    const row = await FormFlowStageII.index("appId").get(appId);
    if (!row?.appId) {
      await set_stage_ii_form_flow(authUser, appId);
    }


    // Saving Building Plan
    const store_bldPlan = tx.objectStore(BLD_BUILDING_PLAN);
    const bld_plan = await store_bldPlan.index("appId").get(appId);
    const data_bldPlan = bld_plan?.appId ? { ...bld_plan, ...Building_Detail, appId } : { ...Building_Detail, id: Date.now() + Math.random(), appId };
    await store_bldPlan.put(data_bldPlan);
    // await tx.done;

    // Saving BCC Detail
    const store_BLD_BCC = tx.objectStore(BLD_BCC);
    const bcc = await store_BLD_BCC.index("appId").get(appId);
    const data_BLD_BCC = bcc?.appId ? { ...bcc, ...bld_bcc, appId } : { ...bld_bcc, id: Date.now() + Math.random(), appId };
    await store_BLD_BCC.put(data_BLD_BCC);
    // await tx.done;

    // Building Photos
    const store_BLD_PHOTOS = tx.objectStore(BLD_PHOTOS);
    for (const photo of photo_list) {
      const existing_BLD_PHOTOS = await store_BLD_PHOTOS.index('photoView_appId').get([photo.photoView, appId]);
      const data = existing_BLD_PHOTOS ? { ...existing_BLD_PHOTOS, ...photo, appId } : { ...photo, id: Date.now() + Math.random(), appId };
      await store_BLD_PHOTOS.put(data);
    }


    // Get specific step record
    const stepRow = await FormFlowStageII.index("appId_step").get([appId, BUILDING_DETAIL]);
    if (stepRow?.appId) {
      await FormFlowStageII.put({ ...stepRow, status: FILLED });
      setActiveStage2FlowNextStep(appId, stepRow.nextStep)
    }

    await tx.done;

  } catch (error) {
    console.log(error);
  }
};
// export const setBuildingDetail = async (data, authUser, appId) => {
//   const db = await initDB();
//   const Building_Detail = (({ language_for_building_plan, document_of_building_plan, notarised_document_of_building_plan, }) => ({ language_for_building_plan, document_of_building_plan, notarised_document_of_building_plan, }))(data);
//   const bld_bcc = (({ language_for_building_completion_certificate, building_completion_certificate, notarised_document_of_bcc, name_of_bcc_issued_authority, date_of_bcc_issued, }) => ({ language_for_building_completion_certificate, building_completion_certificate, notarised_document_of_bcc, name_of_bcc_issued_authority, date_of_bcc_issued, }))(data);
//   const bld_photos = (({ front_view_photo_of_building, side_view_photo_of_building, entrance_gate_photo_of_plot_with_signage_board, }) => ({ front_view_photo_of_building, side_view_photo_of_building, entrance_gate_photo_of_plot_with_signage_board, }))(data);

//   // Prepare Photo in Row
//   const photo_list = [{ photoView: FRONT_VIEW_PHOTO_OF_BUILDING, photo_pth: bld_photos.front_view_photo_of_building, }, { photoView: SIDE_VIEW_PHOTO_OF_BUILDING, photo_pth: bld_photos.side_view_photo_of_building, }, { photoView: ENTRANCE_GATE_PHOTO_OF_PLOT_WITH_SIGNAGE_BOARD, photo_pth: bld_photos.entrance_gate_photo_of_plot_with_signage_board, },];


//   // Task 1: Save BCC
//   const saveBuildingPlan = () =>
//     new Promise(async (resolve, reject) => {
//       try {
//         const tx = db.transaction(BLD_BUILDING_PLAN, 'readwrite'); // start transaction
//         const store = tx.objectStore(BLD_BUILDING_PLAN);
//         const bld_plan = await store.index("appId").get(appId);
//         const data = bld_plan?.appId ? { ...bld_plan, ...Building_Detail, appId } : { ...Building_Detail, id: Date.now() + Math.random(), appId };
//         await store.put(data); // insert or update
//         await tx.done; // commit the transaction
//         resolve(bld_plan ? 'updated' : 'inserted');
//       } catch (error) {
//         reject(error); // auto-aborts transaction on error
//       }
//     });


//   // Check BCC  Detail if Already Exist
//   const saveBCCDetails = () => new Promise(async (resolve, reject) => {
//     try {
//       const tx = db.transaction(BLD_BCC, 'readwrite'); // create a transaction
//       const store = tx.objectStore(BLD_BCC);
//       const bcc = await store.index("appId").get(appId);
//       const data = bcc?.appId ? { ...bcc, ...bld_bcc, appId } : { ...bld_bcc, id: Date.now() + Math.random(), appId };
//       await store.put(data); // insert or update
//       await tx.done; // commit transaction
//       resolve(bcc ? 'updated' : 'inserted');
//     } catch (error) {
//       reject(error); // transaction auto-aborts on error
//     }
//   });


//   // Saving Building Photos
//   const saveBldPhotos = () => {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const tx = db.transaction(BLD_PHOTOS, 'readwrite');
//         const store = tx.objectStore(BLD_PHOTOS);
//         for (const photo of photo_list) {
//           const existing = await store.index('photoView_appId').get([photo.photoView, appId]);
//           const data = existing ? { ...existing, ...photo, appId } : { ...photo, id: Date.now() + Math.random(), appId };
//           await store.put(data); // Insert or update
//         }
//         await tx.done; // Commit the transaction
//         resolve('success');
//       } catch (err) {
//         reject('failed');
//       }
//     });
//   };

//   return await Promise.all([
//     saveBuildingPlan(),
//     saveBCCDetails(),
//     saveBldPhotos()
//   ]);
// };
