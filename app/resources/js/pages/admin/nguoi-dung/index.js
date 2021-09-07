import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Button, Row, Table, Col, Space, Modal, notification, Tooltip, Select, Input, Tag } from "antd";
import { useDataProps } from "../../..";
import './style.scss'
import LayoutWrapper from "../../../components/LayoutWrapper";
import { delaySearch, reducer } from "../../../utils/index";
import * as DM_SinhVienAPI from "../../../API/DM_SinhVienAPI";
import * as DM_LopHocAPI from "../../../API/DM_LopHocAPI";
import * as UserAPI from "../../../API/UserAPI";

const { Option } = Select

let idQuery = 0

const User = () => {

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

    const loadData = (pageNumber, search) => {
        setState({
            loading: true
        })
        const currentQuery = Date.now()
        idQuery = currentQuery
        UserAPI.getPaginateUser({
            page: pageNumber || state.pageNumber,
            search
        }).then((res) => {
            if (idQuery !== currentQuery) return
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

    const onSearch = useCallback((e) => {
        loadData(null, e.target.value)
    }, [state, loadData])

    const columns = useMemo(() => (
        [
            {
                title: 'STT',
                dataIndex: 'id',
                key: 'id',
                fixed: 'left',
                className: 'cell-center',
                width: 100,
                render: (text, record, index) =>
                    <Tooltip placement='top' title={text}>
                        {state.pageSize * (state.pageNumber - 1) + index + 1}
                    </Tooltip>
            },
            {
                title: 'Tên',
                dataIndex: 'chucVu',
                key: 'ten',
                width: 300,
                render: (text, record) =>
                    <Tooltip placement='top' title={record?.email}>
                        {`${text?.ChucDanh? `${ text?.ChucDanh }. `: text?.MaSV ? 'SV. ' : 'ADMIN. '}${record?.HoDem} ${record?.Ten}${text?.MaSV ? ` - ${text.MaSV}` : ''}`}
                    </Tooltip>
            },
            {
                title: 'Lớp',
                dataIndex: 'chucVu',
                key: 'Lop',
                className: 'cell-center',
                width: 150,
                render: (text) => (
                    text?.lopHoc ? <Tag color='cyan'>{text?.lopHoc?.TenLopHoc}</Tag> :
                        text?.lopHocs?.map(r => (
                            <Tag color="green">{r?.TenLopHoc}</Tag>
                        ))
                )
            },
            {
                title: 'Số điện thoại',
                dataIndex: 'SoDienThoai',
                key: 'SoDienThoai',
                width: 150,
                className: 'cell-center'
            },
            {
                title: 'Chức vụ',
                dataIndex: 'roles',
                key: 'roles',
                className: 'cell-center',
                width: 200,
                render: (text) => text?.map(r => (
                    <Tag color={r?.id == 1 ? 'red': r?.id == 2 ? 'green' : r?.id == 3 ? 'blue' : 'gold'}>{r?.show_name}</Tag>
                ))
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                className: 'cell-center',
                width: 300,
                render: (text, record) => (
                    <Space size='middle'>
                        <Button
                            type='primary'
                            // onClick={() => refModal?.current?.showModal(record)}
                        >
                            Chỉnh sửa
                        </Button>
                        <Button
                            danger
                            disabled={record?.chucVu || record?.isRoot}
                        >
                            Xóa
                        </Button>
                    </Space>
                )
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
                                style={{ width: '100%' }}
                                defaultValue='*'
                            >
                                <Option value='*'>Tất cả</Option>
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
                        <Col>
                            <Input onChange={delaySearch(onSearch, 300)} />
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

export default User