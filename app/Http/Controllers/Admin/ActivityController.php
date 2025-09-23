<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
            // Semua upload baru masuk ke public/assets
            $image = $request->file('image');
            $filename = uniqid('activity_') . '.' . $image->getClientOriginalExtension();
            $destinationPath = public_path('assets');

            if (!is_dir($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }

            $image->move($destinationPath, $filename);
            $data['image_url'] = 'assets/' . $filename; // simpan path relatif ke public
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
            // hapus file fisik lama (cek beberapa kemungkinan lokasi)
            $this->deletePhysicalImage($activity->image_url);

            // simpan file baru ke public/assets
            $image = $request->file('image');
            $filename = uniqid('activity_') . '.' . $image->getClientOriginalExtension();
            $destinationPath = public_path('assets');

            if (!is_dir($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }

            $image->move($destinationPath, $filename);
            $data['image_url'] = 'assets/' . $filename;
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
     * Resolve image url:
     * - cek apakah path yang tersimpan ada di public/<path>
     * - jika tidak ada, coba public/assets/<basename> (prefer root assets)
     * - jika tidak ada, coba public/assets/activities/<basename> (fallback data lama)
     * - jika tetap tidak ada, fallback ke images/default.png
     */
    protected function resolveImageUrl(?string $storedPath): string
    {
        $img = ltrim($storedPath ?? '', '/');

        // 1) jika path yang disimpan valid di public/
        if (!empty($img) && file_exists(public_path($img))) {
            return url($img);
        }

        // 2) coba cari di public/assets/<basename> (prefer root assets)
        if (!empty($img)) {
            $basename = basename($img);
            if (file_exists(public_path('assets/' . $basename))) {
                return url('assets/' . $basename);
            }

            // 3) fallback: kemungkinan file lama di public/assets/activities/<basename>
            if (file_exists(public_path('assets/activities/' . $basename))) {
                return url('assets/activities/' . $basename);
            }
        }

        return url('images/default.png');
    }

    /**
     * Hapus file fisik jika ada. Mencoba beberapa kemungkinan lokasi:
     * - public/<storedPath>
     * - public/assets/<basename>
     * - public/assets/activities/<basename> (data lama)
     */
    protected function deletePhysicalImage(?string $storedPath): void
    {
        $img = ltrim($storedPath ?? '', '/');

        if (!empty($img) && file_exists(public_path($img))) {
            @unlink(public_path($img));
            return;
        }

        if (!empty($img)) {
            $basename = basename($img);

            $alt1 = public_path('assets/' . $basename);
            if (file_exists($alt1)) {
                @unlink($alt1);
                return;
            }

            $alt2 = public_path('assets/activities/' . $basename);
            if (file_exists($alt2)) {
                @unlink($alt2);
            }
        }
    }
}
