// db.js
import { openDB } from "idb";

import {
  DB_NAME,
  APPLIST,
  ENTITY_DETAILS,
  ENTITY_ADDRESS,
  OTHER_ITI,
  PROPOSED_INSTI_DETAILS,
  PROPOSED_INSTI_ADDRESSES,
  NEW_INSTI_TRADE_LIST,
  LAND_INST_DETAILS,
  LAND_OWNED_LANDS_DETAILS,
  LAND_LEASED_LANDS_DETAILS,
  APP_FLOW,
  STAGE_II_APP_FORM_FLOW,
  APP_FORM_FLOW_STAGE_II,
  APP_FORM_SUB_CIVIL_INFRA,
  BUILDING_DETAIL,
  FRONT_VIEW_PHOTO_OF_BUILDING,
  SIDE_VIEW_PHOTO_OF_BUILDING,
  ENTRANCE_GATE_PHOTO_OF_PLOT_WITH_SIGNAGE_BOARD,
  BLD_BUILDING_PLAN,
  BLD_BCC,
  BLD_PHOTOS,
  FILLED
} from "../constants";
import * as imp from "../constants";

import { initDB } from "./db";

import { AppliInfoInitialValues } from "../reducers/newAppReducer";
import { AppFlow } from "../constants";

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

export const setEntityDetails = async (data, authUser, appId) => {
  const db = await initDB();
  // Create New App and Save Current Status
  const obj = {
    ...AppliInfoInitialValues,
    appId: appId,
    id: appId,
    userId: authUser.id,
  };
  delete obj.app_flow_status; // or use destructuring for a new object
  console.log(obj);

  await db.put(APPLIST, obj);

  const entityBasicDetail = (({
    aff_category,
    aff_sub_category,
    category,
    name_of_applicant_entity,
    ApplicantEntityEmailId,
    isApplicantEntityEmailIdVerified,
    ApplicantContactNumber,
    Is_the_applicant_running_any_other_iti,
  }) => ({
    aff_category,
    aff_sub_category,
    category,
    name_of_applicant_entity,
    ApplicantEntityEmailId,
    isApplicantEntityEmailIdVerified,
    ApplicantContactNumber,
    Is_the_applicant_running_any_other_iti,
  }))(data);

  const entityAddress = (({
    state_of_other_iti,
    ApplicantEntityState,
    ApplicantEntityDistrict,
    ApplicantEntityTown_City,
    ApplicantEntityBlock_Tehsil,
    ApplicantEntitySector_Village,
    ApplicantEntityPincode,
    ApplicantEntityPlotNumber_KhasaraNumber_GataNumber,
    ApplicantEntityLandmark,
  }) => ({
    state_of_other_iti,
    ApplicantEntityState,
    ApplicantEntityDistrict,
    ApplicantEntityTown_City,
    ApplicantEntityBlock_Tehsil,
    ApplicantEntitySector_Village,
    ApplicantEntityPincode,
    ApplicantEntityPlotNumber_KhasaraNumber_GataNumber,
    ApplicantEntityLandmark,
  }))(data);

  const other_itis = (({
    run_ITIName,
    run_MISCode,
    run_State,
    run_District,
    run_TownCity,
    run_BlockTehsil,
    run_Pincode,
    run_PlotNumber_KhasaraNumber,
    run_Landmark,
  }) => ({
    run_ITIName,
    run_MISCode,
    run_State,
    run_District,
    run_TownCity,
    run_BlockTehsil,
    run_Pincode,
    run_PlotNumber_KhasaraNumber,
    run_Landmark,
  }))(data);

  const entityId = await db.put(ENTITY_DETAILS, {
    ...entityBasicDetail,
    id: Date.now() + Math.random(),
    appId: appId,
  });

  const entityAddressId = await db.put(ENTITY_ADDRESS, {
    ...entityAddress,
    id: Date.now() + Math.random(),
    appId: appId,
  });

  if (entityBasicDetail.Is_the_applicant_running_any_other_iti == "yes") {
    const insertedId = await db.put(OTHER_ITI, {
      ...other_itis,
      id: Date.now() + Math.random(),
      appId: appId,
    });
  }

  setAppFlow(authUser, appId);
};

export const setProposedInstDetails = async (data, appId) => {
  const db = await initDB();
  const proposedInstDetails = (({
    name_of_applicant_institute,
    type_of_institute,
    institute_location,
    is_falls_under_hill_area_hill,
    Falls_Under_Hill_Area_Hill__Supporting_Doc,
    is_falls_under_border_district,
    Falls_Under_Border_District__Supporting_Doc,
    under_msti_category,
    Whether_the_institute_is_exclusive_for_women_trainees,
    latitude,
    Longitude,
  }) => ({
    name_of_applicant_institute,
    type_of_institute,
    institute_location,
    is_falls_under_hill_area_hill,
    Falls_Under_Hill_Area_Hill__Supporting_Doc,
    is_falls_under_border_district,
    Falls_Under_Border_District__Supporting_Doc,
    under_msti_category,
    Whether_the_institute_is_exclusive_for_women_trainees,
    latitude,
    Longitude,
  }))(data);

  const proposedInstAddress = (({
    cmp_post_state,
    cmp_post_address,
    cmp_post_district,
    cmp_post_city,
    cmp_post_block_or_tehsil,
    cmp_post_sector_village,
    cmp_post_pincode,
    cmp_post_plot_number_khasara_number,
    cmp_post_landmark,
  }) => ({
    cmp_post_state,
    cmp_post_address,
    cmp_post_district,
    cmp_post_city,
    cmp_post_block_or_tehsil,
    cmp_post_sector_village,
    cmp_post_pincode,
    cmp_post_plot_number_khasara_number,
    cmp_post_landmark,
  }))(data);

  const id_proposedInstDetails = await db.put(PROPOSED_INSTI_DETAILS, {
    ...proposedInstDetails,
    id: Date.now() + Math.random(),
    appId: appId,
  });

  const id_proposedInstAddress = await db.put(PROPOSED_INSTI_ADDRESSES, {
    ...proposedInstAddress,
    id: Date.now() + Math.random(),
    appId: appId,
  });

  return {
    id_proposedInstDetails,
    id_proposedInstAddress,
  };
};

