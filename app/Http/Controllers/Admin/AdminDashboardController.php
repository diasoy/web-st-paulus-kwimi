<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    /**
     * Display the admin dashboard
     */
    public function index(): Response
    {
        $stats = [
            'total_users' => User::count(),
            'total_admin' => User::where('role_id', 1)->count(),
            'total_umat' => User::where('role_id', 2)->count(),
            'recent_users' => User::latest()->take(5)->get(),
        ];

        return Inertia::render('admin/dashboard', [
            'stats' => $stats
        ]);
    }

    /**
     * Display users management
     */
    public function users(Request $request): Response
    {
        $users = User::query()
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%");
            })
            ->when($request->role, function ($query, $role) {
                // Map role string to role_id
                $roleId = $role === 'admin' ? 1 : 2;
                $query->where('role_id', $roleId);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('admin/users', [
            'users' => $users,
            'filters' => $request->only(['search', 'role'])
        ]);
    }
}
