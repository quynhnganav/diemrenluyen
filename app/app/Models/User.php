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
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'HocKyHienTai_Id',
        'Profile_id', 
        'Profile_type', 
        'Ten', 
        'HoDem',
        'HoTenKhongDau',
        'email', 
        'username', 
        'SoDienThoai',
        'SoDienThoaiGiaDinh',
        'NgaySinh',
        'GioiTinh',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'Profile_type', 'HoTenKhongDau'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function chucVu()
    {
        return $this->morphTo(__FUNCTION__, 'Profile_Type', 'Profile_Id');
    }

}
