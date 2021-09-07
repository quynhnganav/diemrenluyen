import { axios } from "../config";
const queryString = require('query-string');

const getSVLop = (filter) => {
    const route = `/admin/DM_DiemRenLuyen/api?${queryString.stringify(filter, { skipNull: true, skipEmptyString: true })}`;
    return axios.get(route);
}

const getDanhGiaSV = (id, filter) => {
    const route = `/admin/DM_DiemRenLuyen/api/danh-gia-sv/${id}?${queryString.stringify(filter, { skipNull: true, skipEmptyString: true })}`;
    return axios.get(route);
}

export {
    getSVLop,
    getDanhGiaSV
}