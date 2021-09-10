import { Button, notification, Space, Menu, Dropdown } from "antd";
import React, { useCallback, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { MoreOutlined, UserOutlined } from "@ant-design/icons";
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

    const handleMenuClick = (e, record) => {
        console.log(e)
        if (e?.key == '1') {
            history.push(`/gv/diem-ren-luyen/${text}?masv=${record?.MaSV}`)
        }
        if (e?.key == '2') {
            onOpenGhiChu(record)
        }
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1" icon={<UserOutlined />}>
                Xem
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
                Ghi chú
            </Menu.Item>
        </Menu>
    );

    return (
        <Space size='middle'>
            <Button type='primary' onClick={duyet} loading={loading} disabled={!record?.danhGia?.CanBoLopDanhGia}>
                {record?.danhGia?.GiangVienDuyet ? 'Bỏ duyệt' : 'Duyệt'}
            </Button>
            <Dropdown.Button overlay={menu} icon={<MoreOutlined />} className='dropdown-menu-custom-more-grid'>
            </Dropdown.Button>
            <ModalGhiChu
                ref={refModalGhiChu}
                onSubmit={onSubmitNhanXet}
            />
        </Space>
    )
}

export default ActionItem;