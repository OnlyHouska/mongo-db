<?php

use Illuminate\Support\Facades\Route;

// SPA - catch all routes for React Router
Route::get('/{any?}', function () {
    return view('app');
})->where('any', '.*');
