import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, Row, Table, Col, Space, Modal, notification } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDataProps } from "../../..";
import ModalForm from "./ModalForm";
import { axios } from "../../../config";
import './index.scss'
import ModalChiTiet from "./ModalChiTiet";
import LayoutWrapper from "../../../components/LayoutWrapper";
import ModalViewChiTiet from "../../../components/ModalViewChiTiet";
import * as DM_MauTieuChiAPI from "../../../API/DM_MauTieuChiAPI";

const { confirm } = Modal

const DM_TieuChi = () => {

    const { data } = useDataProps()

    const [mauTieuChis, setMauTieuChis] = useState()
    const [loading, setLoading] = useState(false)

    const refModal = useRef(null)
    const refModalChiTiet = useRef(null)
    const refModalViewChiTiet = useRef(null)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        setLoading(true)
        DM_MauTieuChiAPI.getAllMauTieuChi()
            .then((res) => {
                console.log(res?.data)
                setMauTieuChis(res?.data || [])
            })
            .finally(() => setLoading(false))
    }

    const onEditChiTiet = useCallback((item) => {
        if (item?.PhatHanh) {
            refModalViewChiTiet.current?.showModal(item)
            return
        }
        refModalChiTiet.current?.showModal(item);
    }, [])

    const onCreate = useCallback(() => {
        refModal?.current?.showModal()
    }, [])

    const showConfirm = (id, name) => {
        confirm({
            title: `Bạn có muốn xóa mẫu tiêu chí ${name || ''}?`,
            icon: <ExclamationCircleOutlined />,
            content: 'Mẫu tiêu chí này sẽ được xóa vĩnh viễn.',
            onOk() {
                return new Promise((rel, rej) => {
                    axios.delete(`/admin/DM_MauTieuChi/${id}`)
                        .then((res) => {
                            notification.success({
                                message: 'Xóa thành công'
                            })
                            loadData && loadData()
                        })
                        .catch((err) => {
                            notification.error({
                                message: 'Lỗi khi xóa'
                            })
                        })
                        .finally(() => rel(1))
                })
            },
            okText: 'Xác nhận',
            cancelText: 'Hủy'
        });
    }

    const onPhatHanh = useCallback((record) => {
        setLoading(true)
        DM_MauTieuChiAPI.updateMauTieuChi(record?.id, {
            ...record,
            PhatHanh: true
        }).then((res) => {
            notification.success({
                message: 'Cập nhật thành công'
            })
        }).catch((err) => {
            notification.error({
                message: 'Lỗi khi cập nhật'
            })
        }).finally(() => setLoading(false))
    })

    const columns = useMemo(() => (
        [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: 60,
                fixed: 'left'
            },
            {
                title: 'Tên mãu tiêu chí',
                dataIndex: 'TenMauTieuChi',
                key: 'TenMauTieuChi'
            },
            {
                title: 'Tổng số điểm',
                dataIndex: 'TongSoDiem',
                key: 'TongSoDiem',
                className: 'cell-center',
                width: 200
            },
            {
                title: 'Phát hành',
                dataIndex: 'PhatHanh',
                key: 'PhatHanh',
                className: 'cell-center',
                width: 200,
                render: (t) => t ? "Đã phát hành" : "Chưa phát hành"
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => (
                    <Space size='middle'>
                        <Button
                            type='primary'
                            disabled={record?.PhatHanh}
                            onClick={() => onPhatHanh(record)}
                        >
                            Phát hành
                        </Button>
                        <Button
                            type='primary'
                            onClick={() => refModal?.current?.showModal(record)}
                        >
                            Chỉnh sửa
                        </Button>
                        <Button
                            type='primary'
                            onClick={() => onEditChiTiet(record)}
                        >
                            Tiêu chí
                        </Button>
                        <Button
                            danger
                            onClick={() => showConfirm(record?.id, record?.TenMauTieuChi)}
                        >
                            Xóa
                        </Button>
                    </Space>
                )
            }
        ]
    ), [])

    return (
        <LayoutWrapper className='tieu-chi-wrapper' >
            <Row className='bg-white p-3 content'>
                <Col span={24}>
                    <Row>
                        <Col>
                            <Button type='primary' onClick={onCreate}>Thêm mới</Button>
                        </Col>
                    </Row>
                </Col>
                <Col span={24} className='mt-3'>
                    <Table
                        bordered
                        loading={loading}
                        columns={columns}
                        scroll={{ x: 700, y: 'calc(100vh - 290px)' }}
                        dataSource={mauTieuChis}
                        rowKey={(v) => v?.id}
                    />
                </Col>
            </Row>
            <ModalForm
                ref={refModal}
                callback={loadData}
            />
            <ModalChiTiet
                ref={refModalChiTiet}
            />
            <ModalViewChiTiet
                ref={refModalViewChiTiet}
            />
        </LayoutWrapper>
    )
}

export default DM_TieuChi