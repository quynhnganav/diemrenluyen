import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, Row, Table, Col, Space, Modal, notification, Tooltip, Checkbox, Select } from "antd";
import { useDataProps } from "../../..";
import './style.scss'
import LayoutWrapper from "../../../components/LayoutWrapper";
import * as DM_HocKyAPI from "../../../API/DM_HocKyAPI";
import * as DM_MauTieuChiAPI from "../../../API/DM_MauTieuChiAPI";
import ModalViewChiTiet from "../../../components/ModalViewChiTiet";

const { Option } = Select

const DM_HocKy = () => {
    const [dotDanhGia, setDotDanhGias] = useState([])
    const [mauTieuChi, setMauTieuChi] = useState([]);
    const [loading, setLoading] = useState(false)

    const refModalViewChiTiet = useRef(null)

    useEffect(() => {
        loadMauTieuChi()
        loadData()
    }, [])

    const loadData = () => {
        setLoading(true)
        DM_HocKyAPI.getAllHocKy().then((res) => {
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

    const updateGrid = useCallback((item) => {
        setDotDanhGias(ds => ds.map(d => d?.id != item.id ? d : ({...item, mauTieuChi: d?.mauTieuChi})))
    }, [setDotDanhGias])

    const updateHienHanh = useCallback((id) => {
        setLoading(true)
        DM_HocKyAPI.updateHienHanh(id)
            .then(res => {
                loadData()
            })
            .catch(err => {
                notification.error({
                    message: err?.response?.data?.message
                })
                setLoading(false)
            })
    }, [])

    const onPhatHanh = useCallback((hocKy_Id) => {
        setLoading(true)
        DM_HocKyAPI.update(hocKy_Id, {
            phatHanh: true
        }).then(res => {
            updateGrid(res?.data)
        }).catch(error => {
            notification.error({
                message: error?.response?.data?.message
            })
        }).finally(() => setLoading(false))
    }, [])

    const onUpdateMauTieuChi = useCallback((hocKy_Id, mauTieuChi_Id) => {
        setLoading(true)
        DM_HocKyAPI.update(hocKy_Id, {
            mauTieuChi_Id
        }).then(res => {
            updateGrid(res?.data)
        }).catch(error => {
            notification.error({
                message: error?.response?.data?.message
            })
        }).finally(() => setLoading(false))
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
                title: 'Tên học kỳ',
                dataIndex: 'TenHocKy',
                className: 'cell-center',
                width: 100,
                key: 'TenHocKy'
            },
            {
                title: 'Năm học',
                dataIndex: 'NamBatDau',
                width: 120,
                key: 'NamBatDau',
                className: 'cell-center',
                render: (text, record) => `${record?.NamBatDau} - ${record?.NamKetThuc}`

            },
            {
                title: 'ĐT hiện hành',
                dataIndex: 'DaoTaoHienHanh',
                className: 'cell-center',
                width: 100,
                key: 'DaoTaoHienHanh',
                render: text => <Checkbox disabled checked={text} />
            },
            {
                title: 'ĐRL hiện hành',
                dataIndex: 'HienHanh',
                key: 'HienHanh',
                className: 'cell-center',
                width: 100,
                render: text => <Checkbox checked={text} />
                // render: (text) => text ? 'Đang đồng bộ' : 'Đã đồng bộ'
            },
            {
                title: 'Mẫu tiêu chí',
                dataIndex: 'mauTieuChi',
                key: 'mauTieuChi',
                className: 'cell-center',
                width: 200,
                render: (text, record) => record.PhatHanh ? text ? `${text?.TenMauTieuChi} -- ${text?.TongSoDiem}` : '' : (
                    <Select
                        placeholder={'Chọn mẫu tiêu chí'}
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
                title: 'Phát hành',
                dataIndex: 'PhatHanh',
                key: 'PhatHanh',
                className: 'cell-center',
                width: 150,
                render: (t) => t ? "Đã phát hành" : "Chưa phát hành"
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
                            onClick={() => onPhatHanh(record?.id)}
                            disabled={record.PhatHanh}
                        >
                            Phát hành
                        </Button>
                        <Button
                            type='primary'
                            onClick={() => onViewTieuChi(record?.mauTieuChi)}
                            disabled={!record?.mauTieuChi}
                        >
                            Tiêu chí
                        </Button>
                        <Button
                            type='primary'
                            onClick={() => updateHienHanh(record?.id)}
                            disabled={record.HienHanh}
                        >
                            Hiện hành
                        </Button>
                    </Space>
                )
            }
        ]
    ), [mauTieuChi, onPhatHanh, onUpdateMauTieuChi])

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
            <ModalViewChiTiet
                ref={refModalViewChiTiet}
            />
        </LayoutWrapper>
    )
}

export default DM_HocKy