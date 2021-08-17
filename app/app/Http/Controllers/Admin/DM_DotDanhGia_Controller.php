<?php

namespace App\Http\Controllers\Admin;

use App\Repositories\DM_DotDanhGia\DM_DotDanhGia_Repository;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DM_DotDanhGia;

class DM_DotDanhGia_Controller extends Controller
{

    protected $dotDanhGia_Repository;

    public function __construct(DM_DotDanhGia_Repository $dotDanhGia_Repository) {
        $this->dotDanhGia_Repository = $dotDanhGia_Repository;
    }

    public function getData() {
        $dotDanhGias = $this->dotDanhGia_Repository->getAll(['hocKy', 'mauTieuChi'], 'created_at desc');
        return response()->json(json_decode($dotDanhGias), 200);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
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
            'TenDotDanhGia' => 'required|max:255',
            'HocKy_Id' => 'required|exists:DM_HocKy,id|unique:DM_DotDanhGia,HocKy_Id,NULL,id,deleted_at,NULL',
            'MauTieuChi_Id' => 'required|exists:DM_MauTieuChi,id,PhatHanh,1,deleted_at,NULL',
            'PhatHanh' => 'required|boolean',
//            'HanCuoi' => 'required|after:yesterday',
        ]);
        $dotDanhGia = $this->dotDanhGia_Repository->create([
            'TenDotDanhGia' => $request->TenDotDanhGia,
            'TenKhongDau' => Str::slug($request->TenDotDanhGia, " "),
            'HocKy_Id' => $request->HocKy_Id,
            'MauTieuChi_Id' => $request->MauTieuChi_Id,
            'PhatHanh' => $request->PhatHanh,
//            'HanCuoi' => $request->HanCuoi,
        ]);

        return response()->json(json_decode($dotDanhGia), 201);
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
            $dotDanhGia = $this->dotDanhGia_Repository->findOrFail($id);
        } catch (\Throwable $th) {
            abort(404, "Không tìm thấy mẫu tiêu chí");
        }
        return response()->json(json_decode($dotDanhGia), 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id)
    {

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
            'TenDotDanhGia' => 'required|max:255',
            'HocKy_Id' => 'required|exists:DM_HocKy,id|unique:DM_DotDanhGia,HocKy_Id,NULL,id,id,!'.$id.',deleted_at,NULL',
            'MauTieuChi_Id' => 'required|exists:DM_MauTieuChi,id,PhatHanh,1,deleted_at,NULL',
            'PhatHanh' => 'required|boolean',
//            'HanCuoi' => 'required|after:yesterday',
        ]);
        $dotDanhGia = $this->dotDanhGia_Repository->update($id, [
            'TenDotDanhGia' => $request->TenDotDanhGia,
            'TenKhongDau' => Str::slug($request->TenDotDanhGia, " "),
            'HocKy_Id' => $request->HocKy_Id,
            'MauTieuChi_Id' => $request->MauTieuChi_Id,
            'PhatHanh' => $request->PhatHanh
        ]);
        if (!$dotDanhGia) abort(404, "Không tìm thấy mẫu tiêu chí");

        return response()->json(json_decode($dotDanhGia), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $deleted = $this->dotDanhGia_Repository->delete($id);
        if (!$deleted) {
            abort(404, "Không tìm thấy đợt đánh giá");
        }
        return response()->json(["message" => "Xóa thành công"], 200);
    }
}
