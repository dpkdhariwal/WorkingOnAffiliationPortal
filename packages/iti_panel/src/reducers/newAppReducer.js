import {
  SAVE_APP_CATEGORY,
  UPDATE_APP_CATEGORY,
  SAVE_APPLICANT_ENTITY_DETAILS,
  UPDATE_APPLICANT_ENTITY_DETAILS,
  UPDATE_ENTITY_DETAILS,
  UPDATE_PURPOSED_INSTI_INFO,
  ADD_MORE_TRADE,
  UPDATE_LAND_INFO,
  UPDATE_TRADE_UNIT,
  UPDATE_SET_FEE_STATUS,
  UPDATE_STAGE_II_FEE_PAID,
  STAGE_I__NOT_FILLED,
  STAGE_I__FILLED,
  STAGE_I__FEE_PAID,
  STAGE_I__FEE_EXEMPTED,
  STAGE_I__FEE_PENDING,
  STAGE_I__DOCUMENT_PENDING,
  SET_STAGE_I__DOCUMENT_STATUS,
  STAGE_I__DOCUMENT_UPLOADED,
  STAGE_I__ASSESSMENT_PENDING,
  STAGE_I__SUBMIT_PENDING,
  STAGE_I__SUBMITED,
  AppFlow,
  STAGE_I_FORM_FILLING,
  STAGE_I_DOCUMENT_UPLAOD,
  STAGE_I_SUBMIT,
  STAGE_I_FEE,
  UPDATE_BUILDING_DETAILS,
  UPDATE_ELECTRICTY_CONNECTION_DETAILS,
  STAGE_II__FEE_PENDING,
  STAGE_II__SUBMIT_PENDING,
} from "affserver";

import {
  STAGE_II__FEE_EXEMPTED,
  STAGE_II__DOCUMENT_PENDING,
  STAGE_II_FEE,
  STAGE_II_FORM_FILLING,
  STAGE_II__FILLED,
  STAGE_II__FEE_PAID,
  UPDATE_STAGE_II_SET_FEE_STATUS,
} from "affserver";

import * as yup from "yup";

