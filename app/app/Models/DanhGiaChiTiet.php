<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class DanhGiaChiTiet extends Model
{

    use SoftDeletes;

    protected $table = 'DanhGiaChiTiet';
    public static $snakeAttributes = false;

    protected $fillable = [
        'HocKy_Id',
        'MaSV',
        'SinhVienDanhGia',
        'CanBoLopDanhGia',
        'TongSoDiem',
        'TongSoDiemSinhVien',
        'GiangVienDuyet',
        'GiangVienNhanXet'
    ];

    protected $casts = [
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
        'GiangVienDuyet' => 'boolean'
    ];

    protected $hidden = [
        'deleted_at', 'created_at', 'updated_at',
        'SinhVienDanhGia', 'CanBoLopDanhGia'
    ];

    public function dotDanhGia() {
        return $this->belongsTo(DM_HocKy::class, 'HocKy_Id');
    }

    public function sinhVien() {
        return $this->belongsTo(SV::class, 'MaSV', 'MaSV');
    }

}
