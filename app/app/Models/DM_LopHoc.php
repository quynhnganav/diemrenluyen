<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\GV;

class DM_LopHoc extends Model
{

    use SoftDeletes;

    protected $table = 'DM_LopHoc';
    public static $snakeAttributes = false;

    protected $fillable = [
        "id",
        'Khoa_Id',
        'GV_Id',
        'TenLopHoc',
        'TenKhongDau',
        'KhoaHoc',
        'isSync'
    ];

    protected $casts = [
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
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
