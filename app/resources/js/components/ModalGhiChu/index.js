import { Input, Modal, Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { forwardRef, memo, useCallback, useImperativeHandle, useState } from "react";

const ModalGhiChu = forwardRef(({
    onSubmit
}, ref) => {

    const [visible, setVisible] = useState(false)
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [form] = useForm()

    const showModal = useCallback((itemInput, text) => {
        setItem(itemInput)
        form?.setFieldsValue({
            value: text
        })
        setVisible(true)
    }, [])

    useImperativeHandle(ref, () => ({
        showModal
    }))

    const hiddenModal = useCallback(() => {
        setVisible(false)
        setItem(null)
    }, [])

    const onFinish = useCallback((values) => {
        if (onSubmit) {
            setLoading(true)
            onSubmit(values?.value, (hidden) => {
                setLoading(false)
                if (hidden) {
                    setVisible(false)
                }
            })
        }
    }, [onSubmit])

    const submit = useCallback(() => {
        form.submit()
    }, [form])

    return (
        <Modal
            visible={visible}
            onCancel={hiddenModal}
            onOk={submit}
            okButtonProps={{ 
                loading
            }}
            title={'Ghi chú'}
            okText='Cập nhật'
            cancelText='Hủy'
        >
            <Form
                form={form}
                name='form-ghichu'
                onFinish={onFinish}
            >
                <Form.Item name='value'>
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
    )

})

export default memo(ModalGhiChu)