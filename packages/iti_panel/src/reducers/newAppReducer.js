import { SAVE_APP_CATEGORY, UPDATE_APP_CATEGORY } from "../constants";
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
    default:
      return state;
  }
};

export const appCategoryReducer = (state = {}, action) => {
  console.log("appCategoryReducer", action);
  let { type, payload } = action;
  switch (type) {
    case SAVE_APP_CATEGORY:
      return {
        appCategory: payload.appCategory,
      };
    case UPDATE_APP_CATEGORY:
      return {
        appCategory: payload.appCategory,
      };
    default:
      return state;
  }
};
