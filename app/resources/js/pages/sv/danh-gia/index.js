import { Col, notification, Row, Button } from "antd";
import React, { useReducer, useEffect, useCallback, useRef } from "react";
import LayoutWrapper from "../../../components/LayoutWrapper";
import TableDanhGia from "../../../components/TableDanhGia";
import * as DanhGiaAPI from "../../../API/DanhGiaAPI";
import { reducer } from "../../../utils";

const SVDanhGia = () => {


    const [state, setState] = useReducer(reducer, {
        tree: [],
        dotDanhGia: null,
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
                    dotDanhGia: res?.data?.dotDanhGia
                })
            })
            .catch(err => {
                notification.error({
                    message: 'Lỗi khi tải dữ liệu'
                })
            })
            .finally(() => setState({
                loading: false
            }))
    }, [])

    const onSubmit = useCallback(() => {
        refTableDanhGia?.current?.submit()
    })

    const onSuccess = useCallback((values) => {
        console.log(values)
    }, [])

    return (
        <LayoutWrapper className='danh-gia-page'>
            <Row className='bg-white p-3 content'>
                <Col span={24}>
                    <Row justify='space-between'>
                        <Row>
                            <Col>
                                <p>{ state?.dotDanhGia?.TenDotDanhGia }</p>
                            </Col>
                        </Row>
                        <Row justify='end'>
                            <Col>
                                <Button type='primary' disabled={state.loading} onClick={onSubmit} >Lưu</Button>
                            </Col>
                        </Row>
                    </Row>
                </Col>
                <Col span={24} className='mt-3'>
                    <TableDanhGia
                        tree={state.tree}
                        loading={state.loading}
                        type='SV'
                        ref={refTableDanhGia}
                        onSuccess={onSuccess}
                    />
                </Col>
            </Row>
        </LayoutWrapper>
    )
};

export default SVDanhGia