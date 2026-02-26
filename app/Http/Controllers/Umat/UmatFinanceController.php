<?php

namespace App\Http\Controllers\Umat;

use App\Http\Controllers\Controller;
use App\Models\Finance;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UmatFinanceController extends Controller
{
    /**
     * Display a read-only transparency view of church finances for umat.
     * Only shows title, type, amount, date, category — no internal recorder info.
     */
    public function index(Request $request): Response
    {
        $type      = $request->query('type');
        $year      = $request->query('year', now()->year);
        $month     = $request->query('month');

        $query = Finance::query();

        if (in_array($type, ['income', 'expense'], true)) {
            $query->where('type', $type);
        }

        if ($year) {
            $query->whereYear('date', $year);
        }

        if ($month) {
            $query->whereMonth('date', $month);
        }

        // Summary untuk filter yang aktif
        $summaryQuery  = clone $query;
        $incomeTotal   = (clone $summaryQuery)->where('type', 'income')->sum('amount');
        $expenseTotal  = (clone $summaryQuery)->where('type', 'expense')->sum('amount');
        $balance       = $incomeTotal - $expenseTotal;

        $finances = $query
            ->orderBy('date', 'desc')
            ->paginate(15)
            ->withQueryString()
            ->through(fn($f) => [
                'id'          => $f->id,
                'title'       => $f->title,
                'type'        => $f->type,
                'amount'      => (float) $f->amount,
                'date'        => $f->date,
                'category'    => $f->category,
                'description' => $f->description,
            ]);

        // Tahun-tahun yang tersedia untuk filter
        $availableYears = Finance::selectRaw('YEAR(date) as year')
            ->groupBy('year')
            ->orderByDesc('year')
            ->pluck('year');

        return Inertia::render('umat/finances/index', [
            'finances' => $finances,
            'summary' => [
                'income_total'  => (float) $incomeTotal,
                'expense_total' => (float) $expenseTotal,
                'balance'       => (float) $balance,
            ],
            'filters' => [
                'type'  => $type,
                'year'  => (int) $year,
                'month' => $month ? (int) $month : null,
            ],
            'available_years' => $availableYears,
        ]);
    }
}
