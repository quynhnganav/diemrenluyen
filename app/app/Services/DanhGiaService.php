<?php

namespace App\Services;

use App\Repositories\DanhGiaChiTiet\DanhGiaChiTiet_Repository;

class DanhGiaService
{
    private $danhGiaChiTiet_Repository;

    public function __construct(
        DanhGiaChiTiet_Repository $danhGiaChiTiet_Repository
    ) {
        $this->danhGiaChiTiet_Repository = $danhGiaChiTiet_Repository;
    }

    public function saveNhanXet($id, $text, $rule) {
        if (empty($rule)) return;
        return $this->danhGiaChiTiet_Repository->update($id, [$rule => $text]);
    }

    public function saveDuyet($id, $rule) {
        if (empty($rule)) return;
        return $this->danhGiaChiTiet_Repository->update($id, [$rule => TRUE]);
    }

    public function saveBoDuyet($id, $rule) {
        if (empty($rule)) return;
        return $this->danhGiaChiTiet_Repository->update($id, [$rule => FALSE]);
    }

    public function validateDanhGia($input, $tieuChi, $diemHocTap = 0) {
        $key = array_keys((array)$input);
        $total = 0;
        $errors = collect($key)->reduce(function ($errs, $k) use ($tieuChi, $input) {
            $check = collect($tieuChi)->some(function ($t) use($k, $input) {
                if (empty($t->parent_id)) return true;
                $diemIn = !empty($input[$k]) ? $input[$k] : 0;
                return $t->id == $k && $diemIn <= $t->SoDiem;
            });
            if (!$check) array_push($errs, $k);
            return $errs;
        }, []);
        if (count($errors) == 0) {
            $total = collect($tieuChi)->reduce(function ($prev, $t) use($input, $diemHocTap) {
                    if ($t->isDiemHocTap) return $diemHocTap + $prev;
                    return empty($t->parent_id) || $t->SoDiem == 0 ? $prev : $prev + (empty($input[$t->id]) ? 0 : $input[$t->id]);
            }, 0);
        }
        $idDiemHocTap = collect($tieuChi)->where('isDiemHocTap', true)->first()->id;
        $input[$idDiemHocTap] = $diemHocTap;
        return [count($errors) == 0, $errors, $total, $input];
    }

    function mergeTieuChiAndDanhGia($tieuChi, $danhGia, $diemHocTap = 0) {
        if (empty($danhGia)) $danhGia = (object) [
            'SinhVienDanhGia' => '',
            'CanBoLopDanhGia' => ''
        ];
        $danhGia->SinhVienDanhGia =  (json_decode($danhGia->SinhVienDanhGia, true) ?: []);
        $danhGia->CanBoLopDanhGia = (json_decode($danhGia->CanBoLopDanhGia, true) ?: []);
        for ($i=0; $i<count($tieuChi); $i++) {
            $this->deepTree($tieuChi[$i], $danhGia, $diemHocTap);
        }
        return $tieuChi;
    }

    private function deepTree($tieuChi, $danhGia, $diemHocTap = 0) {
        $id = $tieuChi->id;
        $tieuChi->SoDiemSV = empty($danhGia->SinhVienDanhGia[$id]) ? 0 : $danhGia->SinhVienDanhGia[$id];
        $tieuChi->SoDiemCBL = empty($danhGia->CanBoLopDanhGia[$id]) ? 0 : $danhGia->CanBoLopDanhGia[$id];

        if ($tieuChi->isDiemHocTap == 1) {
            $tieuChi->SoDiemSV = $diemHocTap;
            $tieuChi->SoDiemCBL = $diemHocTap;
        }
        if (!empty($tieuChi->children)) {
            for ($i=0; $i<count($tieuChi->children); $i++) {
                $this->deepTree($tieuChi->children[$i], $danhGia, $diemHocTap);
            }
        }
        return;
    }

}
