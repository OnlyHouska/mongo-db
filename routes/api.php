<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\LoanController;
use App\Http\Controllers\Api\ReaderController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Book genres (public)
Route::get('/books/genres', [BookController::class, 'genres']);

// Protected routes
Route::middleware('auth:api')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/refresh', [AuthController::class, 'refresh']);

    // Books
    Route::get('/books', [BookController::class, 'index']);
    Route::get('/books/{id}', [BookController::class, 'show']);
    Route::post('/books', [BookController::class, 'store']);
    Route::put('/books/{id}', [BookController::class, 'update']);
    Route::delete('/books/{id}', [BookController::class, 'destroy']);

    // Readers
    Route::get('/readers', [ReaderController::class, 'index']);
    Route::get('/readers/{id}', [ReaderController::class, 'show']);
    Route::post('/readers', [ReaderController::class, 'store']);
    Route::put('/readers/{id}', [ReaderController::class, 'update']);
    Route::delete('/readers/{id}', [ReaderController::class, 'destroy']);

    // Loans
    Route::get('/loans', [LoanController::class, 'index']);
    Route::get('/loans/my', [LoanController::class, 'myLoans']);
    Route::get('/loans/{id}', [LoanController::class, 'show']);
    Route::post('/loans', [LoanController::class, 'store']);
    Route::post('/loans/{id}/return', [LoanController::class, 'return']);
});
