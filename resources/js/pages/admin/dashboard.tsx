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

        <div className="dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
                <div className="mx-auto max-w-7xl px-6 space-y-8 py-8">
                    {/* Header Section */}
                    <div className="relative z-10 text-center">
                        <div className="relative inline-block">
                            <h1 className="text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-lg">
                                Admin Dashboard
                            </h1>
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25"></div>
                        </div>
                        <p className="text-white/95 text-xl font-medium drop-shadow-md">
                            Selamat datang di panel admin ST. Paulus Kwimi
                        </p>
                    </div>
                    <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
                    <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-white/5 blur-xl"></div>

                    {/* KPI Cards */}
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105">
                            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
                            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-sm font-bold text-white drop-shadow-md">Total User</CardTitle>
                                <div className="rounded-full bg-white/30 p-3 shadow-lg">
                                    <Users className="h-6 w-6 text-white" />
                                </div>
                            </CardHeader>
                            <CardContent className="relative flex flex-col h-full justify-between">
                                <div>
                                    <div className="text-5xl font-black text-white mb-4 drop-shadow-lg">{stats.total_users}</div>
                                    <div className="mb-3">
                                        <Sparkline data={monthly_users?.data ?? []} stroke="white" />
                                    </div>
                                </div>
                                <p className="text-sm text-white/95 font-semibold mt-auto drop-shadow-md">Registrasi per bulan</p>
                            </CardContent>
                        </Card>

                        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105">
                            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
                            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-sm font-bold text-white drop-shadow-md">Total Admin</CardTitle>
                                <div className="rounded-full bg-white/30 p-3 shadow-lg">
                                    <UserCheck className="h-6 w-6 text-white" />
                                </div>
                            </CardHeader>
                            <CardContent className="relative flex flex-col h-full justify-between">
                                <div className="text-5xl font-black text-white mb-4 drop-shadow-lg">{stats.total_admin}</div>
                                <p className="text-sm text-white/95 font-semibold mt-auto drop-shadow-md">Administrator sistem</p>
                            </CardContent>
                        </Card>

                        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-amber-500 via-yellow-600 to-orange-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105">
                            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
                            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-sm font-bold text-white drop-shadow-md">Total Umat</CardTitle>
                                <div className="rounded-full bg-white/30 p-3 shadow-lg">
                                    <User className="h-6 w-6 text-white" />
                                </div>
                            </CardHeader>
                            <CardContent className="relative flex flex-col h-full justify-between">
                                <div className="text-5xl font-black text-white mb-4 drop-shadow-lg">{stats.total_umat}</div>
                                <p className="text-sm text-white/95 font-semibold mt-auto drop-shadow-md">Umat terdaftar</p>
                            </CardContent>
                        </Card>

                        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105">
                            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
                            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-sm font-bold text-white drop-shadow-md">Komunitas</CardTitle>
                                <div className="rounded-full bg-white/30 p-3 shadow-lg">
                                    <Building2 className="h-6 w-6 text-white" />
                                </div>
                            </CardHeader>
                            <CardContent className="relative flex flex-col h-full justify-between">
                                <div className="text-5xl font-black text-white mb-4 drop-shadow-lg">{stats.total_communities}</div>
                                <p className="text-sm text-white/95 font-semibold mt-auto drop-shadow-md">Total komunitas basis</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Second Row Cards */}
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-rose-500 via-pink-600 to-red-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105">
                            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
                            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-sm font-bold text-white drop-shadow-md">Pengumuman</CardTitle>
                                <div className="rounded-full bg-white/30 p-3 shadow-lg">
                                    <Megaphone className="h-6 w-6 text-white" />
                                </div>
                            </CardHeader>
                            <CardContent className="relative flex flex-col h-full justify-between">
                                <div className="text-5xl font-black text-white mb-4 drop-shadow-lg">{stats.total_announcements}</div>
                                <p className="text-sm text-white/95 font-semibold mt-auto drop-shadow-md">Total pengumuman</p>
                            </CardContent>
                        </Card>

                        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-indigo-500 via-blue-600 to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105">
                            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
                            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-sm font-bold text-white drop-shadow-md">Agenda Kegiatan</CardTitle>
                                <div className="rounded-full bg-white/30 p-3 shadow-lg">
                                    <CalendarDays className="h-6 w-6 text-white" />
                                </div>
                            </CardHeader>
                            <CardContent className="relative flex flex-col h-full justify-between">
                                <div className="text-5xl font-black text-white mb-4 drop-shadow-lg">{stats.total_activities}</div>
                                <p className="text-sm text-white/95 font-semibold mt-auto drop-shadow-md">Total kegiatan</p>
                            </CardContent>
                        </Card>

                        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-cyan-500 via-teal-600 to-emerald-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105">
                            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
                            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-sm font-bold text-white drop-shadow-md">Jadwal Ibadah</CardTitle>
                                <div className="rounded-full bg-white/30 p-3 shadow-lg">
                                    <ListChecks className="h-6 w-6 text-white" />
                                </div>
                            </CardHeader>
                            <CardContent className="relative flex flex-col h-full justify-between">
                                <div className="text-5xl font-black text-white mb-4 drop-shadow-lg">{stats.total_worship_schedules}</div>
                                <p className="text-sm text-white/95 font-semibold mt-auto drop-shadow-md">Total jadwal</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Lists Section */}
                    <div className="grid gap-8 lg:grid-cols-2">
                        <Card className="shadow-2xl bg-white/95 backdrop-blur-lg border border-gray-200/50 rounded-2xl overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
                                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                                    <div className="rounded-full bg-white/20 p-3">
                                        <Users className="h-6 w-6 text-white" />
                                    </div>
                                    Umat Terbaru
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    {recent_users.map((user) => (
                                        <div key={user.id} className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 hover:shadow-lg hover:from-blue-50 hover:to-indigo-50 hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 shadow-md">
                                                <User className="h-6 w-6 text-blue-700" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-bold text-gray-900 text-lg">{user.name}</p>
                                                <p className="truncate text-sm text-gray-600 font-medium">{user.email}</p>
                                            </div>
                                            <div>
                                                <span
                                                    className={`inline-flex rounded-full px-4 py-2 text-sm font-bold shadow-md ${user.role_id === 1
                                                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                                                            : 'bg-gradient-to-r from-emerald-500 to-green-600 text-white'
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

                        <Card className="shadow-2xl bg-white/95 backdrop-blur-lg border border-gray-200/50 rounded-2xl overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white">
                                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                                    <div className="rounded-full bg-white/20 p-3">
                                        <Megaphone className="h-6 w-6 text-white" />
                                    </div>
                                    Pengumuman Terbaru
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    {recent_announcements.map((a) => (
                                        <div key={a.id} className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 hover:shadow-lg hover:from-emerald-50 hover:to-teal-50 hover:border-emerald-200 transition-all duration-300 transform hover:-translate-y-1">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-200 shadow-md">
                                                <Megaphone className="h-6 w-6 text-emerald-700" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-bold text-gray-900 text-lg">{a.title}</p>
                                                <p className="truncate text-sm text-gray-600 font-medium">{new Date(a.created_at).toLocaleDateString('id-ID', { 
                                                    year: 'numeric', 
                                                    month: 'long', 
                                                    day: 'numeric' 
                                                })}</p>
                                            </div>
                                            <div>
                                                <span
                                                    className={`inline-flex rounded-full px-4 py-2 text-sm font-bold shadow-md ${a.is_publish
                                                            ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white'
                                                            : 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                                                        }`}
                                                >
                                                    {a.is_publish ? 'Publish' : 'Draft'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Worship Schedule */}
                    <Card className="shadow-2xl bg-white/95 backdrop-blur-lg border border-gray-200/50 rounded-2xl overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 text-white">
                            <CardTitle className="text-2xl font-bold flex items-center gap-3">
                                <div className="rounded-full bg-white/20 p-3">
                                    <CalendarDays className="h-6 w-6 text-white" />
                                </div>
                                Jadwal Ibadah Mendatang
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                {upcoming_worship.map((w) => (
                                    <div key={w.id} className="flex items-center justify-between gap-6 p-5 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 hover:shadow-lg hover:from-purple-100 hover:to-indigo-100 hover:border-purple-300 transition-all duration-300 transform hover:-translate-y-1">
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate font-bold text-purple-900 text-xl mb-2">{w.name}</p>
                                            <p className="truncate text-purple-700 font-semibold">
                                                <span className="inline-flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
                                                    <User className="h-4 w-4 text-purple-600" />
                                                    <span className="text-sm">{w.pic || 'Belum ditentukan'}</span>
                                                </span>
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-purple-900 text-lg mb-2">
                                                {new Date(w.date).toLocaleDateString('id-ID', { 
                                                    weekday: 'long',
                                                    year: 'numeric', 
                                                    month: 'long', 
                                                    day: 'numeric' 
                                                })}
                                            </div>
                                            <div className='font-bold'>
                                                {w.time_start.substring(0, 5).replace(':', '.')} WIT
                                            </div>
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
