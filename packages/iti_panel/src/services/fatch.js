import axios from 'axios';
import * as cnf from './config';

const headers = {
    Authorization: 'Bearer my-token',
    ulang: 'english'
    // "My-Custom-Header": "foobar"
};

const getError = (error) => {
    const message = error.message || 'Failed';
    return new Error(message);
};

export const getCourses = async (lang) => {
    const formData = new FormData();
    // formData.append('lang', lang);
    headers.ulang = lang;
    const res = await axios.post(cnf.base_url + 'getCourses', formData, {
        headers
    });
    return res;
};

export const getCtsMaterialType = async (scheme) => {
    const formData = new FormData();
    formData.append('scheme', scheme);
    const res = await axios.post(cnf.base_url + 'getCtsMaterialType', formData, {
        headers
    });
    return res;
};

export const getTrades = async (lang) => {
    const formData = new FormData();
    // formData.append('lang', lang);
    headers.ulang = lang;
    const res = await axios.post(cnf.base_url + 'getTrades', formData, { headers });
    return res;
};

export const getTradeInfo = async (tradeId) => {
    const formData = new FormData();
    formData.append('tradeId', tradeId);
    const res = await axios.post(cnf.base_url + 'getTradeInfo', formData, { headers });
    return res;
};