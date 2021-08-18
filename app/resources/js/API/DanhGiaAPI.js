import { axios } from "../config";
const queryString = require('query-string');

const getDanhGiaSV = (filter) => {
    const route = `/sv/danh-gia/api?${queryString.stringify(filter, { skipNull: true, skipEmptyString: true })}`;
    return axios.get(route);
}
// const createAdministrator = (payload) => {
//     const route = `/core/admin/administrators`;
//     return axios.post(route, payload);
// }
// const editAdministrator = (id, payload) => {
//     const route = `/core/admin/administrators/${admin_id}`;
//     return axios.put(route, payload);
// }
// const removeAdministrator = (admin_id) => {
//     const route = `/core/admin/administrators/${admin_id}`;
//     return axios.delete(route);
// }

export {
    getDanhGiaSV
}