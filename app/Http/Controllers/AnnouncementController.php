<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
            ->with('user:id,name') // Load user data untuk menampilkan author
            ->orderBy("created_at", "desc")
            ->paginate(10);

        // Transform image URLs untuk storage
        $announcements->getCollection()->transform(function ($announcement) {
            if ($announcement->image_url && !filter_var($announcement->image_url, FILTER_VALIDATE_URL)) {
                // Gunakan Storage::url untuk gambar dari public disk
                $announcement->image_url = Storage::url($announcement->image_url);
            }
            return $announcement;
        });
        
        return Inertia::render("umat/announcements/index", [
            'announcements' => $announcements
        ]);
    }

    /**
     * Display the specified announcement.
     */
    public function show(Announcement $announcement): Response
    {
        // Pastikan hanya announcement yang published yang bisa dilihat
        if (!$announcement->is_publish) {
            abort(404, 'Pengumuman tidak ditemukan atau belum dipublish.');
        }

        // Load user data
        $announcement->load('user:id,name');

        // Transform image URL untuk storage
        if ($announcement->image_url && !filter_var($announcement->image_url, FILTER_VALIDATE_URL)) {
            $announcement->image_url = Storage::url($announcement->image_url);
        }
        
        return Inertia::render("umat/announcements/show", [
            'announcement' => $announcement
        ]);
    }
}