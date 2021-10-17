<?php

namespace App\Http\Controllers\Admin;

use App\Repositories\DM_DotDanhGia\DM_DotDanhGia_Repository;
use App\Repositories\DM_MauTieuChi\DM_MauTieuChi_Repository;
use Illuminate\Support\Str;
use Illuminate\Support\Collection;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Services\DTAPIService;
use App\Models\DM_HocKy;
use App\Models\table_namhoc_hocky;

class DM_HocKy_Controller extends Controller
{

    private $apiDaoTao;
    private $dotDanhGia_Repository, $mauTieuChi_Repository;

    public function __construct(
        DTAPIService $daotaoAPI,
        DM_DotDanhGia_Repository $dotDanhGia_Repository,
        DM_MauTieuChi_Repository $mauTieuChi_Repository
    ) {
        $this->apiDaoTao = $daotaoAPI;
        $this->dotDanhGia_Repository = $dotDanhGia_Repository;
        $this->mauTieuChi_Repository = $mauTieuChi_Repository;
    }

    public function getData(Request $request) {
        $hocKys = $this->dotDanhGia_Repository->getAll(['mauTieuChi', 'hocKy'], 'HocKy_Id desc');
        return response()->json(json_decode($hocKys), 200);
    }

    public function updateKhoa($id)
    {
        $dotDanhGia = $this->dotDanhGia_Repository->find($id);
        if (empty($dotDanhGia)) abort(404, "Không tồn tại");
        $this->dotDanhGia_Repository->update($id, [
            "Khoa" => !$dotDanhGia->Khoa
        ]);
        return response()->json([
            "message" => "Thành công"
        ], 200);
    }

    public function getHocKy()
    {
        return table_namhoc_hocky::orderBy('namhoc_key', 'desc')->get();
    }

    public function index()
    {
       return view('admin.index');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'HocKy_Id' => 'required|exists:table_namhoc_hocky,namhoc_key|unique:table_DRL_DM_DotDanhGia,HocKy_Id,NULL,id,deleted_at,NULL',
            'MauTieuChi_Id' => 'exists:table_DRL_DM_MauTieuChi,id,PhatHanh,1,deleted_at,NULL',
        ]);
        $dotDanhGia = $this->dotDanhGia_Repository->create([
            'HocKy_Id' => $request->HocKy_Id,
            'MauTieuChi_Id' => $request->MauTieuChi_Id,
        ]);
        return response()->json(json_decode($dotDanhGia), 201);
    }


    public function syncHocKy()
    {
        $this->dotDanhGia_Repository->syncHocKy();
       return response()->json(["message" => "Đồng bộ thành công"], 200);
    }

    public function update(Request $request, $id) {
        $hocKy = $this->dotDanhGia_Repository->find($id);
        if (empty($hocKy)) abort(404, "Không tìm thấy học kỹ");
        $mauTieuChi_Id = $request->mauTieuChi_Id ?? $hocKy->MauTieuChi_Id;
        $mauTieuChi = $this->mauTieuChi_Repository->find($mauTieuChi_Id);
        if (empty($mauTieuChi)) abort(404, "Không tìm thấy mẫu tiêu chí");
        if (!$mauTieuChi->PhatHanh) abort(403, "Mẫu tiêu chí chưa được phát hành");
        return $this->dotDanhGia_Repository->update($id, [
        //    'PhatHanh' =>  $phatHanh,s
            'MauTieuChi_Id' => $mauTieuChi_Id
        ]);
    }

    public function updateHienHanh($id) {
        $hocKy = $this->dotDanhGia_Repository->find($id);
        if (empty($hocKy)) abort(404, "Không tìm thấy học kỹ");
        return $this->dotDanhGia_Repository->updateHienHanh($id);
    }

}
