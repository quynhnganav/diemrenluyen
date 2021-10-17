<?php

namespace App\Repositories\DM_DotDanhGia;

use App\Models\DM_DotDanhGia;
use App\Repositories\BaseRepository;
use App\Repositories\SV\SV_Repository;
use App\Services\DTAPIService;


class DM_DotDanhGia_Repository extends BaseRepository implements DM_DotDanhGia_RepositoryInterface
{
    private $apiDaoTao;
    private $SV_Repository;

    public function __construct(
        DTAPIService $daotaoAPI,
        SV_Repository $SV_Repository
    ) {
        $this->apiDaoTao = $daotaoAPI;
        $this->SV_Repository = $SV_Repository;
        $this->setModel();
    }

    public function getModel()
    {
        return DM_DotDanhGia::class;
    }

    public function getHienHanh()
    {
        return DM_DotDanhGia::where('HienHanh', 1)->with('hocKy')->first();
    }

    public function getDSDanhGiaByLopAndHocKy($idLop, $idHocKy)
    {
        $dsSinhVienDanhGia = $this->SV_Repository->getModelEq()->where('lopsh_id', $idLop)
            ->with(['danhGia' => function ($query) use ($idHocKy) {
                $query->where('HocKy_Id', $idHocKy);
            }])->orderBy('masv')->get();
        return $dsSinhVienDanhGia;
    }

    public function updateHienHanh($id)
    {
        $this->model->where('HienHanh', true)->update([
            'HienHanh' => false
        ]);
        return $this->model->where('id', $id)->update([
            'HienHanh' => true
        ]);
    }

}
