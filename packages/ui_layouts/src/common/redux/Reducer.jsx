import { compile } from "sass";

let initialState = {
  lang: "en",
  dir: "ltr",
  dataThemeMode: "light",
  dataMenuStyles: "dark",
  dataNavLayout: "vertical",
  dataHeaderStyles: "light",
  dataVerticalStyle: "default",
  StylebodyBg: "107 64 64",
  StyleDarkBg: "93 50 50",
  toggled: "",
  dataNavStyle: "",
  horStyle: "",
  dataPageStyle: "regular",
  dataWidth: "fullwidth",
  dataMenuPosition: "fixed",
  dataHeaderPosition: "fixed",
  // loader:"disable",
  iconOverlay: "",
  colorPrimaryRgb: "",
  bodyBg1: "",
  bodyBg2: "",
  darkBg: "",
  inputBorder: "",
  bgImg: "",
  iconText: "",

  new_registration: {
    stage_I: {
      completed: false,
      section_category_of_applicant_organization: {
        step_active: true,
        completed: false,
        category_of_applicant_organization: "",
      },
      section_basic_details_of_applicant_organization: {
        step_active: false,
        completed: false,
        name_of_applicant_organization: "",
        address_of_applicant_organization: "",
        Email_Id_of_applicant_organization_and_contact_number: "",
        details_of_secretary_chairperson_president: [
          {
            name: "",
            designation: "",
            email: "",
            mobile_number: "",
            id_proof: "",
          },
        ],
        applicant_running_any_other_iti: {
          is_the_applicant_running_any_other_iti: false,
          details_of_other_iti: {
            name_of_iti: "",
            mis_code: "",
            address_of_iti: "",
          },
        },
        authorized_signatory: [
          {
            name: "",
            designation: "",
            email: "",
            mobile_number: "",
          },
        ],
      },
      land_documents: [{ title: "", file: "", language: "" }],

      tradeList: [{ trade: "", shift1_units: "", shift2_units: "" }],

      lease_docs: [{ title: "", file: "", language: "" }],
    },
    stageISteps: [
      "Applicant Entity Details",
      "Details of the Proposed Institute",
      "Details of Trade(s)/Unit(s) for Affiliation",
      "Details of the Land to be used for the ITI",
      "Preview of Application",
      "Fee Payment",
      "Documents Upload",
    ],
  },
};

const Reducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case "ThemeChanger":
      state = payload;
      return state;
      break;

    case "SetLanguage":
      console.log("SetLanguage", payload);
      state = { ...state, lang: payload };
      return state;
      break;

    case "setCetegory":
      state.new_registration.stage_I.section_category_of_applicant_organization.category_of_applicant_organization =
        payload.category;
      state.new_registration.stage_I.section_category_of_applicant_organization.completed = true;
      state.new_registration.stage_I.section_basic_details_of_applicant_organization.step_active = true;
      return state;
      break;

    case "add_more_land_doc":
      state.new_registration.stage_I.land_documents.push({
        title: "",
        file: "",
        language: "",
      });
      console.log(state.new_registration.stage_I.land_documents);
      return state;
      break;

    default:
      return state;
  }
};

export default Reducer;
