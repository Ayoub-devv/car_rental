<?php

use App\Http\Controllers\Api\Admin\AuthController;
use App\Http\Controllers\Api\Admin\ReservationController as AdminReservationController;
use App\Http\Controllers\Api\CarController;
use App\Http\Controllers\Api\ReservationController;
use Illuminate\Support\Facades\Route;

Route::get('/cars', [CarController::class, 'index']);
Route::get('/cars/{car}', [CarController::class, 'show']);
Route::post('/reservations', [ReservationController::class, 'store']);

Route::prefix('admin')->group(function (): void {
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware(['auth:sanctum', 'admin'])->group(function (): void {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/reservations', [AdminReservationController::class, 'index']);
        Route::put('/reservations/{reservation}/status', [AdminReservationController::class, 'updateStatus']);
    });
});
