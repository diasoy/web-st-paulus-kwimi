<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $activities = Activity::latest()->paginate(10);
        
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
        ]);

        Activity::create($validated);

        return redirect()->route('admin.activities.index')
            ->with('success', 'Agenda Kegiatan berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Activity $activity)
    {
        return Inertia::render('admin/activities/show', [
            'activity' => $activity
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Activity $activity)
    {
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
        ]);

        $activity->update($validated);

        return redirect()->route('admin.activities.index')
            ->with('success', 'Agenda Kegiatan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Activity $activity)
    {
        $activity->delete();

        return redirect()->route('admin.activities.index')
            ->with('success', 'Agenda Kegiatan berhasil dihapus.');
    }
}
