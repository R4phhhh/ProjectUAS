<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Allow all origins (change as needed)
        $response = $next($request);
        
        // You can limit to specific origins if necessary
        $response->headers->set('Access-Control-Allow-Origin', '*'); // Or specify domain like 'http://localhost:3000'
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Requested-With');

        // Preflight request handling
        if ($request->getMethod() == "OPTIONS") {
            return response()->json('OK', 200);
        }

        return $response;
    }
}