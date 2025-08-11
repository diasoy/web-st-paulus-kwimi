<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AnnouncementController extends Controller
{
    /**
     * Display a listing of published announcements.
     */
    public function index(): Response
    {
        // Hanya tampilkan pengumuman yang dipublish dan urutkan berdasarkan tanggal terbaru
        $announcements = Announcement::published()
            ->orderBy("created_at", "desc")
            ->paginate(10);
        
        return Inertia::render("umat/pengumuman", [
            'announcements' => $announcements
        ]);
    }
}