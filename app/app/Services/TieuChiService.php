<?php

namespace App\Services;

use Illuminate\Support\Str;

use App\Models\DM_MauTieuChi;
use App\Models\TieuChiChiTiet;

class TieuChiService {

    public function __construct() {
    }

    public function diemHocTap($input) {
        if (empty($input) || $input < 2) return 0;
        if ($input < 3.2) return 2;
        return 4;
    }

    public function updateTree($trees, $mauTieuChi_Id, $diemHocTap)
    {
        $mauTieuChi = DM_MauTieuChi::find($mauTieuChi_Id);
        if (empty($mauTieuChi)) abort(404, "Không tồn tại mẫu tiêu chí");
        $points = $this->getPointTrees($trees);
        // if ($points != $mauTieuChi->TongSoDiem) abort(400, "Số điểm không bằng tổng số điểm của mẫu tiêu chí");
        TieuChiChiTiet::where('MauTieuChi_Id', $mauTieuChi->id)->delete();
        for ($i=0; $i < count($trees); $i++) {
            $this->updateOneTree($trees[$i], null, $mauTieuChi->id, $diemHocTap);
        }
        return true;
    }

    public function getPointTrees($trees)
    {
        $points = 0;
        for ($i=0; $i < count($trees); $i++) {
            $points += $this->getPointOneTree($trees[$i]);
        }
        return $points;
    }

    private function getPointOneTree($tree) {
        $tree = (object) $tree;
        $point = $tree->SoDiem;
        if (!empty($tree->children)) {
            $point = 0;
            for ($i=0; $i < count($tree->children); $i++) {
                $point += $this->getPointOneTree($tree->children[$i]);
            }
        }
        return $point;
    }

    private function updateOneTree($tree, $parent, $mauTieuChi_Id, $diemHocTap) {
        $tree = (object) $tree;
        $tieuChiChiTiet = new TieuChiChiTiet([
            "MauTieuChi_Id" => $mauTieuChi_Id,
            "TenTieuChi" => $tree->TenTieuChi,
            "TenKhongDau" => Str::slug($tree->TenTieuChi, " "),
            "SoDiem" => $tree->SoDiem,
            "Css" => $tree->Css,
            'isDiemHocTap' => $diemHocTap == $tree->id
        ]);
        if (!empty($parent)) $tieuChiChiTiet->parent_id = $parent->id;
        if (!empty($tree->children)) $tieuChiChiTiet->SoDiem = 0;
        $tieuChiChiTiet->save();
        if (!empty($tree->children)) {
            for ($i=0; $i < count($tree->children); $i++) {
                $this->updateOneTree($tree->children[$i], $tieuChiChiTiet, $mauTieuChi_Id, $diemHocTap);
            }
        }
        return $tieuChiChiTiet;
    }

}
