import { Col, notification, Row, Button } from "antd";
import React, { useReducer, useEffect, useCallback, useRef } from "react";
import LayoutWrapper from "../../../components/LayoutWrapper";
import TableDanhGia from "../../../components/TableDanhGia";
import * as DanhGiaAPI from "../../../API/DanhGiaAPI";
import { reducer } from "../../../utils";
import { axios } from "../../../config";

const SVDanhGia = () => {


    const [state, setState] = useReducer(reducer, {
        tree: [],
        dotDanhGia: null,
        danhGia: null,
        loading: false
    });

    const refTableDanhGia = useRef(null)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = useCallback(() => {
        setState({
            loading: true
        })
        DanhGiaAPI.getDanhGiaSV()
            .then(res => {
                setState({
                    tree: res?.data?.tieuChi || [],
                    dotDanhGia: res?.data?.dotDanhGia,
                    danhGia: res?.data?.danhGia
                })
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

    const onSubmit = useCallback(() => {
        refTableDanhGia?.current?.submit()
    }, [refTableDanhGia])

    const onSuccess = useCallback((values) => {
        const payload = {}
        Object.keys(values).forEach((key) => {
            if (key.includes('SoDiemSV')) {
                const id = key.split('-')[1];
                payload[id] = values[key];
            }
        })
        setState({
            loading: true
        })
        DanhGiaAPI.postDanhGiaSV(payload)
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
                        name: `SoDiemSV-${d}`,
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
    }, [refTableDanhGia])

    return (
        <LayoutWrapper className='danh-gia-page'>
            <Row className='bg-white p-3 content'>
                <Col span={24}>
                    <Row justify='space-between'>
                        <Row>
                            {/* <Col>
                                <p>{ state?.dotDanhGia?.TenDotDanhGia }</p>
                            </Col> */}
                        </Row>
                        <Row justify='end'>
                            <Col>
                                <Button type='primary' disabled={state.loading} onClick={onSubmit} >Cập nhật</Button>
                            </Col>
                        </Row>
                    </Row>
                </Col>
                <Col span={24} className='mt-3'>
                    <TableDanhGia
                        tree={state.tree}
                        loading={state.loading}
                        type={state.danhGia?.GiangVienDuyet ? null : 'SV'}
                        ref={refTableDanhGia}
                        onSuccess={onSuccess}
                    />
                </Col>
            </Row>
        </LayoutWrapper>
    )
};

export default SVDanhGia
