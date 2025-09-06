export const base_url = 'http://localhost:3000';
import * as cnf from "../config";
import { api } from '../auth/login';
export const getError = (error) => {
  const message = error.message || 'Failed'
  return new Error(message)
}


export const getAppFlowStepInfoByStep = async (appId, step) => {
  const formData = new FormData();
  formData.append("step", step);
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/general/getAppFlowStepInfoByStep", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const getAssessmentStatus = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/general/getAssessmentStatus", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};
export const getAssessmentStageIFlowById = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/state/getAssessmentStageIFlowById", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const setNewStatusOfAppByStep = async (appId, step, newStatus) => {
  const formData = new FormData();
  formData.append("step", step);
  formData.append('newStatus', newStatus)
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/general/setNewStatusOfAppByStep", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const setStageIAssessmentFlow = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/state/setStageIAssessmentFlow", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};


export const getDetails = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/general/getDetails", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};


export const getAppFlowByAppId = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/general/getAppFlowByAppId", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};






