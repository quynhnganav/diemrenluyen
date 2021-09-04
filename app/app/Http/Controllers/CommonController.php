<?php

namespace App\Http\Controllers;

use App\Common\Constant;
use App\Repositories\DanhGiaChiTiet\DanhGiaChiTiet_Repository;
use App\Repositories\DM_HocKy\DM_HocKy_Repository;
use App\Repositories\DM_LopHoc\DM_LopHoc_Repository;
use App\Repositories\DM_MauTieuChi\DM_MauTieuChi_Repository;
use App\Repositories\SV\SV_Repository;
use App\Services\DanhGiaService;
use App\Services\DTAPIService;
use App\Services\ExcelService;
use App\Services\TieuChiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommonController extends Controller
{
    private $lopHoc_Repository, $excelService;
    private $mauTieuChi_Repository, $hocKy_Repository;
    private $danhGiaService, $sv_Repository, $daotaoAPI, $tieuChiService, $danhGiaChiTiet_Repository;

    public function __construct(
        DM_MauTieuChi_Repository           $mauTieuChi_Repository,
        DM_HocKy_Repository                $hocKy_Repository,
        DanhGiaService                     $danhGiaService,
        SV_Repository                      $sv_Repository,
        DTAPIService                       $daotaoAPI,
        TieuChiService                     $tieuChiService,
        DM_LopHoc_Repository               $lopHoc_Repository,
        DanhGiaChiTiet_Repository          $danhGiaChiTiet_Repository,
        ExcelService                       $excelService
    ) {
        $this->mauTieuChi_Repository = $mauTieuChi_Repository;
        $this->danhGiaService = $danhGiaService;
        $this->sv_Repository = $sv_Repository;
        $this->daotaoAPI = $daotaoAPI;
        $this->hocKy_Repository = $hocKy_Repository;
        $this->tieuChiService = $tieuChiService;
        $this->lopHoc_Repository = $lopHoc_Repository;
        $this->danhGiaChiTiet_Repository = $danhGiaChiTiet_Repository;
        $this->excelService = $excelService;
    }

    public function thongKeTheoLop(Request $request) {
        $user = Auth::user();
        $lop = $request->lop ?? -1;
        $gvDuyet = $request->duyet ? true : false;
        if (!empty($user->chucVu->LopHoc_Id)) $lop = $user->chucVu->LopHoc_Id;
        $hocKyId = $user[Constant::SESSION_KEY['HocKyHienTai_Id']] ?? 7;
        $result = $this->danhGiaChiTiet_Repository->thongKeTheoDot($lop, $hocKyId, $gvDuyet)->first();
        return response()->json($result, 200);
    }

    public function baoCaoExcelTheoLop(Request $request) {
        $user = Auth::user();
        $LopHoc_Id = $request->lop ?? -1;
        $gvDuyet = $request->duyet ? true : false;
        if (!empty($user->chucVu->LopHoc_Id)) $LopHoc_Id = $user->chucVu->LopHoc_Id;
        $lop = $this->lopHoc_Repository->find($LopHoc_Id, ['GV.user']);
        $hocKyId = $user[Constant::SESSION_KEY['HocKyHienTai_Id']] ?? 7;
        $hocKy = $this->hocKy_Repository->find($hocKyId);
        return $this->excelService->baoCaoExcelTheoLop($lop, $hocKy, $gvDuyet);
    }

}
