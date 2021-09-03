<?php

namespace App\Repositories\DanhGiaChiTiet;

use App\Models\DanhGiaChiTiet;
use App\Repositories\BaseRepository;

class DanhGiaChiTiet_Repository extends BaseRepository implements DanhGiaChiTiet_RepositoryInterface
{
    public function getModel()
    {
        return DanhGiaChiTiet::class;
    }

    public function updateDanhGiaChiTiet($HocKy_Id, $MaSV, $update)
    {
        $update['HocKy_Id'] = $HocKy_Id;
        $update['MaSV'] = $MaSV;
        return $this->model->updateOrCreate(['HocKy_Id' => $HocKy_Id, 'MaSV' => $MaSV], $update);
    }

    public function getDiemSV($HocKy_Id, $MaSV)
    {
        return $this->model->where('HocKy_Id', $HocKy_Id)
            ->where('MaSV', $MaSV)->first();
    }
}
