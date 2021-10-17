<?php

namespace App\Http\Controllers\Admin;

use App\Jobs\ProcessSyncSinhVien;
use App\Models\DM_LopHoc;
use App\Repositories\SV\SV_Repository;
use Illuminate\Support\Str;
use Illuminate\Support\Collection;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Helper\PhoneNumber;
use App\Services\DTAPIService;
use App\Models\SV;
use App\Models\User;


class DM_SinhVien_Controller extends Controller
{

    private $apiDaoTao;
    private $sv_Repository;

    public function __construct(DTAPIService $daotaoAPI, SV_Repository $sv_Repository) {
        $this->apiDaoTao = $daotaoAPI;
        $this->sv_Repository = $sv_Repository;
    }

    public function index()
    {
        return view('admin.index');
    }

    public function show($id)
    {
        $sv = SV::with('user', 'lopHoc')->findOrFail($id);
       return response()->json($sv, 200);
    }

}
