<?php

namespace App\Services;

use App\Common\Helper;
use App\Exports\DanhGiaTheoLopExports;
use Illuminate\Support\Collection;
use App\Repositories\DanhGiaChiTiet\DanhGiaChiTiet_Repository;
use App\Repositories\DM_HocKy\DM_HocKy_Repository;
use Maatwebsite\Excel\Facades\Excel;


class ExcelService
{

    private $danhGiaChiTiet_Repository, $hocKy_Repository;

    public function __construct(
        DanhGiaChiTiet_Repository          $danhGiaChiTiet_Repository,
        DM_HocKy_Repository                $hocKy_Repository
    ){
        $this->danhGiaChiTiet_Repository = $danhGiaChiTiet_Repository;
        $this->hocKy_Repository = $hocKy_Repository;
    }

    public function baoCaoExcelTheoLop($lop, $hocKy, $gvDuyet) {

        $thongke = $this->danhGiaChiTiet_Repository->thongKeTheoDot($lop->id, $hocKy->id, $gvDuyet)->first();
        $sinhViens = $this->hocKy_Repository->getDSDanhGiaByLopAndHocKy($lop->id, $hocKy->id);
        $danhGias = $sinhViens
//            ->sort(function ($a, $b) {
//            return $a->user->Ten == $b->user->Ten ? $a->user->HoDem > $b->user->HoDem : $a->user->Ten > $b->user->Ten;
//        })
            ->map(function ($sv, $index) {
            return [
                'STT' => $index + 1,
                'HoDem' => $sv->user->HoDem,
                'Ten' => $sv->user->Ten,
                'MaSV' => $sv->MaSV,
                'Diem' => $sv->danhGia->TongSoDiem ?? 0,
                'XepLoai' => Helper::diemToXepLoai($sv->danhGia->TongSoDiem ?? -1),
                'GhiChu' => $sv->danhGia->GhiChu ?? ''
            ];
        })->toArray();
        $excel = new DanhGiaTheoLopExports($danhGias, $thongke, $lop, $hocKy);
        $time = time();
        return Excel::download($excel,
            "[{$lop->TenLopHoc}] Báo cáo điểm rèn luyện học kỳ {$hocKy->TenHocKy} năm học {$hocKy->NamBatDau} - {$hocKy->NamKetThuc} - {$time}.xlsx");
    }

}
