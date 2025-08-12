<?php

namespace App\Http\Controllers\Umat;

use App\Http\Controllers\Controller;
use App\Models\WorshipSchedule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UmatWorshipScheduleController extends Controller
{
    /**
     * Display a listing of worship schedules for umat (read-only).
     */
    public function index()
    {
        $worshipSchedules = WorshipSchedule::with('communities')
            ->whereDate('date', '>=', now())
            ->orderBy('date', 'asc')
            ->orderBy('time_start', 'asc')
            ->paginate(9);
        
        return Inertia::render('umat/worship-schedules/index', [
            'worshipSchedules' => $worshipSchedules
        ]);
    }

    /**
     * Display the specified resource (read-only).
     */
    public function show(WorshipSchedule $worshipSchedule)
    {
        $worshipSchedule->load('communities');
        
        return Inertia::render('umat/worship-schedules/show', [
            'worshipSchedule' => $worshipSchedule
        ]);
    }
}