// Application Info
export const AppliInfoInitialValues = {
  appId: null,
  stage_I_fee_status: STAGE_I__FEE_PENDING,
  stage_I_completion_status: STAGE_I__SUBMIT_PENDING,
  stage_II_fee_status: STAGE_II__FEE_PENDING,
  stage_II_completion_status: STAGE_II__SUBMIT_PENDING,
  app_status: STAGE_I__NOT_FILLED,
  app_status_awaiting: STAGE_I__FILLED,
  app_flow_status: AppFlow,
};
export const AppliInfo = (state = AppliInfoInitialValues, action) => {
  let { type, payload } = action;
  switch (type) {
    case UPDATE_SET_FEE_STATUS:
      switch (payload.type_of_institute) {
        case "Government":
          return (state = {
            ...state,
            ...{
              app_status: STAGE_I__FEE_EXEMPTED,
              stage_I_fee_status: STAGE_I__FEE_EXEMPTED,
              app_status_awaiting: STAGE_I__DOCUMENT_PENDING,
              app_flow_status: state.app_flow_status.map((item) =>
                item.step === STAGE_I_FEE
                  ? { ...item, status: STAGE_I__FEE_EXEMPTED }
                  : item.step === STAGE_I_FORM_FILLING
                  ? { ...item, status: STAGE_I__FILLED }
                  : item
              ),
            },
          });
        case "Private":
          return (state = {
            ...state,
            ...{
              app_status: STAGE_I__FEE_PAID,
              stage_I_fee_status: STAGE_I__FEE_PAID,
              app_status_awaiting: STAGE_I__DOCUMENT_PENDING,
              app_flow_status: state.app_flow_status.map((item) =>
                item.step === STAGE_I_FEE
                  ? { ...item, status: STAGE_I__FEE_PAID }
                  : item.step === STAGE_I_FORM_FILLING
                  ? { ...item, status: STAGE_I__FILLED }
                  : item
              ),
            },
          });
        default:
          return state;
      }

    case SET_STAGE_I__DOCUMENT_STATUS:
      return (state = {
        ...state,
        ...{
          app_status: STAGE_I__DOCUMENT_UPLOADED,
          app_status_awaiting: STAGE_I__ASSESSMENT_PENDING,
          stage_I_completion_status: STAGE_I__SUBMITED,
          app_flow_status: state.app_flow_status.map((item) =>
            item.step === STAGE_I_DOCUMENT_UPLAOD
              ? { ...item, status: STAGE_I__DOCUMENT_UPLOADED }
              : item.step === STAGE_I_SUBMIT
              ? { ...item, status: STAGE_I__SUBMITED }
              : item
          ),
        },
      });

    case UPDATE_STAGE_II_SET_FEE_STATUS:
      switch (payload.type_of_institute) {
        case "Government":
          return (state = {
            ...state,
            ...{
              app_status: STAGE_II__FEE_EXEMPTED,
              stage_II_fee_status: STAGE_II__FEE_EXEMPTED,
              app_status_awaiting: STAGE_II__DOCUMENT_PENDING,
              app_flow_status: state.app_flow_status.map((item) =>
                item.step === STAGE_II_FEE
                  ? { ...item, status: STAGE_II__FEE_EXEMPTED }
                  : item.step === STAGE_II_FORM_FILLING
                  ? { ...item, status: STAGE_II__FILLED }
                  : item
              ),
            },
          });
        case "Private":
          return (state = {
            ...state,
            ...{
              app_status: STAGE_II__FEE_PAID,
              stage_I_fee_status: STAGE_II__FEE_PAID,
              app_status_awaiting: STAGE_II__DOCUMENT_PENDING,
              app_flow_status: state.app_flow_status.map((item) =>
                item.step === STAGE_II_FEE
                  ? { ...item, status: STAGE_II__FEE_PAID }
                  : item.step === STAGE_II_FORM_FILLING
                  ? { ...item, status: STAGE_II__FILLED }
                  : item
              ),
            },
          });
        default:
          return state;
      }
    default:
      return state;
  }
};

// App Category Reducer
let initialAppCat = { selected: false, cat: {} };
export const appCat = (state = initialAppCat, action) => {
  let { type, payload } = action;
  switch (type) {
    case SAVE_APP_CATEGORY:
      return { ...state, ...{ selected: true, cat: payload } };
    case UPDATE_APP_CATEGORY:
      return { ...state, ...{ selected: true, cat: payload } };
    default:
      return state;
  }
};

