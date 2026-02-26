<?php

namespace App\Http\Controllers\Umat;

use App\Http\Controllers\Controller;
use App\Models\ChurchOfficial;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UmatChurchOfficialController extends Controller
{
    /**
     * Display a listing of active church officials (read-only for umat).
     */
    public function index(Request $request): Response
    {
        $position = $request->query('position');
        $search   = $request->query('search');

        $query = ChurchOfficial::with('community:id,name')
            ->where('is_active', true);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('position', 'like', "%{$search}%")
                  ->orWhere('department', 'like', "%{$search}%");
            });
        }

        if ($position) {
            $query->where('position', $position);
        }

        $officials = $query
            ->orderBy('name', 'asc')
            ->paginate(12)
            ->withQueryString();

        $positions = [
            'pastor_paroki'          => 'Pastor Paroki',
            'ketua_lingkungan'       => 'Ketua Lingkungan',
            'sekretaris_lingkungan'  => 'Sekretaris Lingkungan',
            'bendahara_lingkungan'   => 'Bendahara Lingkungan',
            'koordinator_wilayah'    => 'Koordinator Wilayah',
            'dewan_paroki'           => 'Dewan Paroki',
            'ketua_sie'              => 'Ketua Seksi',
            'anggota_sie'            => 'Anggota Seksi',
        ];

        return Inertia::render('umat/church-officials/index', [
            'officials' => $officials,
            'positions' => $positions,
            'filters' => [
                'position' => $position,
                'search'   => $search,
            ],
        ]);
    }

    /**
     * Display the specified church official (read-only).
     */
    public function show(ChurchOfficial $churchOfficial): Response
    {
        $churchOfficial->load('community:id,name');

        return Inertia::render('umat/church-officials/show', [
            'official' => $churchOfficial,
        ]);
    }
}
