<?php

namespace App\Http\Controllers\EndUser;

use App\Common\Constant;
use App\Http\Controllers\Controller;
use App\Models\DanhGiaChiTiet;
use App\Repositories\DanhGiaChiTiet\DanhGiaChiTiet_Repository;
use App\Repositories\DM_DotDanhGia\DM_DotDanhGia_Repository;
use App\Repositories\DM_MauTieuChi\DM_MauTieuChi_Repository;
use App\Services\DanhGiaService;
use App\Services\DTAPIService;
use App\Services\TieuChiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;


class DanhGiaController extends Controller
{

    protected $mauTieuChi_Repository, $dotDanhGia_Repository, $danhGiaChiTiet_Repository;
    private $danhGiaService, $daotaoAPI, $tieuChiService;

    public function __construct(
        DM_MauTieuChi_Repository           $mauTieuChi_Repository,
        DM_DotDanhGia_Repository                $dotDanhGia_Repository,
        DanhGiaChiTiet_Repository          $danhGiaChiTiet_Repository,
        DanhGiaService                     $danhGiaService,
        DTAPIService                       $daotaoAPI,
        TieuChiService                     $tieuChiService
    ) {
        $this->mauTieuChi_Repository = $mauTieuChi_Repository;
        $this->danhGiaService = $danhGiaService;
        $this->daotaoAPI = $daotaoAPI;
        $this->dotDanhGia_Repository = $dotDanhGia_Repository;
        $this->tieuChiService = $tieuChiService;
        $this->danhGiaChiTiet_Repository = $danhGiaChiTiet_Repository;
    }

    public function index(Request $request) {
        return view('sv.index');
    }

    public function store(Request $request) {
        $input = $request->all();
        $sv = session('sv');
        $dotDanhGia = $this->dotDanhGia_Repository->getHienHanh();
        if (empty($dotDanhGia) || empty($dotDanhGia->hocKy)) abort(404, "Đợt đánh giá chưa sẵn sàng, mời bạn chuyển sang học kỳ khác");
        if ($dotDanhGia->Khoa) abort(403, "Đợt đánh giá đã đóng");
        $diemSV = $this->danhGiaChiTiet_Repository->getDanhGiaSV($dotDanhGia->id, $sv->masv);
        if (!empty($diemSV) && $diemSV->GiangVienDuyet) return response()->json([
            'message' => 'Giảng viên đã duyệt'
        ], 403);
        $tieuChiCT = $this->mauTieuChi_Repository->getTieuChiChiTietOfMau($dotDanhGia->MauTieuChi_Id, false);
        $diemHocTap = $this->daotaoAPI->getDiemSV($dotDanhGia->hocKy->id, $dotDanhGia->hocKy->hocky, $sv->masv);
        $validate = $this->danhGiaService->validateDanhGia($input, $tieuChiCT, $this->tieuChiService->diemHocTap($diemHocTap));
        if (!$validate[0]) return response()->json($validate[1], 422);
        $this->danhGiaChiTiet_Repository->updateDanhGiaChiTiet($dotDanhGia->id, $sv->masv, [
            'SinhVienDanhGia' => json_encode($validate[3]),
            'TongSoDiemSinhVien' => $validate[2]
        ]);
        return $validate;
    }

    public function sinhVienGetDotDanhGiaHienTai() {
        $sv = session('sv');
        $dotDanhGia = $this->dotDanhGia_Repository->getHienHanh();
        if (empty($dotDanhGia) || empty($dotDanhGia->hocKy)) abort(404, "Đợt đánh giá chưa sẵn sàng, mời bạn chuyển sang học kỳ khác");
        $tieuChiCT = $this->mauTieuChi_Repository->getTieuChiChiTietOfMau($dotDanhGia->MauTieuChi_Id);
        $diem = $this->danhGiaChiTiet_Repository->getDiemSV($dotDanhGia->id, $sv->masv);
        $diemHocTap = $this->daotaoAPI->getDiemSV($dotDanhGia->hocKy->id, $dotDanhGia->hocKy->hocky, $sv->masv);
        $newTieuChi = $this->danhGiaService->mergeTieuChiAndDanhGia($tieuChiCT, $diem, $this->tieuChiService->diemHocTap($diemHocTap));
        return response()->json([
            'dotDanhGia' => $dotDanhGia,
            'tieuChi' => $newTieuChi,
            'danhGia' => $diem
        ], 200);
    }

}
