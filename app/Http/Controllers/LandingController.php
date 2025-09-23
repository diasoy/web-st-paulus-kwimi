<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Announcement;
use App\Models\Activity;
use App\Models\WorshipSchedule;

class LandingController extends Controller
{
    public function index()
    {
        // Ambil 3 pengumuman terbaru yang dipublish
        $announcements = Announcement::where('is_publish', true)
            ->orderByDesc('created_at')
            ->take(3)
            ->get(['id', 'title', 'description', 'image_url', 'created_at'])
            ->map(function ($a) {
                $a->image_url = $this->resolveImageUrl($a->image_url);
                return $a;
            });

        // Ambil 3 kegiatan mendatang
        $activities = Activity::where('date', '>=', now()->toDateString())
            ->orderBy('date')
            ->orderBy('time_start')
            ->take(3)
            ->get(['id', 'name', 'description', 'image_url', 'date', 'time_start', 'location'])
            ->map(function ($act) {
                $act->image_url = $this->resolveImageUrl($act->image_url);
                return $act;
            });

        // Ambil 3 jadwal ibadah mendatang
        $worshipSchedules = WorshipSchedule::where('date', '>=', now()->toDateString())
            ->orderBy('date')
            ->orderBy('time_start')
            ->take(3)
            ->get(['id', 'name', 'date', 'time_start', 'pic']);

        return Inertia::render('welcome', [
            'announcements'    => $announcements,
            'activities'       => $activities,
            'worshipSchedules' => $worshipSchedules,
        ]);
    }

    protected function resolveImageUrl(?string $storedPath): string
    {
        $img = ltrim($storedPath ?? '', '/');

        if ($img && file_exists(public_path($img))) {
            return url($img);
        }

        if ($img) {
            $basename = basename($img);
            if (file_exists(public_path('assets/' . $basename))) {
                return url('assets/' . $basename);
            }
            if (file_exists(public_path('assets/activities/' . $basename))) {
                return url('assets/activities/' . $basename);
            }
        }

        return url('images/default.png');
    }
}
