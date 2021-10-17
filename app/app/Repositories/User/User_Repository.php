<?php

namespace App\Repositories\User;

use App\Models\User;
use App\Repositories\BaseReadRepository;
use Illuminate\Support\Str;

class User_Repository extends BaseReadRepository implements User_RepositoryInterface
{

    public function getModel()
    {
        return User::class;
    }

    public function search($withRelation = [], $orderBy = '', $withCount = [], $search)
    {
        $search = Str::slug($search, " ");
        $query = $this->model->with($withRelation)->withCount($withCount);
        if (!empty($orderBy)) $query->orderByRaw($orderBy);
        if (!empty($search)) $query->where('HoTenKhongDau', 'like', "%{$search}%");
        return $query->paginate(20);
    }

}
