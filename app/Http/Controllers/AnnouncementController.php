<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class AnnouncementController extends Controller
{
    protected function resolveImageUrl(?string $storedPath): string
    {
        if (empty($storedPath)) {
            return asset('images/default.png');
        }

        // Normalisasi: jika hanya nama file, prefix dengan announcements/
        $normalized = str_starts_with($storedPath, 'announcements/')
            ? $storedPath
            : 'announcements/' . ltrim(basename($storedPath), '/');

        if (Storage::disk('public')->exists($normalized)) {
            return asset('storage/' . $normalized);
        }

        // Fallback untuk file lama di public/assets
        $legacy = public_path('assets/' . basename($storedPath));
        if (file_exists($legacy)) {
            return asset('assets/' . basename($storedPath));
        }

        return asset('images/default.png');
    }

    public function index(): Response
    {
        $announcements = Announcement::published()
            ->with('user:id,name')
            ->orderBy("created_at", "desc")
            ->paginate(10);

        $announcements->getCollection()->transform(function ($announcement) {
            $announcement->image_url = $this->resolveImageUrl($announcement->image_url);
            return $announcement;
        });
        
        return Inertia::render("umat/announcements/index", [
            'announcements' => $announcements
        ]);
    }

    public function show(Announcement $announcement): Response
    {
        if (!$announcement->is_publish) {
            abort(404, 'Pengumuman tidak ditemukan atau belum dipublish.');
        }

        $announcement->load('user:id,name');
        $announcement->image_url = $this->resolveImageUrl($announcement->image_url);
        
        return Inertia::render("umat/announcements/show", [
            'announcement' => $announcement
        ]);
    }
}