//Applicant Entity Details
let ApplicantEntityDetails = {
  CategoryOfApplicantEntity: null,
  NameOfApplicantEntity: null,

  // Address of Applicant Entity
  ApplicantEntityState: null,
  ApplicantEntityDistrict: null,
  ApplicantEntityTown_City: null,
  ApplicantEntityBlock_Tehsil: null,
  ApplicantEntitySector_Village: null,
  ApplicantEntityPincode: null,
  ApplicantEntityPlotNumber_KhasaraNumber_GataNumber: null,
  ApplicantEntityLandmark: null,
  ApplicantEntityEmailId: null,
  isApplicantEntityEmailIdVerified: false,

  ApplicantContactNumber: null,

  // Conditional Fields
  IsTheApplicantRunningAnyOtherITI: false,
  run_ITIName: [],
  run_MISCode: [],
  run_State: [],
  run_District: [],
  run_TownCity: [],
  run_BlockTehsil: [],
  run_Pincode: [],
  run_PlotNumber_KhasaraNumber: [],
  run_Landmark: [],
};
export const initialValues = {
  aff_category: "",
  aff_sub_category: "",

  category: "",
  name_of_applicant_entity: "",

  state_of_other_iti: "",
  // CategoryOfApplicantEntity: "",
  // NameOfApplicantEntity: "",
  ApplicantEntityState: "",
  ApplicantEntityDistrict: "",
  ApplicantEntityTown_City: "",
  ApplicantEntityBlock_Tehsil: "",
  ApplicantEntitySector_Village: "",
  ApplicantEntityPincode: "",
  ApplicantEntityPlotNumber_KhasaraNumber_GataNumber: "",
  ApplicantEntityLandmark: "",
  ApplicantEntityEmailId: "",
  isApplicantEntityEmailIdVerified: false,

  ApplicantContactNumber: "",
  isApplicantEntityMobileNumberVerified: false,
  

  Is_the_applicant_running_any_other_iti: "",

  run_ITIName: "",
  run_MISCode: "",
  run_State: "",
  run_District: "",
  run_TownCity: "",
  run_BlockTehsil: "",
  run_Pincode: "",
  run_PlotNumber_KhasaraNumber: "",
  run_Landmark: "",
};
export const EntityDetails = (state = initialValues, action) => {
  let { type, payload } = action;
  console.log("EntityDetails Reducer", action);

  switch (type) {
    case UPDATE_ENTITY_DETAILS:
      state = { ...state, ...payload };
      return state;
    default:
      return state;
  }
};
export const yupObject = {
  aff_category: yup.string().required("Select Affiliation Category"),
  aff_sub_category: yup.string().when("aff_category", {
    is: "04", // 🔄 change to "no" since category and comments are required when it's "no"
    then: () => yup.string().required("Please select a Sub category"),
    otherwise: () => yup.string().notRequired(),
  }),

  category: yup.string().required("Please select a category"),
  name_of_applicant_entity: yup
    .string()
    .required("Please enter name of applicant entity")
    .matches(/^[a-zA-Z ]+$/, "Only alphabets are allowed"),
  ApplicantEntityState: yup.string().required("Please select state"),
  ApplicantEntityDistrict: yup.string().required("Please select district"),
  ApplicantEntityTown_City: yup.string().required("Please enter town/city"),
  ApplicantEntityBlock_Tehsil: yup
    .string()
    .required("Please enter Block/Tehsil"),
  ApplicantEntitySector_Village: yup
    .string()
    .required("Please enter Sector/Village"),
  ApplicantEntityPincode: yup
  .string()
  .required("Please enter 6 Digit Pincode number")
  .matches(/^\d{6}$/, "Please enter a valid 6-digit pincode"),

  ApplicantEntityPlotNumber_KhasaraNumber_GataNumber: yup
    .string()
    .required("Please enter Plot Number/Khasara Number/Gata Number"),
  ApplicantEntityLandmark: yup.string().required("Please enter Landmark"),

  ApplicantEntityEmailId: yup
    .string()
    .required("Please enter email")
    .email("Please enter a valid email")
    .test(
      "is-otp-verified",
      "Please verify your email with OTP",
      function (value) {
        const { isApplicantEntityEmailIdVerified } = this.parent; // ✅ Access from Formik values
        console.log(
          "isApplicantEntityEmailIdVerified =",
          isApplicantEntityEmailIdVerified,
          value
        );
        return isApplicantEntityEmailIdVerified === true;
      }
    ),

  ApplicantContactNumber: yup
  .string()
  .required("Please enter contact number")
  .matches(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),

  // Is_the_applicant_running_any_other_iti: yup
  //   .string()
  //   .required("Please enter contact number"),

  Is_the_applicant_running_any_other_iti: yup.string().when("category", {
    is: (val) =>
      [
        "Society / Trust",
        "Private Limited Company",
        "Public Limited Company",
        "Public Sector Undertaking",
      ].includes(val),
    then: () =>
      yup
        .string()
        .required("Please Select if applicant is running any other ITI"),
    otherwise: () => yup.string().notRequired(),
  }),

  run_ITIName: yup.string().when("Is_the_applicant_running_any_other_iti", {
    is: "yes",
    then: () => yup.string().required("Please enter ITI Name"),
    otherwise: () => yup.string().notRequired(),
  }),

  run_MISCode: yup.string().when("Is_the_applicant_running_any_other_iti", {
    is: "yes",
    then: () => yup.string().required("Please enter MIS Code"),
    otherwise: () => yup.string().notRequired(),
  }),

  run_State: yup.string().when("Is_the_applicant_running_any_other_iti", {
    is: "yes",
    then: () => yup.string().required("Please enter State"),
    otherwise: () => yup.string().notRequired(),
  }),

  run_District: yup.string().when("Is_the_applicant_running_any_other_iti", {
    is: "yes",
    then: () => yup.string().required("Please enter District"),
    otherwise: () => yup.string().notRequired(),
  }),

  run_TownCity: yup.string().when("Is_the_applicant_running_any_other_iti", {
    is: "yes",
    then: () => yup.string().required("Please enter Town/City"),
    otherwise: () => yup.string().notRequired(),
  }),

  run_BlockTehsil: yup.string().when("Is_the_applicant_running_any_other_iti", {
    is: "yes",
    then: () => yup.string().required("Please enter Block/Tehsil"),
    otherwise: () => yup.string().notRequired(),
  }),

  run_Pincode: yup.string().when("Is_the_applicant_running_any_other_iti", {
    is: "yes",
    then: () => yup.string().required("Please enter Pincode"),
    otherwise: () => yup.string().notRequired(),
  }),

  run_PlotNumber_KhasaraNumber: yup
    .string()
    .when("Is_the_applicant_running_any_other_iti", {
      is: "yes",
      then: () =>
        yup.string().required("Please enter Plot Number/Khasara Number"),
      otherwise: () => yup.string().notRequired(),
    }),

  run_Landmark: yup.string().when("Is_the_applicant_running_any_other_iti", {
    is: "yes",
    then: () => yup.string().required("Please enter Landmark"),
    otherwise: () => yup.string().notRequired(),
  }),
};
export const ApplicantEntityDetailsReducer = (
  state = ApplicantEntityDetails,
  action
) => {
  let { type, payload } = action;

  switch (type) {
    case SAVE_APPLICANT_ENTITY_DETAILS:
      return { ...state, ...payload };
    case UPDATE_APPLICANT_ENTITY_DETAILS:
      return { ...state, ...payload };
    default:
      return state;
  }
};

