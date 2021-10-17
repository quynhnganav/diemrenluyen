<?php

namespace App\Http\Controllers;

use App\Models\GV;
use App\Models\SV;
use App\Repositories\User\User_Repository;
use Illuminate\Http\Request;

class UserController extends Controller
{

    private $user_Repository;

    public function __construct(
        User_Repository $user_Repository
    ){
        $this->user_Repository = $user_Repository;
    }

    public function index(Request $request) {
        $search = $request->get('search');
        $users = $this->user_Repository->search(['chucVu' => function ($query) {
            $query->orderByRaw('ifnull(ChucDanh, LopHoc_Id)');
            $query->morphWith([
                SV::class => ['lopHoc'],
                GV::class => ['lopHocs']
            ]);
        }, 'roles'], 'isAdmin desc, id asc', [], $search);
        return $users;
    }

    public function changeRuleSV(Request $request, $id) {
        $roles = $request->roles;
        $user = $this->user_Repository->find($id);
        $user->roles()->detach();
        $user->assignRole($roles);
        return response()->json([
            'message' => "Thành công"
        ], 200);
    }
}
