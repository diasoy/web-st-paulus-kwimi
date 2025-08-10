<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Umat\UmatDashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Main dashboard yang akan redirect berdasarkan role
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Admin Routes
    Route::middleware('role_id:1')->prefix('admin')->name('admin.')->group(function () {
        Route::get('dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
        Route::get('users', [AdminDashboardController::class, 'users'])->name('users');
    });
    
    // Umat Routes  
    Route::middleware('role_id:2')->prefix('umat')->name('umat.')->group(function () {
        Route::get('dashboard', [UmatDashboardController::class, 'index'])->name('dashboard');
        Route::get('profile', [UmatDashboardController::class, 'profile'])->name('profile');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
