<?php

namespace App\Repositories\SV;

use App\Models\SV;
use App\Repositories\BaseRepository;
use App\Services\DTAPIService;


class SV_Repository extends BaseRepository implements SV_RepositoryInterface
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

}