let initialState = {
  reg_category: false,
  steps: [
    {
      step: 1,
      label: "Applicant Entity Details",
      active: true,
      filled: false,
      inputs: {},
    },
    {
      step: 2,
      label: "Details of the Proposed Institute",
      active: false,
      filled: false,
      inputs: {},
    },
    {
      step: 3,
      label: "Details of Trade(s)/Unit(s) for Affiliation",
      active: false,
      filled: false,
      inputs: {},
    },
    {
      step: 4,
      label: "Details of the Land to be used for the ITI",
      active: false,
      filled: false,
      inputs: {},
    },
    // {
    //   step: 5,
    //   label: "Preview of Application",
    //   active: false,
    //   filled: false,
    //   inputs: {},
    // },
    {
      step: 5,
      label: "Fee Payment",
      active: false,
      filled: false,
      inputs: {},
    },
    {
      step: 6,
      label: "Documents Upload",
      active: false,
      filled: false,
      inputs: {},
    },
  ],
  stepsII: [
    {
      step: 1,
      label: "Building Detail",
      active: true,
      filled: false,
      inputs: {},
    },
    {
      step: 2,
      label: "Civil Infrastructure Detail",
      active: false,
      filled: false,
      inputs: {},
      fields: [
        // { entity: "Workshop", area: "..." },
        // { entity: "Classroom", area: "..." },
        { entity: "Multipurpose Hall", area: "..." },
        { entity: "IT Lab", area: "..." },
        { entity: "Library", area: "..." },
        { entity: "Placement and Counselling room", area: "..." },
        {
          entity:
            "Administrative Area (Office rooms, Principal's office, etc.)",
          area: "...",
        },
      ],
    },
    {
      step: 3,
      label: "Amenities Area",
      active: false,
      filled: false,
      inputs: {},
      fields: [],
    },
    {
      step: 4,
      label: "Signage Boards",
      active: false,
      filled: false,
      inputs: {},
      fields: [],
    },
    {
      step: 5,
      label: "Electricity Connection Details",
      active: false,
      filled: false,
      inputs: {},
      fields: [
        // { entity: "Workshop", area: "..." },
        // { entity: "Classroom", area: "..." },
        { entity: "Multipurpose Hall", area: "..." },
        { entity: "IT Lab", area: "..." },
        { entity: "Library", area: "..." },
        { entity: "Placement and Counselling room", area: "..." },
        {
          entity:
            "Administrative Area (Office rooms, Principal's office, etc.)",
          area: "...",
        },
      ],
    },
    {
      step: 6,
      label: "Fee Payment For StageII",
      active: false,
      filled: false,
      inputs: {},
    },
    {
      step: 7,
      label: "Tradewise Machinery/Tools/Equipment Details",
      active: false,
      filled: false,
      inputs: {},
    },

    {
      step: 8,
      label: "Document Uploads",
      active: false,
      filled: false,
      inputs: {},
    },
  ],
};

