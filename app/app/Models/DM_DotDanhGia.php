<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\DM_DotDanhGia;

class DM_DotDanhGia extends Model
{

    use SoftDeletes;

    protected $table = 'table_DRL_DM_DotDanhGia';
    public static $snakeAttributes = false;

    protected $fillable = [
        'HienHanh',
        'MauTieuChi_Id',
        'HocKy_Id'
    ];

    protected $casts = [
        'Khoa' => 'boolean',
        'HienHanh' => 'boolean',
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
        // 'PhatHanh' => 'boolean'
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

    public function hocKy() {
        return $this->hasOne(table_namhoc_hocky::class, 'namhoc_key', 'HocKy_Id');
    }

}
