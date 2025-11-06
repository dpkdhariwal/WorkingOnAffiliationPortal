import axios from 'axios';
import DeviceDetector from 'device-detector-js';
export const base_url = 'http://localhost:3000';
import * as cnf from "../config";
import { api } from '../auth/login';
export const getError = (error) => {
  const message = error.message || 'Failed'
  return new Error(message)
}
import * as C from "affserver";

export const getBasicDetail_asmt = async (appId, assessment_id) => {
  console.log(appId);
  const formData = new FormData();
  formData.append("appId", appId);
  formData.append("assessment_id", assessment_id);
  return new Promise((resolve, reject) => {
    api.post("/state/getBasicDetail_asmt", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};
export const getCivilInfrastructure_asmt = async (appId) => {
  console.log(appId);
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/state/getCivilInfrastructure_asmt", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};
export const getAmenitiesArea_asmt = async (appId) => {
  console.log(appId);
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/state/getAmenitiesArea_asmt", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};
export const getSignageBoards_asmt = async (appId) => {
  console.log(appId);
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/state/getSignageBoards_asmt", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};
export const getItLabDetails = async (appId) => {
  console.log(appId);
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/state/getItLabDetails", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};


export const getReviewStatusforStageII = async (appId, assessment_id) => {
  console.log(appId);
  const formData = new FormData();
  formData.append("appId", appId);
  formData.append("assessment_id", assessment_id);
  return new Promise((resolve, reject) => {
    api.post("/state/getReviewStatusforStageII", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};
export const getReviewStatusforStageI = async (appId, assessment_id) => {
  console.log(appId);
  const formData = new FormData();
  formData.append("appId", appId);
  formData.append("assessment_id", assessment_id);
  return new Promise((resolve, reject) => {
    api.post("/state/getReviewStatusforStageI", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const getDocumentUploadStateforStageI = async (appId, assessment_id) => {
  console.log(appId);
  const formData = new FormData();
  formData.append("appId", appId);
  formData.append("assessment_id", assessment_id);
  return new Promise((resolve, reject) => {
    api.post("/state/getDocumentUploadStateforStageI", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};


export const getStageIIStatus = async (appId, assessment_id) => {
  console.log(appId);
  const formData = new FormData();
  formData.append("appId", appId);
  formData.append("assessment_id", assessment_id);
  return new Promise((resolve, reject) => {
    api.post("/state/getStageIIStatus", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};






export const getElectricityDetails_asmt = async (appId) => {
  console.log(appId);
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/state/getElectricityDetails_asmt", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};


export const setSendApplicationStage1ToState = async (appId, assessment_id) => {
  console.log(appId);
  const formData = new FormData();
  formData.append("appId", appId);
  formData.append("assessment_id", assessment_id);
  return new Promise((resolve, reject) => {
    api.post("/applicant/setSendApplicationStage1ToState", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const setSendApplicationToApplicant = async (appId, assessment_id) => {
  console.log(appId);
  const formData = new FormData();
  formData.append("appId", appId);
  formData.append("assessment_id", assessment_id);
  return new Promise((resolve, reject) => {
    api.post("/state/setSendApplicationToApplicant", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const setSendStageIApplicationToState = async (appId, assessment_id) => {
  console.log(appId);
  const formData = new FormData();
  formData.append("appId", appId);
  formData.append("assessment_id", assessment_id);
  return new Promise((resolve, reject) => {
    api.post("/state/setSendStageIApplicationToState", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const setSendStageIIApplicationToState = async (appId, assessment_id) => {
  console.log(appId);
  const formData = new FormData();
  formData.append("appId", appId);
  formData.append("assessment_id", assessment_id);
  return new Promise((resolve, reject) => {
    api.post("/state/setSendStageIIApplicationToState", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};




export const SendStageIIApplicationToApplicant = async (appId, assessment_id) => {
  console.log(appId);
  const formData = new FormData();
  formData.append("appId", appId);
  formData.append("assessment_id", assessment_id);
  return new Promise((resolve, reject) => {
    api.post("/state/SendStageIIApplicationToApplicant", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};
export const setSendStageIIApplicationToApplicant = async (appId, assessment_id) => {
  console.log(appId);
  const formData = new FormData();
  formData.append("appId", appId);
  formData.append("assessment_id", assessment_id);
  return new Promise((resolve, reject) => {
    api.post("/state/setSendStageIIApplicationToApplicant", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const setSendStageIApplicationToApplicant = async (appId, assessment_id) => {
  console.log(appId);
  const formData = new FormData();
  formData.append("appId", appId);
  formData.append("assessment_id", assessment_id);
  return new Promise((resolve, reject) => {
    api.post("/state/setSendStageIApplicationToApplicant", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};


export const markAsCompleteAssessment = async (appId) => {
  console.log(appId);
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/state/markAsCompleteAssessment", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const markAsCompleteStageAssessmentFlow = async (appId, step, assessment_id, referenceNumber) => {
  console.log(appId, step);
  const formData = new FormData();
  formData.append("step", step);
  formData.append("appId", appId);
  formData.append("assessment_id", assessment_id);
  formData.append("referenceNumber", referenceNumber);

  return new Promise((resolve, reject) => {
    api.post("/state/markAsCompleteStageAssessmentFlow", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const get_da_status_possasion_of_land = async (appId) => {
  console.log(appId);
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/state/get_da_status_possasion_of_land", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};


export const getAssessmentProgressStatus = async (appId) => {
  console.log(appId);
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/state/getAssessmentProgressStatus", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const getAssessmentProgressStatusApplicant = async (appId) => {
  console.log(appId);
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/state/getAssessmentProgressStatusApplicant", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};




export const saveRemarkONBuildingDetails_asmt = async (appId, values) => {
  console.log(appId, values);
  const formData = new FormData();
  formData.append("data", JSON.stringify(values));
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/state/saveRemarkONBuildingDetails_asmt", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const saveRemarkONCivilInfraDetails_asmt = async (appId, values, step) => {
  console.log(appId, values);
  const formData = new FormData();
  formData.append("data", JSON.stringify(values));
  formData.append("appId", appId);
  formData.append("step", step);
  return new Promise((resolve, reject) => {
    api.post("/state/saveRemarkONCivilInfraDetails_asmt", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};


export const set_da_status_possasion_of_land = async (appId, values) => {
  console.log(appId, values);
  const formData = new FormData();
  formData.append("data", JSON.stringify(values));
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/state/set_da_status_possasion_of_land", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};
export const save_da_doc_verification_remarks = async (appId, assessment_id, values, step) => {
  const formData = new FormData();
  formData.append("appId", appId);
  formData.append("assessment_id", assessment_id);
  formData.append("data", JSON.stringify(values));
  formData.append("step", step);

  console.log(values);


  // const landDocs = values.find(item => item.id === "land_documents");
  // landDocs?.values?.onwed_land_documents?.forEach((item, index, arr) => {
  //   const { land_documents, land_notarised_documents } = item
  //   if (land_documents instanceof File) {
  //     formData.append(`onwed_land_documents[${index}].document`, land_documents);
  //   }
  //   if (land_notarised_documents instanceof File) {
  //     formData.append(`land_notarised_documents[${index}].notarised_document`, land_notarised_documents);
  //   }
  // });


  // const data1 = values.find(item => item.id === C.DA1_KEYS.REGISTRATION_CERTIFICATE_OF_APPLICANT_ORGANIZATION);
  // if (data1?.values?.doc_of_registration_cert_of_applicant_org instanceof File) {
  //   formData.append('doc_of_registration_cert_of_applicant_org', data1?.values?.doc_of_registration_cert_of_applicant_org);
  // }


  // const data2 = values.find(item => item.id === C.DA1_KEYS.RESOLUTION_CERTIFICATE);
  // if (data2?.values?.doc_iti_resolution instanceof File) {
  //   formData.append('doc_iti_resolution', data2?.values?.doc_iti_resolution);
  // }

  // const data3 = values.find(item => item.id === C.DA1_KEYS.ID_PROOF_OF_AUTHORIZED_SIGNATORY);
  // if (data3?.values?.doc_of_authorized_signatory instanceof File) {
  //   formData.append('doc_of_authorized_signatory', data3?.values?.doc_of_authorized_signatory);
  // }



  // const data5 = values.find(item => item.id === C.DA1_KEYS.ID_PROOF_OF_SECRETARY_CHAIRPERSON_PRESIDENT);
  // data5?.values?.id_proof_scp?.forEach((item, index, arr) => {
  //   const { id_proof_doc } = item
  //   // File 5
  //   if (id_proof_doc instanceof File) {
  //     formData.append(`id_proof_scp[${index}].document`, id_proof_doc);
  //   }
  // });



  // const data4 = values.find(item => item.id === C.DA1_KEYS.ID_PROOF_OF_AUTHORIZED_SIGNATORY);
  // if (data4?.values?.id_proof_docs_of_authorized_signatory instanceof File) {
  //   formData.append('id_proof_docs_of_authorized_signatory', data4?.values?.id_proof_docs_of_authorized_signatory);
  // }





  return new Promise((resolve, reject) => {
    api.post("/state/save_da_doc_verification_remarks", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};


export const cleareForResubmitDeficiency = async (appId, assessment_id, step, checkName) => {
  const formData = new FormData();
  formData.append("appId", appId);
  formData.append("assessment_id", assessment_id);
  formData.append("step", step);
  formData.append("checkName", checkName);
  return new Promise((resolve, reject) => {
    api.post("/applicant/cleareForResubmitDeficiency", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};





export const get_da_status_land_area = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/state/get_da_status_land_area", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};


export const get_da_status = async (appId, stage, keyName) => {
  const formData = new FormData();
  formData.append("appId", appId);
  formData.append("stage", stage);
  formData.append("keyName", keyName);
  return new Promise((resolve, reject) => {
    api.post("/state/get_da_status", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const set_da_status = async (appId, values, stage, keyName) => {

  const formData = new FormData();
  formData.append("data", JSON.stringify(values));
  formData.append("appId", appId);
  formData.append("stage", stage);
  formData.append("keyName", keyName);
  return new Promise((resolve, reject) => {
    api.post("/state/set_da_status", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};



export const updateAssessmentStatus = async (appId, stage, status, pendingAt) => {
  const formData = new FormData();
  formData.append("appId", appId);
  formData.append("stage", stage);
  formData.append("status", status);
  formData.append("pendingAt", pendingAt);
  return new Promise((resolve, reject) => {
    api.post("/state/updateAssessmentStatus", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const set_da_status_land_area = async (appId, values) => {
  const formData = new FormData();
  formData.append("appId", appId);
  formData.append("data", JSON.stringify(values));
  return new Promise((resolve, reject) => {
    api.post("/state/set_da_status_land_area", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};


export const generateNoc = async (appId, values) => {
  const formData = new FormData();
  formData.append("appId", appId);
  formData.append("data", JSON.stringify(values));
  return new Promise((resolve, reject) => {
    api.post("/state/generateNoc", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};


export const get_vrf_list_land_to_be_used = async (appId, step) => {
  const formData = new FormData();
  formData.append("appId", appId);
  formData.append("step", step);
  return new Promise((resolve, reject) => {
    api.post("/state/get_vrf_list_land_to_be_used", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};
export const getVerificationListForStageI = async (appId, step) => {
  const formData = new FormData();
  formData.append("appId", appId);
  formData.append("step", step);
  return new Promise((resolve, reject) => {
    api.post("/state/getVerificationListForStageI", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};



export const getMasters = async (masterName) => {
  const formData = new FormData();
  formData.append("master", masterName);
  return new Promise((resolve, reject) => {
    api.post("/general/getMasters", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};