<?php

namespace App\Providers;

use App\Repositories\DM_DotDanhGia\DanhGia_ChiTiet_ChiTiet_Repository;
use App\Repositories\DM_HocKy\DM_HocKy_Repository;
use App\Repositories\DM_MauTieuChi\DM_MauTieuChi_Repository;
use App\Repositories\GV\GV_Repository;
use App\Repositories\SV\SV_Repository;
use App\Services\DanhGiaService;
use App\Services\ExcelService;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use App\Services\DTAPIService;
use App\Services\TieuChiService;

class AppServiceProvider extends ServiceProvider
{

    public $singletons = [
        DTAPIService::class => DTAPIService::class,
        TieuChiService::class => TieuChiService::class,
        DanhGiaService::class => DanhGiaService::class,
        ExcelService::class => ExcelService::class,
        DanhGia_ChiTiet_ChiTiet_Repository::class => DanhGia_ChiTiet_ChiTiet_Repository::class,
        DM_HocKy_Repository::class => DM_HocKy_Repository::class,
        DM_MauTieuChi_Repository::class => DM_MauTieuChi_Repository::class,
        SV_Repository::class => SV_Repository::class,
        GV_Repository::class => GV_Repository::class,
        DanhGiaChiTiet_Repository::class => DanhGiaChiTiet_Repository::class
    ];

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // $this->app->singleton(DTAPIService::class, function ($app) {
        //     return new DTAPIService();
        // });

        // $this->app->singleton(TieuChiService::class, function ($app) {
        //     return new TieuChiService();
        // });

    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(255);
    }
}
