<?php

namespace App\Http\Controllers\EndUser;

use Illuminate\Support\Facades\Auth;
use App\Common\Constant;
use App\Http\Controllers\Controller;
use App\Repositories\DanhGiaChiTiet\DanhGiaChiTiet_Repository;
use App\Repositories\DM_DotDanhGia\DM_DotDanhGia_Repository;
use App\Repositories\DM_LopHoc\DM_LopHoc_Repository;
use App\Repositories\DM_MauTieuChi\DM_MauTieuChi_Repository;
use App\Repositories\SV\SV_Repository;
use App\Services\DanhGiaService;
use App\Services\DTAPIService;
use App\Services\TieuChiService;
use Illuminate\Http\Request;

class GVController extends Controller
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

    public function getLop() {
        $gv = session('gv');
        $lopHoc = $this->lopHoc_Repository->getLopHocOfGV($gv->id);
        return response()->json($lopHoc, 200);
    }

    public function danhSachDiemRenLuyenLop(Request $request) {
        $idLop = $request->get('lop');
        if (empty($idLop) && $idLop != 0) return [];
        $dotDanhGia = $this->dotDanhGia_Repository->getHienHanh();
        if (empty($dotDanhGia) || empty($dotDanhGia->hocKy)) abort(404, "?????t ????nh gi?? ch??a s???n s??ng, m???i b???n chuy???n sang h???c k??? kh??c");
        $reuslt = $this->dotDanhGia_Repository->getDSDanhGiaByLopAndHocKy($idLop, $dotDanhGia->id);
        return response()->json($reuslt, 200);
    }

    public function GVGetDotDanhGiaHienTai($id) {
//        return Auth::user();
        $user = Auth::user();
        $hocKyId = $user[Constant::SESSION_KEY['HocKyHienTai_Id']] ?? 7;
        $sv = $this->sv_Repository->findSVByIdOrMaSv($id, 'user');
//        if (empty($sv) || $sv->LopHoc_Id != $user->chucVu->LopHoc_Id) abort(404, "Kh??ng t??m th???y sinh vi??n");
        $hocKy = $this->dotDanhGia_Repository->find($hocKyId);
        if (empty($hocKy) || !$hocKy->PhatHanh) abort(404, "?????t ????nh gi?? ch??a s???n s??ng, m???i b???n chuy???n sang h???c k??? kh??c");
        $tieuChiCT = $this->mauTieuChi_Repository->getTieuChiChiTietOfMau($hocKy->mauTieuChi->id);
        $diem = $this->danhGiaChiTiet_Repository->getDiemSV($hocKy->id, $sv->MaSV);
        $diemHocTap = $this->daotaoAPI->getDiemSV($hocKy->idDaoTao, $hocKy->TenHocKy, $sv->MaSV);
        $newTieuChi = $this->danhGiaService->mergeTieuChiAndDanhGia($tieuChiCT, $diem, $this->tieuChiService->diemHocTap($diemHocTap));
        return response()->json([
            'hocKy' => $hocKy,
            'tieuChi' => $newTieuChi,
            'sinhVien' => $sv,
            'danhGia' => $diem
        ], 200);
    }

    public function nhanXetSV(Request $request, $id) {
        $this->validate($request, [
            'nhanXet' => 'required'
        ], [
            'nhanXet.required' => 'Nh???p nh???n x??t'
        ]);
        $danhGia = $this->danhGiaChiTiet_Repository->find($id, ['dotDanhGia', 'sinhVien']);
        if (empty($danhGia)) abort(404, '????nh gi?? kh??ng t???n t???i');
        $nhanXet = $this->danhGiaService->saveNhanXet($id, $request->nhanXet, 'GiangVienNhanXet');
        return $nhanXet;
    }

    public function duyetSV($id) {
        $danhGia = $this->danhGiaChiTiet_Repository->find($id, ['dotDanhGia', 'sinhVien']);
        if (empty($danhGia)) abort(404, '????nh gi?? kh??ng t???n t???i');
        if (empty($danhGia->CanBoLopDanhGia)) abort(403, 'C??n b??? l???p ch??a ????nh gi??');
        $duyet = $danhGia->GiangVienDuyet ? $this->danhGiaService->saveBoDuyet($id, 'GiangVienDuyet')
            : $this->danhGiaService->saveDuyet($id,'GiangVienDuyet');
        return $duyet;
    }

    public function index() {
        return view('gv.index');
    }

    public function show($id)
    {
        return view('gv.index');
    }

}
