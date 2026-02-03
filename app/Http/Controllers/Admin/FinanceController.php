<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Finance;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FinanceController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $type = $request->query('type');
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');
        $sort = $request->query('sort', 'date');
        $direction = strtolower($request->query('direction', 'desc')) === 'asc' ? 'asc' : 'desc';

        $allowedSorts = ['date', 'amount', 'created_at', 'title'];
        if (!in_array($sort, $allowedSorts, true)) {
            $sort = 'date';
        }

        $query = Finance::with('recorder:id,name');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if (in_array($type, ['income', 'expense'], true)) {
            $query->where('type', $type);
        }

        if ($startDate) {
            $query->whereDate('date', '>=', $startDate);
        }

        if ($endDate) {
            $query->whereDate('date', '<=', $endDate);
        }

        $summaryQuery = clone $query;
        $incomeTotal = (clone $summaryQuery)->where('type', 'income')->sum('amount');
        $expenseTotal = (clone $summaryQuery)->where('type', 'expense')->sum('amount');
        $balance = $incomeTotal - $expenseTotal;

        $finances = $query
            ->orderBy($sort, $direction)
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/finances/index', [
            'finances' => $finances,
            'summary' => [
                'income_total' => (float) $incomeTotal,
                'expense_total' => (float) $expenseTotal,
                'balance' => (float) $balance,
            ],
            'filters' => [
                'search' => $search,
                'type' => $type,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'sort' => $sort,
                'direction' => $direction,
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/finances/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validatedData($request);
        $validated['recorded_by'] = $request->user()->id;

        Finance::create($validated);

        return redirect()->route('admin.finances.index')
            ->with('success', 'Transaksi keuangan berhasil dicatat.');
    }

    public function edit(Finance $finance): Response
    {
        return Inertia::render('admin/finances/edit', [
            'finance' => $finance->load('recorder:id,name'),
        ]);
    }

    public function update(Request $request, Finance $finance): RedirectResponse
    {
        $validated = $this->validatedData($request);
        $finance->update($validated);

        return redirect()->route('admin.finances.index')
            ->with('success', 'Transaksi keuangan berhasil diperbarui.');
    }

    public function destroy(Finance $finance): RedirectResponse
    {
        $finance->delete();

        return redirect()->route('admin.finances.index')
            ->with('success', 'Transaksi keuangan berhasil dihapus.');
    }

    private function validatedData(Request $request): array
    {
        return $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|in:income,expense',
            'amount' => 'required|numeric|min:0',
            'date' => 'required|date',
            'category' => 'nullable|string|max:100',
            'description' => 'nullable|string|max:1000',
        ]);
    }
}
