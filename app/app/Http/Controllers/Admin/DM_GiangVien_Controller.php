<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\GV;

class DM_GiangVien_Controller extends Controller
{
    public function index()
    {
        $gv = GV::with('lopHocs', 'user')->get();
        return $gv;
    }
}
