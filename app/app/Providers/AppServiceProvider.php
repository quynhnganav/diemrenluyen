<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use App\Services\DTAPIService;
use App\Services\TieuChiService;

class AppServiceProvider extends ServiceProvider
{

    public $singletons = [
        DTAPIService::class => DTAPIService::class,
        TieuChiService::class => TieuChiService::class,
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
