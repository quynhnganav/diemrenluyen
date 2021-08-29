import { Modal } from "antd";
import React, { forwardRef, memo, useCallback, useImperativeHandle, useState } from "react";
import TableDanhGia from "../TableDanhGia";
import { axios } from "../../config";

const ModalViewChiTiet = forwardRef(({

}, ref) => {

    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false)
    const [dataTree, setDataTree] = useState([]);

    const loadData = useCallback((id) => {
        setLoading(true)
        axios.get(`admin/DM_MauTieuChi/${id}/tieuchi-chitiet`)
            .then(res => {
                setDataTree(res?.data || [])
            })
            .finally(() => setLoading(false))
    }, [])

    const showModal = useCallback((itemInput) => {
        // setItem(itemInput)
        loadData(itemInput?.id)
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
            centered
        >
            <TableDanhGia loading={loading} tree={dataTree} />
        </Modal>
    )

})

export default memo(ModalViewChiTiet)