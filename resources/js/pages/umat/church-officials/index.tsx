import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Users, Mail, Phone, Building2, Search, RotateCcw, Eye } from 'lucide-react';
import { useState } from 'react';
import { BreadcrumbItem } from '@/types';

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
        router.get('/umat/church-officials', {
            search: overrides.search ?? search,
            position: overrides.position ?? position,
        }, { preserveScroll: true, preserveState: true });
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

            <div className="p-6 dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #1a4d20 0%, #235829 40%, #3e7147 100%)' }}>
                {/* Header */}
                <div className="mb-6 relative bg-gradient-to-r from-teal-700 via-emerald-700 to-green-800 rounded-2xl p-8 shadow-2xl overflow-hidden">
                    <div className="relative z-10 text-center">
                        <div className="relative inline-block mb-3">
                            <h1 className="text-4xl font-bold text-white drop-shadow-lg">Pengurus Gereja</h1>
                            <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-lg blur opacity-20"></div>
                        </div>
                        <p className="text-white/90 text-lg font-medium">
                            Daftar pengurus aktif ST. Paulus Kwimi
                        </p>
                    </div>
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
                </div>

                {/* Filters */}
                <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-5 mb-6">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Cari nama, jabatan, departemen..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
                                className="pl-9 h-10 border-gray-200"
                            />
                        </div>
                        <Select value={position || 'all'} onValueChange={(v) => {
                            const val = v === 'all' ? '' : v;
                            setPosition(val);
                            applyFilters({ position: val });
                        }}>
                            <SelectTrigger className="w-full sm:w-52 h-10 border-gray-200">
                                <SelectValue placeholder="Semua Jabatan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Jabatan</SelectItem>
                                {Object.entries(positions).map(([key, label]) => (
                                    <SelectItem key={key} value={key}>{label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button onClick={() => applyFilters()} className="h-10 bg-teal-600 hover:bg-teal-700 text-white">
                            <Search className="h-4 w-4 mr-2" />
                            Cari
                        </Button>
                        {hasFilters && (
                            <Button onClick={resetFilters} variant="outline" className="h-10 border-gray-300">
                                <RotateCcw className="h-4 w-4 mr-2" />
                                Reset
                            </Button>
                        )}
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-6">
                    {officials.data.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="rounded-full bg-teal-100 p-5 w-fit mx-auto mb-4">
                                <Users className="h-10 w-10 text-teal-400" />
                            </div>
                            <p className="text-gray-500 text-lg font-medium">Belum ada pengurus ditemukan</p>
                        </div>
                    ) : (
                        <>
                            <p className="text-sm text-gray-500 mb-4">
                                Menampilkan <span className="font-semibold text-teal-700">{officials.data.length}</span> dari <span className="font-semibold text-teal-700">{officials.total}</span> pengurus
                            </p>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {officials.data.map((official) => (
                                    <div key={official.id} className="rounded-xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
                                        {/* Photo */}
                                        <div className="h-32 bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center">
                                            {official.photo_url ? (
                                                <img
                                                    src={official.photo_url}
                                                    alt={official.name}
                                                    className="h-full w-full object-cover"
                                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                                />
                                            ) : (
                                                <div className="rounded-full bg-white/60 p-4">
                                                    <Users className="h-10 w-10 text-teal-500" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-4 space-y-2">
                                            <p className="font-bold text-slate-800 text-sm leading-tight line-clamp-1">{official.name}</p>
                                            <Badge className="bg-teal-100 text-teal-800 border-teal-200 text-xs font-medium">
                                                {official.position_label || official.position}
                                            </Badge>
                                            {official.department && (
                                                <p className="text-xs text-slate-500 flex items-center gap-1">
                                                    <Building2 className="h-3 w-3 text-teal-400" />
                                                    {official.department}
                                                </p>
                                            )}
                                            {official.community && (
                                                <p className="text-xs text-slate-500 flex items-center gap-1">
                                                    <Building2 className="h-3 w-3 text-emerald-400" />
                                                    {official.community.name}
                                                </p>
                                            )}
                                            {official.email && (
                                                <p className="text-xs text-slate-500 flex items-center gap-1 truncate">
                                                    <Mail className="h-3 w-3 text-blue-400 flex-shrink-0" />
                                                    <span className="truncate">{official.email}</span>
                                                </p>
                                            )}
                                            {official.phone && (
                                                <p className="text-xs text-slate-500 flex items-center gap-1">
                                                    <Phone className="h-3 w-3 text-green-400" />
                                                    {official.phone}
                                                </p>
                                            )}
                                            <div className="pt-2">
                                                <Button asChild variant="outline" size="sm" className="w-full h-8 text-xs border-teal-200 text-teal-700 hover:bg-teal-50">
                                                    <Link href={`/umat/church-officials/${official.id}`}>
                                                        <Eye className="h-3 w-3 mr-1" />
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
                                <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
                                    {officials.links.map((link, i) => (
                                        link.url ? (
                                            <Link
                                                key={i}
                                                href={link.url}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                                    link.active
                                                        ? 'bg-teal-600 text-white shadow-md'
                                                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-teal-50 hover:border-teal-300'
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
