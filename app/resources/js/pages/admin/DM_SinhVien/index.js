import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Button, Row, Table, Col, Space, Modal, notification, Tooltip, Select } from "antd";
import { useDataProps } from "../../..";
import './style.scss'
import LayoutWrapper from "../../../components/LayoutWrapper";
import { reducer } from "../../../utils/index";
import * as DM_SinhVienAPI from "../../../API/DM_SinhVienAPI";
import * as DM_LopHocAPI from "../../../API/DM_LopHocAPI";

const { Option } = Select

const DM_LopHoc = () => {

    const { data } = useDataProps()

    const [state, setState] = useReducer(reducer, {
        data: [],
        dataLopHoc: [],
        loading: false,
        pageSize: 50,
        pageNumber: 1,
        total: 0
    })

    useEffect(() => {
        loadData()
        loadLopHoc()
    }, [])

    const loadData = (pageNumber) => {
        setState({
            loading: true
        })
        DM_SinhVienAPI.getPaginateSinhVien({
            page: pageNumber || state.pageNumber
        }).then((res) => {
            setState({
                data: res?.data?.data || [],
                pageNumber: res?.data?.current_page || 0,
                pageSize: res?.data?.per_page || 0,
                total: res?.data?.total || 0,
                loading: false
            })
        }).finally(() => setState({ loading: false }))
    }

    const loadLopHoc = useCallback(() => {
        DM_LopHocAPI.getAllLopHoc()
            .then(res => {
                setState({
                    dataLopHoc: res?.data || []
                })
            })
    }, [])

    const onSync = useCallback(() => {
        setState({
            loading: true
        })
        DM_SinhVienAPI.syncDataLopHoc().then((res) => {
            notification.success({
                message: 'Cập nhật thành công'
            })
        })
            .catch((err) => {
                notification.error({
                    message: 'Lỗi khi cập nhật'
                })
            })
            .finally(() => setState({ loading: false }))
    }, [])

    const onChange = useCallback((page, pageSize) => {
        loadData(page)
    }, [loadData])

    const columns = useMemo(() => (
        [
            {
                title: 'STT - Mã SV',
                dataIndex: 'id',
                key: 'id',
                fixed: 'left',
                className: 'cell-center',
                render: (text, record, index) =>
                    <Tooltip placement='top' title={text}>
                        {state.pageSize * (state.pageNumber - 1) + index + 1} - {record?.MaSV}
                    </Tooltip>
            },
            {
                title: 'Tên sinh viên',
                dataIndex: 'user',
                key: 'user',
                render: (text) =>
                    <Tooltip placement='top' title={text?.email}>
                        {`${text?.HoDem} ${text?.Ten}`}
                    </Tooltip>
            },
            {
                title: 'Lớp',
                dataIndex: 'lopHoc',
                key: 'lopHoc',
                className: 'cell-center',
                render: (text) => text?.TenLopHoc
            },
            {
                title: 'Số điện thoại',
                dataIndex: 'user',
                key: 'user',
                className: 'cell-center',
                render: (text) => text?.SoDienThoai
            },
            {
                title: 'Chuyên ngành',
                className: 'cell-center',
                dataIndex: 'TenNganh',
                key: 'TenNganh'
            },
            {
                title: 'Tình trạng',
                dataIndex: 'TrangThai',
                className: 'cell-center',
                key: 'TrangThai',
                render: (text) => text != '0' && text
            },

        ]
    ), [state.pageSize, state.pageNumber])

    return (
        <LayoutWrapper className='dot-danh-gia-wrapper' >
            <Row className='bg-white p-3 content'>
                <Col span={24}>
                    <Row gutter={[5, 5]}>
                        <Col span={6}>
                            <Select
                                style={{width: '100%'}}
                                defaultValue='*'
                            >
                                <Option value='*' >Tất cả</Option>
                                {
                                    state?.dataLopHoc?.map(d => (
                                        <Option value={d?.id} key={d?.id} >
                                            {d?.TenLopHoc}
                                        </Option>
                                    ))
                                }
                            </Select>
                        </Col>
                        <Col>
                            <Button type='primary' onClick={onSync}>Cập nhật</Button>
                        </Col>
                    </Row>
                </Col>
                <Col span={24} className='mt-3'>
                    <Table
                        bordered
                        loading={state.loading}
                        columns={columns}
                        scroll={{ x: 700, y: 'calc(100vh - 290px)' }}
                        dataSource={state.data}
                        rowKey={(v) => v?.id}
                        pagination={{
                            current: state.pageNumber,
                            total: state.total,
                            pageSize: state.pageSize,
                            onChange
                        }}
                    />
                </Col>
            </Row>
        </LayoutWrapper>
    )
}

export default DM_LopHoc