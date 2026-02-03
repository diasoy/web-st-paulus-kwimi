<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AnnouncementController as AdminAnnouncementController;
use App\Http\Controllers\Admin\WorshipScheduleController;
use App\Http\Controllers\Admin\ActivityController;
use App\Http\Controllers\Admin\ActivityReportController;
use App\Http\Controllers\Admin\CommunityController;
use App\Http\Controllers\Admin\ChurchOfficialController;
use App\Http\Controllers\Admin\FinanceController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Umat\UmatWorshipScheduleController;
use App\Http\Controllers\Umat\UmatActivityController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Http\Controllers\LandingController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\Admin\FeedbackController as AdminFeedbackController;

// Route to serve files from storage/app
Route::get('/files/{path}', function (Request $request, $path) {
    // Decode the path to handle nested directories
    $filePath = urldecode($path);
    
    // Check if file exists in storage/app
    if (!Storage::disk('local')->exists($filePath)) {
        abort(404);
    }
    
    // Get the full path to the file
    $fullPath = Storage::disk('local')->path($filePath);
    
    return response()->file($fullPath);
})->where('path', '.*')->name('files.serve');

Route::get('/', [LandingController::class, 'index'])->name('home');

// Public feedback - redirect GET to home, POST for submission
Route::get('/feedback', function () {
    return redirect()->route('home', ['_fragment' => 'feedback'])->with('info', 'Silakan isi form kritik dan saran di bagian bawah halaman.');
})->name('feedback.index');
Route::post('/feedback', [FeedbackController::class, 'store'])->name('feedback.store');

Route::middleware(['auth', 'verified'])->group(function () {
    // Main dashboard yang akan redirect berdasarkan role
    // Ubah agar umat diarahkan ke /umat/announcements, bukan /umat/dashboard
    Route::get('dashboard', function () {
        $user = Auth::user();
        if ($user && $user->role_id == 2) {
            return redirect()->route('umat.announcements.index');
        }
        // Default: admin atau lainnya tetap ke dashboard
        return app(DashboardController::class)->index();
    })->name('dashboard');

    // Admin Routes
    Route::middleware('role_id:1')->prefix('admin')->name('admin.')->group(function () {
        Route::get('worship-schedules/exportpdf', [App\Http\Controllers\Admin\WorshipScheduleController::class, 'exportPdf'])->name('worship-schedules.exportpdf');
        Route::delete('users/{user}/pdfs/{pdf}', [AdminDashboardController::class, 'deleteUserPdf'])->name('users.pdfs.delete');
        Route::get('users/{user}/pdfs/{pdf}/download', [AdminDashboardController::class, 'downloadUserPdf'])->name('users.pdfs.download');
        Route::get('users/exportpdf', [AdminDashboardController::class, 'exportAllUsersPdf'])->name('users.exportpdf');
        Route::get('users/{user}/detailpdf', [AdminDashboardController::class, 'downloadUserDetailPdf'])->name('users.detailpdf');
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
        // Pencatatan Keuangan Gereja
        Route::resource('finances', FinanceController::class)->except(['show']);
        // Laporan Kegiatan Gereja
        Route::get('activity-reports', [ActivityReportController::class, 'index'])->name('activity-reports.index');
        Route::get('activity-reports/exportpdf', [ActivityReportController::class, 'exportPdf'])->name('activity-reports.exportpdf');
        // Kelola Komunitas Basis
        Route::resource('communities', CommunityController::class);
        // Kelola Data Pengurus Gereja
        Route::resource('church-officials', ChurchOfficialController::class);
        // Kelola Feedback
        Route::get('feedback', [AdminFeedbackController::class, 'index'])->name('feedback.index');
        Route::get('feedback/{feedback}', [AdminFeedbackController::class, 'show'])->name('feedback.show');
        Route::delete('feedback/{feedback}', [AdminFeedbackController::class, 'destroy'])->name('feedback.destroy');
        Route::patch('feedback/{feedback}/mark-read', [AdminFeedbackController::class, 'markAsRead'])->name('feedback.mark-read');
        Route::patch('feedback/{feedback}/mark-unread', [AdminFeedbackController::class, 'markAsUnread'])->name('feedback.mark-unread');
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

// Sitemap route
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
