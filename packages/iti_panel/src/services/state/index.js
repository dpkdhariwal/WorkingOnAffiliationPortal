import axios from 'axios';
import DeviceDetector from 'device-detector-js';
export const base_url = 'http://localhost:3000';
import * as cnf from "../config";
import { api } from '../auth/login';
export const getError = (error) => {
  const message = error.message || 'Failed'
  return new Error(message)
}


export const markAsCompleteStageAssessmentFlow = async (appId, step) => {
  console.log(appId, step);
  const formData = new FormData();
  formData.append("step", step);
  formData.append("appId", appId);
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


export const set_da_status_possasion_of_land = async (appId, values) => {
  console.log(appId, values);
  const formData = new FormData();
  formData.append("data", JSON.stringify(values));
  formData.append("appId", appId);
  return new Promise((resolve, reject) => {
    api.post("/state/set_da_status_possasion_of_land", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
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
