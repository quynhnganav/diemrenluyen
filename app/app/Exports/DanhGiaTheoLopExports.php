<?php

namespace App\Exports;

use App\Models\DM_LopHoc;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;

class DanhGiaTheoLopExports implements FromCollection
{

    public function collection()
    {
        return DM_LopHoc::all();
    }
}
