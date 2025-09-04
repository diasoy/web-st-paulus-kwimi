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

function Sparkline({ data, stroke }: { data: number[]; stroke?: string }) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    const pathData = data.map((value, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = 100 - ((value - min) / range) * 100;
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    return (
        <div className="h-8 w-full">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                    d={pathData}
                    fill="none"
                    stroke={stroke || 'currentColor'}
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                    className="opacity-60"
                />
            </svg>
        </div>
    );
}

export default function AdminDashboard({ stats, recent_users, recent_announcements, upcoming_worship, monthly_users }: AdminDashboardProps) {
    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />

        <div className="dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #1a4d20, #235829, #2d5f35)' }}>
                <div className="mx-6 space-y-8 py-8">
                    {/* Header Section */}
                        <div className="relative z-10">
                            <h1 className="text-4xl font-bold tracking-tight mb-2 text-white">Admin Dashboard</h1>
                            <p className="text-white/90 text-lg">Selamat datang di panel admin ST. Paulus Kwimi</p>
                        </div>
                        <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
                        <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-white/5 blur-xl"></div>

                    {/* KPI Cards */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-indigo-400 to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-sm font-semibold text-white">Total User</CardTitle>
                                <div className="rounded-full bg-white/20 p-2">
                                    <Users className="h-5 w-5 text-white" />
                                </div>
                            </CardHeader>
                            <CardContent className="relative flex flex-col h-full justify-between">
                                <div>
                                    <div className="text-4xl font-bold text-white mb-3">{stats.total_users}</div>
                                    <div className="mb-2">
                                        <Sparkline data={monthly_users?.data ?? []} stroke="white" />
                                    </div>
                                </div>
                                <p className="text-xs text-white/90 font-medium mt-auto">Registrasi per bulan</p>
                            </CardContent>
                        </Card>

                        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-emerald-400 to-green-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-sm font-semibold text-white">Total Admin</CardTitle>
                                <div className="rounded-full bg-white/20 p-2">
                                    <UserCheck className="h-5 w-5 text-white" />
                                </div>
                            </CardHeader>
                            <CardContent className="flex flex-col h-full justify-between">
                                <div className="text-4xl font-bold text-white mb-1">{stats.total_admin}</div>
                                <p className="text-xs text-white/90 font-medium mt-auto">Administrator sistem</p>
                            </CardContent>
                        </Card>

                        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-yellow-400 to-amber-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-sm font-semibold text-white">Total Umat</CardTitle>
                                <div className="rounded-full bg-white/20 p-2">
                                    <User className="h-5 w-5 text-white" />
                                </div>
                            </CardHeader>
                            <CardContent className="flex flex-col h-full justify-between">
                                <div className="text-4xl font-bold text-white mb-1">{stats.total_umat}</div>
                                <p className="text-xs text-white/90 font-medium mt-auto">Umat terdaftar</p>
                            </CardContent>
                        </Card>

                        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-purple-400 to-fuchsia-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-sm font-semibold text-white">Komunitas</CardTitle>
                                <div className="rounded-full bg-white/20 p-2">
                                    <Building2 className="h-5 w-5 text-white" />
                                </div>
                            </CardHeader>
                            <CardContent className="flex flex-col h-full justify-between">
                                <div className="text-4xl font-bold text-white mb-1">{stats.total_communities}</div>
                                <p className="text-xs text-white/90 font-medium mt-auto">Total komunitas basis</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Second Row Cards */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-rose-400 to-orange-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-sm font-semibold text-white">Pengumuman</CardTitle>
                                <div className="rounded-full bg-white/20 p-2">
                                    <Megaphone className="h-5 w-5 text-white" />
                                </div>
                            </CardHeader>
                            <CardContent className="flex flex-col h-full justify-between">
                                <div className="text-4xl font-bold text-white mb-1">{stats.total_announcements}</div>
                                <p className="text-xs text-white/90 font-medium mt-auto">Total pengumuman</p>
                            </CardContent>
                        </Card>

                        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-indigo-400 to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-sm font-semibold text-white">Agenda Kegiatan</CardTitle>
                                <div className="rounded-full bg-white/20 p-2">
                                    <CalendarDays className="h-5 w-5 text-white" />
                                </div>
                            </CardHeader>
                            <CardContent className="flex flex-col h-full justify-between">
                                <div className="text-4xl font-bold text-white mb-1">{stats.total_activities}</div>
                                <p className="text-xs text-white/90 font-medium mt-auto">Total kegiatan</p>
                            </CardContent>
                        </Card>

                        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-cyan-400 to-teal-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-sm font-semibold text-white">Jadwal Ibadah</CardTitle>
                                <div className="rounded-full bg-white/20 p-2">
                                    <ListChecks className="h-5 w-5 text-white" />
                                </div>
                            </CardHeader>
                            <CardContent className="flex flex-col h-full justify-between">
                                <div className="text-4xl font-bold text-white mb-1">{stats.total_worship_schedules}</div>
                                <p className="text-xs text-white/90 font-medium mt-auto">Total jadwal</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Lists Section */}
                    <div className="grid gap-6 lg:grid-cols-2">
                        <Card className="shadow-lg bg-gradient-to-br from-green-700/30 to-green-800/30 backdrop-blur-sm border border-green-600/30">
                            <CardHeader className="bg-gradient-to-r from-green-800/20 via-green-700/20 to-green-600/20 rounded-t-lg border-b border-green-600/30">
                                <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                                    <div className="rounded-full bg-green-600/20 p-2">
                                        <Users className="h-5 w-5 text-white" />
                                    </div>
                                    Umat Terbaru
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    {recent_users.map((user) => (
                                        <div key={user.id} className="flex items-center space-x-4 p-3 rounded-xl bg-white/90 border border-green-600/20 hover:shadow-md hover:bg-white transition-all duration-200">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-green-200">
                                                <User className="h-5 w-5 text-green-700" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-semibold text-slate-800">{user.name}</p>
                                                <p className="truncate text-sm text-slate-500">{user.email}</p>
                                            </div>
                                            <div>
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${user.role_id === 1
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

                        <Card className="shadow-lg bg-gradient-to-br from-green-700/30 to-green-800/30 backdrop-blur-sm border border-green-600/30">
                            <CardHeader className="bg-gradient-to-r from-green-800/20 via-green-700/20 to-green-600/20 rounded-t-lg border-b border-green-600/30">
                                <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                                    <div className="rounded-full bg-green-600/20 p-2">
                                        <Megaphone className="h-5 w-5 text-white" />
                                    </div>
                                    Pengumuman Terbaru
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    {recent_announcements.map((a) => (
                                        <div key={a.id} className="flex items-center space-x-4 p-3 rounded-xl bg-white/90 border border-green-600/20 hover:shadow-md hover:bg-white transition-all duration-200">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-green-200">
                                                <Megaphone className="h-5 w-5 text-green-700" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-semibold text-slate-800">{a.title}</p>
                                                <p className="truncate text-xs text-slate-500">{new Date(a.created_at).toLocaleDateString()}</p>
                                            </div>
                                            <div>
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${a.is_publish
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
                    <Card className="shadow-lg bg-gradient-to-br from-green-700/30 to-green-800/30 backdrop-blur-sm border border-green-600/30">
                        <CardHeader className="bg-gradient-to-r from-green-800/20 via-green-700/20 to-green-600/20 rounded-t-lg border-b border-green-600/30">
                            <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                                <div className="rounded-full bg-green-600/20 p-2">
                                    <CalendarDays className="h-5 w-5 text-white" />
                                </div>
                                Jadwal Ibadah Mendatang
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                {upcoming_worship.map((w) => (
                                    <div key={w.id} className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/90 border border-green-600/20 hover:shadow-md hover:bg-white transition-all duration-200">
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate font-semibold text-green-800 text-lg">{w.name}</p>
                                            <p className="truncate text-green-600 mt-1">
                                                <span className="inline-flex items-center gap-1">
                                                    <User className="h-4 w-4 text-green-600" />
                                                    {w.pic || 'Belum ditentukan'}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-semibold text-green-800">{new Date(w.date).toLocaleDateString()}</div>
                                            <div className="text-sm text-white bg-green-600 px-2 py-1 rounded-full mt-1">{w.time_start}</div>
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
