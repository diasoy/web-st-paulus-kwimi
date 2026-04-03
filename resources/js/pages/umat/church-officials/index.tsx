import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Building2, Eye, Mail, Phone, RotateCcw, Search, Users } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/umat/dashboard' },
    { title: 'Pengurus Gereja', href: '/umat/church-officials' },
];

const labelMap: Record<string, string> = {
    'pagination.next': 'Berikutnya',
    'pagination.previous': 'Sebelumnya',
    '&laquo; Previous': 'Sebelumnya',
    'Next &raquo;': 'Berikutnya',
};
const getLabel = (label: string) => labelMap[label] || label;

interface Community {
    id: number;
    name: string;
}

interface Official {
    id: number;
    name: string;
    position: string;
    position_label: string;
    phone?: string;
    email?: string;
    photo_url?: string;
    community?: Community;
    department?: string;
    start_date?: string;
    end_date?: string;
    is_active: boolean;
    notes?: string;
}

interface PaginatedOfficials {
    data: Official[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface Props {
    officials: PaginatedOfficials;
    positions: Record<string, string>;
    filters: {
        position?: string;
        search?: string;
    };
}

export default function UmatChurchOfficialsIndex({ officials, positions, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [position, setPosition] = useState(filters.position ?? '');

    const applyFilters = (overrides: Record<string, string> = {}) => {
        router.get(
            '/umat/church-officials',
            {
                search: overrides.search ?? search,
                position: overrides.position ?? position,
            },
            { preserveScroll: true, preserveState: true },
        );
    };

    const resetFilters = () => {
        setSearch('');
        setPosition('');
        router.get('/umat/church-officials', {}, { preserveScroll: true });
    };

    const hasFilters = search || position;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengurus Gereja" />

            <div
                className="dashboard-gradient min-h-screen p-6"
                style={{ background: 'linear-gradient(135deg, #1a4d20 0%, #235829 40%, #3e7147 100%)' }}
            >
                {/* Header */}
                <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-teal-700 via-emerald-700 to-green-800 p-8 shadow-2xl">
                    <div className="relative z-10 text-center">
                        <div className="relative mb-3 inline-block">
                            <h1 className="text-4xl font-bold text-white drop-shadow-lg">Pengurus Gereja</h1>
                            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-teal-400 to-emerald-400 opacity-20 blur"></div>
                        </div>
                        <p className="text-lg font-medium text-white/90">Daftar pengurus aktif ST. Paulus Kwimi</p>
                    </div>
                    <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
                </div>

                {/* Filters */}
                <div className="mb-6 rounded-2xl border border-gray-200/50 bg-white/95 p-5 shadow-2xl backdrop-blur-lg">
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <Input
                                placeholder="Cari nama, jabatan, departemen..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
                                className="h-10 border-gray-200 pl-9"
                            />
                        </div>
                        <Select
                            value={position || 'all'}
                            onValueChange={(v) => {
                                const val = v === 'all' ? '' : v;
                                setPosition(val);
                                applyFilters({ position: val });
                            }}
                        >
                            <SelectTrigger className="h-10 w-full border-gray-200 sm:w-52">
                                <SelectValue placeholder="Semua Jabatan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Jabatan</SelectItem>
                                {Object.entries(positions).map(([key, label]) => (
                                    <SelectItem key={key} value={key}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button onClick={() => applyFilters()} className="h-10 bg-teal-600 text-white hover:bg-teal-700">
                            <Search className="mr-2 h-4 w-4" />
                            Cari
                        </Button>
                        {hasFilters && (
                            <Button onClick={resetFilters} variant="outline" className="h-10 border-gray-300">
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Reset
                            </Button>
                        )}
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="rounded-2xl border border-gray-200/50 bg-white/95 p-6 shadow-2xl backdrop-blur-lg">
                    {officials.data.length === 0 ? (
                        <div className="py-16 text-center">
                            <div className="mx-auto mb-4 w-fit rounded-full bg-teal-100 p-5">
                                <Users className="h-10 w-10 text-teal-400" />
                            </div>
                            <p className="text-lg font-medium text-gray-500">Belum ada pengurus ditemukan</p>
                        </div>
                    ) : (
                        <>
                            <p className="mb-4 text-sm text-gray-500">
                                Menampilkan <span className="font-semibold text-teal-700">{officials.data.length}</span> dari{' '}
                                <span className="font-semibold text-teal-700">{officials.total}</span> pengurus
                            </p>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {officials.data.map((official) => (
                                    <div
                                        key={official.id}
                                        className="overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                                    >
                                        {/* Photo */}
                                        <div className="flex h-32 items-center justify-center bg-gradient-to-br from-teal-100 to-emerald-100">
                                            {official.photo_url ? (
                                                <img
                                                    src={official.photo_url}
                                                    alt={official.name}
                                                    className="h-full w-full object-cover"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                    }}
                                                />
                                            ) : (
                                                <div className="rounded-full bg-white/60 p-4">
                                                    <Users className="h-10 w-10 text-teal-500" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2 p-4">
                                            <p className="line-clamp-1 text-sm leading-tight font-bold text-slate-800">{official.name}</p>
                                            <Badge className="border-teal-200 bg-teal-100 text-xs font-medium text-teal-800">
                                                {official.position_label || official.position}
                                            </Badge>
                                            {official.department && (
                                                <p className="flex items-center gap-1 text-xs text-slate-500">
                                                    <Building2 className="h-3 w-3 text-teal-400" />
                                                    {official.department}
                                                </p>
                                            )}
                                            {official.community && (
                                                <p className="flex items-center gap-1 text-xs text-slate-500">
                                                    <Building2 className="h-3 w-3 text-emerald-400" />
                                                    {official.community.name}
                                                </p>
                                            )}
                                            {official.email && (
                                                <p className="flex items-center gap-1 truncate text-xs text-slate-500">
                                                    <Mail className="h-3 w-3 flex-shrink-0 text-blue-400" />
                                                    <span className="truncate">{official.email}</span>
                                                </p>
                                            )}
                                            {official.phone && (
                                                <p className="flex items-center gap-1 text-xs text-slate-500">
                                                    <Phone className="h-3 w-3 text-green-400" />
                                                    {official.phone}
                                                </p>
                                            )}
                                            <div className="pt-2">
                                                <Button
                                                    asChild
                                                    size="sm"
                                                    className="h-8 w-full border-none bg-teal-600 text-xs text-white hover:bg-teal-700"
                                                >
                                                    <Link
                                                        href={`/umat/church-officials/${official.id}`}
                                                        className="flex items-center justify-center text-white"
                                                    >
                                                        <Eye className="mr-1 h-3 w-3" />
                                                        Lihat Detail
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {officials.last_page > 1 && (
                                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                                    {officials.links.map((link, i) =>
                                        link.url ? (
                                            <Link
                                                key={i}
                                                href={link.url}
                                                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                                    link.active
                                                        ? 'bg-teal-600 text-white shadow-md'
                                                        : 'border border-gray-200 bg-white text-gray-700 hover:border-teal-300 hover:bg-teal-50'
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
