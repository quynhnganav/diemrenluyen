<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Common\Constant;
use Illuminate\Support\Facades\Auth;
use App\Repositories\DanhGiaChiTiet\DanhGiaChiTiet_Repository;
use App\Repositories\DM_DotDanhGia\DM_DotDanhGia_Repository;
use App\Repositories\DM_LopHoc\DM_LopHoc_Repository;
use App\Repositories\DM_MauTieuChi\DM_MauTieuChi_Repository;
use App\Repositories\SV\SV_Repository;
use App\Services\DanhGiaService;
use App\Services\DTAPIService;
use App\Services\TieuChiService;

class DM_DiemRenLuyen_Controller extends Controller
{

    private $lopHoc_Repository;
    private $mauTieuChi_Repository, $dotDanhGia_Repository;
    private $danhGiaService, $sv_Repository, $daotaoAPI, $tieuChiService, $danhGiaChiTiet_Repository;

    public function __construct(
        DM_MauTieuChi_Repository           $mauTieuChi_Repository,
        DM_DotDanhGia_Repository                $dotDanhGia_Repository,
        DanhGiaService                     $danhGiaService,
        SV_Repository                      $sv_Repository,
        DTAPIService                       $daotaoAPI,
        TieuChiService                     $tieuChiService,
        DM_LopHoc_Repository               $lopHoc_Repository,
        DanhGiaChiTiet_Repository          $danhGiaChiTiet_Repository
    ) {
        $this->mauTieuChi_Repository = $mauTieuChi_Repository;
        $this->danhGiaService = $danhGiaService;
        $this->sv_Repository = $sv_Repository;
        $this->daotaoAPI = $daotaoAPI;
        $this->dotDanhGia_Repository = $dotDanhGia_Repository;
        $this->tieuChiService = $tieuChiService;
        $this->lopHoc_Repository = $lopHoc_Repository;
        $this->danhGiaChiTiet_Repository = $danhGiaChiTiet_Repository;
    }

    public function danhSachDiemRenLuyenLop(Request $request)
    {
        $lop = $request->get('lop');
        if (empty($lop) && $lop != 0) return [];
        $dotDanhGia = $this->dotDanhGia_Repository->getHienHanh();
        if (empty($dotDanhGia) || empty($dotDanhGia->hocKy)) abort(404, "Đợt đánh giá chưa sẵn sàng, mời bạn chuyển sang học kỳ khác");
        $reuslt = $this->dotDanhGia_Repository->getDSDanhGiaByLopAndHocKy($lop, $dotDanhGia->id);
        return response()->json($reuslt, 200);
    }

    public function getDanhGiaSV($id) {
        $diem = $this->danhGiaChiTiet_Repository->find($id, ['dotDanhGia', 'sinhVien']);
        if (empty($diem)) abort(404, "Không tìm thấy bản ghi đánh giá của sinh viên");
        $tieuChiCT = $this->mauTieuChi_Repository->getTieuChiChiTietOfMau($diem->dotDanhGia->MauTieuChi_Id);
        $diemHocTap = $this->daotaoAPI->getDiemSV($diem->dotDanhGia->idDaoTao, $diem->dotDanhGia->TenHocKy, $diem->sinhVien->MaSV);
        $newTieuChi = $this->danhGiaService->mergeTieuChiAndDanhGia($tieuChiCT, $diem, $this->tieuChiService->diemHocTap($diemHocTap));
        return response()->json([
            'hocKy' => $diem->dotDanhGia,
            'tieuChi' => $newTieuChi,
            'sinhVien' => $diem->sinhVien,
            'danhGia' => $diem
        ], 200);
    }


    public function index()
    {
        return view('admin.index');
    }
}