export const setInstTradeDetails = async (data, appId) => {
  const db = await initDB();
  const { tradeList, unit_in_shift1, unit_in_shift2, unit_in_shift3 } = data;

  console.log(tradeList);

  for (let index = 0; index <= tradeList.length; index++) {
    const trade = tradeList[index];
    const us1 = unit_in_shift1[index];
    const us2 = unit_in_shift2[index];
    const us3 = unit_in_shift3[index];

    const id = await db.put(NEW_INSTI_TRADE_LIST, {
      trade,
      us1,
      us2,
      us3,
      id: Date.now() + Math.random(),
      appId,
    });

    console.log(trade);
    console.log("Inserted trade record with ID:", id);
  }
};

export const setInstLandDetails = async (data, appId) => {
  const db = await initDB();

  //  possession_of_land: "",
  // land_area_in_square_metres: "",

  // land_owner_name: "",
  // land_registration_number: "",

  // name_of_lessor: "",
  // name_of_lessee: "",
  // lease_deed_number: "",
  // date_of_commencement: "",
  // date_of_expiry: "",

  const land_landType = (({
    possession_of_land,
    land_area_in_square_metres,
  }) => ({
    possession_of_land,
    land_area_in_square_metres,
  }))(data);

  const land_owned = (({ land_owner_name, land_registration_number }) => ({
    land_owner_name,
    land_registration_number,
  }))(data);

  const land_leased = (({
    name_of_lessor,
    name_of_lessee,
    lease_deed_number,
    date_of_commencement,
    date_of_expiry,
  }) => ({
    name_of_lessor,
    name_of_lessee,
    lease_deed_number,
    date_of_commencement,
    date_of_expiry,
  }))(data);

  const id_1 = await db.put(LAND_INST_DETAILS, {
    ...land_landType,
    id: Date.now() + Math.random(),
    appId: appId,
  });

  const id_2 = await db.put(LAND_OWNED_LANDS_DETAILS, {
    ...land_owned,
    id: Date.now() + Math.random(),
    appId: appId,
  });

  const id_3 = await db.put(LAND_LEASED_LANDS_DETAILS, {
    ...land_leased,
    id: Date.now() + Math.random(),
    appId: appId,
  });

  return {
    id_1,
    id_2,
    id_3,
  };
};

export const setAppFlow = async (authUser, appId) => {
  const db = await initDB();
  AppFlow.forEach(async (flow) => {
    const flowData = {
      ...flow,
      id: Date.now() + Math.random(),
      appId: appId,
      userId: authUser.id, // Assuming userId is part of the data
    };
    await db.put(APP_FLOW, flowData);
  });

  set_stage_ii_form_flow(authUser, appId);
};

// Stage II
export const set_stage_ii_form_flow = async (authUser, appId) => {
  const db = await initDB();
  STAGE_II_APP_FORM_FLOW.forEach(async (flow) => {
    const flowData = { ...flow, id: Date.now() + Math.random(), appId: appId, userId: authUser.id, };
    await db.put(APP_FORM_FLOW_STAGE_II, flowData);
    if ("subSteps" in flow) {
      switch (flow.step) {
        case imp.CIVIL_INFRASTRUCTURE_DETAIL:
          flow.subSteps.forEach(async (flow) => {
            const flowData = { ...flow, id: Date.now() + Math.random(), appId: appId, userId: authUser.id, };
            await db.put(APP_FORM_SUB_CIVIL_INFRA, flowData);
          });
          break;

        default:
          break;
      }
    }
  });
};

export const setBuildingDetail = async (data, authUser, appId) => {
  const db = await initDB();
  const Building_Detail = (({ language_for_building_plan, document_of_building_plan, notarised_document_of_building_plan, }) => ({ language_for_building_plan, document_of_building_plan, notarised_document_of_building_plan, }))(data);
  const bld_bcc = (({ language_for_building_completion_certificate, building_completion_certificate, notarised_document_of_bcc, name_of_bcc_issued_authority, date_of_bcc_issued, }) => ({ language_for_building_completion_certificate, building_completion_certificate, notarised_document_of_bcc, name_of_bcc_issued_authority, date_of_bcc_issued, }))(data);
  const bld_photos = (({ front_view_photo_of_building, side_view_photo_of_building, entrance_gate_photo_of_plot_with_signage_board, }) => ({ front_view_photo_of_building, side_view_photo_of_building, entrance_gate_photo_of_plot_with_signage_board, }))(data);

  // Prepare Photo in Row
  const photo_list = [{ photoView: FRONT_VIEW_PHOTO_OF_BUILDING, photo_pth: bld_photos.front_view_photo_of_building, }, { photoView: SIDE_VIEW_PHOTO_OF_BUILDING, photo_pth: bld_photos.side_view_photo_of_building, }, { photoView: ENTRANCE_GATE_PHOTO_OF_PLOT_WITH_SIGNAGE_BOARD, photo_pth: bld_photos.entrance_gate_photo_of_plot_with_signage_board, },];

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
