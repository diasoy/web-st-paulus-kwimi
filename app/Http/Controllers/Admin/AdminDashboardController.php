<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Community;
use App\Models\Announcement;
use App\Models\Activity;
use App\Models\WorshipSchedule;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Hash;


class AdminDashboardController extends Controller {
    /**
     * Export semua data umat ke PDF
     */
    public function exportAllUsersPdf()
    {
        $users = User::with(['community:id,name'])->orderBy('name')->get();
        $pdf = Pdf::loadView('pdfs.all_users', [ 'users' => $users ]);
        $pdf->setPaper('A4', 'portrait');
        return $pdf->download('Data_Semua_Umat.pdf');
    }
    /**
     * Download user detail as PDF
     */
    public function downloadUserDetailPdf(User $user)
    {
        // Gunakan dompdf atau snappy, contoh dengan dompdf
        $data = [
            'user' => $user->load(['community:id,name']),
        ];
        $pdf = PDF::loadView('pdfs.user_detail', $data);
        $pdf->setPaper('A4', 'portrait');
        $filename = 'Detail_Umat_' . $user->name . '.pdf';
        return $pdf->download($filename);
    }

    /**
     * Delete a specific PDF from user
     */
    public function deleteUserPdf(User $user, $pdfId)
    {
        $pdf = $user->pdfs()->findOrFail($pdfId);
        Storage::disk('public')->delete($pdf->file_path);
        $pdf->delete();
        return redirect()->route('admin.users.show', $user->id)
            ->with('success', 'File PDF berhasil dihapus.');
    }

