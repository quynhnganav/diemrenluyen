import { axios } from "../config";
const queryString = require('query-string');

const getAllLopHoc = (filter) => {
    const route = `/admin/DM_LopHoc/api?${queryString.stringify(filter, { skipNull: true, skipEmptyString: true })}`;
    return axios.get(route);
}

export {
    getAllLopHoc
}