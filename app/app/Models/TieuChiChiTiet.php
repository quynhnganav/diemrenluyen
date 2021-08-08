<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TieuChiChiTiet extends Model
{

    use SoftDeletes;

    protected $table = 'TieuChiChiTiet';

    protected $fillable = [
        'MauTieuChiChiTiet_Id', 
        'TieuChiChiTiet_Id',
        'TenTieuChi',
        'TenKhongDau',
        'SoDiem',
        'Css'
    ];
}
