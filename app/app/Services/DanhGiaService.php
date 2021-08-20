<?php

namespace App\Services;

class DanhGiaService
{
    public function __construct() {
    }

    public function saveDanhGia() {

    }

    public function validateDanhGia($input, $tieuChi) {
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
            $total = collect($tieuChi)->reduce(function ($prev, $t) use($input) {
                    return empty($t->parent_id) || $t->SoDiem == 0 ? $prev : $prev + (empty($input[$t->id]) ? 0 : $input[$t->id]);
            }, 0);
        }
//        dd($total);
        return [count($errors) == 0, $errors, $total];
    }

    function mergeTieuChiAndDanhGia($tieuChi, $danhGia) {
        if (empty($danhGia)) return $tieuChi;
        $danhGia->SinhVienDanhGia =  (json_decode($danhGia->SinhVienDanhGia, true) ?: []);
        $danhGia->CanBoLopDanhGia = (json_decode($danhGia->CanBoLopDanhGia, true) ?: []);
//        dd($danhGia);
        for ($i=0; $i<count($tieuChi); $i++) {
            $this->deepTree($tieuChi[$i], $danhGia);
        }
        return $tieuChi;
    }

    private function deepTree($tieuChi, $danhGia) {
        $id = $tieuChi->id;
        $tieuChi->SoDiemSV = empty($danhGia->SinhVienDanhGia[$id]) ? 0 : $danhGia->SinhVienDanhGia[$id];
        $tieuChi->SoDiemCBL = empty($danhGia->CanBoLopDanhGia[$id]) ? 0 : $danhGia->CanBoLopDanhGia[$id];
        if (!empty($tieuChi->children)) {
            for ($i=0; $i<count($tieuChi->children); $i++) {
                $this->deepTree($tieuChi->children[$i], $danhGia);
            }
        }
        return;
    }

}
