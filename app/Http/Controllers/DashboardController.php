<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    /**
     * Handle dashboard redirect based on user role_id
     */
    public function index(): RedirectResponse
    {
        $user = Auth::user();
        
        // Debug log
        Log::info('Dashboard redirect', [
            'user_id' => $user->id,
            'role_id' => $user->role_id,
            'name' => $user->name
        ]);
        
        if ($user && $user->role_id === 1) {
            return redirect()->route('admin.dashboard');
        }
        
        return redirect()->route('umat.dashboard');
    }
}
