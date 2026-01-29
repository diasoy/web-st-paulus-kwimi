<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class ActivityReportController extends Controller
{
    /**
     * Display activity report with filters
     */
    public function index(Request $request)
    {
        $filter = $request->query('filter', 'month');
        $startDate = null;
        $endDate = null;
        $year = $request->query('year', now()->year);
        $month = $request->query('month', now()->month);

        switch ($filter) {
            case 'week':
                $startDate = now()->startOfWeek()->toDateString();
                $endDate = now()->endOfWeek()->toDateString();
                break;
            case 'month':
                $startDate = Carbon::create($year, $month, 1)->startOfMonth()->toDateString();
                $endDate = Carbon::create($year, $month, 1)->endOfMonth()->toDateString();
                break;
            case 'year':
                $startDate = Carbon::create($year, 1, 1)->startOfYear()->toDateString();
                $endDate = Carbon::create($year, 12, 31)->endOfYear()->toDateString();
                break;
            case 'custom':
                $startDate = $request->query('start_date', now()->startOfMonth()->toDateString());
                $endDate = $request->query('end_date', now()->endOfMonth()->toDateString());
                break;
            default:
                $startDate = now()->startOfMonth()->toDateString();
                $endDate = now()->endOfMonth()->toDateString();
                break;
        }

        // Query kegiatan yang sudah dilaksanakan (tanggal <= hari ini)
        $query = Activity::query()
            ->where('date', '<=', now()->toDateString())
            ->whereBetween('date', [$startDate, $endDate]);

        $activities = $query
            ->orderBy('date', 'desc')
            ->orderBy('time_start', 'desc')
            ->paginate(10)
            ->withQueryString();

        // Normalisasi image_url
        $activities->getCollection()->transform(function ($activity) {
            $activity->image_url = $this->resolveImageUrl($activity->image_url);
            return $activity;
        });

        // Statistik
        $totalActivities = $query->count();
        $activitiesThisMonth = Activity::query()
            ->where('date', '<=', now()->toDateString())
            ->whereMonth('date', now()->month)
            ->whereYear('date', now()->year)
            ->count();

        return Inertia::render('admin/activity-reports/index', [
            'activities' => $activities,
            'filters' => [
                'filter' => $filter,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'year' => $year,
                'month' => $month,
            ],
            'statistics' => [
                'total' => $totalActivities,
                'this_month' => $activitiesThisMonth,
            ]
        ]);
    }

    /**
     * Export activity report to PDF
     */
    public function exportPdf(Request $request)
    {
        $filter = $request->query('filter', 'month');
        $startDate = null;
        $endDate = null;
        $year = $request->query('year', now()->year);
        $month = $request->query('month', now()->month);

        switch ($filter) {
            case 'week':
                $startDate = now()->startOfWeek()->toDateString();
                $endDate = now()->endOfWeek()->toDateString();
                $periodLabel = 'Minggu ' . now()->weekOfYear . ', ' . now()->year;
                break;
            case 'month':
                $startDate = Carbon::create($year, $month, 1)->startOfMonth()->toDateString();
                $endDate = Carbon::create($year, $month, 1)->endOfMonth()->toDateString();
                $periodLabel = Carbon::create($year, $month, 1)->translatedFormat('F Y');
                break;
            case 'year':
                $startDate = Carbon::create($year, 1, 1)->startOfYear()->toDateString();
                $endDate = Carbon::create($year, 12, 31)->endOfYear()->toDateString();
                $periodLabel = 'Tahun ' . $year;
                break;
            case 'custom':
                $startDate = $request->query('start_date', now()->startOfMonth()->toDateString());
                $endDate = $request->query('end_date', now()->endOfMonth()->toDateString());
                $periodLabel = Carbon::parse($startDate)->translatedFormat('d F Y') . ' - ' . Carbon::parse($endDate)->translatedFormat('d F Y');
                break;
            default:
                $startDate = now()->startOfMonth()->toDateString();
                $endDate = now()->endOfMonth()->toDateString();
                $periodLabel = now()->translatedFormat('F Y');
                break;
        }

        // Query kegiatan yang sudah dilaksanakan
        $activities = Activity::query()
            ->where('date', '<=', now()->toDateString())
            ->whereBetween('date', [$startDate, $endDate])
            ->orderBy('date', 'desc')
            ->orderBy('time_start', 'desc')
            ->get();

        // Transform image URLs untuk PDF
        $activities->transform(function ($activity) {
            $activity->formatted_date = Carbon::parse($activity->date)->translatedFormat('d F Y');
            $activity->formatted_time = $activity->time_start ? Carbon::parse($activity->time_start)->format('H:i') : '-';
            return $activity;
        });

        $pdf = Pdf::loadView('pdf.activity-report', [
            'activities' => $activities,
            'period' => $periodLabel,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'generated_at' => now()->translatedFormat('d F Y H:i:s'),
            'total_activities' => $activities->count(),
        ]);

        $pdf->setPaper('a4', 'portrait');
        
        $filename = 'Laporan-Kegiatan-' . str_replace(' ', '-', $periodLabel) . '.pdf';
        
        return $pdf->download($filename);
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
}
