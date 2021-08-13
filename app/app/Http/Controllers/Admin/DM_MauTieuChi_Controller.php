<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

use App\Common\Constant;
use App\Models\DM_MauTieuChi;

class DM_MauTieuChi_Controller extends Controller
{

    public function getData()
    {
        $mauTieuChi = DM_MauTieuChi::paginate(15);
        return $mauTieuChi;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $mauTieuChi = DM_MauTieuChi::paginate(15); 
        return view('admin.index', ["data" => [
            'mauTieuChi' => $mauTieuChi
        ]]);
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

    public function updateChiTiet(Request $request, $id)
    {
        # code...
    }

}
