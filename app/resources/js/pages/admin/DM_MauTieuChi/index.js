import React, { useEffect, useState } from "react";
import { Button, Row, Table, Col, Space, Card } from "antd";
import { useDataProps } from "../../..";
import axios from "axios";
import './index.scss'

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

    const getTableScroll = () => {
        let scrollY = `calc(100vh - 700px)`
        return scrollY
    }
 
    return (
      <div class ='tieu-chi-wrapper' >
            <Row className='bg-white p-3 content'>
                <Col span={24}>
                    <Button>Thêm mới</Button>
                </Col>
                <Col span={24} className='mt-3'>
                    <Table
                        columns={columns}
                        scroll={{x: 700, y: 'calc(100vh - 363px)'}}
                        dataSource={mauTieuChis}
                        rowKey={(v) => v?.id}
                    />
                   
                </Col>
            </Row>
       </div>
    )
}

export default DM_TieuChi