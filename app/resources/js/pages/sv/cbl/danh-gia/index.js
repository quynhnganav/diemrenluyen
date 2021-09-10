import {
    Col, notification, Row, Button, Table,
    Space, Tooltip, Badge, Dropdown, Menu
} from "antd";
import { UserOutlined, MoreOutlined } from "@ant-design/icons";
import React, { useReducer, useEffect, useCallback, useRef, useMemo } from "react";
import LayoutWrapper from "../../../../components/LayoutWrapper";
import { localeTable } from "../../../../constant";
import { reducer, renderXepLoai } from "../../../../utils";
import * as DanhGiaAPI from "../../../../API/DanhGiaAPI";
import { useHistory } from "react-router-dom";
import { useListSinhVien } from "../../../..";
import ModalGhiChu from "../../../../components/ModalGhiChu";
import ModalThongKe from "../../../../components/ModalThongKe";

const SVDanhGia = () => {


    const [state, setState] = useReducer(reducer, {
        sinhViens: [],
        loading: false
    });

    const history = useHistory()
    const { setIdsSv } = useListSinhVien();

    const refModalGhiChu = useRef(null)
    const refModalThongKe = useRef(null)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = useCallback(() => {
        setState({
            loading: true
        })
        DanhGiaAPI.getCBLDanhSachSV()
            .then(res => {
                setState({
                    sinhViens: res?.data
                })
                setIdsSv(res?.data?.map(s => ({
                    id: s?.id,
                    MaSV: s?.MaSV,
                    user: s?.user
                })))
            })
            .catch(err => {
                notification.warning({
                    message: err?.response?.data?.message || 'Lỗi khi tải dữ liệu'
                })
            })
            .finally(() => setState({ loading: false }))
    }, [])

    const onOpenGhiChu = useCallback((item) => {
        refModalGhiChu.current?.showModal(item)
    }, [])

    const onOpenThongKe = useCallback((value) => {
        refModalThongKe?.current?.showModal({
            LopHoc_Id: state?.selected
        })
    }, [state])

    const handleMenuClick = (e, record) => {
        console.log(e)
        if (e?.key == '1') {
            history.push(`/sv/cbl/danh-gia/${record?.id}?masv=${record?.MaSV}`)
        }
        if (e?.key == '2') {
            onOpenGhiChu(record)
        }
    }

    const menu = (item) => (
        <Menu onClick={e => handleMenuClick(e, item)}>
            <Menu.Item key="1" icon={<UserOutlined />}>
                Đánh giá
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
                Ghi chú
            </Menu.Item>
        </Menu>
    );

    const columns = useMemo(() => ([
        {
            title: 'Mã SV',
            dataIndex: 'MaSV',
            className: 'cell-center',
            width: 100,
            fixed: 'left',
            key: 'MaSV'
        },
        {
            title: 'Họ tên SV',
            dataIndex: 'user',
            width: 180,
            key: 'HoTenSinhVien',
            render: (text, record) =>
                <Tooltip placement='top' title={text?.email}>
                    <Badge status={(record?.danhGia?.SinhVienDanhGia && record?.danhGia?.CanBoLopDanhGia) ? 'success' : record?.danhGia?.SinhVienDanhGia || record?.danhGia?.CanBoLopDanhGia ? 'warning' : 'error'} />
                    {`${text?.HoDem} ${text?.Ten}`}
                </Tooltip>
        },
        {
            title: 'Sinh viên đánh giá',
            dataIndex: 'danhGia',
            className: 'cell-center',
            width: 100,
            key: 'isDanhGia',
            render: (text) => text?.SinhVienDanhGia ? `${text?.TongSoDiemSinhVien || 0}` : 'Chưa đánh giá'
        },
        {
            title: 'CBL đánh giá',
            dataIndex: 'danhGia',
            className: 'cell-center',
            width: 130,
            key: 'cbl',
            render: (text) => text?.CanBoLopDanhGia ? `${text?.TongSoDiem} - ${renderXepLoai(text?.TongSoDiem)}` : 'Chưa đánh giá'
        },
        {
            title: 'CVHT duyệt',
            dataIndex: 'danhGia',
            className: 'cell-center',
            width: 100,
            key: 'cvht',
            render: (text) => text?.GiangVienDuyet ?
                <>
                    <Badge status='success' />
                    Đã duyệt
                </> : <>
                    <Badge status='warning' />
                    Chưa duyệt
                </>
        },
        {
            title: 'CVHT nhận xét',
            dataIndex: 'danhGia',
            className: 'cell-center',
            width: 100,
            key: 'CVHTNhanXet`',
            render: (text, record) => `${text?.GiangVienNhanXet || ''}`
        },
        {
            title: 'Ghi chú',
            dataIndex: 'TrangThai',
            className: 'cell-center',
            width: 130,
            key: 'ghichu`',
            render: (text, record) => `${text != '0' && text || ''} ${record?.GhiChu != '0' && record?.GhiChu || ''}`
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            width: 50,
            fixed: 'right',
            className: 'cell-center',
            render: (text, record, index) => (
                <Space size='middle'>
                    <Dropdown.Button overlay={menu(record)} icon={<MoreOutlined />} className='dropdown-menu-custom-more-grid'>
                    </Dropdown.Button>
                </Space>
            )
        }
    ]), [state.sinhViens])

    return (
        <LayoutWrapper className='danh-gia-page'>
            <Row className='bg-white p-3 content'>
                <Col span={24}>
                    <Row justify='space-between' gutter={[5, 5]}>
                        <Col>
                            Số lượng sinh viên: {state?.sinhViens?.length}
                        </Col>
                        <Col>
                            <Row gutter={[5, 5]}>
                                <Col>
                                    <Button type='primary' onClick={() => window.open('/common/diem-ren-luyen/api/bao-cao-excel')}>Báo cáo</Button>
                                </Col>
                                <Col>
                                    <Button type='primary' onClick={onOpenThongKe}>Xem thống kê</Button>
                                </Col>
                                <Col>
                                    <Button type='primary'>Nhắc nhở</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col span={24} className='mt-3'>
                    <Table
                        bordered
                        loading={state.loading}
                        columns={columns}
                        scroll={{ x: 700, y: 'calc(100vh - 250px)' }}
                        dataSource={state?.sinhViens}
                        rowKey={(v) => v?.id}
                        pagination={false}
                        locale={localeTable}
                    />
                </Col>
            </Row>
            <ModalGhiChu
                ref={refModalGhiChu}
            />
            <ModalThongKe
                ref={refModalThongKe}
            />
        </LayoutWrapper>
    )
};

export default SVDanhGia
