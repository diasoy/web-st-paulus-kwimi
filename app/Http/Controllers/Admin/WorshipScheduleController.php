<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WorshipSchedule;
use App\Models\Community;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorshipScheduleController extends Controller
{
    /**
     * Export jadwal ibadah ke PDF sesuai filter tanggal
     */
    public function exportPdf(Request $request)
    {
        $query = WorshipSchedule::with('communities');
        $start = $request->query('start');
        $end = $request->query('end');
        if ($start && $end) {
            $query->whereBetween('date', [$start, $end]);
        }
        $schedules = $query->orderBy('date')->orderBy('time_start')->get();
        
        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdfs.worship_schedules', [ 'schedules' => $schedules ]);
        
        // Set paper options for better PDF generation
        $pdf->setPaper('A4', 'portrait');
        
        return $pdf->download('Jadwal_Ibadah.pdf');
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->query('search');
        $sort = $request->query('sort', 'date');
        $direction = $request->query('direction', 'desc');

        $sortable = ['name', 'date', 'time_start', 'pic', 'created_at'];
        if (!in_array($sort, $sortable)) {
            $sort = 'created_at';
        }
        $direction = strtolower($direction) === 'asc' ? 'asc' : 'desc';

        $query = WorshipSchedule::with('communities');
        if ($search) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('pic', 'like', "%{$search}%");
        }
        if ($sort === 'date') {
            $query->orderBy('date', $direction)
                ->orderBy('time_start', $direction);
        } else {
            $query->orderBy($sort, $direction);
        }

        $worshipSchedules = $query->paginate(10)->withQueryString();

        return Inertia::render('admin/worship-schedules/index', [
            'worshipSchedules' => $worshipSchedules
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $communities = Community::all();

        return Inertia::render('admin/worship-schedules/create', [
            'communities' => $communities
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'date' => 'required|date',
            'pic' => 'required|string|max:255',
            'time_start' => 'required|date_format:H:i',
            'communities' => 'array',
            'communities.*' => 'exists:communities,id'
        ]);

        // Convert time format for storage
        $validated['time_start'] = $validated['time_start'] . ':00';

        $worshipSchedule = WorshipSchedule::create($validated);

        if (isset($validated['communities'])) {
            $worshipSchedule->communities()->sync($validated['communities']);
        }

        return redirect()->route('admin.worship-schedules.index')
            ->with('success', 'Jadwal Ibadah berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(WorshipSchedule $worshipSchedule)
    {
        $worshipSchedule->load('communities');

        return Inertia::render('admin/worship-schedules/show', [
            'worshipSchedule' => $worshipSchedule
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(WorshipSchedule $worshipSchedule)
    {
        $worshipSchedule->load('communities');
        $communities = Community::all();

        return Inertia::render('admin/worship-schedules/edit', [
            'worshipSchedule' => $worshipSchedule,
            'communities' => $communities
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, WorshipSchedule $worshipSchedule)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'date' => 'required|date',
            'pic' => 'required|string|max:255',
            'time_start' => 'required|date_format:H:i',
            'communities' => 'array',
            'communities.*' => 'exists:communities,id'
        ]);

        // Convert time format for storage
        $validated['time_start'] = $validated['time_start'] . ':00';

        $worshipSchedule->update($validated);

        if (isset($validated['communities'])) {
            $worshipSchedule->communities()->sync($validated['communities']);
        }

        return redirect()->route('admin.worship-schedules.index')
            ->with('success', 'Jadwal Ibadah berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WorshipSchedule $worshipSchedule)
    {
        $worshipSchedule->delete();

        return redirect()->route('admin.worship-schedules.index')
            ->with('success', 'Jadwal Ibadah berhasil dihapus.');
    }
}
