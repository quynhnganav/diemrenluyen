<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\DM_LopHoc;

class GV extends Model
{

    use SoftDeletes;

    protected $table = 'GV';
    protected $keyType = 'string';

    /**
     * Get all of the lopHocs for the GV
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function lopHocs(): HasMany
    {
        return $this->hasMany(DM_LopHoc::class, 'LopHoc_Id');
    }

}
