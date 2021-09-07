<?php

namespace App\Repositories\User;

use App\Repositories\RepositoryInterface;

interface User_RepositoryInterface extends RepositoryInterface
{
    public function search($withRelation = [], $orderBy = '', $withCount = [], $search);
}
