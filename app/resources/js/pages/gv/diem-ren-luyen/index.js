import { Col, notification, Row, Button, Table, Space, Tooltip, Badge, Select } from "antd";
import React, { useReducer, useEffect, useCallback, useRef, useMemo } from "react";
import LayoutWrapper from "../../../components/LayoutWrapper";
import { localeTable } from "../../../constant";
import { reducer, renderXepLoai } from "../../../utils";
import * as DanhGiaAPI from "../../../API/DanhGiaAPI";
import * as GVAPI from "../../../API/GVAPI";
import { useHistory } from "react-router-dom";
import { useListSinhVien } from "../../..";
import ActionItem from "./action";
import ModalThongKe from "../../../components/ModalThongKe";

const { Option } = Select

const GVDRL = () => {


    const [state, setState] = useReducer(reducer, {
        sinhViens: [],
        lopHocs: [],
        loading: false,
        selected: null
    });

    const history = useHistory()
    const { setIdsSv } = useListSinhVien();

    const refTableDanhGia = useRef(null)
    const refModalThongKe = useRef(null)

    useEffect(() => {
        // loadData()
        loadDataLopHoc()
    }, [])

    const loadData = useCallback((lop) => {
        setState({
            loading: true
        })
        GVAPI.getSVLop({
            lop
        })
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

    const loadDataLopHoc = useCallback(() => {
        setState({
            loading: true
        })
        GVAPI.getLop()
            .then(res => {
                onChangeLop(res?.data[0]?.id)
                setState({
                    lopHocs: res?.data,
                    selected: res?.data[0]?.id
                })
            })
            .catch(err => {
                notification.warning({
                    message: err?.response?.data?.message || 'Lỗi khi tải dữ liệu'
                })
                setState({ loading: false })
            })
    }, [])

    const onChangeLop = useCallback((value) => {
        setState({ selected: value })
        loadData(value)
    }, [])

    const onDuyet = useCallback((value) => {
        const sinhViens = state.sinhViens.map(sv => sv?.danhGia?.id != value?.id ? sv : ({...sv, danhGia: value}))
        setState({
            sinhViens
        })
    }, [state.sinhViens])

    const onOpenThongKe = useCallback((value) => {
        refModalThongKe?.current?.showModal({
            LopHoc_Id: state?.selected
        })
    }, [state])

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
            width: 230,
            key: 'HoTenSinhVien',
            render: (text, record) =>
                <Tooltip placement='top' title={text?.email}>
                    <Badge status={(record?.danhGia?.SinhVienDanhGia && record?.danhGia?.CanBoLopDanhGia) ? 'success' : record?.danhGia?.SinhVienDanhGia || record?.danhGia?.CanBoLopDanhGia ? 'warning' : 'error'} />
                    {`${text?.HoDem} ${text?.Ten}`}
                </Tooltip>
        },
        {
            title: 'SV đánh giá',
            dataIndex: 'danhGia',
            className: 'cell-center',
            width: 120,
            key: 'isDanhGia',
            render: (text) => text?.SinhVienDanhGia ? `${text?.TongSoDiemSinhVien || 0}` : 'Chưa ĐG'
        },
        {
            title: 'CBL đánh giá',
            dataIndex: 'danhGia',
            className: 'cell-center',
            width: 120,
            key: 'cbl',
            render: (text) => text?.CanBoLopDanhGia ? text?.TongSoDiem : 'Chưa ĐG'
        },
        {
            title: 'Xếp loại',
            dataIndex: 'danhGia',
            className: 'cell-center',
            width: 100,
            key: 'point',
            render: (text) => renderXepLoai(text?.TongSoDiem)
        },

        {
            title: 'CVHT duyệt',
            dataIndex: 'danhGia',
            className: 'cell-center',
            width: 140,
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
            width: 180,
            key: 'CVHTNhanXet`',
            render: (text, record) => `${text?.GiangVienNhanXet || ''}`
        },
        {
            title: 'Ghi chú',
            dataIndex: 'TrangThai',
            className: 'cell-center',
            width: 180,
            key: 'ghichu`',
            render: (text, record) => `${text != '0' && text || ''} ${record?.GhiChu != '0' && record?.GhiChu || ''}`
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            className: 'cell-center',
            render: (text, record, index) => <ActionItem text={text} record={record} index={index} onDuyet={onDuyet} />
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
                                    <Select
                                        placeholder='Chọn lớp nào'
                                        value={state.selected}
                                        onChange={onChangeLop}
                                    >
                                        {
                                            state.lopHocs.map(l => (
                                                <Option value={l.id} key={l.id}>
                                                    {l.TenLopHoc}
                                                </Option>
                                            ))
                                        }
                                    </Select>
                                </Col>
                                <Col>
                                    <Button type='primary' onClick={() => window.open('/common/diem-ren-luyen/api/bao-cao-excel')}>Xuất file</Button>
                                </Col>
                                <Col>
                                    <Button type='primary' onClick={onOpenThongKe}>Xem thống kê</Button>
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
                        // rowSelection={{
                        //     type: 'checkbox'
                        // }}
                    />
                </Col>
            </Row>
            <ModalThongKe 
                ref={refModalThongKe}
            />
        </LayoutWrapper>
    )
};

export default GVDRL
