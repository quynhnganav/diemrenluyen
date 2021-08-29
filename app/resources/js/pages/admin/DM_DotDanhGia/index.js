import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, Row, Table, Col, Space, Modal, notification } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDataProps } from "../../..";
import ModalForm from "./ModalForm";
import { axios } from "../../../config";
import './index.scss'
import LayoutWrapper from "../../../components/LayoutWrapper";
import ModalViewChiTiet from "../../../components/ModalViewChiTiet";

const { confirm } = Modal

const DM_DotDanhGia = () => {

    const { data } = useDataProps()

    const [dotDanhGia, setDotDanhGias] = useState([])
    const [loading, setLoading] = useState(false)

    const refModal = useRef(null)
    const refModalViewChiTiet= useRef(null)
    // const refModalChiTiet = useRef(null)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        setLoading(true)
        axios.get("/admin/DM_DotDanhGia/data", {

        }).then((res) => {
            console.log(res?.data)
            setDotDanhGias(res?.data || [])
        })
            .finally(() => setLoading(false))
    }

    const getTableScroll = () => {
        let scrollY = `calc(100vh - 700px)`
        return scrollY
    }

    const onEditChiTiet = useCallback((item) => {
        refModalViewChiTiet.current?.showModal(item);
    }, [])

    const onCreate = useCallback(() => {
        refModal?.current?.showModal()
    }, [])

    const showConfirm = (id, name) => {
        confirm({
            title: `Bạn có muốn xóa Đợt đánh giá ${name || ''}?`,
            icon: <ExclamationCircleOutlined />,
            content: 'Đợt đánh giá này sẽ được xóa vĩnh viễn.',
            onOk() {
                return new Promise((rel, rej) => {
                    axios.delete(`/admin/DM_DotDanhGia/${id}`)
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
                title: 'Tên đợt đánh giá',
                dataIndex: 'TenDotDanhGia',
                key: 'TenDotDanhGia'
            },
            {
                title: 'Học kỳ',
                dataIndex: 'hocKy',
                key: 'hocKy',
                className: 'cell-center',
                width: 200,
                render: (text) => text ? `Học kỳ ${text?.TenHocKy} (${text?.NamBatDau} - ${text?.NamKetThuc})`: ''
            },
            {
                title: 'Mẫu tiêu chí',
                dataIndex: 'mauTieuChi',
                key: 'mauTieuChi',
                className: 'cell-center',
                width: 200,
                render: (text) => text ? `${text?.TenMauTieuChi} -- ${text?.TongSoDiem}`: ''
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
                            onClick={() => refModal?.current?.showModal(record)}
                        >
                            Chỉnh sửa
                        </Button>
                        <Button
                            type='primary'
                            onClick={() => onEditChiTiet(record?.mauTieuChi)}
                        >
                            Tiêu chí
                        </Button>
                        <Button
                            danger
                            onClick={() => showConfirm(record?.id, record?.TenMauTieuChi)}
                            disabled={record?.PhatHanh}
                        >
                            Xóa
                        </Button>
                    </Space>
                )
            }
        ]
    ), [])

    return (
        <LayoutWrapper className='dot-danh-gia-wrapper' >
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
                        dataSource={dotDanhGia}
                        rowKey={(v) => v?.id}
                    />
                </Col>
            </Row>
            <ModalForm
                ref={refModal}
                callback={loadData}
            />
            <ModalViewChiTiet
                ref={refModalViewChiTiet}
            />
        </LayoutWrapper>
    )
}

export default DM_DotDanhGia