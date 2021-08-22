<?php

namespace App\Repositories\DM_DotDanhGia;

use App\Repositories\RepositoryInterface;

interface DM_DotDanhGia_RepositoryInterface extends RepositoryInterface
{
    public function findOneByHocKy($id);

    public function getDSDanhGiaByLopAndDotDanhGia($idLop, $idDotDanhGia);
}
