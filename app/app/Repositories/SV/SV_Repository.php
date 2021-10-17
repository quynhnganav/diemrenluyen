<?php

namespace App\Repositories\SV;

use Illuminate\Support\Str;
use App\Helper\PhoneNumber;
use App\Models\SV;
use App\Models\User;
use App\Repositories\BaseReadRepository;
use App\Services\DTAPIService;


class SV_Repository extends BaseReadRepository implements SV_RepositoryInterface
{
    private $apiDaoTao;

    public function __construct(DTAPIService $daotaoAPI) {
        $this->apiDaoTao = $daotaoAPI;
        $this->setModel();
    }

    public function getModel()
    {
        return SV::class;
    }

     public function findSVByIdOrMaSv($id, $with)
    {
        return is_numeric($id) ?  $this->model->where('id', $id)->with($with)->first() : $this->model->where('MaSV', $id)->with($with)->first();
    }

}
