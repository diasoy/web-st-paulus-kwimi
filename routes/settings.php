<?php

use App\Http\Controllers\Settings\DocumentController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('password.update');

    // Document routes
    Route::get('settings/document', [DocumentController::class, 'index'])->name('document.index');
    Route::post('settings/document', [DocumentController::class, 'store'])->name('document.store');
    Route::get('settings/document/{pdf}/download', [DocumentController::class, 'download'])->name('document.download');
    Route::delete('settings/document/{pdf}', [DocumentController::class, 'destroy'])->name('document.destroy');
    Route::get('settings/document/{pdf}/show', [DocumentController::class, 'show'])->name('document.show');
});