<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DM_DiemRenLuyen_Controller extends Controller
{
    public function index()
    {
        return view('admin.index');
    }
}
