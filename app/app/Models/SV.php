<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\DM_LopHoc;

class SV extends Model
{

    // use SoftDeletes;

    protected $table = 'table_sinhvien';
    public static $snakeAttributes = false;

    protected $fillable = [
        // 'id',
        // 'masv',
        // 'hodem',
        // 'ten',
        // 'ngaysinh',
        // 'gioitinh',
        // 'dienthoai',
        // 'dienthoaigiadinh',
        // 'khoahoc_id',
        // 'lopsh_id',
        // 'nganh_id',
        // 'ctdt_id',
        // 'trangthai',
        // 'is_tn',
        // 'ghichu',
    ];

    protected $casts = [
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp'
    ];

    protected $hidden = [
        'deleted_at', 'created_at', 'updated_at', 'remember_token', 'diem_dauvao', 'pt_ts', 'type', 'thechat',
        'quocphong', 'ngoaingu', 'tinhoc'
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'masv', 'username');
    }

    public function lopHoc()
    {
        return $this->belongsTo(DM_LopHoc::class, 'lopsh_id');
    }

    public function danhGia() {
        return $this->hasOne(DanhGiaChiTiet::class, 'MaSV', 'masv');
    }

}
