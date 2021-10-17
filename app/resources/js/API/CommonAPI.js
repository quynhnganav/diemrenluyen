import { axios } from "../config";
const queryString = require('query-string');

const getThongKeTheoLop = (filter) => {
    const route = `/common/diem-ren-luyen/api/thong-ke?${queryString.stringify(filter, { skipNull: true, skipEmptyString: true })}`;
    return axios.get(route);
}

const getRoles = (filter) => {
    const route = `/common/roles-user?${queryString.stringify(filter, { skipNull: true, skipEmptyString: true })}`;
    return axios.get(route);
}

export {
    getThongKeTheoLop,
    getRoles
}