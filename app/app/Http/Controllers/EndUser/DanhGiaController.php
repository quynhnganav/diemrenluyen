<?php

namespace App\Http\Controllers\EndUser;

use App\Common\Constant;
use App\Http\Controllers\Controller;
use App\Models\DanhGiaChiTiet;
use App\Repositories\DanhGiaChiTiet\DanhGiaChiTiet_Repository;
use App\Repositories\DM_HocKy\DM_HocKy_Repository;
use App\Repositories\DM_MauTieuChi\DM_MauTieuChi_Repository;
use App\Services\DanhGiaService;
use App\Services\DTAPIService;
use App\Services\TieuChiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;


class DanhGiaController extends Controller
{

    protected $mauTieuChi_Repository, $hocKy_Repository, $danhGiaChiTiet_Repository;
    private $danhGiaService, $daotaoAPI, $tieuChiService;

    public function __construct(
        DM_MauTieuChi_Repository           $mauTieuChi_Repository,
        DM_HocKy_Repository                $hocKy_Repository,
        DanhGiaChiTiet_Repository          $danhGiaChiTiet_Repository,
        DanhGiaService                     $danhGiaService,
        DTAPIService                       $daotaoAPI,
        TieuChiService                     $tieuChiService
    ) {
        $this->mauTieuChi_Repository = $mauTieuChi_Repository;
        $this->danhGiaService = $danhGiaService;
        $this->daotaoAPI = $daotaoAPI;
        $this->hocKy_Repository = $hocKy_Repository;
        $this->tieuChiService = $tieuChiService;
        $this->danhGiaChiTiet_Repository = $danhGiaChiTiet_Repository;
    }

    public function index(Request $request) {
        return view('sv.index');
    }

    public function store(Request $request) {
        $input = $request->all();
        $user = Auth::user();
        $hocKyId = $user[Constant::SESSION_KEY['HocKyHienTai_Id']];
        $hocKy = $this->hocKy_Repository->find($hocKyId);
        if (empty($hocKy) || !$hocKy->PhatHanh) abort(404, "Đợt đánh giá chưa sẵn sàng, mời bạn chuyển sang học kỳ khác");
        $tieuChiCT = $this->mauTieuChi_Repository->getTieuChiChiTietOfMau($hocKy->MauTieuChi_Id, false);
        $diemHocTap = $this->daotaoAPI->getDiemSV($hocKy->idDaoTao, $hocKy->TenHocKy, $user->chucVu->MaSV);
        $validate = $this->danhGiaService->validateDanhGia($input, $tieuChiCT, $this->tieuChiService->diemHocTap($diemHocTap));
        if (!$validate[0]) return response()->json($validate[1], 422);
        $this->danhGiaChiTiet_Repository->updateDanhGiaChiTiet($hocKy->id, $user->chucVu->MaSV, [
            'SinhVienDanhGia' => json_encode($validate[3]),
            'TongSoDiemSinhVien' => $validate[2]
        ]);
              return $validate;
    }

    public function sinhVienGetDotDanhGiaHienTai() {
        $user = Auth::user();
        $hocKyId = $user[Constant::SESSION_KEY['HocKyHienTai_Id']];
        $hocKy = $this->hocKy_Repository->find($hocKyId);
        if (empty($hocKy) || !$hocKy->PhatHanh) abort(404, "Đợt đánh giá chưa sẵn sàng, mời bạn chuyển sang học kỳ khác");
        $tieuChiCT = $this->mauTieuChi_Repository->getTieuChiChiTietOfMau($hocKy->MauTieuChi_Id);
        $diem = $this->danhGiaChiTiet_Repository->getDiemSV($hocKy->id, $user->chucVu->MaSV);
        $diemHocTap = $this->daotaoAPI->getDiemSV($hocKy->idDaoTao, $hocKy->TenHocKy, $user->chucVu->MaSV);
        $newTieuChi = $this->danhGiaService->mergeTieuChiAndDanhGia($tieuChiCT, $diem, $this->tieuChiService->diemHocTap($diemHocTap));
        return response()->json([
            'dotDanhGia' => $hocKy,
            'tieuChi' => $newTieuChi
        ], 200);
    }

}
