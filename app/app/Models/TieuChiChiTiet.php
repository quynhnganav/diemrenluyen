<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Kalnoy\Nestedset\NodeTrait;

class TieuChiChiTiet extends Model
{

    use SoftDeletes, NodeTrait;

    protected $table = 'TieuChiChiTiet';
    public static $snakeAttributes = false;

    protected $fillable = [
        'MauTieuChi_Id',
//        'TieuChiChiTiet_Id',
        'TenTieuChi',
        'TenKhongDau',
        'SoDiem',
        'isDiemHocTap',
        'Css'
    ];

    protected $casts = [
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
        'isDiemHocTap' => 'boolean'
    ];

    protected $hidden = [
        'TenKhongDau', 'deleted_at', 'created_at', 'updated_at', 'parent_id', '_lft', '_rgt', 'MauTieuChi_Id'
    ];

}
