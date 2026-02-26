<?php

namespace App\Http\Controllers\Umat;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\Activity;
use App\Models\WorshipSchedule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class UmatDashboardController extends Controller
{
    /**
     * Display umat dashboard with real data
     */
    public function index(): Response
    {
        $user = Auth::user()->load(['community:id,name']);

        // 3 pengumuman terbaru yang dipublish
        $announcements = Announcement::where('is_publish', true)
            ->orderByDesc('created_at')
            ->take(3)
            ->get(['id', 'title', 'description', 'image_url', 'created_at'])
            ->map(function ($a) {
                $a->image_url = $this->resolveImageUrl($a->image_url);
                return $a;
            });

        // 3 jadwal ibadah mendatang
        $worshipSchedules = WorshipSchedule::with('communities:id,name')
            ->whereDate('date', '>=', now())
            ->orderBy('date', 'asc')
            ->orderBy('time_start', 'asc')
            ->take(3)
            ->get(['id', 'name', 'date', 'time_start', 'pic']);

        // 3 kegiatan mendatang
        $upcomingActivities = Activity::where('date', '>=', now()->toDateString())
            ->orderBy('date', 'asc')
            ->orderBy('time_start', 'asc')
            ->take(3)
            ->get(['id', 'name', 'description', 'date', 'time_start', 'location', 'image_url'])
            ->map(function ($a) {
                $a->image_url = $this->resolveImageUrl($a->image_url);
                return $a;
            });

        return Inertia::render('umat/dashboard', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'email' => $user->email ?? '',
                'gender' => $user->gender,
                'birth_date' => $user->birth_date,
                'address' => $user->address,
                'status' => $user->status,
                'community' => $user->community ? [
                    'id' => $user->community->id,
                    'name' => $user->community->name,
                ] : null,
                'role' => $user->role ?? 'umat',
            ],
            'announcements' => $announcements,
            'worship_schedules' => $worshipSchedules,
            'upcoming_activities' => $upcomingActivities,
        ]);
    }

    /**
     * Resolve gambar ke URL publik
     */
    private function resolveImageUrl(?string $imageUrl): ?string
    {
        if (!$imageUrl) return null;
        if (filter_var($imageUrl, FILTER_VALIDATE_URL)) return $imageUrl;
        $path = ltrim($imageUrl, '/');
        if (Storage::disk('public')->exists($path)) {
            return Storage::disk('public')->url($path);
        }
        return asset($imageUrl);
    }
}
