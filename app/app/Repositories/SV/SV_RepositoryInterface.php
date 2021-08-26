<?php

namespace App\Repositories\SV;

use App\Repositories\RepositoryInterface;

interface SV_RepositoryInterface extends RepositoryInterface
{
    public function syncSinhVienLop($idLop);

    public function search($text);
}