export const reg = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case "reg_set_active_step":
      state = {
        ...state,
        steps: state.steps.map((step, index) => ({
          ...step,
          active: index === payload.step, // Only one active at a time
        })),
      };
      return state;
    case "set_reg_cat":
      return {
        ...state,
        regCategory: true,
      };
    case "set_filled_step":
      state = {
        ...state,
        steps: state.steps.map((step, index) => {
          if (step.step == payload.step) {
            return { ...step, filled: true };
          }
          return step;
        }),
      };
      return state;
    case "set_filled_step_II":
      console.log(payload.step, state);
      state = {
        ...state,
        stepsII: state.stepsII.map((step, index) => {
          if (step.step === payload.step) {
            return { ...step, filled: true };
          }
          return step;
        }),
      };
      return state;
    case "reg_set_active_stepII":
      console.log(payload.step, state);
      state = {
        ...state,
        stepsII: state.stepsII.map((step, index) => {
          if (step.step === payload.step) {
            return { ...step, active: true };
          }
          return step;
        }),
      };
      return state;
    default:
      return state;
  }
};

// Detail Proposed Institute
export const dpi_initialValues = {
  name_of_applicant_institute: "",
  type_of_institute: "",

  cmp_post_state: "",
  cmp_post_address: "",
  cmp_post_district: "",
  cmp_post_city: "",
  cmp_post_block_or_tehsil: "",
  cmp_post_sector_village: "",
  cmp_post_pincode: "",
  cmp_post_plot_number_khasara_number: "",
  cmp_post_landmark: "",

  institute_location: "",
  is_falls_under_hill_area_hill: "",
  Falls_Under_Hill_Area_Hill__Supporting_Doc: "",

  is_falls_under_border_district: "",
  Falls_Under_Border_District__Supporting_Doc: "",

  under_msti_category: "",
  Whether_the_institute_is_exclusive_for_women_trainees: "",

  latitude: "",
  Longitude: "",
};
export const ProposedInstituteInfo = (state = dpi_initialValues, action) => {
  let { type, payload } = action;
  console.log("EntityDetails Reducer", action);

  switch (type) {
    case UPDATE_PURPOSED_INSTI_INFO:
      state = { ...state, ...payload };
      return state;
    default:
      return state;
  }
};

