<?php

namespace App\Http\Middleware;

use Closure;

class VerifyGV
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // if ($request->session()->exists('gv'))
            return $next($request);
        // abort(403);
    }
}
