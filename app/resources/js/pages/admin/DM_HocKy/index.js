import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, Row, Table, Col, Space, Modal, notification, Tooltip, Checkbox, Select } from "antd";
import { useDataProps } from "../../..";
import './style.scss'
import LayoutWrapper from "../../../components/LayoutWrapper";
import * as DM_HocKyAPI from "../../../API/DM_HocKyAPI";
import * as DM_MauTieuChiAPI from "../../../API/DM_MauTieuChiAPI";
import ModalViewChiTiet from "../../../components/ModalViewChiTiet";
import ModalForm from "./ModalForm";

const { Option } = Select

const DM_HocKy = () => {
    const [dotDanhGia, setDotDanhGias] = useState([])
    const [mauTieuChi, setMauTieuChi] = useState([]);
    const [loading, setLoading] = useState(false)

    const refModalViewChiTiet = useRef(null)
    const refModal = useRef(null)

    useEffect(() => {
        loadMauTieuChi()
        loadData()
    }, [])

    const loadData = () => {
        setLoading(true)
        DM_HocKyAPI.getAllDotDanhGia().then((res) => {
            setDotDanhGias(res?.data || [])
        }).finally(() => setLoading(false))
    }

    const loadMauTieuChi = useCallback(() => {
        DM_MauTieuChiAPI.getAllMauTieuChi()
            .then((res) => {
                console.log(res)
                setMauTieuChi(res?.data || [])
            })
    }, [])

    const onCreate = useCallback(() => {
        refModal?.current?.showModal()
    }, [])

    const updateGrid = useCallback((item) => {
        setDotDanhGias(ds => ds.map(d => d?.id != item.id ? d : ({...item, mauTieuChi: d?.mauTieuChi})))
    }, [setDotDanhGias])

    const updateHienHanh = useCallback((id) => {
        setLoading(true)
        DM_HocKyAPI.updateHienHanh(id).then(loadData).catch(() => setLoading(false))
    }, [])

    const updateKhoa = useCallback((id) => {
        setLoading(true)
        DM_HocKyAPI.updateKhoa(id).then(loadData).catch(() => setLoading(false))
    }, [])

    const onUpdateMauTieuChi = useCallback((hocKy_Id, mauTieuChi_Id) => {
        setLoading(true)
        DM_HocKyAPI.updateDotDanhGia(hocKy_Id, {
            mauTieuChi_Id
        }).then(loadData).catch(() => setLoading(false))
    }, [])

    const onViewTieuChi = useCallback((item) => {
        refModalViewChiTiet.current?.showModal(item)
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
                title: 'N??m h???c',
                dataIndex: 'NamBatDau',
                width: 120,
                key: 'hocKy',
                className: 'cell-center',
                render: (text, record) => record?.hocKy ? `H???c k??? ${record?.hocKy?.hocky} (${record?.hocKy?.nambatdau} - ${record?.hocKy?.namketthuc})`: ''
            },
            {
                title: '??RL hi???n h??nh',
                dataIndex: 'HienHanh',
                key: 'HienHanh',
                className: 'cell-center',
                width: 100,
                render: text => <Checkbox checked={text} />
            },
            {
                title: 'M???u ti??u ch??',
                dataIndex: 'mauTieuChi',
                key: 'mauTieuChi',
                className: 'cell-center',
                width: 200,
                render: (text, record) => record.PhatHanh ? text ? `${text?.TenMauTieuChi} -- ${text?.TongSoDiem}` : '' : (
                    <Select
                        placeholder={'Ch???n m???u ti??u ch??'}
                        style={{
                            width: '80%'
                        }}
                        onChange={(value) => onUpdateMauTieuChi(record?.id, value)}
                        value={record?.MauTieuChi_Id}
                    >
                        {
                            mauTieuChi?.map(m => (
                                <Option value={m?.id} key={m?.id}>
                                    {m?.TenMauTieuChi}
                                </Option>
                            ))
                        }
                    </Select>
                )
            },
            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: 300,
                render: (text, record) => (
                    <Space size='middle'>
                        <Button
                            type='primary'
                            onClick={() => onViewTieuChi(record?.mauTieuChi)}
                            disabled={!record?.mauTieuChi}
                        >
                            Ti??u ch??
                        </Button>
                        <Button
                            type='primary'
                            onClick={() => updateHienHanh(record?.id)}
                            disabled={record.HienHanh}
                        >
                            Hi???n h??nh
                        </Button>
                        <Button
                            type='primary'
                            onClick={() => updateKhoa(record?.id)}
                        >
                            {record?.Khoa ? 'B??? kh??a' : 'Kh??a'}
                        </Button>
                    </Space>
                )
            }
        ]
    ), [mauTieuChi, onUpdateMauTieuChi])

    return (
        <LayoutWrapper className='dot-danh-gia-wrapper' >
            <Row className='bg-white p-3 content'>
                <Col span={24}>
                    <Row>
                        <Col>
                            <Button type='primary' onClick={onCreate} disabled={loading}>Th??m m???i</Button>
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
            <ModalViewChiTiet
                ref={refModalViewChiTiet}
            />
            <ModalForm 
                ref={refModal}
                callback={loadData}
                dotDanhGia={dotDanhGia}
            />
        </LayoutWrapper>
    )
}

export default DM_HocKy