import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const pKeyPath = path.join(__dirname, '../auth/private.pem');


export const ErrorList = {
    "User Not Found": "01",
    "User Found": "02",

};


export const CErrorMsg = (Error, code) => {
    return { status: false, msg: Error, errorCode: code }
}

export const CSrrorMsg = (Error, code) => {
    return { status: true, msg: Error, errorCode: code }
}