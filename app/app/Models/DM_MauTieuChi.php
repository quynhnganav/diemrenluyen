<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\TieuChiChiTiet;

class DM_MauTieuChi extends Model
{

    use SoftDeletes;

    protected $table = 'table_DRL_DM_MauTieuChi';
    public static $snakeAttributes = false;

    protected $fillable = [
        'TenMauTieuChi',
        'TenKhongDau',
        'TongSoDiem',
        'PhatHanh'
    ];

    protected $casts = [
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
    ];

    protected $hidden = [
        'TenKhongDau', 'deleted_at'
    ];

    public function tieuChiChiTiet()
    {
        return $this->hasMany(TieuChiChiTiet::class, 'MauTieuChiChiTiet_Id');
    }

}
