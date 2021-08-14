<?php

namespace App\Http\Controllers\Admin;


use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Services\TieuChiService;

use App\Common\Constant;
use App\Models\DM_MauTieuChi;
use App\Models\TieuChiChiTiet;

class DM_MauTieuChi_Controller extends Controller
{

    private $tieuChiService;

    public function __construct(TieuChiService $tieuChiService) {
        $this->tieuChiService = $tieuChiService;
    }

    public function getData()
    {
        $mauTieuChi = DM_MauTieuChi::all();
        return $mauTieuChi;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return view('admin.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'TenMauTieuChi' => 'required|max:255',
            'TongSoDiem' => 'required|numeric',
        ]);
        $mauTieuChi = DM_MauTieuChi::create([
            'TenMauTieuChi' => $request->TenMauTieuChi,
            'TenKhongDau' => Str::slug($request->TenMauTieuChi, ' '),
            'TongSoDiem' => $request->TongSoDiem,
            'PhatHanh' => false,
        ]);

        return response()->json(json_decode($mauTieuChi), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $mauTieuChi = DM_MauTieuChi::findOrFail($id);
        } catch (\Throwable $th) {
           abort(404, "Không tìm thấy mẫu tiêu chí");
        }

        return response()->json(json_decode($mauTieuChi), 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id)
    {
        try {
            $mauTieuChi = DM_MauTieuChi::findOrFail($id);
        } catch (\Throwable $th) {
           abort(404, "Không tìm thấy mẫu tiêu chí");
        }
        return response()->json(json_decode($mauTieuChi), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'TenMauTieuChi' => 'required|max:255',
            'TongSoDiem' => 'required|numeric',
            'PhatHanh' => 'required|boolean',
        ]);

        try {
            $mauTieuChi = DM_MauTieuChi::findOrFail($id);
        } catch (\Throwable $th) {
           abort(404, "Không tìm thấy mẫu tiêu chí");
        }

        if ($mauTieuChi->PhatHanh == true
            && ($request->PhatHanh != $mauTieuChi->PhatHanh
            || $request->TongSoDiem != $mauTieuChi->TongSoDiem)
        ) {
            abort(403, "Mẫu danh mục đã được phát hành, không thể chỉnh sửa");
        }

        $mauTieuChi->TenMauTieuChi = $request->TenMauTieuChi;
        $mauTieuChi->TenKhongDau = Str::slug($request->TenMauTieuChi);
        $mauTieuChi->TongSoDiem = $request->TongSoDiem;
        $mauTieuChi->PhatHanh = $request->PhatHanh;

        $mauTieuChi->save();

        return response()->json(json_decode($mauTieuChi), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $mauTieuChi = DM_MauTieuChi::where('id', $id)->delete();
        return response()->json(["message" => "Xóa thành công"], 200);
    }

    public function updateChiTiet(Request $request, $idMauTieuChi)
    {
        try {
            $mauTieuChi = DM_MauTieuChi::findOrFail($idMauTieuChi);
        } catch (\Throwable $th) {
           abort(404, "Không tìm thấy mẫu tiêu chí");
        }
        $input = $request->tree;
        $result = $this->tieuChiService->updateTree($input, $mauTieuChi->id);
        return $result;
    }

    public function getTieuChiChiTiet(Request $request, $idMauTieuChi)
    {
        try {
            $mauTieuChi = DM_MauTieuChi::findOrFail($idMauTieuChi);
        } catch (\Throwable $th) {
           abort(404, "Không tìm thấy mẫu tiêu chí");
        }
        $nodes = TieuChiChiTiet::where('MauTieuChi_Id', $idMauTieuChi)->get()->toTree();
        return $nodes;

    }

}
