import { Form, Input, InputNumber, notification, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import Modal from "antd/lib/modal/Modal";
import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { axios } from "../../../../config";
import * as DM_DotDanhGiaAPI from "../../../../API/DM_DotDanhGiaAPI";
import * as DM_HocKyAPI from "../../../../API/DM_HocKyAPI";
import * as DM_MauTieuChiAPI from "../../../../API/DM_MauTieuChiAPI";

const { Option } = Select

const ModalForm = forwardRef(({
    callback,
    dotDanhGia
}, ref) => {

    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [item, setItem] = useState(null)
    const [hocKys, setHocKys] = useState([]);
    const [mauTieuChis, setMauTieuChis] = useState([]);
    const [form] = useForm()

    const showModal = useCallback((itemInput) => {
        if (itemInput) {
            setItem(itemInput)
            form?.setFieldsValue({
                ...itemInput
            })
        } else
            form?.setFieldsValue({
                TongSoDiem: 100
            })
        setVisible(true)
    }, [])

    const loadHocKy = useCallback(() => {
        DM_HocKyAPI.getAllHocKy()
            .then(res => {
                setHocKys(res?.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const loadMauTieuChi = useCallback(() => {
        DM_MauTieuChiAPI.getAllMauTieuChi()
            .then(res => {
                setMauTieuChis(res?.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        loadHocKy()
        loadMauTieuChi()
    }, [])

    useImperativeHandle(ref, () => ({
        showModal
    }))

    const hiddenModal = useCallback(() => {
        setVisible(false)
        setItem(null)
        setLoading(false)
        form?.resetFields()
    }, [])

    const onFinish = useCallback((values) => {
        setLoading(true)
        if (item) {
            DM_HocKyAPI.updateDotDanhGia(item?.id, values)
                .then(res => {
                    console.log(res)
                    notification.success({
                        message: 'Chỉnh sửa thành công'
                    })
                    callback && callback()
                    hiddenModal()
                })
                .catch(err => {
                    console.log(err)
                    notification.error({
                        message: 'Lỗi khi chỉnh sửa'
                    })
                })
                .finally(() => setLoading(false))
        }
        else
            DM_HocKyAPI.createDotDanhGia(values)
                .then(res => {
                    console.log(res)
                    notification.success({
                        message: 'Thêm mới thành công'
                    })
                    callback && callback()
                    hiddenModal()
                })
                .catch(err => {
                    console.log(err)
                    notification.error({
                        message: 'Lỗi khi thêm mới'
                    })
                })
                .finally(() => setLoading(false))
    }, [item])

    const onSubmit = useCallback((values) => {
        form?.submit()
    }, [])

    const hocKyDaTao = dotDanhGia?.map(d => d.HocKy_Id) || []

    return (
        <Modal
            visible={visible}
            onCancel={hiddenModal}
            onOk={onSubmit}
            okButtonProps={{
                loading: loading
            }}
            centered
            title={item?.TenDotDanhGia || 'Thêm mới đợt đánh giá'}
            okText={item ? 'Cập nhật' : 'Thêm mới'}
            cancelText='Hủy'
        >
            <Form
                layout='vertical'
                wrapperCol={{ span: 24 }}
                labelCol={{ span: 24 }}
                onFinish={onFinish}
                form={form}
            >
                <Form.Item
                    label='Học kỳ'
                    name='HocKy_Id'
                    rules={[{ required: true, message: 'Chọn học kỳ' }]}
                >
                    <Select
                        showSearch
                        placeholder="Chọn học kỳ"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        disabled={item?.PhatHanh}
                    >
                        {
                            hocKys?.map(h => (
                                <Option value={h?.namhoc_key} key={h?.namhoc_key} disabled={hocKyDaTao.includes(h?.namhoc_key)}>
                                    {`Học kỳ ${h?.hocky} (${h?.nambatdau} - ${h?.namketthuc}) ${h?.hienhanh ? '(Hiện hành)' : ''}`}
                                </Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label='Mẫu tiêu chí'
                    name='MauTieuChi_Id'
                >
                    <Select
                        showSearch
                        placeholder="Chọn mẫu tiêu chí"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        disabled={item?.PhatHanh}
                    >
                        {
                            mauTieuChis?.map(h => (
                                <Option value={h?.id} key={h?.id}>{h?.TenMauTieuChi}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>

            </Form>
        </Modal>
    )
})

export default memo(ModalForm)