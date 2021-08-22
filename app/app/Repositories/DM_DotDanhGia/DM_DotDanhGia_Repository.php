<?php

namespace App\Repositories\DM_DotDanhGia;

use App\Models\DM_DotDanhGia;
use App\Repositories\BaseRepository;
use App\Repositories\SV\SV_Repository;


class DM_DotDanhGia_Repository extends BaseRepository implements DM_DotDanhGia_RepositoryInterface
{
    private $SV_Repository;
    public function __construct(SV_Repository $SV_Repository) {
        $this->SV_Repository = $SV_Repository;
        $this->setModel();
    }

    public function getModel()
    {
        return DM_DotDanhGia::class;
    }

    public function findOneByHocKy($id)
    {
        $dotDanhGia = $this->model->where('HocKy_Id', $id)->with('mauTieuChi', 'hocKy')->first();
        return $dotDanhGia;
    }

    public function getDSDanhGiaByLopAndDotDanhGia($idLop, $idDotDanhGia)
    {
        $dsSinhVienDanhGia = $this->SV_Repository->getModelEq()->where('LopHoc_Id', $idLop)
            ->with('user')->with(['danhGia' => function ($query) use ($idDotDanhGia) {
                $query->where('DotDanhGia_Id', $idDotDanhGia);
            }])->get();
        return $dsSinhVienDanhGia;
    }

}
