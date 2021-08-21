import { axios } from "../config";
const queryString = require('query-string');

const getPaginateSinhVien = (filter) => {
    const route = `/admin/DM_SinhVien/api/data?${queryString.stringify(filter, { skipNull: true, skipEmptyString: true })}`;
    return axios.get(route);
}

const syncDataLopHoc = (filter) => {
    const route = `/admin/DM_SinhVien/api/sync-data?${queryString.stringify(filter, { skipNull: true, skipEmptyString: true })}`;
    return axios.get(route);
};

export {
    getPaginateSinhVien,
    syncDataLopHoc
}