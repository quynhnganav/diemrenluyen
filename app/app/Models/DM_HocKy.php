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
        'TenHocKy',
        'NamBatDau',
        'NamKetThuc',
        'HienHanh'
    ];

    protected $hidden = [
        'idDaoTao', 'deleted_at'
    ];

    public function dotDanhGia() {
        return $this->hasOne(DM_DotDanhGia::class, 'HocKy_Id', 'id');
    }

}
