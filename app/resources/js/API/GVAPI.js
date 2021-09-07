import { axios } from "../config";
const queryString = require('query-string');

const getLop = (filter) => {
    const route = `/gv/diem-ren-luyen/api/lop?${queryString.stringify(filter, { skipNull: true, skipEmptyString: true })}`;
    return axios.get(route);
}

const getSVLop = (filter) => {
    const route = `/gv/diem-ren-luyen/api?${queryString.stringify(filter, { skipNull: true, skipEmptyString: true })}`;
    return axios.get(route);
}

const getGVDanhGiaSv = (idSv, filter) => {
    const route = `/gv/diem-ren-luyen/api/sinh-vien/${idSv}?${queryString.stringify(filter, { skipNull: true, skipEmptyString: true })}`;
    return axios.get(route);
}

const putGVDuyet = (idSv, payload) => {
    const route = `/gv/diem-ren-luyen/api/duyet/${idSv}`;
    return axios.put(route, payload);
}

const putGVNhanXet = (idSv, payload) => {
    const route = `/gv/diem-ren-luyen/api/nhan-xet/${idSv}`;
    return axios.put(route, payload);
}


export {
    getLop,
    getSVLop,
    getGVDanhGiaSv,
    putGVDuyet,
    putGVNhanXet,
}