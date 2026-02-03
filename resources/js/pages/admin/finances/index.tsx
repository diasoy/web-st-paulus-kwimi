import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
  ArrowDown,
  ArrowUp,
  CalendarClock,
  ChevronsUpDown,
  FileText,
  HandCoins,
  Plus,
  RotateCcw,
  Search,
  TrendingDown,
  TrendingUp,
  Wallet2,
} from 'lucide-react';
import { useState } from 'react';

type FinanceType = 'income' | 'expense';

interface FinanceRecord {
  id: number;
  title: string;
  type: FinanceType;
  amount: number;
  date: string;
  category?: string | null;
  description?: string | null;
  recorded_by?: number | null;
  recorder?: {
    id: number;
    name: string;
  } | null;
  created_at: string;
}

interface PaginationLink {
  url?: string;
  label: string;
  active: boolean;
}

interface PaginationMeta {
  current_page: number;
  from: number;
  to: number;
  per_page: number;
  total: number;
}

interface Summary {
  income_total: number;
  expense_total: number;
  balance: number;
}

interface Filters {
  search?: string | null;
  type?: FinanceType | null;
  start_date?: string | null;
  end_date?: string | null;
  sort?: string | null;
  direction?: 'asc' | 'desc' | null;
}

interface FinancesIndexProps {
  finances: {
    data: FinanceRecord[];
    links?: PaginationLink[];
    meta?: PaginationMeta;
  };
  summary: Summary;
  filters: Filters;
}

const labelMap: Record<string, string> = {
  'pagination.next': 'Berikutnya',
  'pagination.previous': 'Sebelumnya',
  '&laquo; Previous': 'Sebelumnya',
  'Next &raquo;': 'Berikutnya',
  '&laquo;': 'Sebelumnya',
  '&raquo;': 'Berikutnya',
};

const getLabel = (label: string) => {
  const cleanLabel = label.replace(/&laquo;|&raquo;/g, '').trim();
  return labelMap[label] || labelMap[cleanLabel] || cleanLabel || label;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
  }).format(value || 0);

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

const getTypeLabel = (type: FinanceType) => (type === 'income' ? 'Pemasukan' : 'Pengeluaran');

