<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\GV\GV_Repository;
use Illuminate\Http\Request;

use App\Models\GV;

class DM_GiangVien_Controller extends Controller
{
    private $GV_Repository;

    public function __construct(GV_Repository $GV_Repository)
    {
        $this->GV_Repository = $GV_Repository;
    }

    public function index()
    {
         return $this->GV_Repository->getAll('user');
//        return view('admin.index');
    }

}
