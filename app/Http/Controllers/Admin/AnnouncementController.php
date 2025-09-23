<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage; // Tambahkan ini

class AnnouncementController extends Controller
{
    protected array $sortable = ['title', 'created_at', 'is_publish'];

    public function index(Request $request)
    {
        $search = $request->query('search');
        $sort = $request->query('sort', 'created_at');
        $direction = strtolower($request->query('direction', 'desc')) === 'asc' ? 'asc' : 'desc';

        if (!in_array($sort, $this->sortable)) {
            $sort = 'created_at';
        }

        $query = Announcement::query();
        if ($search) {
            $query->where('title', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%");
        }

        $announcements = $query->orderBy($sort, $direction)
            ->paginate(10)
            ->withQueryString();

        $announcements->getCollection()->transform(function ($announcement) {
            $announcement->image_url = $this->resolveImageUrl($announcement->image_url);
            return $announcement;
        });

        return Inertia::render('admin/announcements/index', [
            'announcements' => $announcements,
            'filters' => $request->only(['search', 'sort', 'direction']),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/announcements/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'image'       => 'nullable|image|mimes:jpg,jpeg,png,gif,svg|max:2048',
            'is_publish'  => 'nullable|boolean',
        ]);

        $validated['is_publish'] = $request->boolean('is_publish');

        if ($request->hasFile('image')) {
            // Gunakan Storage facade untuk menyimpan gambar
            $path = $request->file('image')->store('announcements', 'public');
            // Simpan hanya nama filenya di database
            $validated['image_url'] = basename($path);
        }

        Announcement::create($validated);

        return redirect()->route('admin.announcements.index')->with('success', 'Pengumuman berhasil ditambahkan');
    }

    public function show(Announcement $announcement)
    {
        $announcement->image_url = $this->resolveImageUrl($announcement->image_url);
        return Inertia::render('admin/announcements/show', [
            'announcement' => $announcement
        ]);
    }

    public function edit(Announcement $announcement)
    {
        $announcement->image_url = $this->resolveImageUrl($announcement->image_url);
        return Inertia::render('admin/announcements/edit', [
            'announcement' => $announcement
        ]);
    }

    public function update(Request $request, Announcement $announcement)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'image'       => 'nullable|image|mimes:jpg,jpeg,png,gif,svg|max:2048',
            'is_publish'  => 'nullable|boolean',
        ]);

        $validated['is_publish'] = $request->boolean('is_publish');

        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            $this->deletePhysicalImage($announcement->image_url);

            // Simpan gambar baru menggunakan Storage facade
            $path = $request->file('image')->store('announcements', 'public');
            $validated['image_url'] = basename($path);
        }

        $announcement->update($validated);

        return redirect()->route('admin.announcements.index')->with('success', 'Pengumuman berhasil diperbarui');
    }

    public function destroy(Announcement $announcement)
    {
        $this->deletePhysicalImage($announcement->image_url);

        $announcement->delete();

        return redirect()->route('admin.announcements.index')
            ->with('success', 'Pengumuman berhasil dihapus.');
    }

    protected function resolveImageUrl(?string $storedPath): string
    {
        if (empty($storedPath)) {
            return url('images/default.png');
        }

        // Cek apakah file ada di direktori storage/app/public/announcements
        $storagePath = 'announcements/' . basename($storedPath);
        if (Storage::disk('public')->exists($storagePath)) {
            return Storage::disk('public')->url($storagePath);
        }

        // Fallback untuk file lama yang mungkin ada di public/assets
        if (file_exists(public_path('assets/' . basename($storedPath)))) {
            return url('assets/' . basename($storedPath));
        }

        return url('images/default.png');
    }

    protected function deletePhysicalImage(?string $storedPath): void
    {
        if (empty($storedPath)) {
            return;
        }

        // Hapus file dari storage/app/public
        $storagePath = 'announcements/' . basename($storedPath);
        if (Storage::disk('public')->exists($storagePath)) {
            Storage::disk('public')->delete($storagePath);
            return;
        }

        // Fallback untuk file lama yang mungkin ada di public/assets
        $altPath = public_path('assets/' . basename($storedPath));
        if (file_exists($altPath)) {
            @unlink($altPath);
        }
    }
}
