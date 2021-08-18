<?php

namespace App\Repositories\DM_HocKy;

use App\Models\DM_HocKy;
use App\Repositories\BaseRepository;
use App\Services\DTAPIService;


class DM_HocKy_Repository extends BaseRepository implements DM_HocKy_RepositoryInterface
{
    private $apiDaoTao;

    public function __construct(DTAPIService $daotaoAPI) {
        $this->apiDaoTao = $daotaoAPI;
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

}
