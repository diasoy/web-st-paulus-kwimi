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

function Sparkline({ data, stroke = '#0ea5e9' }: { data: number[]; stroke?: string }) {
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
            <polyline fill="none" stroke={stroke} strokeWidth="2" points={points.join(' ')} />
        </svg>
    );
}

export default function AdminDashboard({ stats, recent_users, recent_announcements, upcoming_worship, monthly_users }: AdminDashboardProps) {
    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />

            <div className="mx-6 space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Selamat datang di panel admin ST. Paulus Kwimi</p>
                </div>

                {/* KPI Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total User</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_users}</div>
                            <div className="mt-2">
                                <Sparkline data={monthly_users?.data ?? []} />
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">Registrasi per bulan</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Admin</CardTitle>
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_admin}</div>
                            <p className="text-xs text-muted-foreground">Administrator sistem</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Umat</CardTitle>
                            <User className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_umat}</div>
                            <p className="text-xs text-muted-foreground">Umat terdaftar</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Komunitas</CardTitle>
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_communities}</div>
                            <p className="text-xs text-muted-foreground">Total komunitas basis</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pengumuman</CardTitle>
                            <Megaphone className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_announcements}</div>
                            <p className="text-xs text-muted-foreground">Total pengumuman</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Agenda Kegiatan</CardTitle>
                            <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_activities}</div>
                            <p className="text-xs text-muted-foreground">Total kegiatan</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Jadwal Ibadah</CardTitle>
                            <ListChecks className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_worship_schedules}</div>
                            <p className="text-xs text-muted-foreground">Total jadwal</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Lists */}
                <div className="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pengguna Terbaru</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recent_users.map((user) => (
                                    <div key={user.id} className="flex items-center space-x-4">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                            <User className="h-4 w-4" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium">{user.name}</p>
                                            <p className="truncate text-sm text-muted-foreground">{user.email}</p>
                                        </div>
                                        <div className="text-sm">
                                            <span
                                                className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${user.role_id === 1 ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}
                                            >
                                                {user.role_id === 1 ? 'Admin' : 'Umat'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Pengumuman Terbaru</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recent_announcements.map((a) => (
                                    <div key={a.id} className="flex items-center space-x-4">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                                            <Megaphone className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium">{a.title}</p>
                                            <p className="truncate text-xs text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-sm">
                                            <span
                                                className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${a.is_publish ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}
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

                <Card>
                    <CardHeader>
                        <CardTitle>Jadwal Ibadah Mendatang</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {upcoming_worship.map((w) => (
                                <div key={w.id} className="flex items-center justify-between gap-4">
                                    <div className="min-w-0">
                                        <p className="truncate font-medium">{w.name}</p>
                                        <p className="truncate text-sm text-muted-foreground">{w.pic || '—'}</p>
                                    </div>
                                    <div className="text-right text-sm text-muted-foreground">
                                        <div>{new Date(w.date).toLocaleDateString()}</div>
                                        <div>{w.time_start}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
