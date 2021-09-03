<?php

namespace App\Http\Controllers\Admin;

use App\Repositories\DM_HocKy\DM_HocKy_Repository;
use App\Repositories\DM_MauTieuChi\DM_MauTieuChi_Repository;
use Illuminate\Support\Str;
use Illuminate\Support\Collection;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Services\DTAPIService;
use App\Models\DM_HocKy;

class DM_HocKy_Controller extends Controller
{

    private $apiDaoTao;
    private $hocKy_Repository, $mauTieuChi_Repository;

    public function __construct(
        DTAPIService $daotaoAPI,
        DM_HocKy_Repository $hocKy_Repository,
        DM_MauTieuChi_Repository $mauTieuChi_Repository
    ) {
        $this->apiDaoTao = $daotaoAPI;
        $this->hocKy_Repository = $hocKy_Repository;
        $this->mauTieuChi_Repository = $mauTieuChi_Repository;
    }

    public function getData(Request $request) {
        $hocKys = $this->hocKy_Repository->getAll(['mauTieuChi'], 'NamKetThuc desc, TenHocKy desc');
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

    public function update(Request $request, $id) {
        $hocKy = $this->hocKy_Repository->find($id);
        if (empty($hocKy)) abort(404, "Không tìm thấy học kỹ");
        $mauTieuChi_Id = $request->mauTieuChi_Id ?? $hocKy->MauTieuChi_Id;
        $phatHanh = $request->phatHanh ?? $hocKy->PhatHanh;
        $mauTieuChi = $this->mauTieuChi_Repository->find($mauTieuChi_Id);
        if (empty($mauTieuChi)) abort(404, "Không tìm thấy mẫu tiêu chí");
        if (!$mauTieuChi->PhatHanh) abort(403, "Mẫu tiêu chí chưa được phát hành");
        if ($phatHanh && empty($mauTieuChi_Id)) abort(403, "Chưa chọn mẫu tiêu chí cho học kỳ");
        return $this->hocKy_Repository->update($id, [
           'PhatHanh' =>  $phatHanh,
            'MauTieuChi_Id' => $mauTieuChi_Id
        ]);
    }

    public function updateHienHanh($id) {
        $hocKy = $this->hocKy_Repository->find($id);
        if (empty($hocKy)) abort(404, "Không tìm thấy học kỹ");
        return $this->hocKy_Repository->updateHienHanh($id);
    }

}
