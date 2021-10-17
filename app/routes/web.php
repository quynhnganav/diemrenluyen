<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
//    return Excel::download(new \App\Exports\DanhGiaTheoLopExports(), 'lophoc.pdf', Excel::DOMPDF);
     return redirect('/sv');
})->name('index');

Route::get('redirect/{driver}', 'Auth\LoginController@redirectToProvider')
    ->name('login.provider')
    ->where('driver', implode('|', config('auth.socialite.drivers')));
Route::get('/callback/{driver}', 'Auth\LoginController@handleProviderCallback');

Route::get('doi-hoc-ky/{idHocKy}', 'Auth\AuthController@changeHocKy')
    ->name('doiHocKy')->middleware('auth');


Route::prefix('common')->name('common.')->group(function () {
    Route::get('diem-ren-luyen/api/thong-ke', 'CommonController@thongKeTheoLop')->middleware(['auth']);
    Route::get('diem-ren-luyen/api/bao-cao-excel', 'CommonController@baoCaoExcelTheoLop')->middleware(['auth']);
    Route::get('roles-user', 'CommonController@roles')->middleware(['auth', 'role:super_admin']);
});

Route::get('/sv', function () {
    if (Auth::check()) {
        return redirect()->route('sv.danh-gia.index');
    }
    return view('auth.sv.login');
})->name('sv.login');

Route::prefix('sv')->name('sv.')->middleware(['auth'])->group(function () {

    Route::get('danh-gia/api', 'EndUser\DanhGiaController@sinhVienGetDotDanhGiaHienTai');
    Route::get('danh-gia/api/dot-danh-gia', 'EndUser\DanhGiaController@sinhVienGetDotDanhGiaHienTai');
    Route::resource('danh-gia', EndUser\DanhGiaController::class);

    Route::prefix('cbl')->name('cbl.')->middleware(['loptruong'])->group(function () {
        Route::get('danh-gia/api', 'EndUser\CBLQuanLyController@getDSDanhGia');
        Route::get('danh-gia/api/sinh-vien/{id}', 'EndUser\CBLQuanLyController@sinhVienGetDotDanhGiaHienTai');
        Route::post('danh-gia/api/sinh-vien/{id}', 'EndUser\CBLQuanLyController@sinhVienDanhGiaDotDanhGiaHienTai');
        Route::resource('danh-gia', EndUser\CBLQuanLyController::class);
    });

});

Route::get('/gv', function () {
    if (Auth::check()) {
        return redirect()->route('gv.diem-ren-luyen.index');
    }
    return view('auth.gv.login');
})->name('gv.login');

Route::prefix('gv')->name('gv.')->middleware(['auth', 'gv'])->group(function () {

    Route::get('diem-ren-luyen/api/lop', 'EndUser\GVController@getLop');
    Route::get('diem-ren-luyen/api/sinh-vien/{id}', 'EndUser\GVController@GVGetDotDanhGiaHienTai');
    Route::put('diem-ren-luyen/api/nhan-xet/{id}', 'EndUser\GVController@nhanXetSV');
    Route::put('diem-ren-luyen/api/duyet/{id}', 'EndUser\GVController@duyetSV');
    Route::get('diem-ren-luyen/api', 'EndUser\GVController@danhSachDiemRenLuyenLop');

    Route::resource('diem-ren-luyen', EndUser\GVController::class);

});

Route::get('/admin', function () {
    if (Auth::check()) {
        return redirect()->route('admin.DM_DiemRenLuyen.index');
    }
    return view('auth.login');
})->name('admin.login');

Route::prefix('admin')->name('admin.')->middleware(['auth', 'gv'])->group(function () {

    Route::get('DM_MauTieuChi/api', 'Admin\DM_MauTieuChi_Controller@getData');

    Route::put('DM_MauTieuChi/{idMauTieuChi}/update-tieuchi', 'Admin\DM_MauTieuChi_Controller@updateChiTiet');
    Route::get('DM_MauTieuChi/{idMauTieuChi}/tieuchi-chitiet', 'Admin\DM_MauTieuChi_Controller@getTieuChiChiTiet');

    Route::resource('DM_MauTieuChi', Admin\DM_MauTieuChi_Controller::class);

    Route::get('DM_DiemRenLuyen/api', 'Admin\DM_DiemRenLuyen_Controller@danhSachDiemRenLuyenLop');
    Route::get('DM_DiemRenLuyen/api/danh-gia-sv/{id}', 'Admin\DM_DiemRenLuyen_Controller@getDanhGiaSV');

    Route::resource('DM_DiemRenLuyen', Admin\DM_DiemRenLuyen_Controller::class);

    Route::get('DM_LopHoc/api', 'Admin\DM_LopHoc_Controller@getData');
    Route::resource('DM_LopHoc', Admin\DM_LopHoc_Controller::class);

    Route::get('DM_DotDanhGia/api', 'Admin\DM_HocKy_Controller@getData');
    Route::get('DM_DotDanhGia/api/hocky', 'Admin\DM_HocKy_Controller@getHocKy');
    Route::put('DM_DotDanhGia/api/update-hienhanh/{id}', 'Admin\DM_HocKy_Controller@updateHienHanh');

    Route::get('DM_DotDanhGia/api/sync-data', 'Admin\DM_HocKy_Controller@syncHocKy');

    Route::resource('DM_DotDanhGia', Admin\DM_HocKy_Controller::class);

    Route::resource('DM_GiangVien', Admin\DM_GiangVien_Controller::class);

    Route::resource('DM_SinhVien', Admin\DM_SinhVien_Controller::class);

    Route::get('nguoi-dung', function () {
       return view('admin.index');
    })->name('nguoi-dung.index');
    Route::put('user/change-role-sv/{id}', 'UserController@changeRuleSV');
    Route::resource('user', UserController::class);
});

Auth::routes([
    'register' => false,
    'verify' => false,
    'reset' => false,
    'confirm' => false,
    'login' => false,
]);

Route::get('/home', 'HomeController@index')->middleware('auth')->name('home');
