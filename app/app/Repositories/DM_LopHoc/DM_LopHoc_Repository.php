<?php

namespace App\Repositories\DM_LopHoc;

use App\Models\DM_LopHoc;
use App\Models\GV;
use App\Models\User;
use App\Repositories\BaseReadRepository;
use App\Services\DTAPIService;
use Illuminate\Support\Str;


class DM_LopHoc_Repository extends BaseReadRepository implements DM_LopHoc_RepositoryInterface
{
    private $apiDaoTao;

    public function __construct(DTAPIService $daotaoAPI) {
        $this->apiDaoTao = $daotaoAPI;
        $this->setModel();
    }

    public function getModel()
    {
        return DM_LopHoc::class;
    }

    public function getLopHocOfGV($idGV)
    {
        $lopHocs = $this->model->where('gv_id', $idGV)->get();
        return $lopHocs;
    }

}
