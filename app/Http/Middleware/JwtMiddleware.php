<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        try {
            JWTAuth::parseToken()->authenticate();
        } catch (TokenExpiredException $e) {
            return response()->json([
                'message' => 'Token vyprsel',
            ], 401);
        } catch (TokenInvalidException $e) {
            return response()->json([
                'message' => 'Neplatny token',
            ], 401);
        } catch (JWTException $e) {
            return response()->json([
                'message' => 'Token nenalezen',
            ], 401);
        }

        return $next($request);
    }
}
