<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Kalnoy\Nestedset\NodeTrait;

class TieuChiChiTiet extends Model
{

    use SoftDeletes, NodeTrait;

    protected $table = 'TieuChiChiTiet';

    protected $fillable = [
        'MauTieuChi_Id',
        'TieuChiChiTiet_Id',
        'TenTieuChi',
        'TenKhongDau',
        'SoDiem',
        'Css'
    ];

    protected $hidden = [
        'TenKhongDau', 'deleted_at', 'created_at', 'updated_at'
    ];

}
