<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\DM_LopHoc;

class GV extends Model
{

    use SoftDeletes;

    protected $table = 'GV';
    public static $snakeAttributes = false;

    protected $fillable = [
        'id',
        'email',
        'ChucDanh'
    ];

    /**
     * Get all of the lopHocs for the GV
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function lopHocs()
    {
        return $this->hasMany(DM_LopHoc::class, 'GV_Id');
    }

    public function user()
    {
        return $this->morphOne('App\Models\User', 'Profile');
    }

}
