<?php

namespace App\Http\Controllers\EndUser;

use App\Common\Constant;
use App\Http\Controllers\Controller;
use App\Models\DanhGiaChiTiet;
use App\Repositories\DanhGiaChiTiet\DanhGiaChiTiet_Repository;
use App\Repositories\DM_DotDanhGia\DM_DotDanhGia_Repository;
use App\Repositories\DM_MauTieuChi\DM_MauTieuChi_Repository;
use App\Repositories\SV\SV_Repository;
use App\Services\DanhGiaService;
use App\Services\DTAPIService;
use App\Services\TieuChiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CBLQuanLyController extends Controller
{

    protected $mauTieuChi_Repository, $dotDanhGia_Repository, $danhGiaChiTiet_Repository;
    private $danhGiaService, $sv_Repository, $daotaoAPI, $tieuChiService;

    public function __construct(
        DM_MauTieuChi_Repository           $mauTieuChi_Repository,
        DM_DotDanhGia_Repository                $dotDanhGia_Repository,
        DanhGiaChiTiet_Repository          $danhGiaChiTiet_Repository,
        DanhGiaService                     $danhGiaService,
        SV_Repository                      $sv_Repository,
        DTAPIService                       $daotaoAPI,
        TieuChiService                     $tieuChiService
    ) {
        $this->mauTieuChi_Repository = $mauTieuChi_Repository;
        $this->danhGiaService = $danhGiaService;
        $this->sv_Repository = $sv_Repository;
        $this->daotaoAPI = $daotaoAPI;
        $this->dotDanhGia_Repository = $dotDanhGia_Repository;
        $this->tieuChiService = $tieuChiService;
        $this->danhGiaChiTiet_Repository = $danhGiaChiTiet_Repository;
    }

    public function getDSDanhGia() {
        $sv = session('sv');
        $dotDanhGia = $this->dotDanhGia_Repository->getHienHanh();
        if (empty($dotDanhGia) || empty($dotDanhGia->hocKy)) abort(404, "Đợt đánh giá chưa sẵn sàng, mời bạn chuyển sang học kỳ khác");
        $result = $this->dotDanhGia_Repository->getDSDanhGiaByLopAndHocKy($sv->lopsh_id, $dotDanhGia->id);
        return response()->json([
            'DotDanhGia_Id' => $dotDanhGia->id,
            'LopHoc_Id' => $sv->lopsh_id,
            'sinhViens' => $result 
        ], 200);
    }

    public function sinhVienGetDotDanhGiaHienTai($id) {
        $user = Auth::user();
        $sv = $this->sv_Repository->findSVByIdOrMaSv($id, 'user');
        if (empty($sv)) abort(404, "Không tìm thấy sinh viên");
        $dotDanhGia = $this->dotDanhGia_Repository->getHienHanh();
        if (empty($dotDanhGia) || empty($dotDanhGia->hocKy)) abort(404, "Đợt đánh giá chưa sẵn sàng, mời bạn chuyển sang học kỳ khác");
        $tieuChiCT = $this->mauTieuChi_Repository->getTieuChiChiTietOfMau($dotDanhGia->MauTieuChi_Id);
        $diem = $this->danhGiaChiTiet_Repository->getDiemSV($dotDanhGia->id, $sv->masv);
        $diemHocTap = $this->daotaoAPI->getDiemSV($dotDanhGia->hocKy->id, $dotDanhGia->hocKy->hocky, $sv->masv);
        $newTieuChi = $this->danhGiaService->mergeTieuChiAndDanhGia($tieuChiCT, $diem, $this->tieuChiService->diemHocTap($diemHocTap));
        return response()->json([
            'hocKy' => $dotDanhGia,
            'tieuChi' => $newTieuChi,
            'sinhVien' => $sv,
            'danhGia' => $diem
        ], 200);
    }

    public function sinhVienDanhGiaDotDanhGiaHienTai(Request $request, $id) {
        $input = $request->all();
        $sv = $this->sv_Repository->findSVByIdOrMaSv($id, 'user');
        if (empty($sv)) abort(404, "Không tìm thấy sinh viên");
        $dotDanhGia = $this->dotDanhGia_Repository->getHienHanh();
        if (empty($dotDanhGia) || empty($dotDanhGia->hocKy)) abort(404, "Đợt đánh giá chưa sẵn sàng, mời bạn chuyển sang học kỳ khác");
        if ($dotDanhGia->Khoa) abort(403, "Đợt đánh giá đã đóng");
        $tieuChiCT = $this->mauTieuChi_Repository->getTieuChiChiTietOfMau($dotDanhGia->MauTieuChi_Id, false);
        $diemHocTap = $this->daotaoAPI->getDiemSV($dotDanhGia->hocKy->id, $dotDanhGia->hocKy->hocky, $sv->masv);
        $validate = $this->danhGiaService->validateDanhGia($input, $tieuChiCT, $this->tieuChiService->diemHocTap($diemHocTap));
        if (!$validate[0]) return response()->json($validate[1], 422);
        $this->danhGiaChiTiet_Repository->updateDanhGiaChiTiet($dotDanhGia->id, $sv->masv, [
            'CanBoLopDanhGia' => json_encode($validate[3]),
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
