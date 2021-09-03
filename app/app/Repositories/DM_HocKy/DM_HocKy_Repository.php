<?php

namespace App\Repositories\DM_HocKy;

use App\Models\DM_HocKy;
use App\Repositories\BaseRepository;
use App\Repositories\SV\SV_Repository;
use App\Services\DTAPIService;


class DM_HocKy_Repository extends BaseRepository implements DM_HocKy_RepositoryInterface
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
        return DM_HocKy::class;
    }

    public function syncHocKy() {
        $hocKy = $this->apiDaoTao->getDanhSachHocKy();
        collect($hocKy)->each(function ($item) {
            $item = (object) $item;
            $this->model->updateOrCreate(['idDaoTao' => $item->id, 'TenHocKy' => $item->hocky], [
                "idDaoTao" => $item->id,
                "TenHocKy" => $item->hocky,
                "NamBatDau" => $item->nambatdau,
                "NamKetThuc" => $item->namketthuc,
                "DaoTaoHienHanh" => $item-> hienhanh == 1
            ]);
        });
    }

    public function getDSDanhGiaByLopAndHocKy($idLop, $idHocKy)
    {
        $dsSinhVienDanhGia = $this->SV_Repository->getModelEq()->where('LopHoc_Id', $idLop)
            ->with(['user' => function ($query) {
//                $query->orderBy('Ten', 'asc')->orderBy('HoDem', 'asc');
            }])->with(['danhGia' => function ($query) use ($idHocKy) {
                $query->where('HocKy_Id', $idHocKy);
            }])->orderBy('MaSV')->get();
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
