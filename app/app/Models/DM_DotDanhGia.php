<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\DM_HocKy;
use App\Models\DanhGiaChiTiet;

class DM_DotDanhGia extends Model
{
    use SoftDeletes;

    protected $table = 'DM_DotDanhGia';
    public static $snakeAttributes = false;

    protected $fillable = [
        'HocKy_Id',
        'MauTieuChi_Id',
        'TenDotDanhGia',
        'TenKhongDau',
        'PhatHanh',
        'ChotSo',
        'HanCuoi',
    ];

    public function hocKy() {
        return $this->belongsTo(DM_HocKy::class, 'HocKy_Id');
    }

    public function danhGiaChiTiet() {
        return $this->hasMany(DanhGiaChiTiet::class, 'DotDanhGia_Id');
    }

    public function mauTieuChi() {
        return $this->belongsTo(DM_MauTieuChi::class, 'MauTieuChi_Id', 'id');
    }

}
