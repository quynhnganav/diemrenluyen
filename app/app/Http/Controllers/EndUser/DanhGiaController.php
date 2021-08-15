<?php

namespace App\Http\Controllers\EndUser;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DanhGiaController extends Controller
{
    public function index(Request $request) {
        return view('sv.index');
    }
}
