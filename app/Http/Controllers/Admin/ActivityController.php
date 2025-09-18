<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->query('search');
        $sort = $request->query('sort', 'created_at');
        $direction = $request->query('direction', 'desc');

        $sortable = ['name', 'date', 'location', 'created_at'];
            if (!in_array($sort, $sortable)) {
                $sort = 'created_at';
        }
        $direction = strtolower($direction) === 'asc' ? 'asc' : 'desc';

        $query = Activity::query();
        if ($search) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%")
                ->orWhere('location', 'like', "%{$search}%");
        }
        if ($sort === 'date') {
            $query->orderBy('date', $direction)
                ->orderBy('time_start', $direction);
        } else {
            $query->orderBy($sort, $direction);
        }

        $activities = $query->paginate(10)->withQueryString();

        // Transform image URLs untuk storage
        $activities->getCollection()->transform(function ($activity) {
            if ($activity->image_url && !filter_var($activity->image_url, FILTER_VALIDATE_URL)) {
                $activity->image_url = Storage::url($activity->image_url);
            }
            return $activity;
        });

        return Inertia::render('admin/activities/index', [
            'activities' => $activities
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/activities/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'time_start' => 'nullable|date_format:H:i',
            'location' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:2048',
        ]);

        $data = [
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'date' => $validated['date'],
            'time_start' => $validated['time_start'] ?? null,
            'location' => $validated['location'] ?? null,
        ];

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images/activities', 'public');
            $data['image_url'] = $path; // relative path like images/activities/xxx.jpg
        }

        Activity::create($data);

        return redirect()->route('admin.activities.index')
            ->with('success', 'Agenda Kegiatan berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Activity $activity)
    {
        // Transform image URL untuk storage
        if ($activity->image_url && !filter_var($activity->image_url, FILTER_VALIDATE_URL)) {
            $activity->image_url = Storage::url($activity->image_url);
        }

        return Inertia::render('admin/activities/show', [
            'activity' => $activity
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Activity $activity)
    {
        // Transform image URL untuk storage
        if ($activity->image_url && !filter_var($activity->image_url, FILTER_VALIDATE_URL)) {
            $activity->image_url = Storage::url($activity->image_url);
        }

        return Inertia::render('admin/activities/edit', [
            'activity' => $activity
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Activity $activity)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'time_start' => 'nullable|date_format:H:i',
            'location' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:2048',
        ]);

        $data = [
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'date' => $validated['date'],
            'time_start' => $validated['time_start'] ?? null,
            'location' => $validated['location'] ?? null,
        ];

        if ($request->hasFile('image')) {
            if ($activity->image_url) {
                Storage::disk('public')->delete($activity->image_url);
            }
            $path = $request->file('image')->store('images/activities', 'public');
            $data['image_url'] = $path;
        }

        $activity->update($data);

        return redirect()->route('admin.activities.index')
            ->with('success', 'Agenda Kegiatan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Activity $activity)
    {
        if ($activity->image_url) {
            Storage::disk('public')->delete($activity->image_url);
        }

        $activity->delete();

        return redirect()->route('admin.activities.index')
            ->with('success', 'Agenda Kegiatan berhasil dihapus.');
    }
}
