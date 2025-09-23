<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AnnouncementController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $sort = $request->query('sort', 'created_at');
        $direction = $request->query('direction', 'desc');

        $sortable = ['title', 'created_at', 'is_publish'];
        if (!in_array($sort, $sortable)) {
            $sort = 'created_at';
        }
        $direction = strtolower($direction) === 'asc' ? 'asc' : 'desc';

        $query = Announcement::query();
        if ($search) {
            $query->where('title', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%");
        }

        $announcements = $query->orderBy($sort, $direction)
            ->paginate(10)
            ->withQueryString();

        $announcements->getCollection()->transform(function ($announcement) {
            $announcement->image_url = getImageUrl($announcement->image_url);
            return $announcement;
        });

        return Inertia::render('admin/announcements/index', [
            'announcements' => $announcements
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/announcements/create');
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        'is_publish' => 'boolean',
    ]);

    if ($request->hasFile('image')) {
        $path = $request->file('image')->store('images/announcements', 'public');
        $validated['image_url'] = $path; // simpan relatif (tanpa /storage/)
    }

    Announcement::create($validated);

    return redirect()->route('admin.announcements.index')->with('success', 'Pengumuman berhasil ditambahkan');
}

public function update(Request $request, Announcement $announcement)
{
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        'is_publish' => 'boolean',
    ]);

    if ($request->hasFile('image')) {
        $path = $request->file('image')->store('images/announcements', 'public');
        $validated['image_url'] = $path;
    }

    $announcement->update($validated);

    return redirect()->route('admin.announcements.index')->with('success', 'Pengumuman berhasil diperbarui');
}

    public function show(Announcement $announcement)
    {
        $announcement->image_url = getImageUrl($announcement->image_url);

        return Inertia::render('admin/announcements/show', [
            'announcement' => $announcement
        ]);
    }

    public function edit(Announcement $announcement)
    {
        $announcement->image_url = getImageUrl($announcement->image_url);

        return Inertia::render('admin/announcements/edit', [
            'announcement' => $announcement
        ]);
    }

    public function destroy(Announcement $announcement)
    {
        if ($announcement->image_url) {
            Storage::disk('public')->delete($announcement->image_url);
        }

        $announcement->delete();

        return redirect()->route('admin.announcements.index')
            ->with('success', 'Pengumuman berhasil dihapus.');
    }
}
