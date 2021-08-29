import { axios } from "../config";
const queryString = require('query-string');

const getAllDotDanhGia = (filter) => {
    const route = `/admin/DM_DotDanhGia/api?${queryString.stringify(filter, { skipNull: true, skipEmptyString: true })}`;
    return axios.get(route);
}

const createDotDanhGia = (payload) => {
    const route = `/admin/DM_DotDanhGia`;
    return axios.post(route, payload);
}

const updateDotDanhGia = (id, payload) => {
    const route = `/admin/DM_DotDanhGia/${id}`;
    return axios.put(route, payload);
}

export {
    getAllDotDanhGia,
    createDotDanhGia,
    updateDotDanhGia
}