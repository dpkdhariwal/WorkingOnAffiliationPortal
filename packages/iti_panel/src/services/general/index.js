export const base_url = 'http://localhost:3000';
import * as cnf from "../config";
import { api } from '../auth/login';
export const getError = (error) => {
  const message = error.message || 'Failed'
  return new Error(message)
}



export const getTradeUnitsInfo = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/general/getTradeUnitsInfo", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

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

export const getAssessmentStageIIFlowById = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/state/getAssessmentStageIIFlowById", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};
export const getAsmtFlowForStageII = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/state/getAsmtFlowForStageII", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
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

export const setStageIIAssessmentFlow = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/state/setStageIIAssessmentFlow", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};



export const getDetails = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/general/getDetails", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const getEntityDetails = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/general/getEntityDetails", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const getProposedInstDetails = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/general/getProposedInstDetails", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};




export const getAppFlowByAppId = async (appId) => {
  const formData = new FormData();
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/general/getAppFlowByAppId", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const geLanguages = async () => {
  const formData = new FormData();
  return new Promise((resolve, reject) => {
    api.post("/general/geLanguages", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};

export const getMasters = async (master) => {
  const formData = new FormData();
  formData.append("master", master);
  return new Promise((resolve, reject) => {
    api.post("/general/getMasters", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })
};






