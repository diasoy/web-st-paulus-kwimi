<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AnnouncementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $announcements = Announcement::latest()->paginate(10);
        
        return Inertia::render('admin/announcements/index', [
            'announcements' => $announcements
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/announcements/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:2048',
            'is_publish' => 'boolean'
        ]);

        // Prepare data
        $data = [
            'title' => $validated['title'],
            'description' => $validated['description'],
            'is_publish' => $validated['is_publish'] ?? false,
        ];

        // Handle image upload to local storage (public disk)
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('announcements', 'public');
            $data['image_url'] = $path; // store relative path like announcements/xxx.jpg
        }

        Announcement::create($data);

        return redirect()->route('admin.announcements.index')
            ->with('success', 'Pengumuman berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Announcement $announcement)
    {
        return Inertia::render('admin/announcements/show', [
            'announcement' => $announcement
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Announcement $announcement)
    {
        return Inertia::render('admin/announcements/edit', [
            'announcement' => $announcement
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Announcement $announcement)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:2048',
            'is_publish' => 'boolean'
        ]);

        $data = [
            'title' => $validated['title'],
            'description' => $validated['description'],
            'is_publish' => $validated['is_publish'] ?? $announcement->is_publish,
        ];

        // If new image uploaded, replace old one
        if ($request->hasFile('image')) {
            if ($announcement->image_url) {
                Storage::disk('public')->delete($announcement->image_url);
            }
            $path = $request->file('image')->store('announcements', 'public');
            $data['image_url'] = $path;
        }

        $announcement->update($data);

        return redirect()->route('admin.announcements.index')
            ->with('success', 'Pengumuman berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Announcement $announcement)
    {
        // Delete stored image if exists
        if ($announcement->image_url) {
            Storage::disk('public')->delete($announcement->image_url);
        }

        $announcement->delete();

        return redirect()->route('admin.announcements.index')
            ->with('success', 'Pengumuman berhasil dihapus.');
    }
}
