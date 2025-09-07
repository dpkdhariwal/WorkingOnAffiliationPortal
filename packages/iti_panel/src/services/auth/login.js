import axios from 'axios';
import DeviceDetector from 'device-detector-js';
export const base_url = 'http://localhost:3000';
import * as cnf from "../config";
export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true  // ✅ important for cookies
});

export const getError = (error) => {
    const message = error.message || 'Failed'
    return new Error(message)
}

export const loginByAuth = async (email, password) => {
    const deviceDetector = new DeviceDetector()
    const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36'
    const device = deviceDetector.parse(userAgent)
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    formData.append('deviceInfo', JSON.stringify(device))

    return new Promise((resolve, reject) => {
        api.post("/auth/login", formData).then((res) => { resolve(res) }).catch((error) => { reject(error) });
        // axios.post(base_url + '/auth/login', { email: email, password: password }).then((res) => { resolve(res) }).catch((error) => { reject(error) });
    })
}

// export const checkTokenisValid = async () => {
//     const Auth = auth()
//     return new Promise((resolve, reject) => {
//         cnf.headers.Authorization = Auth.getTotken
//         axios
//             .post(
//                 base_url + '/auth/tokenValidation',
//                 { token: Auth.token },
//                 {
//                     headers: {
//                         Authorization: Auth.token, // Example authorization header
//                         'Content-Type': 'application/json' // Example content type header
//                         // Add other headers as needed
//                     }
//                 }
//             )
//             .then((res) => {
//                 if (res.data.validate === true) {
//                     resolve({ data: res.data, status: res.status })
//                 } else {
//                     reject({ data: res.data, status: res.status })
//                 }
//             })
//             .catch((error) => {
//                 reject(error)
//             })
//     })
// }