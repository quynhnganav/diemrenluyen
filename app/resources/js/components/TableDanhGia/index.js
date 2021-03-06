import { Form, InputNumber, Table, Tooltip } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useReducer } from "react";
import { flattenTree, reducer, setValuesTree } from "../../utils";
import "./style.scss";

const genIndex = (level, index) => {
    const obj = {
        '1.1': '1.',
        '1.2': '2.',
        '1.3': '3.',
        '1.4': '4.',
        '1.5': '5.',
        '2.1': 'a)',
        '2.2': 'b)',
        '2.3': 'c)',
        '2.4': 'd)',
        '2.5': 'e)',
    }
    return obj[`${level}.${index[level - 1]}`] || '-'
}

const TableDanhGia = forwardRef(({
    tree,
    loading,
    type,
    onSuccess
}, ref) => {

    const [state, setState] = useReducer(reducer, {
        raw: [],
        tieuChis: [],
        totalSV: 0,
        totalCBL: 0,
        total: 0
    })

    const [form] = useForm()

    const scrollToTop = useCallback(() => {
        const ele = document.querySelector('.table-danh-gia .ant-table-body')
        ele?.scroll({
            behavior: 'smooth',
            top: 0
        })
    }, [])

    useEffect(() => {
        const [data, total, formValue, sv, cbl] = flattenTree(tree || [])
        setState({
            tieuChis: data,
            raw: tree,
            totalSV: sv,
            totalCBL: cbl,
            total
        })
        form?.setFieldsValue(formValue)
        scrollToTop()
    }, [tree])

    const submit = useCallback(() => {
        form?.submit()
    }, [form])

    const setFieldsValue = useCallback((values) => {
        form?.setFields(values)
    }, [form])

    const onFinish = useCallback((values) => {
        console.log(values)
        onSuccess && onSuccess(values)
    }, [onSuccess])



    useImperativeHandle(ref, () => ({
        submit,
        setFieldsValue,
        scrollToTop
    }))

    const onChangeValue = useCallback((value, id, type) => {
        const newTree = setValuesTree(state.raw, id, value, type)
        const [data, total, formValue, sv, cbl] = flattenTree(newTree)
        form?.setFieldsValue(formValue)
        setState({
            tieuChis: data,
            raw: newTree,
            totalSV: sv,
            totalCBL: cbl,
            total
        })
    }, [state.raw])

    const columns = useMemo(() => ([
        {
            title: "N???i dung v?? ti??u ch?? ????nh gi??",
            dataIndex: "TenTieuChi",
            key: "TenTieuChi",
            render: (text, record) =>
                <p className={`TenTieuChi${record.level}`}>
                    {genIndex(record?.level, record?.index)} {text} {record?.isDiemHocTap ? <strong>(??i???m ???????c l???y theo h??? th???ng ????o t???o)</strong> : ''}
                </p>
        },
        {
            title: () => (
                <>
                    <p>Khung ??i???m t???i ??a</p>
                    <p>({state.total})</p>
                </>
            ),
            dataIndex: "SoDiem",
            className: 'cell-center',
            width: 120,
            key: "SoDiem"
        },
        {
            title: () => (
                <>
                    <p>??i???m</p>
                    <p>(do sinh vi??n t??? ????nh gi??)</p>
                    <p>({state.totalSV})</p>
                </>
            ),
            dataIndex: "myPoint",
            className: 'cell-center',
            width: 130,
            key: "myPoint",
            render: (text, record) => (
                <Tooltip placement='top' title={record?.TenTieuChi}>
                    <Form.Item name={`SoDiemSV-${record.id}`} style={{ margin: 0 }}
                        rules={[
                            { required: 'true', message: 'Nh???p ??i???m' },
                        ]}
                    >
                        <InputNumber
                            disabled={record.isParent || type === 'CBL' || !type || record.isDiemHocTap}
                            min={0}
                            max={record.SoDiem}
                            onChange={value => onChangeValue(value, record?.id, 'SoDiemSV')}
                        />
                    </Form.Item>
                </Tooltip>
            )
        },
        {
            title: () => (
                <>
                    <p>??i???m</p>
                    <p>(do t???p th??? l???p ????nh gi??)</p>
                    <p>({state.totalCBL})</p>
                </>
            ),
            dataIndex: "CBLPoint",
            className: 'cell-center',
            width: 130,
            key: "CBLPoint",
            render: (text, record) => (
                <Tooltip placement='top' title={record?.TenTieuChi}>
                    <Form.Item name={`SoDiemCBL-${record.id}`} style={{ margin: 0 }}
                        rules={[
                            { required: 'true', message: 'Nh???p ??i???m' },
                        ]}
                    >
                        <InputNumber
                            disabled={record.isParent || type === "SV" || !type || record.isDiemHocTap}
                            min={0}
                            max={record.SoDiem}
                            onChange={value => onChangeValue(value, record?.id, 'SoDiemCBL')}
                        />
                    </Form.Item>
                </Tooltip>
            )
        },
    ]), [state])

    // console.log(state.tieuChis)

    return (
        <>
            <Form
                form={form}
                name='form-danh-gia'
                onFinish={onFinish}
            >
                <Table
                    columns={columns}
                    bordered
                    loading={loading}
                    dataSource={state.tieuChis}
                    rowKey={(v) => v?.id}
                    scroll={{ x: 700, y: 'calc(100vh - 290px)' }}
                    pagination={false}
                    locale={{
                        emptyText: 'Kh??ng c?? d??? li???u'
                    }}
                    className='table-danh-gia'
                />
            </Form>
        </>
    )
})

export default memo(TableDanhGia)