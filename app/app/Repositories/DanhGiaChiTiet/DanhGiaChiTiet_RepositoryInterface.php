<?php

namespace App\Repositories\DanhGiaChiTiet;

use App\Repositories\RepositoryInterface;

interface DanhGiaChiTiet_RepositoryInterface extends RepositoryInterface
{
    public function updateDanhGiaChiTiet($HocKy_Id, $MaSV, $update);
    public function getDiemSV($HocKy_Id, $MaSV);
}
