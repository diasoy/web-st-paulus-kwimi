<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage; // Tambahkan ini

class ActivityController extends Controller
{
    protected array $sortable = ['name', 'date', 'location', 'created_at'];

    public function index(Request $request)
    {
        $search = $request->query('search');
        $sort = $request->query('sort', 'created_at');
        $direction = strtolower($request->query('direction', 'desc')) === 'asc' ? 'asc' : 'desc';

        if (!in_array($sort, $this->sortable)) {
            $sort = 'created_at';
        }

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

        // Normalisasi image_url sebelum dikirim ke frontend
        $activities->getCollection()->transform(function ($activity) {
            $activity->image_url = $this->resolveImageUrl($activity->image_url);
            return $activity;
        });

        return Inertia::render('admin/activities/index', [
            'activities' => $activities
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/activities/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'date'        => 'required|date',
            'time_start'  => 'nullable|date_format:H:i',
            'location'    => 'nullable|string|max:255',
            'image'       => 'nullable|image|mimes:jpeg,jpg,png,webp|max:2048',
        ]);

        $data = [
            'name'        => $validated['name'],
            'description' => $validated['description'] ?? null,
            'date'        => $validated['date'],
            'time_start'  => $validated['time_start'] ?? null,
            'location'    => $validated['location'] ?? null,
        ];

        if ($request->hasFile('image')) {
            // Simpan file dan simpan path relatif lengkap (mis: activities/abc.jpg)
            $path = $request->file('image')->store('activities', 'public');
            $data['image_url'] = $path; // konsisten: simpan path lengkap
        }

        Activity::create($data);

        return redirect()->route('admin.activities.index')
            ->with('success', 'Agenda Kegiatan berhasil dibuat.');
    }

    public function show(Activity $activity)
    {
        $activity->image_url = $this->resolveImageUrl($activity->image_url);
        return Inertia::render('admin/activities/show', [
            'activity' => $activity
        ]);
    }

    public function edit(Activity $activity)
    {
        $activity->image_url = $this->resolveImageUrl($activity->image_url);
        return Inertia::render('admin/activities/edit', [
            'activity' => $activity
        ]);
    }

    public function update(Request $request, Activity $activity)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'date'        => 'required|date',
            'time_start'  => 'nullable|date_format:H:i',
            'location'    => 'nullable|string|max:255',
            'image'       => 'nullable|image|mimes:jpeg,jpg,png,webp|max:2048',
        ]);

        $data = [
            'name'        => $validated['name'],
            'description' => $validated['description'] ?? null,
            'date'        => $validated['date'],
            'time_start'  => $validated['time_start'] ?? null,
            'location'    => $validated['location'] ?? null,
        ];

        if ($request->hasFile('image')) {
            // Hapus file fisik lama
            $this->deletePhysicalImage($activity->image_url);

            // Simpan file baru menggunakan Storage facade dan path lengkap
            $path = $request->file('image')->store('activities', 'public');
            $data['image_url'] = $path;
        }

        $activity->update($data);

        return redirect()->route('admin.activities.index')
            ->with('success', 'Agenda Kegiatan berhasil diperbarui.');
    }

    public function destroy(Activity $activity)
    {
        $this->deletePhysicalImage($activity->image_url);

        $activity->delete();

        return redirect()->route('admin.activities.index')
            ->with('success', 'Agenda Kegiatan berhasil dihapus.');
    }

    /**
     * Resolve image url using Storage facade
     */
    protected function resolveImageUrl(?string $storedPath): string
    {
        if (empty($storedPath)) {
            return asset('images/default.png');
        }

        // Normalisasi: jika hanya nama file, prefix dengan activities/
        $normalized = str_starts_with($storedPath, 'activities/')
            ? $storedPath
            : 'activities/' . ltrim(basename($storedPath), '/');

        if (Storage::disk('public')->exists($normalized)) {
            return asset('storage/' . $normalized);
        }

        // Fallback untuk file lama di public/assets
        $legacy = public_path('assets/' . basename($storedPath));
        if (file_exists($legacy)) {
            return asset('assets/' . basename($storedPath));
        }

        // Fallback tambahan untuk public/assets/activities
        $legacyActivity = public_path('assets/activities/' . basename($storedPath));
        if (file_exists($legacyActivity)) {
            return asset('assets/activities/' . basename($storedPath));
        }

        return asset('images/default.png');
    }

    /**
     * Hapus file fisik jika ada, mencakup lokasi lama dan baru.
     */
    protected function deletePhysicalImage(?string $storedPath): void
    {
        if (empty($storedPath)) {
            return;
        }

        $basename = basename($storedPath);
        $storagePath = 'activities/' . $basename;

        // Hapus file dari storage/app/public (lokasi baru)
        if (Storage::disk('public')->exists($storagePath)) {
            Storage::disk('public')->delete($storagePath);
            return;
        }

        // Cek dan hapus file di public/assets (lokasi lama)
        $alt1 = public_path('assets/' . $basename);
        if (file_exists($alt1)) {
            @unlink($alt1);
            return;
        }

        // Cek dan hapus file di public/assets/activities (lokasi lama lainnya)
        $alt2 = public_path('assets/activities/' . $basename);
        if (file_exists($alt2)) {
            @unlink($alt2);
        }
    }
}
