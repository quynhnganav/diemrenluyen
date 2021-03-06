import { Col, notification, Row, Button, Table, Space, Tooltip, Badge, Select, Menu, Dropdown } from "antd";
import React, { useReducer, useEffect, useCallback, useRef, useMemo } from "react";
import { UserOutlined, MoreOutlined } from "@ant-design/icons";
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
        return DM_HocKyAPI.getAllDotDanhGia()
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
                    message: err?.response?.data?.message || 'L???i khi t???i d??? li???u'
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
                message: 'Sinh vi??n ch??a ????nh gi??'
            })
            return
        }
        refModalViewChiTiet?.current?.showModal({
            viewSv: value
        })
    }, [state])

    const handleMenuClick = (e, record) => {
        if (e?.key == '1') {
            onOpenView(record?.danhGia?.id)
        }
        if (e?.key == '2') {
            onOpenGhiChu(record)
        }
    }

    const menu = (item) => (
        <Menu onClick={e => handleMenuClick(e, item)}>
            <Menu.Item key="1" icon={<UserOutlined />}>
                Xem
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
                Ghi ch??
            </Menu.Item>
        </Menu>
    );

    const columns = useMemo(() => ([
        {
            title: 'M?? SV',
            dataIndex: 'masv',
            className: 'cell-center',
            width: 100,
            fixed: 'left',
            key: 'masv'
        },
        {
            title: 'H??? t??n SV',
            dataIndex: 'user',
            width: 180,
            key: 'HoTenSinhVien',
            render: (text, record) =>
                <Tooltip placement='top' title={text?.email}>
                    <Badge status={(record?.danhGia?.SinhVienDanhGia && record?.danhGia?.CanBoLopDanhGia) ? 'success' : record?.danhGia?.SinhVienDanhGia || record?.danhGia?.CanBoLopDanhGia ? 'warning' : 'error'} />
                    {`${record?.hodem} ${record?.ten}`}
                </Tooltip>
        },
        {
            title: 'SV ????nh gi??',
            dataIndex: 'danhGia',
            className: 'cell-center',
            width: 100,
            key: 'isDanhGia',
            render: (text) => text?.SinhVienDanhGia ? `${text?.TongSoDiemSinhVien || 0}` : 'Ch??a ????nh gi??'
        },
        {
            title: 'CBL ????nh gi??',
            dataIndex: 'danhGia',
            className: 'cell-center',
            width: 130,
            key: 'cbl',
            render: (text) => text?.CanBoLopDanhGia ? `${text?.TongSoDiem} - ${renderXepLoai(text?.TongSoDiem)}` : 'Ch??a ????nh gi??'
        },
        {
            title: 'CVHT duy???t',
            dataIndex: 'danhGia',
            className: 'cell-center',
            width: 100,
            key: 'cvht',
            render: (text) => text?.GiangVienDuyet ?
                <>
                    <Badge status='success' />
                    ???? duy???t
                </> : <>
                    <Badge status='warning' />
                    Ch??a duy???t
                </>
        },
        {
            title: 'CVHT nh???n x??t',
            dataIndex: 'danhGia',
            className: 'cell-center',
            width: 100,
            key: 'CVHTNhanXet`',
            render: (text, record) => `${text?.GiangVienNhanXet || ''}`
        },
        {
            title: 'Ghi ch??',
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
            className: 'cell-center',
            width: 50,
            fixed: 'right',
            render: (text, record, index) => (
                <Space size='middle'>
                    <Dropdown.Button overlay={menu(record)} icon={<MoreOutlined />} className='dropdown-menu-custom-more-grid'>
                    </Dropdown.Button>
                </Space>
            )
        }
    ]), [state.sinhViens])

    console.log(state.hocKys)

    return (
        <LayoutWrapper className='admin-diem-ren-luyen-page'>
            <Row className='bg-white p-3 content'>
                <Col span={24}>
                    <Row justify='space-between' gutter={[5, 5]}>
                        <Col>
                            S??? l?????ng sinh vi??n: {state?.sinhViens?.length}
                        </Col>
                        <Col>
                            <Row gutter={[5, 5]}>
                                <Col>
                                    <Select
                                        placeholder={'Ch???n h???c k???'}
                                        value={state.selectedHocKy}
                                        onChange={onChangeHocKy}
                                    >
                                        {
                                            state.hocKys.map(l => (
                                                <Option value={l.id} key={l.id}>
                                                    {`H???c k??? ${l.hocKy?.hocky} n??m h???c ${l.hocKy?.nambatdau} - ${l.hocKy?.namketthuc}`}
                                                </Option>
                                            ))
                                        }
                                    </Select>
                                </Col>
                                <Col>
                                    <Select
                                        placeholder={'Ch???n l???p'}
                                        value={state.selectedLop}
                                        onChange={onChangeLop}
                                    >
                                        {
                                            state.lopHocs.map(l => (
                                                <Option value={l.id} key={l.id}>
                                                    {l.tenlop}
                                                </Option>
                                            ))
                                        }
                                    </Select>
                                </Col>
                                <Col>
                                    <Button type='primary' onClick={() => window.open('/common/diem-ren-luyen/api/bao-cao-excel')}>B??o c??o</Button>
                                </Col>
                                <Col>
                                    <Button type='primary' onClick={onOpenThongKe}>Xem th???ng k??</Button>
                                </Col>
                                {/* <Col>
                                    <Button type='primary'>Nh???c nh???</Button>
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
