import { Col, notification, Row, Button, Select } from "antd";
import React, { useReducer, useEffect, useCallback, useRef } from "react";
import LayoutWrapper from "../../../../components/LayoutWrapper";
import TableDanhGia from "../../../../components/TableDanhGia";
import * as DanhGiaAPI from "../../../../API/DanhGiaAPI";
import { reducer } from "../../../../utils";
import { axios } from "../../../../config";
import { useListSinhVien } from "../../../..";
import { useHistory, useParams } from "react-router-dom";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";

const { Option } = Select

const SVDanhGia = () => {


    const [state, setState] = useReducer(reducer, {
        tree: [],
        dotDanhGia: null,
        sinhVien: null,
        loading: false
    });
    const { idSV } = useParams()
    const history = useHistory()
    const { gotoSV, nextSV, prevSV, next, prev, dsSinhViens } = useListSinhVien();

    const refTableDanhGia = useRef(null)

    useEffect(() => {
        if (!idSV) return
        gotoSV(idSV)
        loadData(idSV)
    }, [idSV])

    const loadData = useCallback((id) => {
        setState({
            loading: true
        })
        DanhGiaAPI.getCBLDanhGiaSv(id)
            .then(res => {
                setState({
                    tree: res?.data?.tieuChi || [],
                    dotDanhGia: res?.data?.dotDanhGia,
                    sinhVien: res?.data?.sinhVien
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
        history.push(`/sv/cbl/danh-gia/${next?.id}?masv=${next?.MaSV}`)
    }, [next])

    const onPrev = useCallback(() => {
        if (!prev) return
        history.push(`/sv/cbl/danh-gia/${prev?.id}?masv=${next?.MaSV}`)
    }, [prev])

    console.log(next, prev)

    return (
        <LayoutWrapper className='danh-gia-page'>
            <Row className='bg-white p-3 content'>
                <Col span={24}>
                    <Row>
                        <Col span={12}>
                            <Row>
                                <Col>
                                    <p>{`${state?.sinhVien?.user?.HoDem || ''} ${state?.sinhVien?.user?.Ten || ''} - ${state?.sinhVien?.MaSV || ''}`}</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row justify='end' gutter={[5, 5]}>
                                <Col span={10}>
                                    <Select
                                        showSearch
                                        placeholder='Chọn sinh viên'
                                        notFoundContent='Không có sinh viên'
                                        // value={idSV}
                                        defaultValue={idSV}
                                        style={{
                                            width: '100%',
                                        }}
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
                                    <Button type='primary' disabled={state.loading} onClick={onSubmit} >Cập nhật</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col span={24} className='mt-3'>
                    <TableDanhGia
                        tree={state.tree}
                        loading={state.loading}
                        type='CBL'
                        ref={refTableDanhGia}
                        onSuccess={onSuccess}
                    />
                </Col>
            </Row>
        </LayoutWrapper>
    )
};

export default SVDanhGia
