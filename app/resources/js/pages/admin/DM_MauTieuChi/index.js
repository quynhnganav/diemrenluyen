import React, { useEffect, useState } from "react";
import { Button, Row, Table, Col, Space, Card } from "antd";
import Grid from "antd/lib/card/Grid";
import { useDataProps } from "../../..";
import axios from "axios";

const data = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Tên mãu tiêu chí',
        dataIndex: 'TenMauTieuChi',
        key: 'TenMauTieuChi'
    },
    {
        title: 'Đang được sử dụng',
        dataIndex: 'use',
        key: 'use',
        render: (t, r, i) => i + 1
    },
    {
        title: 'Phát hành',
        dataIndex: 'PhatHanh',
        key: 'PhatHanh',
        render: (t) => t ? "Đã phát hành" : "Chưa phát hành"
    },
    {
        title: '',
        dataIndex: 'action',
        key: 'action',
        render: () => (
            <Space size='middle'>
                <Button
                    type='primary'
                >
                    Chỉnh sửa
                </Button>
                <Button
                    type='primary'
                >
                    Tiêu chí
                </Button>
                <Button
                    danger
                >
                    Xóa
                </Button>
            </Space>
        )
    }
]

const DM_TieuChi = () => {

    const { data } = useDataProps()

    const [mauTieuChis, setMauTieuChis] = useState(data?.mauTieuChi?.data || [])

    useEffect(() => {
        axios.get("/admin/DM_MauTieuChi/data", {
            
        }).then((res) => {
            console.log(res)
        })
    }, [])
 
    return (
        <div>
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <Button>Theem moi</Button>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Table
                        columns={columns}
                        dataSource={mauTieuChis}
                        scroll={{ y: '80%' }}
                        rowKey={(v) => v?.id}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default DM_TieuChi