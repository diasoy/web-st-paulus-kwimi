<?php

namespace App\Http\Controllers;
use function App\Helpers\getImageUrl;

class LandingController extends Controller
{
    public function index()
    {
        $announcements = \App\Models\Announcement::where('is_publish', true)
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get(['id', 'title', 'description', 'image_url', 'created_at']);

        $activities = \App\Models\Activity::where('date', '>=', now()->toDateString())
            ->orderBy('date')
            ->orderBy('time_start')
            ->take(3)
            ->get(['id', 'name', 'description', 'image_url', 'date', 'time_start', 'location']);

        $worshipSchedules = \App\Models\WorshipSchedule::where('date', '>=', now()->toDateString())
            ->orderBy('date')
            ->orderBy('time_start')
            ->take(3)
            ->get(['id', 'name', 'date', 'time_start', 'pic']);

        // Transform image URLs tanpa helper
        foreach ($announcements as $a) {
            $a->image_url = $a->image_url
                ? asset('/' . ltrim($a->image_url, '/'))
                : asset('images/default.png');
        }
        foreach ($activities as $act) {
            $act->image_url = $act->image_url
                ? asset('/' . ltrim($act->image_url, '/'))
                : asset('images/default.png');
        }

        return \Inertia\Inertia::render('welcome', [
            'announcements' => $announcements,
            'activities' => $activities,
            'worshipSchedules' => $worshipSchedules,
        ]);
    }
}
