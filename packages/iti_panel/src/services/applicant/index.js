import axios from 'axios';
import DeviceDetector from 'device-detector-js';
export const base_url = 'http://localhost:3000';
import * as cnf from "../config";
import { api } from '../auth/login';
export const getError = (error) => {
  const message = error.message || 'Failed'
  return new Error(message)
}


export const setEntityDetails = async (values, authUser, appId) => {
  console.log(values, authUser, appId);
  const formData = new FormData();
  formData.append("data", JSON.stringify(values));
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/setEntityDetails", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const api_getAppListByUserId = async (userId) => {
  console.log(userId);
  const formData = new FormData();
  formData.append("userId", userId);

  return new Promise((resolve, reject) => {
    api.post("/applicant/getAppListByUserId", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
}
export const api_getAppListByStateUser = async (userId) => {
  console.log(userId);
  const formData = new FormData();
  formData.append("userId", userId);

  return new Promise((resolve, reject) => {
    api.post("/state/getAppListByStateUser", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
}

export const ap_getDbEntityDetails = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/getDbEntityDetails", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
}


export const setProposedInstDetails = async (step, values, appId) => {
  const formData = new FormData();
  formData.append("step", JSON.stringify(step));
  formData.append("data", JSON.stringify(values));
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/setProposedInstDetails", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};
export const getProposedInstDetailsAutoFill = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/getProposedInstDetailsForAutoFill", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};


export const getStage1FormFlow = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/getStage1FormFlow", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};


export const setInstTradeDetails = async (values, appId, step) => {
  const formData = new FormData();
  formData.append("step", JSON.stringify(step));
  formData.append("data", JSON.stringify(values));
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/setInstTradeDetails", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const getInstTradeDetails = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/getInstTradeDetails", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};


export const setInstLandDetails = async (values, appId, step) => {
  const formData = new FormData();
  formData.append("step", JSON.stringify(step));
  formData.append("data", JSON.stringify(values));
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/setInstLandDetails", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};


export const getFeeInfo = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/getFeeInfo", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};


export const setAsExemptedStageI = async (values, step, appId) => {
  const formData = new FormData();
  formData.append("step", JSON.stringify(step));
  formData.append("data", JSON.stringify(values));
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/setAsExemptedStageI", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const setUploadDocumentStageI = async (values, step, appId) => {
  const formData = new FormData();
  formData.append("step", JSON.stringify(step));
  formData.append("data", JSON.stringify(values));
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/applicant/setUploadDocumentStageI", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

