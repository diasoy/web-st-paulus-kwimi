<?php

namespace App\Http\Controllers\Umat;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class UmatDashboardController extends Controller
{
    /**
     * Display umat dashboard
     */
    public function index(): Response
    {
        $user = Auth::user();
        
        // Data khusus untuk umat
        $data = [
            'user' => $user,
            'recent_activities' => [], // Nanti bisa diisi dengan kegiatan terbaru
            'announcements' => [], // Pengumuman untuk umat
            'jadwal_ibadah' => [], // Jadwal ibadah
        ];

        return Inertia::render('umat/dashboard', $data);
    }

    /**
     * Display profile untuk umat
     */
    public function profile(): Response
    {
        return Inertia::render('umat/profile', [
            'user' => Auth::user()
        ]);
    }
}
