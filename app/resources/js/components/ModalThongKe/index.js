import { Col, Modal, Row, Table } from "antd";
import React, { forwardRef, memo, useCallback, useImperativeHandle, useMemo, useState } from "react";
import { Column, Pie } from '@ant-design/charts';
import * as CommonAPI from "../../API/CommonAPI";
import { ObjToArrayThongKe } from "../../utils";
import './style.scss'
import { Button } from "antd/lib/radio";

const ColumnChart = memo(({
    config
}) => (<Column {...config} />))

const PieChart = memo(({
    config
}) => (<Pie {...config} />))

const ModalThongKe = forwardRef(({

}, ref) => {

    const [visible, setVisible] = useState(false)
    const [dataThongke, setDataThongke] = useState({});
    const [item, setItem] = useState(null);

    const showModal = useCallback((itemInput, text) => {
        setVisible(true)
        setItem(itemInput)
        console.log(itemInput)
        loadThongKe(itemInput?.LopHoc_Id, itemInput?.HocKy_Id, itemInput?.gvDuyet)
    }, [])

    useImperativeHandle(ref, () => ({
        showModal
    }))

    const hiddenModal = useCallback(() => {
        setVisible(false)
    }, [])

    const loadThongKe = useCallback((LopHoc_Id, HocKy_Id, gvDuyet) => {
        CommonAPI.getThongKeTheoLop({
            lop: LopHoc_Id || item?.LopHoc_Id,
            hocky: HocKy_Id,
            gvDuyet
        })
            .then(res => {
                setDataThongke(res?.data)
            })
            .catch(err => {
                console.error(err)
            })
    }, [item])

    var data = useMemo(() => [
        {
            type: 'Xuất sắc',
            counts: dataThongke?.xuatsac ?? 0,
        },
        {
            type: 'Tốt',
            counts: dataThongke?.tot ?? 0,
        },
        {
            type: 'Khá',
            counts: dataThongke?.kha ?? 0,
        },
        {
            type: 'Trung bình',
            counts: dataThongke?.trungbinh ?? 0,
        },
        {
            type: 'Yếu',
            counts: dataThongke?.yeu ?? 0,
        },
        {
            type: 'Kém',
            counts: dataThongke?.kem ?? 0,
        },
    ], [dataThongke]);

    var config = useMemo(() => ({
        data: data,
        xField: 'type',
        yField: 'counts',
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: { alias: 'Xếp loại' },
            counts: { alias: 'Số lượng' },
        },
    }), [data])


    var configPie = useMemo(() => ({
        appendPadding: 10,
        data: data,
        angleField: 'counts',
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'inner',
            offset: '-30%',
            content: function content(_ref) {
                var percent = _ref.percent;
                return ''.concat((percent * 100).toFixed(0), '%');
            },
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
        },
        interactions: [{ type: 'element-active' }],
    }), [data])

    const columns = useMemo(() => ([
        {
            title: 'Xếp loại',
            dataIndex: "xeploai",
            width: 200,
            key: "xeploai",
            render: (text, record) => record.isTotal ? <strong>{text}</strong> : text
        },
        {
            title: 'Số lượng sinh viên',
            dataIndex: "soluong",
            width: 150,
            className: 'cell-center',
            key: "soluong",
            render: (text, record) => record.isTotal ? <strong>{text}</strong> : text
        },
        {
            title: 'Chiếm tỷ lệ %',
            dataIndex: "tyle",
            width: 150,
            className: 'cell-center',
            key: "tyle",
            render: (text, record) => record.isTotal ? <strong>{parseFloat(text).toFixed(2)}</strong> : parseFloat(text).toFixed(2),
        }
    ]), [])

    const dataTable = ObjToArrayThongKe(dataThongke)

    return (
        <Modal
            onOk={hiddenModal}
            onCancel={hiddenModal}
            visible={visible}
            width={1000}
            cancelButtonProps={{
                hidden: true
            }}
            footer={null}
            centered
            okText='Đóng'
            // title={`Thống kê`}
            className='modal-thong-ke'
        >
            <Row gutter={[5, 5]}>
                {/* <Col span={24}>
                    <Button onClick={loadThongKe}>Làm mới</Button>
                </Col> */}
                <Col span={12}>
                    <ColumnChart config={config} />
                </Col>
                <Col span={12}>
                    <PieChart config={configPie} />
                </Col>
                <Col span={24}>
                    <Table
                        dataSource={dataTable || []}
                        columns={columns}
                        bordered
                        pagination={false}
                        rowKey={(v) => v?.id}
                    />
                </Col>
            </Row>
        </Modal>
    )
})

export default memo(ModalThongKe);