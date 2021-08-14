<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Str;
use Illuminate\Support\Collection;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Services\DTAPIService;
use App\Models\DM_HocKy;

class DM_HocKy_Controller extends Controller
{

    private $apiDaoTao;

    public function __construct(DTAPIService $daotaoAPI) {
        $this->apiDaoTao = $daotaoAPI;
    }
    

    public function index()
    {
       return view('admin.index');
    }

    public function syncHocKy()
    {
       $hocKy = $this->apiDaoTao->getDanhSachHocKy();
       collect($hocKy)->each(function ($item) {
            $item = (object) $item;
            DM_HocKy::updateOrCreate(['id' => $item->id], [
                "id" => $item->id,
                "TenHocKy" => $item->hocky,
                "NamBatDau" => $item->nambatdau,
                "NamKetThuc" => $item->namketthuc,
                "HienHanh" => $item->hienhanh == 1
            ]);
       });
       return response()->json(["message" => "Đồng bộ thành công"], 200);
    }

}
