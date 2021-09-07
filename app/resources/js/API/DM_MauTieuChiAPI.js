import { axios } from "../config";
const queryString = require('query-string');

const getAllMauTieuChi = (filter) => {
    const route = `/admin/DM_MauTieuChi/api?${queryString.stringify(filter, { skipNull: true, skipEmptyString: true })}`;
    return axios.get(route);
}

const updateMauTieuChi = (id, payload) => {
    const route = `/admin/DM_MauTieuChi/${id}`;
    return axios.put(route, payload);
}

const getTCCT = (id, filter) => {
    const route = `admin/DM_MauTieuChi/${id}/tieuchi-chitiet?${queryString.stringify(filter, { skipNull: true, skipEmptyString: true })}`;
    return axios.get(route);
}

export {
    getAllMauTieuChi,
    updateMauTieuChi,
    getTCCT
}