import { Form, Input, InputNumber, notification } from "antd";
import { useForm } from "antd/lib/form/Form";
import Modal from "antd/lib/modal/Modal";
import React, { forwardRef, memo, useCallback, useImperativeHandle, useState } from "react";
import { axios } from "../../../../config";

const ModalForm = forwardRef(({
    callback
}, ref) => {

    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [item, setItem] = useState(null)
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

    useImperativeHandle(ref, () => ({
        showModal
    }))

    const hiddenModal = useCallback(() => {
        setVisible(false)
        setItem(null)
        form?.resetFields()
    }, [])

    const onFinish = useCallback((values) => {
        console.log(values)
        if (values?.TongSoDiem && values?.TongSoDiem < 0) {
            form?.setFields([
                {
                    name: 'TongSoDiem',
                    errors: ["Tổng số điểm phải lớn hơn 0"]
                }
            ])
            return
        }
        setLoading(true)
        if (item) {
            axios.put(`/admin/DM_MauTieuChi/${item?.id}`, {...values, PhatHanh: item?.PhatHanh ? true : false})
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
        axios.post('/admin/DM_MauTieuChi', {...values})
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

    return (
        <Modal
            visible={visible}
            onCancel={hiddenModal}
            onOk={onSubmit}
            okButtonProps={{
                loading: loading
            }}
            centered
            title={item?.TenMauTieuChi || 'Thêm mới mẫu tiêu chí'}
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
                    label='Tên mẫu tiêu chí'
                    name='TenMauTieuChi'
                    rules={[{ required: true, message: 'Nhập tên mẫu tiêu chí' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Tổng số điểm'
                    name='TongSoDiem'
                    rules={[{ required: true, message: 'Nhập tổng số điểm' }]}
                >
                    <InputNumber disabled={item?.PhatHanh} />
                </Form.Item>
            </Form>
        </Modal>
    )
})

export default memo(ModalForm)