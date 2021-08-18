<?php

namespace App\Http\Controllers\Admin;


use App\Repositories\DM_MauTieuChi\DM_MauTieuChi_Repository;
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
    private $mauTieuChi_Repository;

    public function __construct(TieuChiService $tieuChiService, DM_MauTieuChi_Repository $mauTieuChi_Repository) {
        $this->tieuChiService = $tieuChiService;
        $this->mauTieuChi_Repository = $mauTieuChi_Repository;
    }

    public function getData()
    {
        $mauTieuChi = $this->mauTieuChi_Repository->getAll([], 'created_at DESC');
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
        $mauTieuChi = $this->mauTieuChi_Repository->create([
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
            $mauTieuChi = $this->mauTieuChi_Repository->findOrFail($id);
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
            $mauTieuChi = $this->mauTieuChi_Repository->findOrFail($id);
        } catch (\Throwable $th) {
           abort(404, "Không tìm thấy mẫu tiêu chí");
        }

        if ($mauTieuChi->PhatHanh == true
            && ($request->PhatHanh != $mauTieuChi->PhatHanh
            || $request->TongSoDiem != $mauTieuChi->TongSoDiem)
        ) {
            abort(403, "Mẫu danh mục đã được phát hành, không thể chỉnh sửa");
        }

        $this->mauTieuChi_Repository->update($id, [
            'TenMauTieuChi' => $request->TenMauTieuChi,
            'TenKhongDau' => Str::slug($request->TenMauTieuChi),
            'TongSoDiem' => $request->TongSoDiem,
            'PhatHanh' => $request->PhatHanh,
        ]);

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
        $mauTieuChi = $this->mauTieuChi_Repository->delete($id);
        return response()->json(["message" => $mauTieuChi[1]], $mauTieuChi[0]);
    }

    public function updateChiTiet(Request $request, $idMauTieuChi)
    {
        try {
            $mauTieuChi = $this->mauTieuChi_Repository->findOrFail($idMauTieuChi);
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
            $mauTieuChi = $this->mauTieuChi_Repository->findOrFail($idMauTieuChi);
        } catch (\Throwable $th) {
           abort(404, "Không tìm thấy mẫu tiêu chí");
        }
        $nodes = TieuChiChiTiet::where('MauTieuChi_Id', $idMauTieuChi)->get()->toTree();
        return $nodes;

    }

}
