<?php

namespace App\Http\Controllers\Admin;

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

    private $apiDaoTao;

    public function __construct(DTAPIService $daotaoAPI) {
        $this->apiDaoTao = $daotaoAPI;
    }



    public function index()
    {
        return view('admin.index');
    }

    public function syncLopHoc()
    {
        $lops = $this->apiDaoTao->getDanhSachLop();
        $api = $this->apiDaoTao;
        collect($lops)->each(function ($item) use ($api){
            $item = (object) $item;
            $gv = (object) $api->getGVLop($item->id);
            // dd($gv->email);
            $newGV = GV::updateOrCreate(['email' => $gv->email], [
                'email' => $gv->email,
                'ChucDanh' => $gv->chucdanh,
            ]);

            $newUser = User::updateOrCreate(['email' => $gv->email], [
                'email' => $gv->email,
                'username' => $gv->email,
                'HoDem' => $gv->hodem,
                'Ten' => $gv->ten,
                'HoTenKhongDau' => Str::slug($gv->hodem." ".$gv->ten, " "),
                'Profile_id' => $newGV->id,
                'Profile_type' => "App\Models\GV",
            ]);

            DM_LopHoc::updateOrCreate(['id' => $item->id], [
                "id" => $item->id,
                'GV_Id' => $newGV->id,
                "TenLopHoc" => $item->tenlop,
                "TenKhongDau" => Str::slug($item->tenlop, " ")
            ]);
        });
       return response()->json(["message" => "Đồng bộ thành công"], 200);
    }

}
