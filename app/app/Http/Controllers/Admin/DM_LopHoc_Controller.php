<?php

namespace App\Http\Controllers\Admin;

use App\Repositories\DM_LopHoc\DM_LopHoc_Repository;
use Illuminate\Support\Str;
use Illuminate\Support\Collection;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\DTAPIService;

use App\Models\DM_LopHoc;
use App\Models\GV;
use App\Models\User;

class DM_LopHoc_Controller extends Controller
{

    private $apiDaoTao, $lopHoc_Repository;

    public function __construct(DTAPIService $daotaoAPI, DM_LopHoc_Repository $lopHoc_Repository) {
        $this->apiDaoTao = $daotaoAPI;
        $this->lopHoc_Repository = $lopHoc_Repository;
    }

    public function getData() {
        return $this->lopHoc_Repository->getAll();
    }

    public function index()
    {
        return view('admin.index');
    }

}
