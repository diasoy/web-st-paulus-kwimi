<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Inertia\Inertia;
use Inertia\Response;

class AnnouncementController extends Controller
{
    public function index(): Response
    {
        $announcements = Announcement::published()
            ->with('user:id,name')
            ->orderBy("created_at", "desc")
            ->paginate(10);

        $announcements->getCollection()->transform(function ($announcement) {
            $announcement->image_url = getImageUrl($announcement->image_url);
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
        $announcement->image_url = getImageUrl($announcement->image_url);
        
        return Inertia::render("umat/announcements/show", [
            'announcement' => $announcement
        ]);
    }
}
