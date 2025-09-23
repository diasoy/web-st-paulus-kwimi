<?php

namespace App\Http\Controllers\Umat;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class UmatActivityController extends Controller
{
    /**
     * Display a listing of upcoming activities.
     */
    public function index(Request $request): Response
    {
        $filter = $request->query('filter', 'default');
        $startDate = now()->toDateString();
        $endDate = null;

        switch ($filter) {
            case 'week':
                $endDate = now()->addWeek()->toDateString();
                break;
            case 'month':
                $endDate = now()->addMonth()->toDateString();
                break;
            case 'custom':
                $startDate = $request->query('start_date', $startDate);
                $endDate = $request->query('end_date', $startDate);
                break;
            default:
                // default: mulai hari ini tanpa batas akhir
                break;
        }

        $query = Activity::query();

        if ($endDate) {
            $query->whereBetween('date', [$startDate, $endDate]);
        } else {
            $query->where('date', '>=', $startDate);
        }

        $activities = $query
            ->orderBy('date', 'asc')
            ->orderBy('time_start', 'asc')
            ->paginate(12)
            ->appends($request->query()); // supaya pagination bawa query filter

        // Transform image URLs: gunakan Storage::url atau asset
        $activities->getCollection()->transform(function ($activity) {
            $img = ltrim($activity->image_url ?? '', '/');
            if ($img) {
                if (!filter_var($img, FILTER_VALIDATE_URL)) {
                    $activity->image_url = asset('/' . $img);
                } else {
                    $activity->image_url = $img;
                }
            } else {
                $activity->image_url = asset('images/default.png');
            }
            Log::info('Activity image_url', [
                'id' => $activity->id,
                'image_url' => $activity->image_url
            ]);
            return $activity;
        });

        return Inertia::render("umat/activities/index", [
            'activities' => $activities,
            'filters' => [
                'filter' => $filter,
                'start_date' => $request->query('start_date'),
                'end_date' => $request->query('end_date')
            ]
        ]);
    }


    /**
     * Display the specified activity.
     */
    public function show(Activity $activity): Response
    {
        // Transform image URL untuk 
        $img = ltrim($activity->image_url ?? '', '/');
        if ($img) {
            if (!filter_var($img, FILTER_VALIDATE_URL)) {
                $activity->image_url = asset('/' . $img);
            } else {
                $activity->image_url = $img;
            }
        } else {
            $activity->image_url = asset('images/default.png');
        }
        Log::info('Activity show image_url', [
            'id' => $activity->id,
            'image_url' => $activity->image_url
        ]);
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
            $img = ltrim($activity->image_url ?? '', '/');
            if ($img) {
                if (!filter_var($img, FILTER_VALIDATE_URL)) {
                    $activity->image_url = asset('storage/' . $img);
                } else {
                    $activity->image_url = $img;
                }
            } else {
                $activity->image_url = asset('images/default.png');
            }
            return $activity;
        });

        return Inertia::render("umat/activities/archive", [
            'activities' => $activities
        ]);
    }
}
