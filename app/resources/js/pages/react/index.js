import React, { useState } from "react";
import { Button, Modal } from "antd";
import "./style.scss";

const ReactPage = () => {

    const [visible, setVisible] = useState(false)

    const showModal = () => {
        setVisible(true)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    return (
        <div className="container">
            <Button type="primary" onClick={showModal}>
                Open Modal with async logic
            </Button>
            <Modal
                title="Title"
                visible={visible}
                onOk={handleCancel}
                onCancel={handleCancel}
            >
                <p>ModalText</p>
            </Modal>
        </div>
    )
}

export default ReactPage