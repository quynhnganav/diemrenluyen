<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DM_MauTieuChi extends Model
{

    use SoftDeletes;

    protected $table = 'DM_MauTieuChi';

    protected $fillable = [
        'TenMauTieuChi', 
        'TenKhongDau',
        'TongSoDiem',
        'PhatHanh'
    ];


}
