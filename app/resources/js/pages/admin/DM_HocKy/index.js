import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, Row, Table, Col, Space, Modal, notification, Tooltip, Checkbox } from "antd";
import { useDataProps } from "../../..";
import './style.scss'
import LayoutWrapper from "../../../components/LayoutWrapper";
import * as DM_HocKyAPI from "../../../API/DM_HocKyAPI";

const DM_HocKy = () => {
    const [dotDanhGia, setDotDanhGias] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        setLoading(true)
        DM_HocKyAPI.getAllHocKy().then((res) => {
            setDotDanhGias(res?.data || [])
        }).finally(() => setLoading(false))
    }

    const onSync = useCallback(() => {
        setLoading(true)
        DM_HocKyAPI.syncDataHocKy().then((res) => {
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
                title: 'Tên học kỳ',
                dataIndex: 'TenHocKy',
                className: 'cell-center',
                key: 'TenHocKy'
            },
            {
                title: 'Năm học',
                dataIndex: 'NamBatDau',
                key: 'NamBatDau',
                className: 'cell-center',
                render: (text, record) => `${record?.NamBatDau} - ${record?.NamKetThuc}`

            },
            {
                title: 'Đào tạo hiện hành',
                dataIndex: 'DaoTaoHienHanh',
                className: 'cell-center',
                key: 'DaoTaoHienHanh',
                render: text => <Checkbox disabled checked={text} />
            },
            {
                title: 'ĐRL hiện hành',
                dataIndex: 'HienHanh',
                key: 'HienHanh',
                className: 'cell-center',
                width: 200,
                render: text => <Checkbox checked={text} />
                // render: (text) => text ? 'Đang đồng bộ' : 'Đã đồng bộ'
            }
        ]
    ), [])

    return (
        <LayoutWrapper className='dot-danh-gia-wrapper' >
            <Row className='bg-white p-3 content'>
                <Col span={24}>
                    <Row>
                        <Col>
                            <Button type='primary' onClick={onSync} disabled={loading} >Cập nhật</Button>
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

export default DM_HocKy