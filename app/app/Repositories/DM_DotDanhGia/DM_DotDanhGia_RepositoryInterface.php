<?php

namespace App\Repositories\DM_DotDanhGia;

use App\Repositories\RepositoryInterface;

interface DM_DotDanhGia_RepositoryInterface extends RepositoryInterface
{
    public function getDSDanhGiaByLopAndHocKy($idLop, $idHocKy);
    public function updateHienHanh($id);
    public function getHienHanh();
}
