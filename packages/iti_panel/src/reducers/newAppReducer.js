import {
  SAVE_APP_CATEGORY,
  UPDATE_APP_CATEGORY,
  SAVE_APPLICANT_ENTITY_DETAILS,
  UPDATE_APPLICANT_ENTITY_DETAILS,
} from "../constants";
import * as yup from "yup";

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
  // category: "",
  // Is_the_applicant_running_any_other_iti: "no",
  // name_of_applicant_entity: "",
  // state_of_other_iti: "",
  // CategoryOfApplicantEntity: "",
  // NameOfApplicantEntity: "",
  // ApplicantEntityState: "",
  // ApplicantEntityDistrict: "",
  // ApplicantEntityTown_City: "",
  // ApplicantEntityBlock_Tehsil: "",
  // ApplicantEntitySector_Village: "",
  // ApplicantEntityPincode: "",
  // ApplicantEntityPlotNumber_KhasaraNumber_GataNumber: "",
  // ApplicantEntityLandmark: "",
  // ApplicantEntityEmailId: "",
  // ApplicantContactNumber: "",
  // IsTheApplicantRunningAnyOtherITI: "",
  // run_ITIName: "",
  // run_MISCode: "",
  // run_State: "",
  // run_District: "",
  // run_TownCity: "",
  // run_BlockTehsil: "",
  // run_Pincode: "",
  // run_PlotNumber_KhasaraNumber: "",
  // run_Landmark: "",
};

export const yupObject = {
  category: yup.string().required("Please select a category"),
  // name_of_applicant_entity: yup
  //   .string()
  //   .required("Please enter name of applicant entity")
  //   .matches(/^[a-zA-Z ]+$/, "Only alphabets are allowed"),
  // state_of_other_iti: yup.string().required("Please select state"),
  // ApplicantEntityDistrict: yup.string().required("Please select district"),
  // ApplicantEntityTown_City: yup.string().required("Please enter town/city"),
  // ApplicantEntityBlock_Tehsil: yup
  //   .string()
  //   .required("Please enter Block/Tehsil"),
  // ApplicantEntitySector_Village: yup
  //   .string()
  //   .required("Please enter Sector/Village"),
  // ApplicantEntityPincode: yup.string().required("Please enter Pincode"),
  // ApplicantEntityPlotNumber_KhasaraNumber_GataNumber: yup
  //   .string()
  //   .required("Please enter Plot Number/Khasara Number/Gata Number"),
  // ApplicantEntityLandmark: yup.string().required("Please enter Landmark"),
  // ApplicantEntityEmailId: yup
  //   .string()
  //   .required("Please enter email")
  //   .email("Please enter a valid email"),
  // ApplicantContactNumber: yup.string().required("Please enter contact number"),

  // Is_the_applicant_running_any_other_iti: yup
  //   .string()
  //   .required("Please select if applicant is running any other ITI"),

  // run_ITIName: yup.string().when("Is_the_applicant_running_any_other_iti", {
  //   is: "Yes",
  //   then: () => yup.string().required("Please enter ITI Name"),
  //   otherwise: () => yup.string().notRequired(),
  // }),

  // run_MISCode: yup.string().when("Is_the_applicant_running_any_other_iti", {
  //   is: "Yes",
  //   then: () => yup.string().required("Please enter MIS Code"),
  //   otherwise: () => yup.string().notRequired(),
  // }),

  // run_State: yup.string().when("Is_the_applicant_running_any_other_iti", {
  //   is: "Yes",
  //   then: () => yup.string().required("Please enter State"),
  //   otherwise: () => yup.string().notRequired(),
  // }),

  // run_District: yup.string().when("Is_the_applicant_running_any_other_iti", {
  //   is: "Yes",
  //   then: () => yup.string().required("Please enter District"),
  //   otherwise: () => yup.string().notRequired(),
  // }),

  // run_TownCity: yup.string().when("Is_the_applicant_running_any_other_iti", {
  //   is: "Yes",
  //   then: () => yup.string().required("Please enter Town/City"),
  //   otherwise: () => yup.string().notRequired(),
  // }),

  // run_BlockTehsil: yup.string().when("Is_the_applicant_running_any_other_iti", {
  //   is: "Yes",
  //   then: () => yup.string().required("Please enter Block/Tehsil"),
  //   otherwise: () => yup.string().notRequired(),
  // }),

  // run_Pincode: yup.string().when("Is_the_applicant_running_any_other_iti", {
  //   is: "Yes",
  //   then: () => yup.string().required("Please enter Pincode"),
  //   otherwise: () => yup.string().notRequired(),
  // }),

  // run_PlotNumber_KhasaraNumber: yup
  //   .string()
  //   .when("Is_the_applicant_running_any_other_iti", {
  //     is: "Yes",
  //     then: () =>
  //       yup.string().required("Please enter Plot Number/Khasara Number"),
  //     otherwise: () => yup.string().notRequired(),
  //   }),

  // run_Landmark: yup.string().when("Is_the_applicant_running_any_other_iti", {
  //   is: "Yes",
  //   then: () => yup.string().required("Please enter Landmark"),
  //   otherwise: () => yup.string().notRequired(),
  // }),
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
      step: 4,
      label: "Fee Payment For StageII",
      active: false,
      filled: false,
      inputs: {},
    },
    {
      step: 5,
      label: "Tradewise Machinery/Tools/Equipment Details",
      active: false,
      filled: false,
      inputs: {},
    },

    {
      step: 6,
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
          if (index === payload.step) {
            return { ...step, filled: true };
          }
          return step;
        }),
      };
      return state;
    default:
      return state;
  }
};
