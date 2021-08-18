<?php

namespace App\Repositories\DM_DotDanhGia;

use App\Models\DM_DotDanhGia;
use App\Repositories\BaseRepository;


class DM_DotDanhGia_Repository extends BaseRepository implements DM_DotDanhGia_RepositoryInterface
{

    public function getModel()
    {
        return DM_DotDanhGia::class;
    }

    public function findOneByHocKy($id)
    {
        $dotDanhGia = $this->model->where('HocKy_Id', $id)->with('mauTieuChi', 'hocKy')->first();
        return $dotDanhGia;
    }

}
