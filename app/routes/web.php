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
    return redirect('/sv');;
})->name('index');

Route::get('redirect/{driver}', 'Auth\LoginController@redirectToProvider')
    ->name('login.provider')
    ->where('driver', implode('|', config('auth.socialite.drivers')));
Route::get('/callback/{driver}', 'Auth\LoginController@handleProviderCallback');

Route::prefix('sv')->group(function () {
    Route::get('/', function () {
        return view('sv.index', ['data' => [
            'name' => "Văn Quang"
        ]]);
    });
});

Route::prefix('admin')->group(function () {
    Route::get('DM_MauTieuChi/data', 'Admin\DM_MauTieuChi_Controller@getData')->middleware('auth');

    Route::resource('DM_MauTieuChi', Admin\DM_MauTieuChi_Controller::class);

    Route::get('DM_LopHoc/sync-data', 'Admin\DM_LopHoc_Controller@syncLopHoc');
    Route::resource('DM_LopHoc', Admin\DM_LopHoc_Controller::class);

    Route::get('DM_HocKy/sync-data', 'Admin\DM_HocKy_Controller@syncHocKy');
    
    Route::resource('DM_HocKy', Admin\DM_HocKy_Controller::class);

    Route::resource('DM_GiangVien', Admin\DM_GiangVien_Controller::class);

    Route::resource('DM_SinhVien', Admin\DM_SinhVien_Controller::class);

    Route::get('DM_SinhVien/{idLop}/sync-data', 'Admin\DM_SinhVien_Controller@syncSinhVienLop');
    Route::get('DM_SinhVien/{idLop}/lop', 'Admin\DM_SinhVien_Controller@getSVLopID');
    Route::get('DM_SinhVien/{tenLop}/ten-lop', 'Admin\DM_SinhVien_Controller@getSVLopTen');
});

Auth::routes([
    'register' => false, 
    'verify' => false,
    'reset' => false,
    'confirm' => false,
]);

Route::get('/home', 'HomeController@index')->middleware('auth')->name('home');
