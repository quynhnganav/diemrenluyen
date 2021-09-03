import { Button, notification, Space } from "antd";
import React, { useCallback, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import * as GVAPI from "../../../API/GVAPI";
import ModalGhiChu from "../../../components/ModalGhiChu";

const ActionItem = ({
    text, record, index,
    onDuyet
}) => {
    const history = useHistory()
    const [loading, setLoading] = useState(false);
    const [loadingNote, setLoadingNote] = useState(false);
    const refModalGhiChu = useRef(null)

    const duyet = useCallback(() => {
        if (!record?.danhGia?.id) {
            notification.error({
                message: 'Sinh viên chưa đánh giá'
            })
            return
        }
        if (onDuyet) {
            setLoading(true)
            GVAPI.putGVDuyet(record?.danhGia?.id)
                .then(res => {
                    onDuyet(res?.data)
                })
                .catch(err => {
                    console.error(err)
                })
                .finally(() => setLoading(false))
        }
    }, [onDuyet, record])

    const onOpenGhiChu = useCallback((item) => {
        refModalGhiChu?.current?.showModal(item, record.danhGia?.GiangVienNhanXet)
    }, [record.danhGia])

    const onSubmitNhanXet = useCallback((value, cb) => {
        setLoadingNote(true)
        GVAPI.putGVNhanXet(record.danhGia?.id, {
            nhanXet: value,
            maSV: record?.MaSV
        }).then((res) => {
            onDuyet(res?.data)
            setLoadingNote(false)
            cb(true)
        }).catch((err) => {
            setLoadingNote(false)
            console.error(err)
            notification.error({
                message: err?.response?.data?.message
            })
        })
    }, [record, onDuyet])

    return (
        <Space size='middle'>
            <Button type='primary' onClick={duyet} loading={loading} disabled={!record?.danhGia?.CanBoLopDanhGia}>
                {record?.danhGia?.GiangVienDuyet ? 'Bỏ duyệt' : 'Duyệt'}
            </Button>
            <Button
                type='primary'
                onClick={() =>
                    history.push(`/gv/diem-ren-luyen/${text}?masv=${record?.MaSV}`)
                }
            >
                Xem
            </Button>
            <Button type='primary' onClick={onOpenGhiChu} loading={loadingNote}>Ghi chú</Button>
            <ModalGhiChu
                ref={refModalGhiChu}
                onSubmit={onSubmitNhanXet}
            />
        </Space>
    )
}

export default ActionItem;