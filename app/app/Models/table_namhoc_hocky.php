<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\DM_DotDanhGia;

class table_namhoc_hocky extends Model
{

    protected $table = 'table_namhoc_hocky';
    public static $snakeAttributes = false;

    protected $fillable = [
        // 'nambatdau',
        // 'namketthuc',
        // 'namhoc_key',
        // 'hocky',
        // 'hienhanh'
    ];

    protected $casts = [
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
        'hienhanh' => 'boolean'
    ];

    protected $hidden = [
        'idDaoTao', 'deleted_at', 'remember_token', 'updated_at', 'batdau', 'batdau'
    ];

    public function danhGiaChiTiet() {
        return $this->hasMany(DanhGiaChiTiet::class, 'DotDanhGia_Id');
    }

    public function mauTieuChi() {
        return $this->belongsTo(DM_MauTieuChi::class, 'MauTieuChi_Id', 'id');
    }

}
