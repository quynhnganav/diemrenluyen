import { Col, notification, Row, Button, Table, Space, Tooltip, Badge, Select } from "antd";
import React, { useReducer, useEffect, useCallback, useRef, useMemo } from "react";
import LayoutWrapper from "../../../components/LayoutWrapper";
import { localeTable } from "../../../constant";
import { reducer, renderXepLoai } from "../../../utils";
import * as DanhGiaAPI from "../../../API/DanhGiaAPI";
import * as DM_HocKyAPI from "../../../API/DM_HocKyAPI";
import * as DM_LopHocAPI from "../../../API/DM_LopHocAPI";
import * as DM_DiemRenLuyenAPI from "../../../API/DM_DiemRenLuyenAPI";

import { useHistory } from "react-router-dom";
import { useListSinhVien } from "../../..";
import ModalGhiChu from "../../../components/ModalGhiChu";
import ModalThongKe from "../../../components/ModalThongKe";
import ModalViewChiTiet from "../../../components/ModalViewChiTiet";

const { Option } = Select

const DM_DiemRenLuyen = () => {

    const [state, setState] = useReducer(reducer, {
        sinhViens: [],
        lopHocs: [],
        hocKys: [],
        loading: false,
        selectedLop: null,
        selectedHocKy: null
    });

    const history = useHistory()

    const refModalGhiChu = useRef(null)
    const refModalThongKe = useRef(null)
    const refModalViewChiTiet = useRef(null)

    useEffect(() => {
        initData()
    }, [])

    const initData = useCallback(async () => {
        setState({ loading: true })

        try {
            const [lopHocs, hocKys] = await Promise.all([loadDataLopHoc(), loadDataHocKy()])
            const hienHanh = hocKys?.data?.find(h => h.HienHanh) ?? hocKys?.data[0];
            loadData(lopHocs?.data[1]?.id, hienHanh?.id)
            setState({
                lopHocs: lopHocs?.data,
                hocKys: hocKys?.data,
                selectedHocKy: hienHanh?.id,
                selectedLop: lopHocs?.data[1]?.id
            })
            setState({ loading: false })
        } catch (error) {
            setState({ loading: false })
        }

    }, [])

    const loadDataHocKy = useCallback(() => {
        return DM_HocKyAPI.getAllHocKy()
    }, [])

    const loadDataLopHoc = useCallback(() => {
        return DM_LopHocAPI.getAllLopHoc()
    }, [])

    const onChangeLop = useCallback((value) => {
        setState({ selectedLop: value })
        loadData(value)
    }, [])

    const onChangeHocKy = useCallback((value) => {
        setState({ selectedHocKy: value })
        loadData(null, value)
    }, [])

    const loadData = useCallback((lop, hocKy) => {
        setState({
            loading: true
        })
        DM_DiemRenLuyenAPI.getSVLop({
            lop: lop ?? state.selectedLop, hocKy: hocKy ?? state.selectedHocKy,
        })
            .then(res => {
                setState({
                    sinhViens: res?.data
                })
            })
            .catch(err => {
                notification.warning({
                    message: err?.response?.data?.message || 'Lỗi khi tải dữ liệu'
                })
                setState({
                    sinhViens: []
                })
            })
            .finally(() => setState({ loading: false }))
    }, [state])

    const onOpenGhiChu = useCallback((item) => {
        refModalGhiChu.current?.showModal(item)
    }, [])

    const onOpenThongKe = useCallback(() => {
        refModalThongKe?.current?.showModal({
            HocKy_Id: state.selectedHocKy,
            LopHoc_Id: state.selectedLop
        })
    }, [state])

    const onOpenView = useCallback((value) => {
        if (!value) {
            notification.error({
                message: 'Sinh viên chưa đánh giá'
            })
            return
        }
        refModalViewChiTiet?.current?.showModal({
            viewSv: value
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
            width: 220,
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
            width: 150,
            key: 'isDanhGia',
            render: (text) => text?.SinhVienDanhGia ? `${text?.TongSoDiemSinhVien || 0}` : 'Chưa đánh giá'
        },
        {
            title: 'CBL đánh giá',
            dataIndex: 'danhGia',
            className: 'cell-center',
            width: 150,
            key: 'cbl',
            render: (text) => text?.CanBoLopDanhGia ? text?.TongSoDiem : 'Chưa đánh giá'
        },
        {
            title: 'Xếp loại',
            dataIndex: 'danhGia',
            className: 'cell-center',
            width: 130,
            key: 'point',
            render: (text) => renderXepLoai(text?.TongSoDiem)
        },

        {
            title: 'CVHT duyệt',
            dataIndex: 'danhGia',
            className: 'cell-center',
            width: 150,
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
            width: 200,
            key: 'CVHTNhanXet`',
            render: (text, record) => `${text?.GiangVienNhanXet || ''}`
        },
        {
            title: 'Ghi chú',
            dataIndex: 'TrangThai',
            className: 'cell-center',
            width: 200,
            key: 'ghichu`',
            render: (text, record) => `${text != '0' && text || ''} ${record?.GhiChu != '0' && record?.GhiChu || ''}`
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            className: 'cell-center',
            render: (text, record, index) => (
                <Space size='middle'>
                    <Button
                        type='primary'
                        disabled={!record?.danhGia?.id}
                        onClick={() => onOpenView(record?.danhGia?.id)}
                    >
                        Xem
                    </Button>
                    <Button type='primary' onClick={() => onOpenGhiChu(record)}>Ghi chú</Button>
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
                                    <Select
                                        placeholder={'Chọn học kỳ'}
                                        value={state.selectedHocKy}
                                        onChange={onChangeHocKy}
                                    >
                                        {
                                            state.hocKys.map(l => (
                                                <Option value={l.id} key={l.id}>
                                                    {`Học kỳ ${l.TenHocKy} năm học ${l.NamBatDau} - ${l.NamKetThuc}`}
                                                </Option>
                                            ))
                                        }
                                    </Select>
                                </Col>
                                <Col>
                                    <Select
                                        placeholder={'Chọn lớp'}
                                        value={state.selectedLop}
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
                                    <Button type='primary' onClick={() => window.open('/common/diem-ren-luyen/api/bao-cao-excel')}>Báo cáo</Button>
                                </Col>
                                <Col>
                                    <Button type='primary' onClick={onOpenThongKe}>Xem thống kê</Button>
                                </Col>
                                {/* <Col>
                                    <Button type='primary'>Nhắc nhở</Button>
                                </Col> */}
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
            <ModalGhiChu
                ref={refModalGhiChu}
            />
            <ModalThongKe
                ref={refModalThongKe}
            />
            <ModalViewChiTiet
                ref={refModalViewChiTiet}
            />
        </LayoutWrapper>
    )
};

export default DM_DiemRenLuyen