    /**
     * Download a specific PDF from user
     */
    public function downloadUserPdf(User $user, $pdfId)
    {
        $pdf = $user->pdfs()->findOrFail($pdfId);
        // Check if file exists
        if (!Storage::disk('public')->exists($pdf->file_path)) {
            return redirect()->route('admin.users.show', $user->id)->with('error', 'File tidak ditemukan.');
        }
        // Get file path and return download response
        $filePath = Storage::disk('public')->path($pdf->file_path);
        return response()->download($filePath, $pdf->file_name, [
            'Content-Type' => 'application/pdf',
        ]);
    }
    /**
     * Display the admin dashboard
     */
    public function index(): Response
    {
        // Totals
        $stats = [
            'total_users' => User::count(),
            'total_admin' => User::where('role_id', 1)->count(),
            'total_umat' => User::where('role_id', 2)->count(),
            'total_communities' => Community::count(),
            'total_announcements' => Announcement::count(),
            'total_activities' => Activity::count(),
            'total_worship_schedules' => WorshipSchedule::count(),
        ];

        // Recent items
        $recent_users = User::latest()->take(5)->get(['id', 'name', 'username', 'role_id', 'created_at']);
        $recent_announcements = Announcement::latest()->take(5)->get(['id', 'title', 'is_publish', 'created_at', 'image_url']);

        // Upcoming worship schedules (next 5)
        $upcoming_worship = WorshipSchedule::where('date', '>=', Carbon::today()->toDateString())
            ->orderBy('date')
            ->orderBy('time_start')
            ->take(5)
            ->get(['id', 'name', 'date', 'time_start', 'pic']);

        // Monthly new users for last 6 months
        $start = Carbon::now()->startOfMonth()->subMonths(5);
        $countsByMonth = User::selectRaw('DATE_FORMAT(created_at, "%Y-%m") as ym, COUNT(*) as count')
            ->where('created_at', '>=', $start)
            ->groupBy('ym')
            ->orderBy('ym')
            ->pluck('count', 'ym');

        $series_labels = [];
        $series_data = [];
        for ($i = 0; $i < 6; $i++) {
            $month = (clone $start)->addMonths($i);
            $ym = $month->format('Y-m');
            $series_labels[] = $month->isoFormat('MMM');
            $series_data[] = (int) ($countsByMonth[$ym] ?? 0);
        }

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recent_users' => $recent_users,
            'recent_announcements' => $recent_announcements,
            'upcoming_worship' => $upcoming_worship,
            'monthly_users' => [
                'labels' => $series_labels,
                'data' => $series_data,
            ],
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
                $query->where('name', 'like', "%{$search}%");
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
            // Calculate age from birth_date, always integer (floor)
            $age = null;
            if ($user->birth_date) {
                $birth = Carbon::parse($user->birth_date);
                $now = Carbon::now();
                $age = (int) floor($birth->diffInYears($now));
            }
            return [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'birth_place' => $user->birth_place,
                'birth_date' => $user->birth_date,
                'gender' => $user->gender,
                'address' => $user->address,
                'age' => $age,
                'community' => $user->community ? [
                    'id' => $user->community->id,
                    'name' => $user->community->name,
                ] : null,
                // aksi: id, bisa dipakai untuk edit/hapus di frontend
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
        $user->load(['community:id,name', 'role:id,name', 'pdfs']);

        return Inertia::render('admin/users/show', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'birth_place' => $user->birth_place,
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
                'pdfs' => $user->pdfs->map(function ($pdf) {
                    return [
                        'id' => $pdf->id,
                        'file_name' => $pdf->file_name,
                        'file_url' => asset('storage/' . $pdf->file_path),
                        'public_url' => $pdf->file_path ? asset('storage/' . $pdf->file_path) : null,
                        'created_at' => $pdf->created_at,
                    ];
                }),
            ]
        ]);
    }

    /**
     * Show the form for editing the specified user
     */
    public function editUser(User $user): Response
    {
        // Debug: log yang sedang diakses

        $user->load(['community:id,name', 'role:id,name', 'pdfs']);
        $communities = Community::all(['id', 'name']);

        return Inertia::render('admin/users/edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'birth_place' => $user->birth_place,
                'address' => $user->address,
                'birth_date' => $user->birth_date,
                'gender' => $user->gender,
                'role' => $user->role_id === 1 ? 'admin' : 'umat',
                'status' => $user->status,
                'community_id' => $user->community_id,
                'created_at' => $user->created_at,
                'pdfs' => $user->pdfs->map(function ($pdf) {
                    return [
                        'id' => $pdf->id,
                        'file_name' => $pdf->file_name,
                        'created_at' => $pdf->created_at,
                    ];
                }),
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
            'address' => 'nullable|string',
            'birth_date' => 'nullable|date',
            'birth_place' => 'nullable|string',
            'gender' => 'required|in:male,female',
            'status' => 'required|in:active,inactive',
            'community_id' => 'nullable|exists:communities,id',
            'pdfs.*' => 'nullable|file|mimes:pdf|max:2048', // max 2MB per file
            'removePdf' => 'array',
            'removePdf.*' => 'boolean',
        ]);

        $user->update($validated);

        // Ambil semua PDF lama (urut sesuai id ASC)
        $existingPdfs = $user->pdfs()->orderBy('id')->get();
        $removePdf = $request->input('removePdf', []);
        $files = $request->file('pdfs', []);

        // Proses tiap slot (0-3)
        for ($i = 0; $i < 4; $i++) {
            $pdfModel = $existingPdfs->get($i);
            $shouldRemove = isset($removePdf[$i]) && $removePdf[$i];
            $newFile = isset($files[$i]) ? $files[$i] : null;

            // Jika user hapus file lama
            if ($pdfModel && $shouldRemove) {
                Storage::disk('public')->delete($pdfModel->file_path);
                $pdfModel->delete();
            }

            // Jika user upload file baru (ganti slot lama atau tambah baru)
            if ($newFile) {
                if ($pdfModel && !$shouldRemove) {
                    Storage::disk('public')->delete($pdfModel->file_path);
                    $pdfModel->delete();
                }
                $path = $newFile->store('images/user_pdfs', 'public');
                $user->pdfs()->create([
                    'file_path' => $path,
                    'file_name' => $newFile->getClientOriginalName(),
                ]);
            }
        }

        return redirect()->route('admin.users.show', $user->id)
            ->with('success', 'Data Umat berhasil diperbarui.');
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
            ->with('success', 'Umat berhasil dihapus secara permanen.');
    }

    /**
     * Show the form for creating a new user
     */
    public function createUser(): Response
    {
        $communities = Community::all(['id', 'name']);

        return Inertia::render('admin/users/create', [
            'communities' => $communities,
        ]);
    }

    /**
     * Store a newly created user in storage
     */
    public function storeUser(Request $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username',
            'address' => 'nullable|string',
            'birth_date' => 'nullable|date',
            'birth_place' => 'nullable|string',
            'gender' => 'required|in:male,female',
            'status' => 'required|in:active,inactive',
            'community_id' => 'nullable|exists:communities,id',
            'role' => 'required|in:admin,umat',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $data = [
            'name' => $validated['name'],
            'username' => $validated['username'],
            'address' => $validated['address'] ?? null,
            'birth_date' => $validated['birth_date'] ?? null,
            'birth_place' => $validated['birth_place'] ?? null,
            'gender' => $validated['gender'],
            'status' => $validated['status'],
            'community_id' => $validated['community_id'] ?? null,
            'role_id' => $validated['role'] === 'admin' ? 1 : 2,
            'password' => Hash::make($validated['password']),
        ];

        User::create($data);

        return redirect()->route('admin.users')
            ->with('success', 'Umat baru berhasil ditambahkan.');
    }
}
