import {
  UPDATE_LAND_DOCUMENT_INFO,
  ADD_MORE_LAND_DOCUMENT,
  UPDATE_LEASE_DEED_DOCUMENT_INFO,
ADD_MORE_LEASE_DOCUMENT
} from "affserver";
import * as yup from "yup";

// @dpkdhariwal
export const fileRequired = (message) =>
  yup
    .mixed()
    .required(message)
    .test("fileRequired", message, (value) => {
      return value instanceof File || (value && value.length > 0);
    });

// @dpkdhariwal
// Land Document Reducer
export const land_documents_initialValues = {
  land_documents_title: [],
  land_original_documents: [],
  land_documents_language: [],
  land_notarised_documents: [],
};

export const land_documents_reducer = (
  state = land_documents_initialValues,
  action
) => {
  let { type, payload } = action;
  switch (type) {
    case UPDATE_LAND_DOCUMENT_INFO:
      state = { ...state, ...payload };
      return state;
    case ADD_MORE_LAND_DOCUMENT:
      return {
        ...state,
        land_documents_title: [...state.land_documents_title, ""],
        land_original_documents: [...state.land_original_documents, ""],
        land_documents_language: [...state.land_documents_language, ""],
        land_notarised_documents: [...state.land_notarised_documents, ""],
      };
    default:
      return state;
  }
};

export const land_documents_yupObject = yup.object().shape({
  // land_documents_title: yup
  //   .array()
  //   .of(yup.string().required("Document title is required"))
  //   .min(1, "At least one land document title is required"),

  // land_original_documents: yup
  //   .array()
  //   .of(yup.string().required("Document language is required")),

  // land_documents_language: yup
  //   .array()
  //   .of(fileRequired("Original land document is required")),

  // land_notarised_documents: yup
  //   .array()
  //   .of(fileRequired("Hindi/English notarised copy is required")),
});



//  Lease Deed Dcomument Reducer
export const lease_deed_document_initialValues = {
  lease_deed_documents_title: [""],
  lease_deed_land_documents: ["",],
  lease_deed_language: ["",],
  notarised_lease_deed_documents: ["",],
};

export const lease_deed_document_reducer = (
  state = lease_deed_document_initialValues,
  action
) => {
  let { type, payload } = action;
  switch (type) {
    case UPDATE_LEASE_DEED_DOCUMENT_INFO:
      state = { ...state, ...payload };
      return state;
    case ADD_MORE_LEASE_DOCUMENT:
      return {
        ...state,
        lease_deed_documents_title: [...state.lease_deed_documents_title, ""],
        lease_deed_land_documents: [...state.lease_deed_land_documents, ""],
        lease_deed_language: [...state.lease_deed_language, ""],
        notarised_lease_deed_documents: [...state.notarised_lease_deed_documents, ""],
      };
    default:
      return state;
  }
};

export const lease_deed_document_yupObject = yup.object().shape({
  lease_deed_documents_title: yup
    .array()
    .of(yup.string().required("Document title is required"))
    .min(1, "At least one land document title is required"),

  lease_deed_land_documents: yup
    .array()
    .of(yup.string().required("Document is required")),

  lease_deed_language: yup
    .array()
    .of(fileRequired("Original document is required")),

  notarised_lease_deed_documents: yup
    .array()
    .of(fileRequired("Hindi/English notarised copy is required")),
});

