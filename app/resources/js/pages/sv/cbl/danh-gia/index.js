import { Col, notification, Row, Button, Table, Space, Tooltip } from "antd";
import React, { useReducer, useEffect, useCallback, useRef, useMemo } from "react";
import LayoutWrapper from "../../../../components/LayoutWrapper";
import { localeTable } from "../../../../constant";
import { reducer } from "../../../../utils";
import * as DanhGiaAPI from "../../../../API/DanhGiaAPI";
import { useHistory } from "react-router-dom";
import { useListSinhVien } from "../../../..";

const SVDanhGia = () => {


    const [state, setState] = useReducer(reducer, {
        sinhViens: [],
        loading: false
    });

    const history = useHistory()
    const { setIdsSv} = useListSinhVien();

    const refTableDanhGia = useRef(null)

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

    const columns = useMemo(() => ([
        {
            title: 'Mã SV',
            dataIndex: 'MaSV',
            className: 'cell-center',
            width: 100,
            key: 'MaSV'
        },
        {
            title: 'Họ tên SV',
            dataIndex: 'user',
            key: 'HoTenSinhVien',
            render: (text) =>
                <Tooltip placement='top' title={text?.email}>
                    {`${text?.HoDem} ${text?.Ten}`}
                </Tooltip>
        },
        {
            title: 'Đã đánh giá',
            dataIndex: 'danhGia',
            className: 'cell-center',
            width: 150,
            key: 'isDanhGia',
            render: (text) => text?.SinhVienDanhGia ? `Đã đánh giá = ${text?.TongSoDiemSinhVien}` : 'Chưa đánh giá - 0'
        },
        {
            title: 'Số điểm - Xếp loại',
            dataIndex: 'danhGia',
            className: 'cell-center',
            width: 150,
            key: 'point',
            render: (text) => text?.TongSoDiem
        },
        {
            title: 'CBL đánh giá',
            dataIndex: 'danhGia',
            className: 'cell-center',
            width: 150,
            key: 'cbl',
            render: (text) => text?.CanBoLopDanhGia ? 'Đã đánh giá' : 'Chưa đánh giá'
        },
        {
            title: 'CVHT duyệt',
            dataIndex: 'danhGia',
            className: 'cell-center',
            width: 150,
            key: 'cvht',
            render: (text) => text?.GiangVienDuyet ? 'Đã duyệt' : 'Chưa duyệt'
        },
        {
            title: 'Ghi chú',
            dataIndex: 'TrangThai',
            className: 'cell-center',
            width: 150,
            key: 'ghichu`',
            render: (text, record) => `${text != '0' && text || ''} ${record?.GhiChu != '0' && record?.GhiChu || ''}`
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => (
                <Space size='middle'>
                    <Button
                        type='primary'
                        onClick={() =>
                            history.push(`/sv/cbl/danh-gia/${text}?prev=${state.sinhViens[index - 1]?.id}&next=${state.sinhViens[index + 1]?.id}&masv=${record?.MaSV}`)
                        }
                    >
                        Đánh giá
                    </Button>
                    <Button type='primary'>Ghi chú</Button>
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
                                    <Button type='primary' onClick={() => window.print()}>In bản thống kê</Button>
                                </Col>
                                <Col>
                                    <Button type='primary'>Xem thống kê</Button>
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
                        rowSelection={{
                            type: 'checkbox'
                        }}
                    />
                </Col>
            </Row>
        </LayoutWrapper>
    )
};

export default SVDanhGia
