import { axios } from "../config";
const queryString = require('query-string');

const getPaginateUser = (filter) => {
    const route = `/admin/user/?${queryString.stringify(filter, { skipNull: true, skipEmptyString: true })}`;
    return axios.get(route);
}

export {
    getPaginateUser
}