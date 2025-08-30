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

  // or per request
  // await axios.post("http://localhost:3000/applicant/Cookies", formData, { withCredentials: true });

  return new Promise((resolve, reject) => {
    api.post("/applicant/setEntityDetails", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
  })

  // return new Promise((resolve, reject) => {
  //   axios .post(base_url + "/applicant/Cookies", formData, {
  //     withCredentials: true, // ✅ send cookies
  //   }) .then((res) => resolve(res)) .catch((error) => reject(error));
  // });
};


