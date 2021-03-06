<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use Notifiable;
    use HasRoles, SoftDeletes;

    public static $snakeAttributes = false;

//    protected $with = ['chucVu', 'hocKy'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        // 'username',
        // 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'Profile_type', 'HoTenKhongDau', 'email_verified_at', 'deleted_at', 'created_at', 'updated_at',
        'pivot'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
        // "isAdmin" => 'boolean',
        // "isRoot" => 'boolean',
    ];


    public function isGV()
    {
        return $this->hasOne(GV::class, 'username', 'username');
    }

    public function isSV()
    {
        return $this->hasOne(SV::class, 'username', 'masv');
    }

}
