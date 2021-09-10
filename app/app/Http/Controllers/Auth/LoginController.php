<?php

namespace App\Http\Controllers\Auth;

use App\Common\Constant;
use App\Http\Controllers\Controller;
use App\Models\DM_HocKy;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/admin';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function username()
    {
        return 'username';
    }

    /**
     * Redirect the user to the provider authentication page.
     *
     * @return \Illuminate\Http\Response
     */
    public function redirectToProvider($driver)
    {
        return Socialite::driver($driver)->redirect();
    }

    public function handleProviderCallback($driver)
    {
        try {
            $user = Socialite::driver($driver)->user();
        } catch (\Exception $e) {
            return redirect()->route('login');
        }

        $existingUser = User::where('email', $user->getEmail())->with(['chucVu.lopHoc', 'hocKy'])->first();

        if (empty($existingUser)) {
            return redirect()->route('sv.login');
        }
        $existingUser->picture = $user->getAvatar();

        $hocKyHienHanhOfUser = $existingUser->HocKyHienTai_Id;
        if (empty($hocKyHienHanhOfUser)) {
            $hocKyHT = DM_HocKy::where('HienHanh', 1)->first();
            if (empty($hocKyHT)) return redirect()->route('sv.login');
            $existingUser->HocKyHienTai_Id = $hocKyHT->id;
            $hocKyHienHanhOfUser = $hocKyHT->id;
        }
        $existingUser->save();
        $hocKys = DM_HocKy::orderBy('NamBatDau', 'desc')->orderBy('TenHocKy', 'desc')->get();

    //    $existingUser = User::where('email', 'natuan@vku.udn.vn')->with(['chucVu', 'hocKy'])->first();

        session(['HocKyHienTai_Id' => $hocKyHienHanhOfUser]);
        session([Constant::SESSION_KEY['HocKys'] => $hocKys]);
        auth()->login($existingUser, false);

        return $existingUser->hasRole('gvcn') ? redirect()->route('gv.login') : redirect()->route('sv.danh-gia.index');
    }

}
