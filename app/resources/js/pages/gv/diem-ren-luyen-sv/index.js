import { Col, notification, Row, Button, Select } from "antd";
import React, { useReducer, useEffect, useCallback, useRef } from "react";
import LayoutWrapper from "../../../components/LayoutWrapper";
import TableDanhGia from "../../../components/TableDanhGia";
import * as DanhGiaAPI from "../../../API/DanhGiaAPI";
import * as GVAPI from "../../../API/GVAPI";
import { reducer, toUnsigned } from "../../../utils";
import { axios } from "../../../config";
import { useListSinhVien } from "../../..";
import { useHistory, useParams } from "react-router-dom";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import ModalGhiChu from "../../../components/ModalGhiChu";
import { isEmpty } from "lodash";

const { Option } = Select

const SVDanhGia = () => {


    const [state, setState] = useReducer(reducer, {
        tree: [],
        dotDanhGia: null,
        sinhVien: null,
        loading: false,
        danhGia: null,
    });
    const { idSV } = useParams()
    const history = useHistory()
    const { gotoSV, current, next, prev, dsSinhViens } = useListSinhVien();

    const refTableDanhGia = useRef(null)
    const refModalGhiChu = useRef(null)

    useEffect(() => {
        if (!idSV) return
        gotoSV(idSV)
        loadData(idSV)
    }, [idSV])

    const loadData = useCallback((id) => {
        setState({
            loading: true
        })
        GVAPI.getGVDanhGiaSv(id)
            .then(res => {
                setState({
                    tree: res?.data?.tieuChi || [],
                    dotDanhGia: res?.data?.dotDanhGia,
                    sinhVien: res?.data?.sinhVien,
                    danhGia: res?.data?.danhGia
                })
                if (!res?.data?.danhGia?.SinhVienDanhGia) {
                    notification.warn({
                        message: 'Sinh viên chưa đánh giá'
                    })
                }
                if (!res?.data?.danhGia?.CanBoLopDanhGia) {
                    notification.warn({
                        message: 'Cán bộ lớp chưa đánh giá'
                    })
                }
            })
            .catch(err => {
                notification.warning({
                    message: err?.response?.data?.message || 'Lỗi khi tải dữ liệu'
                })
            })
            .finally(() => setState({
                loading: false
            }))
    }, [])

    const onSuccess = useCallback((values) => {
        const payload = {}
        Object.keys(values).forEach((key) => {
            if (key.includes('SoDiemCBL')) {
                const id = key.split('-')[1];
                payload[id] = values[key];
            }
        })
        setState({
            loading: true
        })
        DanhGiaAPI.postCBLDanhGiaSV(idSV, payload)
            .then(response => {
                notification.success({
                    message: 'Cập nhật thành công'
                })
            })
            .catch(err => {
                console.log(err?.response)
                if (err?.response?.status == 422) {
                    const data = err?.response?.data || []
                    const errors = data.map((d) => ({
                        name: `SoDiemCBL-${d}`,
                        errors: ['Lỗi']
                    }))
                    refTableDanhGia?.current?.setFieldsValue(errors)
                }
                else notification.error({
                    message: 'Lỗi'
                })
            })
            .finally(() => setState({
                loading: false
            }))
    }, [refTableDanhGia, idSV])

    const onNext = useCallback(() => {
        if (!next) return
        history.push(`/gv/diem-ren-luyen/${next?.id}`)
    }, [next])

    const onPrev = useCallback(() => {
        if (!prev) return
        history.push(`/gv/diem-ren-luyen/${prev?.id}`)
    }, [prev])

    const gotoSVChange = useCallback((id) => {
        if (!id) return
        history.push(`/gv/diem-ren-luyen/${id}`)
    }, [])

    const onOpenGhiChu = useCallback((item) => {
        refModalGhiChu?.current?.showModal(item, state.danhGia?.GiangVienNhanXet)
    }, [state.danhGia])

    const onSubmitNhanXet = useCallback((value, cb) => {
        console.log(state?.danhGia)
        if (!state.danhGia?.id) {
            notification.error({
                message: 'Cán bộ lớp chưa đánh giá'
            })
            return
        }
        setState({ loading: true })
        GVAPI.putGVNhanXet(state.danhGia?.id, {
            nhanXet: value
        }).then((res) => {
            setState({
                loading: false,
                danhGia: res?.data
            })
            notification.success({
                message: 'Đã nhận xét'
            })
        })
            .catch((err) => {
                console.log(err?.response)
                notification.error({
                    message: err?.response?.data?.message
                })
                setState({ loading: false })
            })
            .finally(cb)
    }, [state.danhGia])

    const duyet = useCallback(() => {
        if (!state.danhGia?.id) {
            notification.error({
                message: 'Cán bộ lớp chưa đánh giá'
            })
            return
        }
        setState({ loading: true })
        GVAPI.putGVDuyet(state.danhGia?.id)
            .then((res) => {
                setState({
                    loading: false,
                    danhGia: res?.data
                })
                notification.success({
                    message: 'Đã duyệt'
                })
            })
            .catch((err) => {
                notification.error({
                    message: err?.response?.data?.message
                })
                setState({ loading: false })
            })

    }, [state.danhGia])

    const trangThai = current?.TrangThai ? current?.TrangThai == '0' ? '' : `(${current?.TrangThai})` : state?.sinhVien?.TrangThai ? state?.sinhVien?.TrangThai == '0' ? '' : `(${state?.sinhVien?.TrangThai })` : ''

    return (
        <LayoutWrapper className='danh-gia-page'>
            <Row className='bg-white p-3 content'>
                <Col span={24}>
                    <Row>
                        <Col span={12}>
                            <Row>
                                <Col>
                                    <p>
                                        {`${current?.user?.HoDem || state?.sinhVien?.user?.HoDem || ''} ${current?.user?.Ten || state?.sinhVien?.user?.Ten || ''} - ${current?.MaSV || state?.sinhVien?.MaSV || ''} 
                                        ${state.loading ? '' : trangThai}`}
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row justify='end' gutter={[5, 5]}>
                                {
                                    dsSinhViens && dsSinhViens.length > 0 &&
                                    <Col span={10}>
                                        <Select
                                            showSearch
                                            placeholder='Chọn sinh viên'
                                            notFoundContent='Không có sinh viên'
                                            value={Number(idSV)}
                                            filterOption={(input, option) =>
                                                toUnsigned(option.children.toLowerCase()).indexOf(toUnsigned(input.toLowerCase())) >= 0
                                            }
                                            style={{
                                                width: '100%',
                                            }}
                                            onChange={gotoSVChange}
                                        >
                                            {
                                                dsSinhViens?.map(d => (
                                                    <Option value={d?.id} key={d?.id}>
                                                        {`${d?.MaSV || ''} - ${d?.user?.HoDem || ''} ${d?.user?.Ten || ''}`}
                                                    </Option>
                                                ))
                                            }
                                        </Select>
                                    </Col>
                                }
                                <Col>
                                    <Button
                                        type='primary'
                                        disabled={state.loading || !prev}
                                        icon={<LeftCircleOutlined />}
                                        onClick={onPrev}
                                    />
                                </Col>
                                <Col>
                                    <Button
                                        type='primary'
                                        disabled={state.loading || !next}
                                        icon={<RightCircleOutlined />}
                                        onClick={onNext}
                                    />
                                </Col>
                                <Col>
                                    <Button type='primary' disabled={state.loading} onClick={onOpenGhiChu}>Nhận xét</Button>
                                </Col>
                                <Col>
                                    <Button type={state.danhGia?.GiangVienDuyet ? 'dashed' : 'primary'} disabled={state.loading || isEmpty(state?.danhGia?.CanBoLopDanhGia)} onClick={duyet}>
                                        {state.danhGia?.GiangVienDuyet ? 'Bỏ duyệt' : 'Duyệt'}
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col span={24} className='mt-3'>
                    <TableDanhGia
                        tree={state.tree}
                        loading={state.loading}
                        ref={refTableDanhGia}
                        onSuccess={onSuccess}
                    />
                </Col>
            </Row>
            <ModalGhiChu
                ref={refModalGhiChu}
                onSubmit={onSubmitNhanXet}
            />
        </LayoutWrapper>
    )
};

export default SVDanhGia
