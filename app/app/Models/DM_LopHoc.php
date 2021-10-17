<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\GV;

class DM_LopHoc extends Model
{

    // use SoftDeletes;

    protected $table = 'table_lopsh';
    public static $snakeAttributes = false;

    protected $fillable = [
        // "id",
        // 'tenlop',
        // 'gv_id',
        // 'khoahoc_id',
        // 'loptruong_id',
        // 'khoaK',
        // 'namhoc',
        // 'ghichu',
        // 'trangthai'
    ];

    protected $casts = [
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
    ];

    protected $hidden = [
        'deleted_at', 'created_at', 'updated_at', 'TenKhongDau'
    ];

    /**
     * Get the GV that owns the DM_LopHoc
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function GV()
    {
        return $this->belongsTo(GV::class, 'GV_Id');
    }

    public function sinhViens() {
        return $this->hasMany(SV::class, 'LopHoc_Id');
    }

}
