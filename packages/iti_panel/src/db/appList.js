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
} from "../constants";

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
};
