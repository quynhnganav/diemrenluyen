<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SV extends Model
{

    use SoftDeletes;

    protected $table = 'SV';
    protected $keyType = 'string';

    protected $fillable = [
        'LopHoc_Id'
    ];
    
}
