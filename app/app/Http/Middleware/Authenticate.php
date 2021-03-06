<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Support\Facades\Route;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        $name = Route::currentRouteName();
//        dd($name);
        if (str_starts_with($name, 'sv.') || str_starts_with($name, 'common.')) {
            return route('sv.login');
        }
        if (str_starts_with($name, 'gv.')) {
            return route('gv.login');
        }
        if (str_starts_with($name, 'admin.')) {
            return route('admin.login');
        }
        if (!$request->expectsJson()) {
            return route('sv.login');
        }
    }
}
