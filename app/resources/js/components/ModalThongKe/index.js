import { Modal } from "antd";
import React, { forwardRef, memo, useCallback, useImperativeHandle, useState } from "react";
import { Line } from '@ant-design/charts';

const ModalThongKe = forwardRef(({

}, ref) => {

    const [visible, setVisible] = useState(false)

    const showModal = useCallback((itemInput, text) => {
        setVisible(true)
    }, [])

    useImperativeHandle(ref, () => ({
        showModal
    }))

    const hiddenModal = useCallback(() => {
        setVisible(false)
    }, [])

    const data = [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 },
    ];

    const config = {
        data,
        height: 400,
        xField: 'year',
        yField: 'value',
        point: {
            size: 5,
            shape: 'diamond',
        },
    };

    return (
        <Modal
            onOk={hiddenModal}
            visible={visible}
            width={1000}
            cancelButtonProps={{
                hidden: true
            }}
            okText='Đóng'
            title={`Thống kê`}
        >
            <Line {...config} />
        </Modal>
    )
})

export default memo(ModalThongKe);