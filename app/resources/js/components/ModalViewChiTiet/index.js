import { Modal, notification } from "antd";
import React, { forwardRef, memo, useCallback, useImperativeHandle, useState } from "react";
import TableDanhGia from "../TableDanhGia";
import { axios } from "../../config";
import * as DM_DiemRenLuyenAPI from "../../API/DM_DiemRenLuyenAPI";
import * as DM_MauTieuChiAPI from "../../API/DM_MauTieuChiAPI";
import "./style.scss"

const ModalViewChiTiet = forwardRef(({

}, ref) => {

    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false)
    const [dataTree, setDataTree] = useState([]);
    const [sinhVien, setSinhVien] = useState(null)

    const loadData = useCallback((id) => {
        setLoading(true)
        DM_MauTieuChiAPI.getTCCT(id)
            .then(res => {
                setDataTree(res?.data || [])
            })
            .finally(() => setLoading(false))
    }, [])

    const loadDataSV = useCallback((id) => {
        setLoading(true)
        DM_DiemRenLuyenAPI.getDanhGiaSV(id)
            .then(res => {
                setDataTree(res?.data?.tieuChi || [])
                setSinhVien(res?.data?.sinhVien)
            })
            .catch(err => {
                console.log(err)
                notification.error({
                    message: err?.response?.data?.message,
                })
            })
            .finally(() => setLoading(false))
    }, [])

    const showModal = useCallback((itemInput) => {
        // setItem(itemInput)
        if (itemInput?.viewSv) {
            loadDataSV(itemInput?.viewSv)
        } else loadData(itemInput?.id)
        setVisible(true)
    }, [])

    useImperativeHandle(ref, () => ({
        showModal
    }))

    const hiddenModal = useCallback(() => {
        setVisible(false)
    }, [])

    return (
        <Modal
            visible={visible}
            onCancel={hiddenModal}
            onOk={hiddenModal}
            width={1200}
            title={sinhVien?.MaSV}
            centered
            className='modal-view-tcct'
            footer={null}
        >
            <TableDanhGia loading={loading} tree={dataTree} />
        </Modal>
    )

})

export default memo(ModalViewChiTiet)