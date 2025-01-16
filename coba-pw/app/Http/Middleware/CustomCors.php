<?php

namespace App\Http\Middleware;

use Closure;

class CustomCors
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
        // Allow cross-origin requests from React (localhost:3000)
        $response = $next($request);

        // Add the necessary CORS headers
        $response->headers->set('Access-Control-Allow-Origin', env('FRONTEND_URL', '*'));
        $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:3000');  // React app URL
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        // If it's a preflight request, respond with 200
        if ($request->getMethod() == "OPTIONS") {
            return response('', 200);
        }

        return $response;
    }
}