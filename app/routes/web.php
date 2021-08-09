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
    return view('welcome');
});

Route::get('redirect/{driver}', 'Auth\LoginController@redirectToProvider')
    ->name('login.provider')
    ->where('driver', implode('|', config('auth.socialite.drivers')));

Route::prefix('sv')->group(function () {
    Route::get('/', function () {
        return view('index', ['data' => [
            'name' => "Văn Quang"
        ]]);
    });
});

Route::prefix('admin')->group(function () {
    Route::resource('DM_TieuChi', Admin\DM_TieuChi_Controller::class);
});

Auth::routes([
    'register' => false, 
    'verify' => false,
    'reset' => false,
    'confirm' => false,
]);

Route::get('/home', 'HomeController@index')->middleware('auth')->name('home');
