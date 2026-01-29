<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ChurchOfficial;
use App\Models\Community;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ChurchOfficialController extends Controller
{
    protected array $sortable = ['name', 'position', 'community_id', 'start_date', 'created_at'];

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->query('search');
        $sort = $request->query('sort', 'name');
        $direction = strtolower($request->query('direction', 'asc')) === 'desc' ? 'desc' : 'asc';
        $position = $request->query('position');
        $status = $request->query('status');

        if (!in_array($sort, $this->sortable)) {
            $sort = 'name';
        }

        $query = ChurchOfficial::with('community:id,name');

        // Search filter
        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('department', 'like', "%{$search}%");
            });
        }

        // Position filter
        if ($position) {
            $query->where('position', $position);
        }

        // Status filter
        if ($status === 'active') {
            $query->where('is_active', true);
        } elseif ($status === 'inactive') {
            $query->where('is_active', false);
        }

        $officials = $query
            ->orderBy($sort, $direction)
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/church-officials/index', [
            'officials' => $officials,
            'positions' => $this->getPositionOptions(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $communities = Community::orderBy('name')->get();

        return Inertia::render('admin/church-officials/create', [
            'communities' => $communities,
            'positions' => $this->getPositionOptions(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|in:pastor_paroki,ketua_lingkungan,sekretaris_lingkungan,bendahara_lingkungan,koordinator_wilayah,dewan_paroki,ketua_sie,anggota_sie',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:2048',
            'community_id' => 'nullable|exists:communities,id',
            'department' => 'nullable|string|max:255',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_active' => 'boolean',
            'notes' => 'nullable|string',
        ]);

        $data = $validated;
        unset($data['photo']);

        // Convert 'none' to null for community_id
        if (isset($data['community_id']) && $data['community_id'] === 'none') {
            $data['community_id'] = null;
        }

        // Handle photo upload
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('church-officials', 'public');
            $data['photo'] = $path;
        }

        ChurchOfficial::create($data);

        return redirect()->route('admin.church-officials.index')
            ->with('success', 'Data pengurus gereja berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ChurchOfficial $churchOfficial)
    {
        $churchOfficial->load('community');

        return Inertia::render('admin/church-officials/show', [
            'official' => $churchOfficial,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ChurchOfficial $churchOfficial)
    {
        $churchOfficial->load('community');
        $communities = Community::orderBy('name')->get();

        return Inertia::render('admin/church-officials/edit', [
            'official' => $churchOfficial,
            'communities' => $communities,
            'positions' => $this->getPositionOptions(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ChurchOfficial $churchOfficial)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|in:pastor_paroki,ketua_lingkungan,sekretaris_lingkungan,bendahara_lingkungan,koordinator_wilayah,dewan_paroki,ketua_sie,anggota_sie',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:2048',
            'community_id' => 'nullable|exists:communities,id',
            'department' => 'nullable|string|max:255',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_active' => 'boolean',
            'notes' => 'nullable|string',
        ]);

        $data = $validated;
        unset($data['photo']);

        // Convert 'none' to null for community_id
        if (isset($data['community_id']) && $data['community_id'] === 'none') {
            $data['community_id'] = null;
        }

        // Handle photo upload
        if ($request->hasFile('photo')) {
            // Delete old photo
            $this->deletePhysicalPhoto($churchOfficial->photo);

            // Upload new photo
            $path = $request->file('photo')->store('church-officials', 'public');
            $data['photo'] = $path;
        }

        $churchOfficial->update($data);

        return redirect()->route('admin.church-officials.index')
            ->with('success', 'Data pengurus gereja berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ChurchOfficial $churchOfficial)
    {
        // Delete photo if exists
        $this->deletePhysicalPhoto($churchOfficial->photo);

        $churchOfficial->delete();

        return redirect()->route('admin.church-officials.index')
            ->with('success', 'Data pengurus gereja berhasil dihapus.');
    }

    /**
     * Get position options for dropdown
     */
    protected function getPositionOptions(): array
    {
        return [
            ['value' => 'pastor_paroki', 'label' => 'Pastor Paroki'],
            ['value' => 'ketua_lingkungan', 'label' => 'Ketua Lingkungan'],
            ['value' => 'sekretaris_lingkungan', 'label' => 'Sekretaris Lingkungan'],
            ['value' => 'bendahara_lingkungan', 'label' => 'Bendahara Lingkungan'],
            ['value' => 'koordinator_wilayah', 'label' => 'Koordinator Wilayah'],
            ['value' => 'dewan_paroki', 'label' => 'Dewan Paroki'],
            ['value' => 'ketua_sie', 'label' => 'Ketua Seksi'],
            ['value' => 'anggota_sie', 'label' => 'Anggota Seksi'],
        ];
    }

    /**
     * Resolve photo URL using Storage facade
     */
    protected function resolvePhotoUrl(?string $storedPath): string
    {
        if (empty($storedPath)) {
            return asset('images/default-avatar.png');
        }

        // Jika sudah URL lengkap
        if (filter_var($storedPath, FILTER_VALIDATE_URL)) {
            return $storedPath;
        }

        // Normalisasi: jika hanya nama file, prefix dengan church-officials/
        $normalized = str_starts_with($storedPath, 'church-officials/')
            ? $storedPath
            : 'church-officials/' . ltrim(basename($storedPath), '/');

        if (Storage::disk('public')->exists($normalized)) {
            return asset('storage/' . $normalized);
        }

        return asset('images/default-avatar.png');
    }

    /**
     * Delete physical photo file
     */
    protected function deletePhysicalPhoto(?string $storedPath): void
    {
        if (empty($storedPath)) {
            return;
        }

        $basename = basename($storedPath);
        $storagePath = 'church-officials/' . $basename;

        // Delete from storage/app/public
        if (Storage::disk('public')->exists($storagePath)) {
            Storage::disk('public')->delete($storagePath);
        }
    }
}
