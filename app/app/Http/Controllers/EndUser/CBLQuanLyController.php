<?php

namespace App\Http\Controllers\EndUser;

use App\Common\Constant;
use App\Http\Controllers\Controller;
use App\Models\DanhGiaChiTiet;
use App\Repositories\DM_DotDanhGia\DanhGia_ChiTiet_ChiTiet_Repository;
use App\Repositories\DM_DotDanhGia\DM_DotDanhGia_Repository;
use App\Repositories\DM_HocKy\DM_HocKy_Repository;
use App\Repositories\DM_MauTieuChi\DM_MauTieuChi_Repository;
use App\Repositories\SV\SV_Repository;
use App\Services\DanhGiaService;
use App\Services\DTAPIService;
use App\Services\TieuChiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CBLQuanLyController extends Controller
{

    protected $dotDanhGia_Repository;
    protected $mauTieuChi_Repository, $hocKy_Repository;
    private $danhGiaService, $sv_Repository, $daotaoAPI, $tieuChiService;

    public function __construct(
        DM_DotDanhGia_Repository $dotDanhGia_Repository,
        DM_MauTieuChi_Repository           $mauTieuChi_Repository,
        DM_HocKy_Repository                $hocKy_Repository,
        DanhGiaService                     $danhGiaService,
        SV_Repository                      $sv_Repository,
        DTAPIService                       $daotaoAPI,
        TieuChiService                     $tieuChiService
    ) {
        $this->dotDanhGia_Repository = $dotDanhGia_Repository;
        $this->mauTieuChi_Repository = $mauTieuChi_Repository;
        $this->danhGiaService = $danhGiaService;
        $this->sv_Repository = $sv_Repository;
        $this->daotaoAPI = $daotaoAPI;
        $this->hocKy_Repository = $hocKy_Repository;
        $this->tieuChiService = $tieuChiService;
    }

    public function getDSDanhGia() {
        $user = Auth::user();
        $hocKyId = $user[Constant::SESSION_KEY['HocKyHienTai_Id']];
        $dotDanhGia = $this->dotDanhGia_Repository->findOneByHocKy($hocKyId);
        if (empty($dotDanhGia)  || !$dotDanhGia->PhatHanh) abort(404, "Đợt đánh giá chưa sẵn sàng, mời bạn chuyển sang học kỳ khác");
        $result = $this->dotDanhGia_Repository->getDSDanhGiaByLopAndDotDanhGia($user->chucVu->lopHoc->id, $dotDanhGia->id);
        return response()->json($result, 200);
    }

    public function sinhVienGetDotDanhGiaHienTai($id) {
//        return Auth::user();
        $user = Auth::user();
        $hocKyId = $user[Constant::SESSION_KEY['HocKyHienTai_Id']];
        $sv = $this->sv_Repository->find($id, 'user');
        if (empty($sv) || $sv->LopHoc_Id != $user->chucVu->LopHoc_Id) abort(404, "Không tìm thấy sinh viên");
        $dotDanhGia = $this->dotDanhGia_Repository->findOneByHocKy($hocKyId);
        if (empty($dotDanhGia) || !$dotDanhGia->PhatHanh) abort(404, "Đợt đánh giá chưa sẵn sàng, mời bạn chuyển sang học kỳ khác");
        $tieuChiCT = $this->mauTieuChi_Repository->getTieuChiChiTietOfMau($dotDanhGia->mauTieuChi->id);
        $diem = DanhGiaChiTiet::where('DotDanhGia_Id', $dotDanhGia->id)
            ->where('SinhVien_Id', $id)->first();
        $hocKy = $this->hocKy_Repository->find($hocKyId);
        $diemHocTap = $this->daotaoAPI->getDiemSV($hocKy->idDaoTao, $hocKy->TenHocKy, $sv->MaSV);
        $newTieuChi = $this->danhGiaService->mergeTieuChiAndDanhGia($tieuChiCT, $diem, $this->tieuChiService->diemHocTap($diemHocTap));
        return response()->json([
            'dotDanhGia' => $dotDanhGia,
            'tieuChi' => $newTieuChi,
            'sinhVien' => $sv,
            'danhGia' => $diem
        ], 200);
    }

    public function sinhVienDanhGiaDotDanhGiaHienTai(Request $request, $id) {
//        return Auth::user();
        $input = $request->all();
        $user = Auth::user();
        $hocKyId = $user[Constant::SESSION_KEY['HocKyHienTai_Id']];
        $sv = $this->sv_Repository->find($id, 'user');
        if (empty($sv) || $sv->LopHoc_Id != $user->chucVu->LopHoc_Id) abort(404, "Không tìm thấy sinh viên");
        $dotDanhGia = $this->dotDanhGia_Repository->findOneByHocKy($hocKyId);
        if (empty($dotDanhGia) || !$dotDanhGia->PhatHanh) abort(404, "Đợt đánh giá chưa sẵn sàng, mời bạn chuyển sang học kỳ khác");
        $tieuChiCT = $this->mauTieuChi_Repository->getTieuChiChiTietOfMau($dotDanhGia->mauTieuChi->id, false);
        $hocKy = $this->hocKy_Repository->find($hocKyId);
        $diemHocTap = $this->daotaoAPI->getDiemSV($hocKy->idDaoTao, $hocKy->TenHocKy, $sv->MaSV);
        $validate = $this->danhGiaService->validateDanhGia($input, $tieuChiCT, $this->tieuChiService->diemHocTap($diemHocTap));
//        $tieuChiCT = $this->mauTieuChi_Repository->getTieuChiChiTietOfMau($dotDanhGia->mauTieuChi->id);
        if (!$validate[0]) return response()->json($validate[1], 422);
        DanhGiaChiTiet::updateOrCreate(['DotDanhGia_Id' => $dotDanhGia->id, 'SinhVien_Id' => $id], [
            'DotDanhGia_Id' => $dotDanhGia->id,
            'SinhVien_Id' => $id,
            'CanBoLopDanhGia' => json_encode($input),
            'TongSoDiem' => $validate[2]
        ]);
        return $validate;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('sv.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return view('sv.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
