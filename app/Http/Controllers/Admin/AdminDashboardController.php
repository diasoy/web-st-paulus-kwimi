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
            ->with(['community:id,name', 'role:id,name'])
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%");
            })
            ->when($request->role, function ($query, $role) {
                // Map role string to role_id
                $roleId = $role === 'admin' ? 1 : 2;
                $query->where('role_id', $roleId);
            }, function ($query) {
                // Default to umat if no role filter specified
                $query->where('role_id', 2);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        // Transform the data to match frontend interface
        $users->through(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role_id === 1 ? 'admin' : 'umat',
                'gender' => $user->gender,
                'status' => $user->status,
                'community' => $user->community ? [
                    'id' => $user->community->id,
                    'name' => $user->community->name,
                ] : null,
                'created_at' => $user->created_at,
            ];
        });

        return Inertia::render('admin/users', [
            'users' => $users,
            'filters' => array_merge(['role' => 'umat'], $request->only(['search', 'role']))
        ]);
    }

    /**
     * Display the specified user
     */
    public function showUser(User $user): Response
    {
        $user->load(['community:id,name', 'role:id,name']);
        
        return Inertia::render('admin/users/show', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'email' => $user->email,
                'phone_number' => $user->phone_number,
                'address' => $user->address,
                'birth_date' => $user->birth_date,
                'gender' => $user->gender,
                'role' => $user->role_id === 1 ? 'admin' : 'umat',
                'status' => $user->status,
                'community' => $user->community ? [
                    'id' => $user->community->id,
                    'name' => $user->community->name,
                ] : null,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ]
        ]);
    }

    /**
     * Show the form for editing the specified user
     */
    public function editUser(User $user): Response
    {
        // Debug: log yang sedang diakses
        \Log::info('EditUser called for user ID: ' . $user->id);
        
        $user->load(['community:id,name', 'role:id,name']);
        $communities = \App\Models\Community::all(['id', 'name']);
        
        \Log::info('User data: ', $user->toArray());
        \Log::info('Communities count: ' . $communities->count());
        
        return Inertia::render('admin/users/edit-simple', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'email' => $user->email,
                'phone_number' => $user->phone_number,
                'address' => $user->address,
                'birth_date' => $user->birth_date,
                'gender' => $user->gender,
                'role' => $user->role_id === 1 ? 'admin' : 'umat',
                'status' => $user->status,
                'community_id' => $user->community_id,
                'created_at' => $user->created_at,
            ],
            'communities' => $communities
        ]);
    }

    /**
     * Update the specified user
     */
    public function updateUser(Request $request, User $user): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username,' . $user->id,
            'email' => 'required|email|unique:users,email,' . $user->id,
            'phone_number' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'birth_date' => 'nullable|date',
            'gender' => 'required|in:male,female',
            'status' => 'required|in:active,inactive',
            'community_id' => 'nullable|exists:communities,id',
        ]);

        $user->update($validated);

        return redirect()->route('admin.users')
            ->with('success', 'Data pengguna berhasil diperbarui.');
    }

    /**
     * Remove the specified user from storage
     */
    public function destroyUser(User $user): \Illuminate\Http\RedirectResponse
    {
        if ($user->role_id === 1 && User::where('role_id', 1)->count() <= 1) {
            return redirect()->route('admin.users')
                ->with('error', 'Tidak dapat menghapus admin terakhir.');
        }

        $user->delete();

        return redirect()->route('admin.users')
            ->with('success', 'Pengguna berhasil dihapus secara permanen.');
    }
}
