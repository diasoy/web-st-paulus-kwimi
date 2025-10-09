<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Announcement;
use App\Models\Activity;
use App\Models\WorshipSchedule;
use Illuminate\Support\Facades\Storage;

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
        if (empty($storedPath)) {
            return asset('images/default.png');
        }

        // Normalisasi: jika hanya nama file, prefix dengan announcements/ atau activities/
        $normalized = '';
        if (str_starts_with($storedPath, 'announcements/') || str_starts_with($storedPath, 'activities/')) {
            $normalized = $storedPath;
        } else {
            // Coba sebagai announcements dulu
            $normalized = 'announcements/' . ltrim(basename($storedPath), '/');
            if (!Storage::disk('public')->exists($normalized)) {
                // Jika tidak ada, coba sebagai activities
                $normalized = 'activities/' . ltrim(basename($storedPath), '/');
            }
        }

        if (Storage::disk('public')->exists($normalized)) {
            return asset('storage/' . $normalized);
        }

        // Fallback untuk file lama di public/assets
        $legacy = public_path('assets/' . basename($storedPath));
        if (file_exists($legacy)) {
            return asset('assets/' . basename($storedPath));
        }

        // Fallback untuk file activities di public/assets/activities
        $legacyActivity = public_path('assets/activities/' . basename($storedPath));
        if (file_exists($legacyActivity)) {
            return asset('assets/activities/' . basename($storedPath));
        }

        return asset('images/default.png');
    }
}
