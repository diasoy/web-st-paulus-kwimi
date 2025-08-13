<?php

namespace App\Http\Controllers\Umat;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class UmatActivityController extends Controller
{
    /**
     * Display a listing of upcoming activities.
     */
    public function index(): Response
    {
        // Hanya tampilkan kegiatan yang tanggalnya hari ini atau ke depan
        $activities = Activity::where('date', '>=', now()->toDateString())
            ->orderBy('date', 'asc')
            ->orderBy('time_start', 'asc')
            ->paginate(12);

        // Transform image URLs untuk storage
        $activities->getCollection()->transform(function ($activity) {
            if ($activity->image_url && !filter_var($activity->image_url, FILTER_VALIDATE_URL)) {
                // Jika bukan URL lengkap, anggap sebagai path di storage
                $activity->image_url = Storage::url($activity->image_url);
            }
            return $activity;
        });
        
        return Inertia::render("umat/activities/index", [
            'activities' => $activities
        ]);
    }

    /**
     * Display the specified activity.
     */
    public function show(Activity $activity): Response
    {
        // Transform image URL untuk storage
        if ($activity->image_url && !filter_var($activity->image_url, FILTER_VALIDATE_URL)) {
            $activity->image_url = Storage::url($activity->image_url);
        }

        return Inertia::render("umat/activities/show", [
            'activity' => $activity
        ]);
    }

    /**
     * Display all past activities.
     */
    public function archive(): Response
    {
        // Tampilkan kegiatan yang sudah lewat
        $activities = Activity::where('date', '<', now()->toDateString())
            ->orderBy('date', 'desc')
            ->orderBy('time_start', 'desc')
            ->paginate(12);

        // Transform image URLs untuk storage
        $activities->getCollection()->transform(function ($activity) {
            if ($activity->image_url && !filter_var($activity->image_url, FILTER_VALIDATE_URL)) {
                $activity->image_url = Storage::url($activity->image_url);
            }
            return $activity;
        });
        
        return Inertia::render("umat/activities/archive", [
            'activities' => $activities
        ]);
    }
}
