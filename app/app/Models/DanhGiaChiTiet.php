<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\DM_DotDanhGia;

class DanhGiaChiTiet extends Model
{

    use SoftDeletes;

    protected $table = 'DanhGiaChiTiet';
    public static $snakeAttributes = false;

    protected $fillable = [
        'DotDanhGia_Id',
        'SinhVien_Id',
        'SinhVienDanhGia',
        'CanBoLopDanhGia',
        'TongSoDiem'
    ];

    public function dotDanhGia() {
        return $this->belongsTo(DM_DotDanhGia::class, 'DotDanhGia_Id');
    }

}
