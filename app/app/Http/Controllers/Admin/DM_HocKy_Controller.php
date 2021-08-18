<?php

namespace App\Http\Controllers\Admin;

use App\Repositories\DM_HocKy\DM_HocKy_Repository;
use Illuminate\Support\Str;
use Illuminate\Support\Collection;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Services\DTAPIService;
use App\Models\DM_HocKy;

class DM_HocKy_Controller extends Controller
{

    private $apiDaoTao;
    private $hocKy_Repository;

    public function __construct(DTAPIService $daotaoAPI, DM_HocKy_Repository $hocKy_Repository) {
        $this->apiDaoTao = $daotaoAPI;
        $this->hocKy_Repository = $hocKy_Repository;
    }

    public function getData() {
        $hocKys = $this->hocKy_Repository->getAll([], 'NamKetThuc desc');
        return response()->json(json_decode($hocKys), 200);
    }

    public function index()
    {
       return view('admin.index');
    }

    public function syncHocKy()
    {
        $this->hocKy_Repository->syncHocKy();
       return response()->json(["message" => "Đồng bộ thành công"], 200);
    }

}
