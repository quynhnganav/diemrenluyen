<?php

namespace App\Services;

use App\Common\Helper;
use App\Exports\DanhGiaTheoLopExports;
use Illuminate\Support\Collection;
use App\Repositories\DanhGiaChiTiet\DanhGiaChiTiet_Repository;
use App\Repositories\DM_DotDanhGia\DM_DotDanhGia_Repository;
use Maatwebsite\Excel\Facades\Excel;


class ExcelService
{

    private $danhGiaChiTiet_Repository, $dotdanhGia_Repository;

    public function __construct(
        DanhGiaChiTiet_Repository          $danhGiaChiTiet_Repository,
        DM_DotDanhGia_Repository                $dotdanhGia_Repository
    ){
        $this->danhGiaChiTiet_Repository = $danhGiaChiTiet_Repository;
        $this->dotdanhGia_Repository = $dotdanhGia_Repository;
    }

    public function baoCaoExcelTheoLop($lop, $dotDanhGia, $gvDuyet) {
        $thongke = $this->danhGiaChiTiet_Repository->thongKeTheoDot($lop->id, $dotDanhGia->id, $gvDuyet)->first();
        $sinhViens = $this->dotdanhGia_Repository->getDSDanhGiaByLopAndHocKy($lop->id, $dotDanhGia->id);
        $danhGias = $sinhViens
            ->map(function ($sv, $index) {
            return [
                'STT' => $index + 1,
                'HoDem' => $sv->hodem,
                'Ten' => $sv->ten,
                'MaSV' => $sv->masv,
                'Diem' => $sv->danhGia->TongSoDiem ?? 0,
                'XepLoai' => Helper::diemToXepLoai($sv->danhGia->TongSoDiem ?? -1),
                'GhiChu' => $sv->danhGia->GhiChu ?? ''
            ];
        })->toArray();
        $excel = new DanhGiaTheoLopExports($danhGias, $thongke, $lop, $dotDanhGia->hocKy);
        $time = time();
        return Excel::download($excel,
            "[{$lop->tenlop}] Báo cáo điểm rèn luyện học kỳ {$dotDanhGia->hocky->hocky} năm học {$dotDanhGia->hocky->nambatdau} - {$dotDanhGia->hocky->namketthuc} - {$time}.xlsx");
    }

}
