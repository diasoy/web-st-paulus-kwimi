import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { HandCoins, TrendingUp, TrendingDown, Wallet, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/umat/dashboard' },
    { title: 'Transparansi Keuangan', href: '/umat/finances' },
];

const labelMap: Record<string, string> = {
    'pagination.next': 'Berikutnya',
    'pagination.previous': 'Sebelumnya',
    '&laquo; Previous': 'Sebelumnya',
    'Next &raquo;': 'Berikutnya',
};
const getLabel = (label: string) => labelMap[label] || label;

const MONTHS = [
    { value: '1', label: 'Januari' },
    { value: '2', label: 'Februari' },
    { value: '3', label: 'Maret' },
    { value: '4', label: 'April' },
    { value: '5', label: 'Mei' },
    { value: '6', label: 'Juni' },
    { value: '7', label: 'Juli' },
    { value: '8', label: 'Agustus' },
    { value: '9', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' },
];

interface FinanceItem {
    id: number;
    title: string;
    type: 'income' | 'expense';
    amount: number;
    date: string;
    category?: string;
    description?: string;
}

interface PaginatedFinances {
    data: FinanceItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface Summary {
    income_total: number;
    expense_total: number;
    balance: number;
}

interface Props {
    finances: PaginatedFinances;
    summary: Summary;
    filters: {
        type?: string;
        year: number;
        month?: number | null;
    };
    available_years: number[];
}

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);

const formatDate = (d: string) => {
    try { return format(new Date(d), 'dd MMM yyyy', { locale: id }); } catch { return d; }
};

export default function UmatFinancesIndex({ finances, summary, filters, available_years }: Props) {
    const [type, setType] = useState(filters.type ?? '');
    const [year, setYear] = useState(String(filters.year));
    const [month, setMonth] = useState(filters.month ? String(filters.month) : '');

    const applyFilters = (overrides: Record<string, string> = {}) => {
        router.get('/umat/finances', {
            type: overrides.type ?? type,
            year: overrides.year ?? year,
            month: overrides.month !== undefined ? overrides.month : month,
        }, { preserveScroll: true, preserveState: true });
    };

    const resetFilters = () => {
        const currentYear = String(new Date().getFullYear());
        setType('');
        setYear(currentYear);
        setMonth('');
        router.get('/umat/finances', { year: currentYear }, { preserveScroll: true });
    };

    const hasFilters = type || month || String(year) !== String(new Date().getFullYear());

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transparansi Keuangan Gereja" />

            <div className="p-6 dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #1a4d20 0%, #235829 40%, #3e7147 100%)' }}>
                {/* Header */}
                <div className="mb-6 relative bg-gradient-to-r from-green-700 via-emerald-700 to-teal-800 rounded-2xl p-8 shadow-2xl overflow-hidden">
                    <div className="relative z-10 text-center">
                        <div className="relative inline-block mb-3">
                            <h1 className="text-4xl font-bold text-white drop-shadow-lg">Transparansi Keuangan</h1>
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-teal-400 rounded-lg blur opacity-20"></div>
                        </div>
                        <p className="text-white/90 text-lg font-medium">
                            Laporan keuangan gereja ST. Paulus Kwimi — terbuka untuk jemaat
                        </p>
                    </div>
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
                </div>

                {/* Summary Cards */}
                <div className="grid gap-4 sm:grid-cols-3 mb-6">
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                        <CardContent className="p-5">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="rounded-full bg-white/20 p-2">
                                    <TrendingUp className="h-5 w-5" />
                                </div>
                                <p className="text-sm font-medium text-white/90">Total Pemasukan</p>
                            </div>
                            <p className="text-2xl font-bold">{formatCurrency(summary.income_total)}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-rose-600 text-white">
                        <CardContent className="p-5">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="rounded-full bg-white/20 p-2">
                                    <TrendingDown className="h-5 w-5" />
                                </div>
                                <p className="text-sm font-medium text-white/90">Total Pengeluaran</p>
                            </div>
                            <p className="text-2xl font-bold">{formatCurrency(summary.expense_total)}</p>
                        </CardContent>
                    </Card>
                    <Card className={`border-0 shadow-lg text-white ${summary.balance >= 0 ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 'bg-gradient-to-br from-orange-500 to-amber-600'}`}>
                        <CardContent className="p-5">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="rounded-full bg-white/20 p-2">
                                    <Wallet className="h-5 w-5" />
                                </div>
                                <p className="text-sm font-medium text-white/90">Saldo</p>
                            </div>
                            <p className="text-2xl font-bold">{formatCurrency(summary.balance)}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-5 mb-6">
                    <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                        <Select value={type || 'all'} onValueChange={(v) => {
                            const val = v === 'all' ? '' : v;
                            setType(val);
                            applyFilters({ type: val });
                        }}>
                            <SelectTrigger className="w-full sm:w-44 h-10 border-gray-200">
                                <SelectValue placeholder="Semua Jenis" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Jenis</SelectItem>
                                <SelectItem value="income">Pemasukan</SelectItem>
                                <SelectItem value="expense">Pengeluaran</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={year} onValueChange={(v) => {
                            setYear(v);
                            applyFilters({ year: v });
                        }}>
                            <SelectTrigger className="w-full sm:w-36 h-10 border-gray-200">
                                <SelectValue placeholder="Tahun" />
                            </SelectTrigger>
                            <SelectContent>
                                {available_years.map((y) => (
                                    <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={month || 'all'} onValueChange={(v) => {
                            const val = v === 'all' ? '' : v;
                            setMonth(val);
                            applyFilters({ month: val });
                        }}>
                            <SelectTrigger className="w-full sm:w-44 h-10 border-gray-200">
                                <SelectValue placeholder="Semua Bulan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Bulan</SelectItem>
                                {MONTHS.map((m) => (
                                    <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {hasFilters && (
                            <Button onClick={resetFilters} variant="outline" className="h-10 border-gray-300">
                                <RotateCcw className="h-4 w-4 mr-2" />
                                Reset
                            </Button>
                        )}
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
                    {finances.data.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="rounded-full bg-green-100 p-5 w-fit mx-auto mb-4">
                                <HandCoins className="h-10 w-10 text-green-400" />
                            </div>
                            <p className="text-gray-500 text-lg font-medium">Belum ada data keuangan</p>
                        </div>
                    ) : (
                        <>
                            <div className="p-4 border-b border-gray-100">
                                <p className="text-sm text-gray-500">
                                    Menampilkan <span className="font-semibold text-green-700">{finances.data.length}</span> dari <span className="font-semibold text-green-700">{finances.total}</span> transaksi
                                </p>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="text-left px-5 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">Tanggal</th>
                                            <th className="text-left px-5 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">Keterangan</th>
                                            <th className="text-left px-5 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">Kategori</th>
                                            <th className="text-left px-5 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">Jenis</th>
                                            <th className="text-right px-5 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wide">Jumlah</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {finances.data.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">{formatDate(item.date)}</td>
                                                <td className="px-5 py-3.5">
                                                    <p className="font-medium text-gray-800">{item.title}</p>
                                                    {item.description && (
                                                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{item.description}</p>
                                                    )}
                                                </td>
                                                <td className="px-5 py-3.5 text-gray-600">
                                                    {item.category && (
                                                        <span className="px-2 py-1 rounded-md bg-gray-100 text-xs font-medium">{item.category}</span>
                                                    )}
                                                </td>
                                                <td className="px-5 py-3.5">
                                                    <Badge className={item.type === 'income'
                                                        ? 'bg-green-100 text-green-800 border-green-200'
                                                        : 'bg-red-100 text-red-800 border-red-200'
                                                    }>
                                                        {item.type === 'income' ? '↑ Pemasukan' : '↓ Pengeluaran'}
                                                    </Badge>
                                                </td>
                                                <td className={`px-5 py-3.5 text-right font-semibold whitespace-nowrap ${
                                                    item.type === 'income' ? 'text-green-700' : 'text-red-700'
                                                }`}>
                                                    {item.type === 'income' ? '+' : '-'} {formatCurrency(item.amount)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {finances.last_page > 1 && (
                                <div className="flex items-center justify-center gap-2 p-5 border-t border-gray-100 flex-wrap">
                                    {finances.links.map((link, i) => (
                                        link.url ? (
                                            <Link
                                                key={i}
                                                href={link.url}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                                    link.active
                                                        ? 'bg-green-600 text-white shadow-md'
                                                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-green-50 hover:border-green-300'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: getLabel(link.label) }}
                                            />
                                        ) : (
                                            <span
                                                key={i}
                                                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 cursor-not-allowed bg-gray-50 border border-gray-200"
                                                dangerouslySetInnerHTML={{ __html: getLabel(link.label) }}
                                            />
                                        )
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
