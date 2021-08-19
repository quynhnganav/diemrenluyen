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

    /**
     * Get the GV that owns the DM_LopHoc
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function GV(): BelongsTo
    {
        return $this->belongsTo(GV::class, 'LopHoc_Id');
    }

}
