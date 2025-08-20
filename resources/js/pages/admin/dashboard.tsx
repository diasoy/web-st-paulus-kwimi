import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Building2, CalendarDays, ListChecks, Megaphone, User, UserCheck, Users } from 'lucide-react';

type RecentUser = {
    id: number;
    name: string;
    email: string;
    role_id: number;
    created_at: string;
};

type RecentAnnouncement = {
    id: number;
    title: string;
    is_publish: boolean | number;
    created_at: string;
    image_url?: string | null;
};

type UpcomingWorship = {
    id: number;
    name: string;
    date: string;
    time_start: string;
    pic?: string | null;
};

interface AdminDashboardProps {
    stats: {
        total_users: number;
        total_admin: number;
        total_umat: number;
        total_communities: number;
        total_announcements: number;
        total_activities: number;
        total_worship_schedules: number;
    };
    recent_users: RecentUser[];
    recent_announcements: RecentAnnouncement[];
    upcoming_worship: UpcomingWorship[];
    monthly_users: { labels: string[]; data: number[] };
}

function Sparkline({ data }: { data: number[]; stroke?: string }) {
    const width = 140;
    const height = 40;
    const max = Math.max(1, ...data);
    const min = Math.min(0, ...data);
    const range = Math.max(1, max - min);
    const points = data.map((d, i) => {
        const x = (i / Math.max(1, data.length - 1)) * (width - 4) + 2;
        const y = height - ((d - min) / range) * (height - 4) - 2;
        return `${x},${y}`;
    });
    return (
        <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} className="overflow-visible">
            <defs>
                <linearGradient id="sparklineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#03A6A1" />
                    <stop offset="100%" stopColor="#FFA673" />
                </linearGradient>
            </defs>
            <polyline fill="none" stroke="url(#sparklineGradient)" strokeWidth="3" points={points.join(' ')} className="drop-shadow-sm" />
        </svg>
    );
}

