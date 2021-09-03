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
}
