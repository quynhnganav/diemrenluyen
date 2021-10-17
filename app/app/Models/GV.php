<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GV extends Model
{

    // use SoftDeletes;

    protected $table = 'table_giangvien';
    public static $snakeAttributes = false;

    protected $fillable = [
        // 'id',
        // 'ma_gv',
        // 'hodem',
        // 'ten',
        // 'donvi_id',
        // 'is_gv',
        // 'phongban_id',
        // 'doanthe_id',
        // 'username',
        // 'password',
        // 'ngaysinh',
        // 'phone',
        // 'chucdanh',
        // 'ngach',
        // 'chuc_doanthe',
        // 'chuc_chinhquyen'
    ];

    protected $casts = [
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
    ];

    protected $hidden = [
        'deleted_at', 'created_at', 'updated_at', 'donvi_id', 'phongban_id', 'doanthe_id',
        'username', 'password', 'ngaysinh', 'phone', 'phone_cq', 'ngach', 'chuc_doanthe',
        'chuc_chinhquyen', 'email', 'website', 'scv', 'scholar', 'fields', 'remember_token'
    ];

    public function user()
    {
        return $this->belongsTo('App\\Models\\User', 'username', 'username');
    }

    public function lopHocs()
    {
        return $this->hasMany(DM_LopHoc::class, 'GV_Id');
    }



}
