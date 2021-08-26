import { axios } from "../config";
const queryString = require('query-string');

const getAllHocKy = (filter) => {
    const route = `/admin/DM_HocKy/api?${queryString.stringify(filter, { skipNull: true, skipEmptyString: true })}`;
    return axios.get(route);
}

const syncDataHocKy = (filter) => {
    const route = `/admin/DM_HocKy/api/sync-data?${queryString.stringify(filter, { skipNull: true, skipEmptyString: true })}`;
    return axios.get(route);
};

export {
    getAllHocKy,
    syncDataHocKy
}