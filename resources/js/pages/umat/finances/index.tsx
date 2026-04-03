import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { HandCoins, RotateCcw, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { useState } from 'react';

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
    try {
        return format(new Date(d), 'dd MMM yyyy', { locale: id });
    } catch {
        return d;
    }
};

export default function UmatFinancesIndex({ finances, summary, filters, available_years }: Props) {
    const [type, setType] = useState(filters.type ?? '');
    const [year, setYear] = useState(String(filters.year));
    const [month, setMonth] = useState(filters.month ? String(filters.month) : '');

    const applyFilters = (overrides: Record<string, string> = {}) => {
        router.get(
            '/umat/finances',
            {
                type: overrides.type ?? type,
                year: overrides.year ?? year,
                month: overrides.month !== undefined ? overrides.month : month,
            },
            { preserveScroll: true, preserveState: true },
        );
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

            <div
                className="dashboard-gradient min-h-screen p-6"
                style={{ background: 'linear-gradient(135deg, #1a4d20 0%, #235829 40%, #3e7147 100%)' }}
            >
                {/* Header */}
                <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-green-700 via-emerald-700 to-teal-800 p-8 shadow-2xl">
                    <div className="relative z-10 text-center">
                        <div className="relative mb-3 inline-block">
                            <h1 className="text-4xl font-bold text-white drop-shadow-lg">Transparansi Keuangan</h1>
                            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-green-400 to-teal-400 opacity-20 blur"></div>
                        </div>
                        <p className="text-lg font-medium text-white/90">Laporan keuangan gereja ST. Paulus Kwimi — terbuka untuk jemaat</p>
                    </div>
                    <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
                </div>

                {/* Summary Cards */}
                <div className="mb-6 grid gap-4 sm:grid-cols-3">
                    <Card className="border-0 bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
                        <CardContent className="p-5">
                            <div className="mb-2 flex items-center gap-3">
                                <div className="rounded-full bg-white/20 p-2">
                                    <TrendingUp className="h-5 w-5" />
                                </div>
                                <p className="text-sm font-medium text-white/90">Total Pemasukan</p>
                            </div>
                            <p className="text-2xl font-bold">{formatCurrency(summary.income_total)}</p>
                        </CardContent>
                    </Card>
                    <Card className="border-0 bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg">
                        <CardContent className="p-5">
                            <div className="mb-2 flex items-center gap-3">
                                <div className="rounded-full bg-white/20 p-2">
                                    <TrendingDown className="h-5 w-5" />
                                </div>
                                <p className="text-sm font-medium text-white/90">Total Pengeluaran</p>
                            </div>
                            <p className="text-2xl font-bold">{formatCurrency(summary.expense_total)}</p>
                        </CardContent>
                    </Card>
                    <Card
                        className={`border-0 text-white shadow-lg ${summary.balance >= 0 ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 'bg-gradient-to-br from-orange-500 to-amber-600'}`}
                    >
                        <CardContent className="p-5">
                            <div className="mb-2 flex items-center gap-3">
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
                <div className="mb-6 rounded-2xl border border-gray-200/50 bg-white/95 p-5 shadow-2xl backdrop-blur-lg">
                    <div className="flex flex-col flex-wrap gap-3 sm:flex-row">
                        <Select
                            value={type || 'all'}
                            onValueChange={(v) => {
                                const val = v === 'all' ? '' : v;
                                setType(val);
                                applyFilters({ type: val });
                            }}
                        >
                            <SelectTrigger className="h-10 w-full border-gray-200 bg-white text-gray-800 focus:ring-2 focus:ring-green-400 sm:w-44">
                                <SelectValue placeholder="Semua Jenis" className="text-gray-800" />
                            </SelectTrigger>
                            <SelectContent className="border border-gray-200 bg-white text-gray-800 shadow-lg">
                                <SelectItem value="all" className="text-gray-800 hover:bg-green-50">
                                    Semua Jenis
                                </SelectItem>
                                <SelectItem value="income" className="text-gray-800 hover:bg-green-50">
                                    Pemasukan
                                </SelectItem>
                                <SelectItem value="expense" className="text-gray-800 hover:bg-green-50">
                                    Pengeluaran
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            value={year}
                            onValueChange={(v) => {
                                setYear(v);
                                applyFilters({ year: v });
                            }}
                        >
                            <SelectTrigger className="h-10 w-full border-gray-200 bg-white text-gray-800 focus:ring-2 focus:ring-green-400 sm:w-36">
                                <SelectValue placeholder="Tahun" className="text-gray-800" />
                            </SelectTrigger>
                            <SelectContent className="border border-gray-200 bg-white text-gray-800 shadow-lg">
                                {available_years.map((y) => (
                                    <SelectItem key={y} value={String(y)} className="text-gray-800 hover:bg-green-50">
                                        {y}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={month || 'all'}
                            onValueChange={(v) => {
                                const val = v === 'all' ? '' : v;
                                setMonth(val);
                                applyFilters({ month: val });
                            }}
                        >
                            <SelectTrigger className="h-10 w-full border-gray-200 bg-white text-gray-800 focus:ring-2 focus:ring-green-400 sm:w-44">
                                <SelectValue placeholder="Semua Bulan" className="text-gray-800" />
                            </SelectTrigger>
                            <SelectContent className="border border-gray-200 bg-white text-gray-800 shadow-lg">
                                <SelectItem value="all" className="text-gray-800 hover:bg-green-50">
                                    Semua Bulan
                                </SelectItem>
                                {MONTHS.map((m) => (
                                    <SelectItem key={m.value} value={m.value} className="text-gray-800 hover:bg-green-50">
                                        {m.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {hasFilters && (
                            <Button onClick={resetFilters} variant="outline" className="h-10 border-gray-300">
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Reset
                            </Button>
                        )}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-2xl border border-gray-200/50 bg-white/95 shadow-2xl backdrop-blur-lg">
                    {finances.data.length === 0 ? (
                        <div className="py-16 text-center">
                            <div className="mx-auto mb-4 w-fit rounded-full bg-green-100 p-5">
                                <HandCoins className="h-10 w-10 text-green-400" />
                            </div>
                            <p className="text-lg font-medium text-gray-500">Belum ada data keuangan</p>
                        </div>
                    ) : (
                        <>
                            <div className="border-b border-gray-100 p-4">
                                <p className="text-sm text-gray-500">
                                    Menampilkan <span className="font-semibold text-green-700">{finances.data.length}</span> dari{' '}
                                    <span className="font-semibold text-green-700">{finances.total}</span> transaksi
                                </p>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="border-b border-gray-200 bg-gray-50">
                                        <tr>
                                            <th className="px-5 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase">
                                                Tanggal
                                            </th>
                                            <th className="px-5 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase">
                                                Keterangan
                                            </th>
                                            <th className="px-5 py-3 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase">Jenis</th>
                                            <th className="px-5 py-3 text-right text-xs font-semibold tracking-wide text-gray-600 uppercase">
                                                Jumlah
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 bg-white">
                                        {finances.data.map((item) => (
                                            <tr key={item.id} className="group transition-all hover:bg-green-50">
                                                <td className="px-5 py-4 whitespace-nowrap text-gray-700 transition-colors group-hover:text-green-900">
                                                    {formatDate(item.date)}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <p className="font-semibold text-gray-900 transition-colors group-hover:text-green-900">
                                                        {item.title}
                                                    </p>
                                                    {item.description && (
                                                        <p className="mt-0.5 line-clamp-1 text-xs text-gray-500 transition-colors group-hover:text-green-700">
                                                            {item.description}
                                                        </p>
                                                    )}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <Badge
                                                        className={
                                                            item.type === 'income'
                                                                ? 'border-green-200 bg-green-100 text-green-800 group-hover:bg-green-200'
                                                                : 'border-red-200 bg-red-100 text-red-800 group-hover:bg-red-200'
                                                        }
                                                    >
                                                        {item.type === 'income' ? '↑ Pemasukan' : '↓ Pengeluaran'}
                                                    </Badge>
                                                </td>
                                                <td
                                                    className={`px-5 py-4 text-right font-bold whitespace-nowrap transition-colors ${
                                                        item.type === 'income'
                                                            ? 'text-green-700 group-hover:text-green-900'
                                                            : 'text-red-700 group-hover:text-red-900'
                                                    }`}
                                                >
                                                    {item.type === 'income' ? '+' : '-'} {formatCurrency(item.amount)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {finances.last_page > 1 && (
                                <div className="flex flex-wrap items-center justify-center gap-2 border-t border-gray-100 p-5">
                                    {finances.links.map((link, i) =>
                                        link.url ? (
                                            <Link
                                                key={i}
                                                href={link.url}
                                                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                                    link.active
                                                        ? 'bg-green-600 text-white shadow-md'
                                                        : 'border border-gray-200 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: getLabel(link.label) }}
                                            />
                                        ) : (
                                            <span
                                                key={i}
                                                className="cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-400"
                                                dangerouslySetInnerHTML={{ __html: getLabel(link.label) }}
                                            />
                                        ),
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
