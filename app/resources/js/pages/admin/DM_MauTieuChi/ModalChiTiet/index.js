import React, { forwardRef, memo, useCallback, useImperativeHandle, useMemo, useState } from "react";
import { Button, Col, Form, Input, InputNumber, Modal, notification, Radio, Row, Space, Table, Tooltip } from "antd";
import useForm from "antd/lib/form/hooks/useForm";
import { axios } from "../../../../config";
import { isEmpty, range, set } from "lodash-es";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import './style.scss'
import { setIDTree, addNode, removeNode, setValuesTree } from "../../../../utils";

let genarateID = setIDTree()

const ModalChiTiet = forwardRef(({

}, ref) => {

    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [dataChiTiet, setDataChiTiet] = useState([])
    const [item, setItem] = useState(null);
    const [editable, setEditable] = useState(false);
    const [total, setTotal] = useState(0)
    const [diemHocTap, setDiemHocTap] = useState(null)
    const [form] = useForm()

    const loadData = useCallback((id) => {
        setLoading(true)
        axios.get(`admin/DM_MauTieuChi/${id}/tieuchi-chitiet`)
            .then(res => {
                const [newData, text, point, total, diemHocTap] = genarateID.renderTree(res?.data || [], true)
                setDataChiTiet(newData)
                setTotal(total)
                setDiemHocTap(diemHocTap)
                form?.setFieldsValue({
                    ...text,
                    ...point
                })
            })
            .finally(() => setLoading(false))
    }, [])

    const showModal = useCallback((itemInput) => {
        setItem(itemInput)
        loadData(itemInput?.id)
        setVisible(true)
    }, [])

    useImperativeHandle(ref, () => ({
        showModal
    }))

    const hiddenModal = useCallback(() => {
        setVisible(false)
        genarateID = setIDTree()
        setDataChiTiet([])
    }, [])

    const onSubmit = useCallback(async () => {
        try {
            await form?.validateFields()
        } catch (error) {
            return
        }
        setLoading(true)
        axios.put(`admin/DM_MauTieuChi/${item?.id}/update-tieuchi`, {
            tree: dataChiTiet,
            diemHocTap
        })
            .then(res => {
                console.log(res)
                notification.success({
                    message: 'Cập nhật thành công'
                })
                setEditable(false)
            })
            .catch(err => {
                notification.warning({
                    message: err?.response?.data?.message || 'Cập nhật thất bại'
                })
            })
            .finally(() => setLoading(false))
    }, [item, dataChiTiet, diemHocTap])

    const onAddNode = useCallback((id) => {
        setEditable(true)
        setDataChiTiet(data => {
            const newData = addNode(data, id)
            const [finalData, text, point, total] = genarateID.renderTree(newData, false)
            setTotal(total)
            form?.setFieldsValue({
                ...text,
                ...point
            })
            return [...finalData]
        })
    }, [])

    const onRemoveNode = useCallback((id) => {
        setEditable(true)
        setDataChiTiet(data => {
            const newData = removeNode(data, id)
            const [finalData, text, point, total] = genarateID.renderTree(newData, false)
            setTotal(total)
            form?.setFieldsValue({
                ...text,
                ...point
            })
            return [...finalData]
        })
    }, [])

    const onChangeValue = useCallback((id, value, type) => {
        setEditable(true)
        setDataChiTiet(data => {
            const newData = setValuesTree(data, id, value, type)
            const [finalData, text, point, total] = genarateID.renderTree(newData, false)
            setTotal(total)
            form?.setFieldsValue({
                ...text,
                ...point
            })
            return [...finalData]
        })
    }, [])

    const columns = useMemo(() => ([
        {
            title: 'Tiêu chí',
            dataIndex: 'TenTieuChi',
            key: 'TenTieuChi',
            render: (text, record) => (
                (
                    <Row>
                        <Col span={2}>
                            <p style={record?.level === 1 ?
                                { fontWeight: 'bold', fontSize: '18px' } :
                                record?.level === 2 ? { fontStyle: 'italic', fontSize: '16px' } : {}}>
                                {`${record?.indexs?.join('.')}.`}
                            </p>
                        </Col>
                        <Col span={22}>
                            <Form.Item name={`TenTieuChi-${record?.id}`} style={{ margin: 0 }} rules={[ {required: true, message: 'Nhập tiêu chí'} ]}>
                                <Input onChange={(value) => onChangeValue(record?.id, value?.target?.value, 'TenTieuChi')} />
                            </Form.Item>
                        </Col>
                    </Row>
                )
            )

        },
        {
            title: () => (
                <>
                    <p>Số điểm</p>
                    <p>({total})</p>
                </>
            ),
            dataIndex: 'SoDiem',
            key: 'SoDiem',
            width: 150,
            className: 'cell-center',
            render: (text, record) => (
                <Form.Item name={`SoDiem-${record?.id}`} style={{ margin: 0 }}>
                    <InputNumber disabled={!isEmpty(record?.children)} onChange={(value) => onChangeValue(record?.id, value, 'SoDiem')} />
                </Form.Item>
            )
        },
        {
            title: () => (
                <Space size='middle'>
                    <Tooltip title="Thêm mới trước">
                        <Button
                            type='primary'
                            icon={<PlusOutlined />}
                            onClick={() => onAddNode(-1)}
                        />
                    </Tooltip>
                    <Tooltip title="Thêm mới sau">
                        <Button
                            type='primary'
                            icon={<PlusOutlined />}
                            onClick={() => onAddNode(-2)}
                        />
                    </Tooltip>
                </Space>
            ),
            dataIndex: 'action',
            key: 'action',
            className: 'cell-center',
            width: 200,
            fixed: 'right',
            render: (text, record) => (
                <Space size='middle'>
                    <Tooltip title="Thêm mới">
                        <Button
                            type='primary'
                            icon={<PlusOutlined />}
                            onClick={() => onAddNode(record?.id)}
                        />
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <Button
                            type='dashed'
                            icon={<DeleteOutlined />}
                            onClick={() => onRemoveNode(record?.id)}
                        />
                    </Tooltip>
                </Space>
            )
        }
    ]), [total])

    return (
        <Modal
            visible={visible}
            okButtonProps={{
                loading,
                disabled: !editable
            }}
            onCancel={hiddenModal}
            onOk={onSubmit}
            width={1500}
            okText='Cập nhật'
            cancelText='Hủy'
            centered
            maskClosable={false}
            title={`Cập nhật tiêu chí - ${item?.TenMauTieuChi}`}
        >
            <Form
                name="basic"
                form={form}
            >
                <Table
                    expandable={{
                        defaultExpandAllRows: true,
                        expandedRowKeys: range(200),
                        expandIcon: null,
                        indentSize: 20
                    }}
                    rowSelection={{
                        type: 'radio',
                        columnTitle: 'Điểm học tập',
                        selectedRowKeys: [diemHocTap],
                        onSelect: (record) => {
                            if (record.children && record.children.length > 0) return
                            setDiemHocTap(record.id);
                            // console.log(record);
                        }
                    }}
                    rowKey={(v) => v?.id}
                    bordered
                    columns={columns}
                    dataSource={dataChiTiet}
                    loading={loading}
                    style={{
                        height: 'calc(100vh - 200px)',
                        maxHeight: 'calc(100vh - 200px)'
                    }}
                    pagination={false}
                    scroll={{
                        x: 800,
                        y: 'calc(100vh - 300px)'
                    }}
                />
            </Form>
        </Modal>
    )

})

export default memo(ModalChiTiet)