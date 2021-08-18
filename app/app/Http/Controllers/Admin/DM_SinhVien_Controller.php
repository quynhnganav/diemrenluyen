<?php

namespace App\Http\Controllers\Admin;

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

    public function getData() {
        $svs = $this->sv_Repository->getPaginate(['user', 'lopHoc']);
        return response()->json($svs, 200);
    }

    public function index()
    {
    //     $sv = SV::with('user', 'lopHoc')->paginate(20);
    //     // $sv = $sv.map()
    //    return response()->json($sv, 200);
        return view('admin.index');
    }

    public function show($id)
    {
        $sv = SV::with('user', 'lopHoc')->findOrFail($id);
       return response()->json($sv, 200);
    }

    public function syncSinhVienLop($idLop)
    {
        $sv = $this->apiDaoTao->getDanhSachSVLop($idLop);
        collect($sv)->each(function ($item) use($idLop) {
            $item = (object) $item;

            $newSv = SV::updateOrCreate(['id' => $item->id], [
                'id' => $item->id,
                'LopHoc_Id' => $idLop,
                'MaSV' => $item->masv,
                'TenNganh' => $item->tennganh,
                'TrangThai' => $item->trangthai,
                'GhiChu' => $item->ghichu,
            ]);

            User::updateOrCreate(['email' => $item->email], [
                'Profile_id' => $newSv->id,
                'Profile_type' => 'App\Models\SV',
                'Ten' => $item->ten,
                'HoDem' => $item->hodem,
                'HoTenKhongDau' => Str::slug($item->hodem." ".$item->ten, " "),
                'email' => $item->email,
                'username' => $item->email,
                'SoDienThoai' => PhoneNumber::convert($item->dienthoai),
                'SoDienThoaiGiaDinh' => PhoneNumber::convert($item->dienthoaigiadinh),
                'NgaySinh' => $item->ngaysinh,
                'GioiTinh' => $item->gioitinh,
            ]);
       });
       return response()->json(["message" => "Đồng bộ thành công"], 200);
    }

    public function getSVLopID($idLop)
    {
        $sv = SV::where('LopHoc_Id', $idLop)->with('user', 'lopHoc')->paginate(50);
        return response()->json($sv, 200);
    }

    public function getSVLopTen($tenLop)
    {
        $sv = SV::whereHas('lopHoc', function ($query) use ($tenLop) {
            return $query->where('TenKhongDau', '=', Str::slug($tenLop, " "));
        })->with('user')->orderBy('MaSV')->paginate(50);
        return response()->json($sv, 200);
    }

}
