import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, Row, Table, Col, Space, Modal, notification, Tooltip } from "antd";
import { useDataProps } from "../../..";
import './style.scss'
import LayoutWrapper from "../../../components/LayoutWrapper";
import * as DM_LopHocAPI from "../../../API/DM_LopHocAPI";

const DM_Sinhvien = () => {
    const [dotDanhGia, setDotDanhGias] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        setLoading(true)
        DM_LopHocAPI.getAllLopHoc().then((res) => {
            setDotDanhGias(res?.data || [])
        }).finally(() => setLoading(false))
    }

    const onSync = useCallback(() => {
        setLoading(true)
        DM_LopHocAPI.syncDataLopHoc().then((res) => {
            notification.success({
                message: 'Cập nhật thành công'
            })
        })
        .catch((err) => {
            notification.error({
                message: 'Lỗi khi cập nhật'
            })
        })
        .finally(() => setLoading(false))
    }, [])

    const columns = useMemo(() => (
        [
            {
                title: 'STT',
                dataIndex: 'id',
                key: 'id',
                width: 60,
                fixed: 'left',
                render: (text, record, index) => 
                    <Tooltip placement='top' title={text}>
                        {index + 1}
                    </Tooltip>
            },
            {
                title: 'Tên lớp',
                dataIndex: 'TenLopHoc',
                className: 'cell-center',
                key: 'TenLopHoc'
            },
            {
                title: 'Cố vấn học tập',
                dataIndex: 'GV',
                key: 'GV',
                render: (text) =>
                    <Tooltip placement="topLeft" title={text?.user?.email}>
                        {`${text?.ChucDanh}. ${text?.user?.HoDem} ${text?.user?.Ten}`}
                    </Tooltip>

            },
            {
                title: 'Số lượng sinh viên',
                dataIndex: 'sinh_viens_count',
                className: 'cell-center',
                key: 'sinh_viens_count'
            },
            {
                title: 'Đồng bộ',
                dataIndex: 'isSync',
                key: 'isSync',
                className: 'cell-center',
                width: 200,
                render: (text) => text ? 'Đang đồng bộ' : 'Đã đồng bộ'
            }
        ]
    ), [])

    return (
        <LayoutWrapper className='dot-danh-gia-wrapper' >
            <Row className='bg-white p-3 content'>
                <Col span={24}>
                    <Row>
                        <Col>
                            <Button type='primary' onClick={onSync}>Cập nhật</Button>
                        </Col>
                    </Row>
                </Col>
                <Col span={24} className='mt-3'>
                    <Table
                        bordered
                        loading={loading}
                        columns={columns}
                        scroll={{ x: 700, y: 'calc(100vh - 290px)' }}
                        dataSource={dotDanhGia}
                        rowKey={(v) => v?.id}
                        pagination={{
                            pageSize: 20
                        }}
                    />
                </Col>
            </Row>
        </LayoutWrapper>
    )
}

export default DM_Sinhvien