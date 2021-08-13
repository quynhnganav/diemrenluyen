<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\DM_LopHoc;

class SV extends Model
{

    use SoftDeletes;

    protected $table = 'SV';

    protected $fillable = [
        'id',
        'LopHoc_Id',
        'MaSV',
        'TenNganh',
        'TrangThai',
        'GhiChu'
    ];

    public function user()
    {
        return $this->morphOne('App\Models\User', 'Profile');
    }

    /**
     * Get the lopHoc that owns the SV
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function lopHoc()
    {
        return $this->belongsTo(DM_LopHoc::class, 'LopHoc_Id');
    }
    
}
