<?php

namespace App\Repositories\DM_HocKy;

use App\Repositories\RepositoryInterface;

interface DM_HocKy_RepositoryInterface extends RepositoryInterface
{
    public function syncHocKy();
    public function getDSDanhGiaByLopAndHocKy($idLop, $idHocKy);
    public function updateHienHanh($id);
}
