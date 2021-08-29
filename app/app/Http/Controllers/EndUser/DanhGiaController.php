<?php

namespace App\Http\Controllers\EndUser;

use App\Common\Constant;
use App\Http\Controllers\Controller;
use App\Models\DanhGiaChiTiet;
use App\Repositories\DM_DotDanhGia\DM_DotDanhGia_Repository;
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

    protected $dotDanhGia_Repository;
    protected $mauTieuChi_Repository, $hocKy_Repository;
    private $danhGiaService, $daotaoAPI, $tieuChiService;

    public function __construct(
        DM_DotDanhGia_Repository $dotDanhGia_Repository,
        DM_MauTieuChi_Repository $mauTieuChi_Repository,
        DM_HocKy_Repository $hocKy_Repository,
        DanhGiaService $danhGiaService,
        DTAPIService $daotaoAPI,
        TieuChiService $tieuChiService
    ) {
        $this->dotDanhGia_Repository = $dotDanhGia_Repository;
        $this->mauTieuChi_Repository = $mauTieuChi_Repository;
        $this->danhGiaService = $danhGiaService;
        $this->daotaoAPI = $daotaoAPI;
        $this->hocKy_Repository = $hocKy_Repository;
        $this->tieuChiService = $tieuChiService;
    }

    public function index(Request $request) {
        return view('sv.index');
    }

    public function store(Request $request) {
        $input = $request->all();
        $user = Auth::user();
        $hocKyId = $user[Constant::SESSION_KEY['HocKyHienTai_Id']];
        $dotDanhGia = $this->dotDanhGia_Repository->findOneByHocKy($hocKyId);
        if (empty($dotDanhGia) || $dotDanhGia->ChotSo || !$dotDanhGia->PhatHanh) abort(404, "Đợt đánh giá chưa sẵn sàng, mời bạn chuyển sang học kỳ khác");

        $tieuChiCT = $this->mauTieuChi_Repository->getTieuChiChiTietOfMau($dotDanhGia->mauTieuChi->id, false);
        $hocKy = $this->hocKy_Repository->find($hocKyId);
        $diemHocTap = $this->daotaoAPI->getDiemSV($hocKy->idDaoTao, $hocKy->TenHocKy, $user->chucVu->MaSV);
        $validate = $this->danhGiaService->validateDanhGia($input, $tieuChiCT, $this->tieuChiService->diemHocTap($diemHocTap));
        if (!$validate[0]) return response()->json($validate[1], 422);
        DanhGiaChiTiet::updateOrCreate(['DotDanhGia_Id' => $dotDanhGia->id, 'SinhVien_Id' => $user->chucVu->id], [
            'DotDanhGia_Id' => $dotDanhGia->id,
            'SinhVien_Id' => $user->chucVu->id,
            'SinhVienDanhGia' => json_encode($validate[3]),
            'TongSoDiemSinhVien' => $validate[2]
        ]);
        return $validate;
    }

    public function sinhVienGetDotDanhGiaHienTai() {
        $user = Auth::user();
        $hocKyId = $user[Constant::SESSION_KEY['HocKyHienTai_Id']];
        $dotDanhGia = $this->dotDanhGia_Repository->findOneByHocKy($hocKyId);
        if (empty($dotDanhGia) || !$dotDanhGia->PhatHanh) abort(404, "Đợt đánh giá chưa sẵn sàng, mời bạn chuyển sang học kỳ khác");
        $tieuChiCT = $this->mauTieuChi_Repository->getTieuChiChiTietOfMau($dotDanhGia->mauTieuChi->id);
        $diem = DanhGiaChiTiet::where('DotDanhGia_Id', $dotDanhGia->id)
            ->where('SinhVien_Id', $user->chucVu->id)->first();
        $hocKy = $this->hocKy_Repository->find($hocKyId);
        $diemHocTap = $this->daotaoAPI->getDiemSV($hocKy->idDaoTao, $hocKy->TenHocKy, $user->chucVu->MaSV);
        $newTieuChi = $this->danhGiaService->mergeTieuChiAndDanhGia($tieuChiCT, $diem, $this->tieuChiService->diemHocTap($diemHocTap));
        return response()->json([
            'dotDanhGia' => $dotDanhGia,
            'tieuChi' => $newTieuChi
        ], 200);
    }

}
