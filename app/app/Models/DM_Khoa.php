<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DM_Khoa extends Model
{

    use SoftDeletes;

    protected $table = 'DM_Khoa';

    protected $fillable = [
        'MaKhoa', 
        'TenKhoa',
        'TenKhongDau'
    ];
}
