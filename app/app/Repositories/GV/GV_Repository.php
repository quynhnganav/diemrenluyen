<?php

namespace App\Repositories\GV;

use App\Models\GV;
use App\Repositories\BaseReadRepository;
use App\Services\DTAPIService;


class GV_Repository extends BaseReadRepository implements GV_RepositoryInterface
{
    private $apiDaoTao;

    public function __construct(DTAPIService $daotaoAPI) {
        $this->apiDaoTao = $daotaoAPI;
        $this->setModel();
    }

    public function getModel()
    {
        return GV::class;
    }

}
