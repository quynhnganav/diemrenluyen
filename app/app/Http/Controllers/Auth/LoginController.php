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
use App\Models\GV;
use App\Models\SV;
use App\Models\DM_LopHoc;
use App\Models\table_namhoc_hocky;

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
            return redirect()->route('sv.login');
        }

        $sv = SV::where('email', 'natuan@vku.udn.vn')->first();
        if (!empty($sv)) {
            $user = User::where('username', $sv->masv)->first();
            if (empty($user)) return redirect()->route('sv.login');
            $loptruong = DM_LopHoc::where('loptruong_id', $sv->id)->first();
            if (!empty($loptruong)) {
                session(['loptruong' => true]);
            }
            session(['sv' => $sv]);
            auth()->login($user, false);
            return redirect()->route('sv.danh-gia.index');
        }
        
        $gv = GV::where('email', 'natuan@vku.udn.vn')->where('is_gv', 1)->first();
        if (!empty($gv) && $gv->is_gv) {
            $user = User::where('username', $gv->username)->first();
            if (empty($user)) return redirect()->route('sv.login');
            session(['gv' => $gv]);
            auth()->login($user, false);
            return redirect()->route('gv.login');
        }
        

        return redirect()->route('sv.login');
    }

}
