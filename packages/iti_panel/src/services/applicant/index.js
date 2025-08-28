import axios from 'axios';
import DeviceDetector from 'device-detector-js';
export const base_url = 'http://localhost:3000';
import * as cnf from "../config";

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
    axios
      .post(base_url + "/applicant/setEntityDetails", formData, cnf.headers)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};