export default function AdminDashboard({ stats, recent_users, recent_announcements, upcoming_worship, monthly_users }: AdminDashboardProps) {
    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
                <div className="mx-6 space-y-8 py-8">
                    {/* Header Section */}
                    {/* <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary/90 to-secondary p-8 text-white shadow-xl">
                        <div className="relative z-10">
                            <h1 className="text-4xl font-bold tracking-tight mb-2">Admin Dashboard</h1>
                            <p className="text-primary-foreground/90 text-lg">Selamat datang di panel admin ST. Paulus Kwimi</p>
                        </div>
                        <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
                        <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-white/5 blur-xl"></div>
                    </div> */}

                    {/* KPI Cards */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-blue-50/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-sm font-semibold text-slate-600">Total User</CardTitle>
                                <div className="rounded-full bg-primary/10 p-2">
                                    <Users className="h-5 w-5 text-primary" />
                                </div>
                            </CardHeader>
                            <CardContent className="relative">
                                <div className="text-3xl font-bold text-slate-800 mb-3">{stats.total_users}</div>
                                <div className="mb-2">
                                    <Sparkline data={monthly_users?.data ?? []} />
                                </div>
                                <p className="text-xs text-slate-500 font-medium">Registrasi per bulan</p>
                            </CardContent>
                        </Card>

                        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-emerald-50/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-sm font-semibold text-slate-600">Total Admin</CardTitle>
                                <div className="rounded-full bg-emerald-100 p-2">
                                    <UserCheck className="h-5 w-5 text-emerald-600" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-slate-800 mb-1">{stats.total_admin}</div>
                                <p className="text-xs text-slate-500 font-medium">Administrator sistem</p>
                            </CardContent>
                        </Card>

                        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-amber-50/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-sm font-semibold text-slate-600">Total Umat</CardTitle>
                                <div className="rounded-full bg-amber-100 p-2">
                                    <User className="h-5 w-5 text-amber-600" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-slate-800 mb-1">{stats.total_umat}</div>
                                <p className="text-xs text-slate-500 font-medium">Umat terdaftar</p>
                            </CardContent>
                        </Card>

                        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-purple-50/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-sm font-semibold text-slate-600">Komunitas</CardTitle>
                                <div className="rounded-full bg-purple-100 p-2">
                                    <Building2 className="h-5 w-5 text-purple-600" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-slate-800 mb-1">{stats.total_communities}</div>
                                <p className="text-xs text-slate-500 font-medium">Total komunitas basis</p>
                            </CardContent>
                        </Card>

                        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-rose-50/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-sm font-semibold text-slate-600">Pengumuman</CardTitle>
                                <div className="rounded-full bg-rose-100 p-2">
                                    <Megaphone className="h-5 w-5 text-rose-600" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-slate-800 mb-1">{stats.total_announcements}</div>
                                <p className="text-xs text-slate-500 font-medium">Total pengumuman</p>
                            </CardContent>
                        </Card>

                        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-indigo-50/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-sm font-semibold text-slate-600">Agenda Kegiatan</CardTitle>
                                <div className="rounded-full bg-indigo-100 p-2">
                                    <CalendarDays className="h-5 w-5 text-indigo-600" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-slate-800 mb-1">{stats.total_activities}</div>
                                <p className="text-xs text-slate-500 font-medium">Total kegiatan</p>
                            </CardContent>
                        </Card>

                        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-teal-50/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-sm font-semibold text-slate-600">Jadwal Ibadah</CardTitle>
                                <div className="rounded-full bg-teal-100 p-2">
                                    <ListChecks className="h-5 w-5 text-teal-600" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-slate-800 mb-1">{stats.total_worship_schedules}</div>
                                <p className="text-xs text-slate-500 font-medium">Total jadwal</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Lists Section */}
                    <div className="grid gap-6 lg:grid-cols-2">
                        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                            <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-t-lg">
                                <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                    <div className="rounded-full bg-primary/10 p-2">
                                        <Users className="h-5 w-5 text-primary" />
                                    </div>
                                    Umat Terbaru
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    {recent_users.map((user) => (
                                        <div key={user.id} className="flex items-center space-x-4 p-3 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-100 hover:shadow-md transition-all duration-200">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20">
                                                <User className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-semibold text-slate-800">{user.name}</p>
                                                <p className="truncate text-sm text-slate-500">{user.email}</p>
                                            </div>
                                            <div>
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                        user.role_id === 1 
                                                            ? 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border border-blue-200' 
                                                            : 'bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-700 border border-emerald-200'
                                                    }`}
                                                >
                                                    {user.role_id === 1 ? 'Admin' : 'Umat'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                            <CardHeader className="bg-gradient-to-r from-rose-50/50 to-orange-50/50 rounded-t-lg">
                                <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                    <div className="rounded-full bg-rose-100 p-2">
                                        <Megaphone className="h-5 w-5 text-rose-600" />
                                    </div>
                                    Pengumuman Terbaru
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    {recent_announcements.map((a) => (
                                        <div key={a.id} className="flex items-center space-x-4 p-3 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-100 hover:shadow-md transition-all duration-200">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-100 to-orange-100">
                                                <Megaphone className="h-5 w-5 text-rose-600" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-semibold text-slate-800">{a.title}</p>
                                                <p className="truncate text-xs text-slate-500">{new Date(a.created_at).toLocaleDateString()}</p>
                                            </div>
                                            <div>
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                        a.is_publish 
                                                            ? 'bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-700 border border-emerald-200' 
                                                            : 'bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 border border-amber-200'
                                                    }`}
                                                >
                                                    {a.is_publish ? 'Terbit' : 'Draft'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Worship Schedule */}
                    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                        <CardHeader className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-t-lg">
                            <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <div className="rounded-full bg-indigo-100 p-2">
                                    <CalendarDays className="h-5 w-5 text-indigo-600" />
                                </div>
                                Jadwal Ibadah Mendatang
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                {upcoming_worship.map((w) => (
                                    <div key={w.id} className="flex items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-100 hover:shadow-md transition-all duration-200">
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate font-semibold text-slate-800 text-lg">{w.name}</p>
                                            <p className="truncate text-slate-500 mt-1">
                                                <span className="inline-flex items-center gap-1">
                                                    <User className="h-4 w-4" />
                                                    {w.pic || 'Belum ditentukan'}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-semibold text-slate-800">{new Date(w.date).toLocaleDateString()}</div>
                                            <div className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-full mt-1">{w.time_start}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}