<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AnnouncementController as AdminAnnouncementController;
use App\Http\Controllers\Admin\WorshipScheduleController;
use App\Http\Controllers\Admin\ActivityController;
use App\Http\Controllers\Admin\CommunityController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Umat\UmatDashboardController;
use App\Http\Controllers\Umat\UmatWorshipScheduleController;
use App\Http\Controllers\Umat\UmatActivityController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\LandingController;
Route::get('/', [LandingController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Main dashboard yang akan redirect berdasarkan role
    // Ubah agar umat diarahkan ke /umat/announcements, bukan /umat/dashboard
    Route::get('dashboard', function () {
        $user = auth()->user();
        if ($user && $user->role_id == 2) {
            return redirect()->route('umat.announcements.index');
        }
        // Default: admin atau lainnya tetap ke dashboard
        return app(DashboardController::class)->index();
    })->name('dashboard');

    // Admin Routes
    Route::middleware('role_id:1')->prefix('admin')->name('admin.')->group(function () {
        Route::get('dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
        Route::get('users', [AdminDashboardController::class, 'users'])->name('users');
        // Create User must be above the dynamic {user} route
        Route::get('users/create', [AdminDashboardController::class, 'createUser'])->name('users.create');
        Route::post('users', [AdminDashboardController::class, 'storeUser'])->name('users.store');
        Route::get('users/{user}', [AdminDashboardController::class, 'showUser'])->name('users.show');
        Route::get('users/{user}/edit', [AdminDashboardController::class, 'editUser'])->name('users.edit');
        Route::put('users/{user}', [AdminDashboardController::class, 'updateUser'])->name('users.update');
        Route::delete('users/{user}', [AdminDashboardController::class, 'destroyUser'])->name('users.destroy');

        // Kelola Pengumuman
        Route::resource('announcements', AdminAnnouncementController::class);

        // Kelola Jadwal Ibadah
        Route::resource('worship-schedules', WorshipScheduleController::class);

        // Kelola Agenda Kegiatan
        Route::resource('activities', ActivityController::class);

        // Kelola Komunitas Basis
        Route::resource('communities', CommunityController::class);
    });

    // Umat Routes - Hanya bisa melihat pengumuman dan kegiatan
    Route::middleware('role_id:2')->prefix('umat')->name('umat.')->group(function () {
        Route::get('announcements', [AnnouncementController::class, 'index'])->name('announcements.index');
        Route::get('announcements/{announcement}', [AnnouncementController::class, 'show'])->name('announcements.show');
        Route::get('worship-schedules', [UmatWorshipScheduleController::class, 'index'])->name('worship-schedules.index');
        Route::get('worship-schedules/{worshipSchedule}', [UmatWorshipScheduleController::class, 'show'])->name('worship-schedules.show');

        // Activities for Umat
        Route::get('activities', [UmatActivityController::class, 'index'])->name('activities.index');
        Route::get('activities/{activity}', [UmatActivityController::class, 'show'])->name('activities.show');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
