<?php

namespace App\Http\Controllers\EndUser;

use App\Common\Constant;
use App\Http\Controllers\Controller;
use App\Repositories\DM_DotDanhGia\DM_DotDanhGia_Repository;
use App\Repositories\DM_MauTieuChi\DM_MauTieuChi_Repository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;


class DanhGiaController extends Controller
{

    protected $dotDanhGia_Repository;
    protected $mauTieuChi_Repository;

    public function __construct(DM_DotDanhGia_Repository $dotDanhGia_Repository, DM_MauTieuChi_Repository $mauTieuChi_Repository) {
        $this->dotDanhGia_Repository = $dotDanhGia_Repository;
        $this->mauTieuChi_Repository = $mauTieuChi_Repository;
    }

    public function index(Request $request) {
        return view('sv.index');
    }

    public function sinhVienGetDotDanhGiaHienTai() {
        $hocKyId = Session::get(Constant::SESSION_KEY['HocKyHienTai_Id']);
        $dotDanhGia = $this->dotDanhGia_Repository->findOneByHocKy($hocKyId);
        if (empty($dotDanhGia)) abort(404, "Đợt đánh giá chưa sẵn sàng, mời bạn chuyển sang học kỳ khác");
        $tieuChiCT = $this->mauTieuChi_Repository->getTieuChiChiTietOfMau($dotDanhGia->mauTieuChi->id);
        return response()->json([
            'dotDanhGia' => $dotDanhGia,
            'tieuChi' => $tieuChiCT
        ], 200);
    }

}
