<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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

    public function user()
    {
        return $this->morphOne('App\\Models\\User', 'Profile');
    }

    public function lopHocs()
    {
        return $this->hasMany(DM_LopHoc::class, 'GV_Id');
    }



}
