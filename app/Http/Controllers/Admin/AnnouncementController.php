<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
            $img = ltrim($announcement->image_url ?? '', '/'); // bersihkan leading slash
            $finalUrl = null;

            if (!empty($img) && file_exists(public_path($img))) {
                // path stored valid di public/
                $finalUrl = url($img);
            } elseif (!empty($img)) {
                // coba cari di public/assets berdasarkan basename (untuk data lama yang mungkin disimpan berbeda)
                $basename = basename($img);
                if (file_exists(public_path('assets/' . $basename))) {
                    $finalUrl = url('assets/' . $basename);
                }
            }

            $announcement->image_url = $finalUrl ?: url('images/default.png');
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

        // pastikan is_publish selalu boolean
        $validated['is_publish'] = $request->boolean('is_publish');

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = uniqid('announcement_') . '.' . $image->getClientOriginalExtension();
            $destinationPath = base_path('repositories/public/assets');

            if (!is_dir($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }

            $image->move($destinationPath, $filename);

            // simpan path relatif ke public
            $validated['image_url'] = 'assets/' . $filename;
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
            $this->deletePhysicalImage($announcement->image_url);

            $image = $request->file('image');
            $filename = uniqid('announcement_') . '.' . $image->getClientOriginalExtension();
            $destinationPath = base_path('repositories/public/assets');

            if (!is_dir($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }

            $image->move($destinationPath, $filename);

            $validated['image_url'] = 'assets/' . $filename;
        }

        $announcement->update($validated);

        return redirect()->route('admin.announcements.index')->with('success', 'Pengumuman berhasil diperbarui');
    }

    public function destroy(Announcement $announcement)
    {
        // hapus file fisik jika ada
        $this->deletePhysicalImage($announcement->image_url);

        $announcement->delete();

        return redirect()->route('admin.announcements.index')
            ->with('success', 'Pengumuman berhasil dihapus.');
    }

    protected function resolveImageUrl(?string $storedPath): string
    {
        $img = ltrim($storedPath ?? '', '/');
        if (!empty($img) && file_exists(public_path($img))) {
            return url($img);
        }

        if (!empty($img)) {
            $basename = basename($img);
            if (file_exists(public_path('assets/' . $basename))) {
                return url('assets/' . $basename);
            }
        }

        return url('images/default.png');
    }
    protected function deletePhysicalImage(?string $storedPath): void
    {
        $img = ltrim($storedPath ?? '', '/');

        if (!empty($img) && file_exists(public_path($img))) {
            @unlink(public_path($img));
            return;
        }

        if (!empty($img)) {
            $basename = basename($img);
            $altPath = public_path('assets/' . $basename);
            if (file_exists($altPath)) {
                @unlink($altPath);
            }
        }
    }
}
