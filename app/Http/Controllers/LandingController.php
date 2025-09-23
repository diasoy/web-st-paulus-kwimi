<?php

namespace App\Http\Controllers;
use function App\Helpers\getImageUrl;

class LandingController extends Controller
{
    public function index()
    {
        // Ambil 3 pengumuman terbaru
        $announcements = \App\Models\Announcement::where('is_publish', true)
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get(['id', 'title', 'description', 'image_url', 'created_at']);

        // Ambil 3 agenda kegiatan terdekat (date >= hari ini, urut date & time_start)
        $activities = \App\Models\Activity::where('date', '>=', now()->toDateString())
            ->orderBy('date')
            ->orderBy('time_start')
            ->take(3)
            ->get(['id', 'name', 'description', 'image_url', 'date', 'time_start', 'location']);

        // Ambil 3 jadwal ibadah terdekat (date >= hari ini, urut date & time_start)
        $worshipSchedules = \App\Models\WorshipSchedule::where('date', '>=', now()->toDateString())
            ->orderBy('date')
            ->orderBy('time_start')
            ->take(3)
            ->get(['id', 'name', 'date', 'time_start', 'pic']);

        // Transform image URLs menggunakan helper agar konsisten (fallback, storage, url penuh)
        foreach ($announcements as $a) {
            $a->image_url = getImageUrl($a->image_url);
        }
        foreach ($activities as $act) {
            $act->image_url = getImageUrl($act->image_url);
        }

        return \Inertia\Inertia::render('welcome', [
            'announcements' => $announcements,
            'activities' => $activities,
            'worshipSchedules' => $worshipSchedules,
        ]);
    }
}
