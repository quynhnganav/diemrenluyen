import { axios } from "../config";
const queryString = require('query-string');

const getAllHocKy = (filter) => {
    const route = `/admin/DM_DotDanhGia/api/hocky?${queryString.stringify(filter, { skipNull: true, skipEmptyString: true })}`;
    return axios.get(route);
}

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

const updateHienHanh = (id) => {
    const route = `/admin/DM_DotDanhGia/api/update-hienhanh/${id}`;
    return axios.put(route);
}

const updateKhoa = (id) => {
    const route = `/admin/DM_DotDanhGia/api/khoa/${id}`;
    return axios.put(route);
}



export {
    getAllHocKy,
    createDotDanhGia,
    updateDotDanhGia,
    getAllDotDanhGia,
    updateHienHanh,
    updateKhoa
}