export const intiValues_pi_yupObject = {
  name_of_applicant_institute: "",
  type_of_institute: "",
  cmp_post_state: "",
  cmp_post_district: "",
  cmp_post_city: "",
  cmp_post_block_or_tehsil: "",
  cmp_post_sector_village: "",
  cmp_post_pincode: "",
  cmp_post_plot_number_khasara_number: "",
  cmp_post_landmark: "",
  institute_location: "",
  is_falls_under_hill_area_hill: "",
  Falls_Under_Hill_Area_Hill__Supporting_Doc: 'null',
  is_falls_under_border_district:"",
  Falls_Under_Border_District__Supporting_Doc: 'null',
  under_msti_category: "",
  Whether_the_institute_is_exclusive_for_women_trainees: "",
  latitude: "",
  Longitude: "",
};
export const dpi_yupObject = {
  name_of_applicant_institute: yup
    .string()
    .required("Name of the Applicant Institute is required"),
  type_of_institute: yup.string().required("Type of Institute is required"),
  cmp_post_state: yup.string().required("State is required"),
  cmp_post_district: yup.string().required("District is required"),
  cmp_post_city: yup.string().required("Town/City is required"),
  cmp_post_block_or_tehsil: yup.string().required("Block/Tehsil is required"),
  cmp_post_sector_village: yup.string().required("Sector/Village is required"),
  cmp_post_pincode: yup.string().required("Pincode is required"),
  cmp_post_plot_number_khasara_number: yup
    .string()
    .required("Plot Number/Khasara Number/Gata Number is required"),
  cmp_post_landmark: yup.string().required("Landmark is required"),

  institute_location: yup.string().required("Institute Location is required"),
  is_falls_under_hill_area_hill: yup
    .string()
    .required("Please select if the institute falls under hill area"),
  Falls_Under_Hill_Area_Hill__Supporting_Doc: yup
    .string()
    .when("is_falls_under_hill_area_hill", {
      is: "yes",
      then: () => yup.string().required("Please Select Supporting Document"),
      otherwise: () => yup.string().notRequired(),
    }),

  is_falls_under_border_district: yup
    .string()
    .required("Please select if the institute falls under border district"),

  Falls_Under_Border_District__Supporting_Doc: yup
    .string()
    .when("is_falls_under_border_district", {
      is: "yes",
      then: () => yup.string().required("Please Select Supporting Document"),
      otherwise: () => yup.string().notRequired(),
    }),

  under_msti_category: yup
    .string()
    .required(
      "Please select Whether Applying Under Mini Skill Training Institute (MSTI) Category?"
    ),

  Whether_the_institute_is_exclusive_for_women_trainees: yup
    .string()
    .required(
      "Please select Whether Applying Under Mini Skill Training Institute (MSTI) Category?"
    ),

  latitude: yup.string().required("Please Enter Insittute Latitute"),
  Longitude: yup.string().required("Please Enter Insittute Longitute"),
};