export default function FinancesIndex({ finances, summary, filters }: FinancesIndexProps) {
  const { props } = usePage<{ flash?: { success?: string; error?: string } }>();

  const [search, setSearch] = useState<string>(filters.search || '');
  const [typeFilter, setTypeFilter] = useState<string>(filters.type || 'all');
  const [startDate, setStartDate] = useState<string>(filters.start_date || '');
  const [endDate, setEndDate] = useState<string>(filters.end_date || '');
  const [sortBy, setSortBy] = useState<string>(filters.sort || 'date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>(filters.direction === 'asc' ? 'asc' : 'desc');
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const applyFilters = () => {
    router.get(
      route('admin.finances.index'),
      {
        search,
        type: typeFilter === 'all' ? '' : typeFilter,
        start_date: startDate || '',
        end_date: endDate || '',
        sort: sortBy,
        direction: sortDir,
      },
      { preserveState: true, replace: true, preserveScroll: true }
    );
  };

  const handleReset = () => {
    setSearch('');
    setTypeFilter('all');
    setStartDate('');
    setEndDate('');
    setSortBy('date');
    setSortDir('desc');
    router.get(route('admin.finances.index'), {}, { preserveState: true, replace: true, preserveScroll: true });
  };

  const handleSort = (field: string) => {
    const newDir = field === sortBy && sortDir === 'asc' ? 'desc' : 'asc';
    setSortBy(field);
    setSortDir(newDir);
    router.get(
      route('admin.finances.index'),
      {
        search,
        type: typeFilter === 'all' ? '' : typeFilter,
        start_date: startDate || '',
        end_date: endDate || '',
        sort: field,
        direction: newDir,
      },
      { preserveState: true, replace: true, preserveScroll: true }
    );
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (field !== sortBy) return <ChevronsUpDown className="ml-1 h-4 w-4" />;
    return sortDir === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />;
  };

  const handleDelete = (id: number, title: string) => {
    if (!confirm(`Hapus transaksi:\n\n"${title}"?`)) return;
    setDeletingId(id);
    router.delete(route('admin.finances.destroy', id), {
      preserveScroll: true,
      onFinish: () => setDeletingId(null),
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Keuangan Gereja" />

      <div className="dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
        <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
          {/* Header */}
          <div className="relative z-10 space-y-4">
            <div className="text-center">
              <div className="relative inline-block">
                <h1 className="text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-lg">Keuangan Gereja</h1>
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-cyan-500 rounded-lg blur opacity-25"></div>
              </div>
              <p className="text-white/95 text-xl font-medium drop-shadow-md">
                Catat pemasukan dan pengeluaran sederhana untuk Gereja St. Paulus Kwimi
              </p>
            </div>
          </div>

          {/* Flash messages */}
          {props.flash?.success && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl shadow-md">
              <p className="font-medium">{props.flash.success}</p>
            </div>
          )}
          {props.flash?.error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl shadow-md">
              <p className="font-medium">{props.flash.error}</p>
            </div>
          )}

          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white/70 text-sm font-semibold uppercase tracking-wide">Total Pemasukan</p>
                  <h3 className="text-3xl font-bold text-white mt-1">{formatCurrency(summary.income_total)}</h3>
                </div>
                <div className="bg-emerald-500/20 text-emerald-200 p-3 rounded-xl">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">Semua dana yang masuk selama periode terpilih.</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white/70 text-sm font-semibold uppercase tracking-wide">Total Pengeluaran</p>
                  <h3 className="text-3xl font-bold text-white mt-1">{formatCurrency(summary.expense_total)}</h3>
                </div>
                <div className="bg-rose-500/20 text-rose-200 p-3 rounded-xl">
                  <TrendingDown className="h-6 w-6" />
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">Semua dana yang keluar selama periode terpilih.</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white/70 text-sm font-semibold uppercase tracking-wide">Saldo Sederhana</p>
                  <h3 className="text-3xl font-bold text-white mt-1">{formatCurrency(summary.balance)}</h3>
                </div>
                <div className="bg-cyan-500/20 text-cyan-100 p-3 rounded-xl">
                  <Wallet2 className="h-6 w-6" />
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Pemasukan dikurangi pengeluaran (bukan laporan laba rugi formal).
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 via-blue-600 to-cyan-600 text-white p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-white/20 p-3">
                    <HandCoins className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Filter &amp; Cari Transaksi</h2>
                    <p className="text-white/80">Saring data berdasarkan kata kunci, tipe, dan rentang tanggal.</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button asChild className="bg-white text-emerald-700 hover:bg-slate-100">
                    <Link href={route('admin.finances.create')}>
                      <Plus className="h-4 w-4 mr-2" />
                      Catat Transaksi
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={handleReset} className="bg-white/20 text-white border-white/40 hover:bg-white/30">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Cari Judul / Keterangan</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Contoh: kolekte, renovasi, konsumsi"
                      className="pl-9"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Tipe</label>
                  <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Semua tipe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Tipe</SelectItem>
                      <SelectItem value="income">Pemasukan</SelectItem>
                      <SelectItem value="expense">Pengeluaran</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Dari Tanggal</label>
                  <div className="relative">
                    <CalendarClock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="pl-9" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Sampai Tanggal</label>
                  <div className="relative">
                    <CalendarClock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="pl-9" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={applyFilters} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Terapkan Filter
                </Button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Daftar Transaksi</h3>
                <p className="text-gray-600">Pencatatan sederhana pemasukan &amp; pengeluaran gereja.</p>
              </div>
              <Button asChild className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow">
                <Link href={route('admin.finances.create')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Catat Transaksi
                </Link>
              </Button>
            </div>

            <div className="p-6">
              {finances.data.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200">
                      <TableHead className="cursor-pointer" onClick={() => handleSort('date')}>
                        <div className="flex items-center gap-2">
                          Tanggal
                          <SortIcon field="date" />
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort('title')}>
                        <div className="flex items-center gap-2">
                          Judul &amp; Kategori
                          <SortIcon field="title" />
                        </div>
                      </TableHead>
                      <TableHead>Tipe</TableHead>
                      <TableHead className="cursor-pointer text-right" onClick={() => handleSort('amount')}>
                        <div className="flex items-center justify-end gap-2">
                          Jumlah
                          <SortIcon field="amount" />
                        </div>
                      </TableHead>
                      <TableHead>Pencatat</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {finances.data.map((item) => (
                      <TableRow key={item.id} className="border-gray-200/70 hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-emerald-200 flex items-center justify-center">
                              <CalendarClock className="h-5 w-5 text-emerald-700" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{formatDate(item.date)}</div>
                              <div className="text-xs text-gray-500">Dicatat: {formatDate(item.created_at)}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-semibold text-gray-900">{item.title}</p>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                              {item.category ? (
                                <span className="px-2 py-1 rounded-lg bg-gray-100 text-gray-700 border border-gray-200">
                                  {item.category}
                                </span>
                              ) : (
                                <span className="px-2 py-1 rounded-lg bg-gray-50 text-gray-400 border border-dashed border-gray-200">
                                  Tanpa kategori
                                </span>
                              )}
                              {item.description && <span className="line-clamp-1 text-gray-500">{item.description}</span>}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              item.type === 'income'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : 'bg-rose-100 text-rose-800 border border-rose-200'
                            }`}
                          >
                            {getTypeLabel(item.type)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold text-gray-900">
                          <div
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${
                              item.type === 'income' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                            }`}
                          >
                            {item.type === 'income' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                            {formatCurrency(item.amount)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-gray-800 font-medium">{item.recorder?.name || '—'}</div>
                          <div className="text-xs text-gray-500">ID: {item.recorded_by ?? '—'}</div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" asChild className="bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100">
                              <Link href={route('admin.finances.edit', item.id)}>Edit</Link>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(item.id, item.title)}
                              disabled={deletingId === item.id}
                              className="bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100"
                            >
                              Hapus
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="py-16 text-center">
                  <div className="rounded-full bg-gray-100 p-6 w-24 h-24 mx-auto mb-6">
                    <FileText className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Belum ada transaksi</h3>
                  <p className="text-gray-600 mb-6">Mulai catat pemasukan atau pengeluaran pertama.</p>
                  <Button asChild className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white">
                    <Link href={route('admin.finances.create')}>
                      <Plus className="h-4 w-4 mr-2" />
                      Catat Transaksi
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Pagination */}
          {finances.data.length > 0 && finances.links && finances.links.length > 3 && (
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-lg font-medium text-gray-700">
                  Menampilkan <span className="font-bold text-emerald-600">{finances.data.length}</span> transaksi
                </div>
                <div className="flex gap-2">
                  {finances.links.map((link: any, index: number) => {
                    const baseClass = 'px-4 py-2 rounded-xl font-medium transition-all duration-200 border-2';
                    const activeClass = 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white border-emerald-600 shadow-lg';
                    const inactiveClass = 'bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300';
                    const disabledClass = 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed';
                    const label = getLabel(link.label);
                    return link.url ? (
                      <button
                        key={index}
                        className={`${baseClass} ${link.active ? activeClass : inactiveClass}`}
                        onClick={() => router.visit(link.url!)}
                        dangerouslySetInnerHTML={{ __html: label }}
                        type="button"
                      />
                    ) : (
                      <button
                        key={index}
                        className={`${baseClass} ${disabledClass}`}
                        disabled
                        dangerouslySetInnerHTML={{ __html: label }}
                        type="button"
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
