<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
     * Handle dashboard redirect based on user role
     */
    public function index(): RedirectResponse
    {
        $user = Auth::user();
        
        if ($user && $user->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }
        
        return redirect()->route('umat.dashboard');
    }
}
