<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\DM_DotDanhGia;

class DM_HocKy extends Model
{

    use SoftDeletes;

    protected $table = 'DM_HocKy';
    public static $snakeAttributes = false;

    protected $fillable = [
        'idDaoTao',
        'MauTieuChi_Id',
        'TenHocKy',
        'NamBatDau',
        'NamKetThuc',
        'DaoTaoHienHanh',
        'HienHanh',
        'PhatHanh',
    ];

    protected $casts = [
        'DaoTaoHienHanh' => 'boolean',
        'HienHanh' => 'boolean',
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
        'PhatHanh' => 'boolean'
    ];

    protected $hidden = [
        'idDaoTao', 'deleted_at'
    ];

    public function danhGiaChiTiet() {
        return $this->hasMany(DanhGiaChiTiet::class, 'DotDanhGia_Id');
    }

    public function mauTieuChi() {
        return $this->belongsTo(DM_MauTieuChi::class, 'MauTieuChi_Id', 'id');
    }

}
