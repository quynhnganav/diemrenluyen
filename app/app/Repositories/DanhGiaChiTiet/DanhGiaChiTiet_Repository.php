<?php

namespace App\Repositories\DanhGiaChiTiet;

use App\Models\DanhGiaChiTiet;
use App\Repositories\BaseRepository;
use Illuminate\Support\Facades\DB;

class DanhGiaChiTiet_Repository extends BaseRepository implements DanhGiaChiTiet_RepositoryInterface
{
    public function getModel()
    {
        return DanhGiaChiTiet::class;
    }

    public function updateDanhGiaChiTiet($HocKy_Id, $MaSV, $update)
    {
        $update['HocKy_Id'] = $HocKy_Id;
        $update['MaSV'] = $MaSV;
        return $this->model->updateOrCreate(['HocKy_Id' => $HocKy_Id, 'MaSV' => $MaSV], $update);
    }

    public function getDiemSV($HocKy_Id, $MaSV)
    {
        return $this->model->where('HocKy_Id', $HocKy_Id)
            ->where('MaSV', $MaSV)->first();
    }

    public function thongKeTheoDot($LopHoc_Id, $HocKy_Id, $GV_Duyet)
    {
        $sqlGVDuyet = $GV_Duyet ? " DanhGiaChiTiet.GiangVienDuyet IS TRUE AND " : "  ";
        $hocKy = $HocKy_Id ? "DanhGiaChiTiet.HocKy_Id = {$HocKy_Id} AND" : " ";
        $result = DB::select("
                    SELECT
                        cast(sum(xuatsac) as UNSIGNED) as xuatsac,
                        cast(sum(tot) as UNSIGNED) AS tot,
                        cast(sum(kha) as UNSIGNED) AS kha,
                        cast(sum(trungbinh) as UNSIGNED) AS trungbinh,
                        cast(sum(yeu) as UNSIGNED) AS yeu,
                        cast(sum(kem) as UNSIGNED) AS kem,
                        cast((sum(xuatsac) + sum(tot) + sum(kha) + sum(trungbinh) + sum(yeu) + sum(kem)) as UNSIGNED) AS total,
                        HocKy_Id
                    FROM (
                        SELECT
                            sum(if(DanhGiaChiTiet.TongSoDiem >= 90, 1, 0)) as xuatsac,
                            sum(if(DanhGiaChiTiet.TongSoDiem < 90 AND DanhGiaChiTiet.TongSoDiem >=80, 1, 0)) as tot,
                            sum(if(DanhGiaChiTiet.TongSoDiem < 80 AND DanhGiaChiTiet.TongSoDiem >=65, 1, 0)) as kha,
                            sum(if(DanhGiaChiTiet.TongSoDiem < 65 AND DanhGiaChiTiet.TongSoDiem >=50, 1, 0)) as trungbinh,
                            sum(if(DanhGiaChiTiet.TongSoDiem < 50 AND DanhGiaChiTiet.TongSoDiem >=35, 1, 0)) as yeu,
                            sum(if(DanhGiaChiTiet.TongSoDiem < 35, 1, 0)) as kem,
                            DanhGiaChiTiet.MaSV,
                            DanhGiaChiTiet.HocKy_Id
                        FROM DanhGiaChiTiet
                        JOIN SV ON
                            SV.LopHoc_Id = {$LopHoc_Id} AND
                            {$hocKy}
                            {$sqlGVDuyet}
                            SV.MaSV = DanhGiaChiTiet.MaSV
                        GROUP BY DanhGiaChiTiet.HocKy_Id, DanhGiaChiTiet.MaSV
                    ) as thongke
                    GROUP BY thongke.HocKy_Id;
                   ");
        return collect($result);
    }
}
