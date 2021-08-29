import { Input, Modal } from "antd";
import React, { forwardRef, memo, useCallback, useImperativeHandle, useState } from "react";

const ModalGhiChu = forwardRef(({

}, ref) => {

    const [visible, setVisible] = useState(false)
    const [item, setItem] = useState(null);

    const showModal = useCallback((itemInput) => {
        console.log(1)
        setItem(itemInput)
        setVisible(true)
    }, [])

    useImperativeHandle(ref, () => ({
        showModal
    }))

    const hiddenModal = useCallback(() => {
        setVisible(false)
        setItem(null)
    }, [])

    return (
        <Modal
            visible={visible}
            onCancel={hiddenModal}
            title={'Ghi chú'}
            okText='Cập nhật'
            cancelText='Hủy'
        >
            <Input.TextArea />
        </Modal>
    )

})

export default memo(ModalGhiChu)