// Details of Trade(s)/Unit(s) for Affiliation
export const trade_unit_initialValues = {
  tradeList: ["", "", "", ""],
  unit_in_shift1: ["", "", "", ""],
  unit_in_shift2: ["", "", "", ""],
  unit_in_shift3: ["", "", "", ""],
};
export const trade_unit_reducer = (
  state = trade_unit_initialValues,
  action
) => {
  let { type, payload } = action;
  switch (type) {
    case UPDATE_PURPOSED_INSTI_INFO:
      state = { ...state, ...payload };
      return state;
    case ADD_MORE_TRADE:
      return {
        ...state,
        tradeList: [...state.tradeList, ""],
        unit_in_shift1: [...state.unit_in_shift1, ""],
        unit_in_shift2: [...state.unit_in_shift2, ""],
        unit_in_shift3: [...state.unit_in_shift3, ""],
      };
    case UPDATE_TRADE_UNIT:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export const trade_unit_reducer_yupObject = yup.object().shape({
  tradeList: yup
    .array()
    .of(yup.string().required("Trade is required"))
    .min(1, "At least one trade is required"),

  unit_in_shift1: yup
    .array()
    .of(
      yup
        .number()
        .typeError("Shift 1 must be a number")
        .required("Shift 1 is required")
        .min(0, "Minimum 0 units")
    ),

  unit_in_shift2: yup
    .array()
    .of(
      yup
        .number()
        .typeError("Shift 2 must be a number")
        .required("Shift 2 is required")
        .min(0, "Minimum 0 units")
    ),

  // unit_in_shift3: yup
  //   .array()
  //   .of(
  //     yup
  //       .number()
  //       .typeError("Shift 3 must be a number")
  //       .required("Shift 3 is required")
  //       .min(0, "Minimum 0 units")
  //   ),
});

// Details of the Land to be used for the ITI
export const land_info_initialValues = {
  possession_of_land: "",
  land_area_in_square_metres: "",
  land_owner_name: "",
  land_registration_number: "",
  name_of_lessor: "",
  name_of_lessee: "",
  lease_deed_number: "",
  date_of_commencement: "",
  date_of_expiry: "",
};
export const land_info_reducer = (state = land_info_initialValues, action) => {
  let { type, payload } = action;
  switch (type) {
    case UPDATE_LAND_INFO:
      state = { ...state, ...payload };
      return state;
    default:
      return state;
  }
};

export const land_info_yupObject = {
  possession_of_land: yup.string().required("Possession of Land is required"),
  land_area_in_square_metres: yup.string().required("Land Area is required"),

  land_owner_name: yup.string().when("possession_of_land", {
    is: "owned",
    then: () => yup.string().required("land owner name is required"),
    otherwise: () => yup.string().notRequired(),
  }),
  land_registration_number: yup.string().when("possession_of_land", {
    is: "owned",
    then: () => yup.string().required("land registration number is required"),
    otherwise: () => yup.string().notRequired(),
  }),

  name_of_lessor: yup.string().when("possession_of_land", {
    is: "leased",
    then: () => yup.string().required("Name of Lessor is required"),
    otherwise: () => yup.string().notRequired(),
  }),

  name_of_lessee: yup.string().when("possession_of_land", {
    is: "leased",
    then: () => yup.string().required("Name of Lessee is required"),
    otherwise: () => yup.string().notRequired(),
  }),

  lease_deed_number: yup.string().when("possession_of_land", {
    is: "leased",
    then: () => yup.string().required("Lease Deed Number is required"),
    otherwise: () => yup.string().notRequired(),
  }),

  date_of_commencement: yup.string().when("possession_of_land", {
    is: "leased",
    then: () => yup.string().required("Date of commencement is required"),
    otherwise: () => yup.string().notRequired(),
  }),

  date_of_expiry: yup.string().when("possession_of_land", {
    is: "leased",
    then: () => yup.string().required("Date of expiry is required"),
    otherwise: () => yup.string().notRequired(),
  }),
};

// Stage II Form -- Building Info
export const Building_Detail_initialValues = {
  language_for_building_plan: "",
  document_of_building_plan: "",
  notarised_document_of_building_plan: "",
  
  language_for_building_completion_certificate: "",
  building_completion_certificate: "",
  notarised_document_of_bcc: "",
  name_of_bcc_issued_authority: "",
  date_of_bcc_issued: "",
  
  front_view_photo_of_building: "",
  side_view_photo_of_building: "",
  entrance_gate_photo_of_plot_with_signage_board: "",
};
export const building_detail_yup_object = {
  language_for_building_plan: yup
    .string()
    .required("Please select the language of the building plan."),
  document_of_building_plan: yup
    .mixed()
    .required("Please upload the building plan document (PDF)."),
  // .test("fileType", "Only PDF files are allowed.", (file, e) => {
  //   console.log(file, e);
  //   return file && file.type === "application/pdf";
  // }),
  notarised_document_of_building_plan: yup
    .mixed()
    .required("Please upload the notarised building plan (PDF)."),
  // .test("fileType", "Only PDF files are allowed.", (file) => {
  //   return file && file.type === "application/pdf";
  // }),
  language_for_building_completion_certificate: yup
    .string()
    .required("Please select the language of the completion certificate."),
  building_completion_certificate: yup
    .mixed()
    .required("Please upload the building completion certificate (PDF)."),
  // .test("fileType", "Only PDF files are allowed.", (file) => {
  //   return file && file.type === "application/pdf";
  // }),
  notarised_document_of_bcc: yup
    .mixed()
    .required("Please upload the notarised BCC (PDF)."),
  // .test("fileType", "Only PDF files are allowed.", (file) => {
  //   return file && file.type === "application/pdf";
  // }),
  name_of_bcc_issued_authority: yup
    .string()
    .required("Please enter the name of the authority issuing the BCC."),
  date_of_bcc_issued: yup
    .string()
    .required("Please enter the date the BCC was issued."),
  front_view_photo_of_building: yup
    .mixed()
    .required("Please upload the front view photo of the building (PDF)."),
  // .test("fileType", "Only PDF files are allowed.", (file) => {
  //   return file && file.type === "application/pdf";
  // }),
  side_view_photo_of_building: yup
    .mixed()
    .required("Please upload the side view photo of the building (PDF)."),
  // .test("fileType", "Only PDF files are allowed.", (file) => {
  //   return file && file.type === "application/pdf";
  // }),
  entrance_gate_photo_of_plot_with_signage_board: yup
    .mixed()
    .required(
      "Please upload the entrance gate photo with signage board (PDF)."
    ),
  // .test("fileType", "Only PDF files are allowed.", (file) => {
  //   return file && file.type === "application/pdf";
  // }),
};
export const building_detail_reducer = (
  state = Building_Detail_initialValues,
  action
) => {
  let { type, payload } = action;
  console.log("building_detail_reducer", action);
  switch (type) {
    case UPDATE_BUILDING_DETAILS:
      state = { ...state, ...payload };
      return state;
    default:
      return state;
  }
};

// Stage II Form -- Electricity Connection Detail
export const Electricity_Connection_Detail_initialValues = {
  consumer_name: "",
  consumer_number: "",
  electricity_authority_name: "",
  electricity_authority_website: "",
  total_sanction_load_in_kw: "",
  latest_electricity_bill_sealing_report: "",
  photo_of_backup_power: "",
  purchase_related_documents: "",
  fire_and_safety_certificate: "",
};
export const Electricity_Connection_yup_object = {
  consumer_name: yup.string().required("Enter Electricity Consumer Name"),
  consumer_number: yup.string().required("Enter Electricity Consumer Number"),
  electricity_authority_name: yup
    .string()
    .required("Enter Electricity Authority Name"),
  electricity_authority_website: yup
    .string()
    .required("Enter Electricity Authority Websiste"),
  total_sanction_load_in_kw: yup
    .string()
    .required("Enter Total Sanctioned Load in Kw"),

  latest_electricity_bill_sealing_report: yup
    .mixed()
    .required("Select Latest Electricity Bill Sealing Report"),
  // .test("fileType", "Only PDF files are allowed.", (file, e) => {
  //   console.log(file, e);
  //   return file && file.type === "application/pdf";
  // }),

  photo_of_backup_power: yup.mixed().required("Select Photo of Backup Power"),
  // .test("fileType", "Only PDF files are allowed.", (file, e) => {
  //   console.log(file, e);
  //   return file && file.type === "application/pdf";
  // }),
  purchase_related_documents: yup
    .mixed()
    .required("Select Purchase Releted Documents"),
  // .test("fileType", "Only PDF files are allowed.", (file, e) => {
  //   console.log(file, e);
  //   return file && file.type === "application/pdf";
  // }),
  fire_and_safety_certificate: yup
    .mixed()
    .required("Select Fire and Safety Certificate"),
  // .test("fileType", "Only PDF files are allowed.", (file, e) => {
  //   console.log(file, e);
  //   return file && file.type === "application/pdf";
  // }),
};
export const Electricity_Connection_Detail_reducer = (
  state = Electricity_Connection_Detail_initialValues,
  action
) => {
  let { type, payload } = action;
  switch (type) {
    case UPDATE_ELECTRICTY_CONNECTION_DETAILS:
      state = { ...state, ...payload };
      return state;
    default:
      return state;
  }
};
