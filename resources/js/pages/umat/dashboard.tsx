import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Calendar, Activity, User, MapPin, Clock, ChevronRight, Users, HandCoins, Building2 } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { BreadcrumbItem } from '@/types';

interface Community {
    id: number;
    name: string;
}

interface UserProps {
    id: number;
    name: string;
    username: string;
    email: string;
    gender: string | null;
    birth_date: string | null;
    address: string | null;
    status: string;
    community: Community | null;
    role: string;
}

interface Announcement {
    id: number;
    title: string;
    description: string;
    image_url: string | null;
    created_at: string;
}

interface WorshipSchedule {
    id: number;
    name: string;
    date: string;
    time_start: string;
    pic: string | null;
}

interface UpcomingActivity {
    id: number;
    name: string;
    description: string | null;
    date: string;
    time_start: string | null;
    location: string | null;
    image_url: string | null;
}

interface UmatDashboardProps {
    user: UserProps;
    announcements: Announcement[];
    worship_schedules: WorshipSchedule[];
    upcoming_activities: UpcomingActivity[];
}

const formatDate = (dateStr: string) => {
    try {
        return format(new Date(dateStr), 'dd MMMM yyyy', { locale: id });
    } catch {
        return dateStr;
    }
};

const formatTime = (timeStr: string | null) => {
    if (!timeStr) return '';
    return timeStr.substring(0, 5);
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/umat/dashboard' },
];

export default function UmatDashboard({ user, announcements, worship_schedules, upcoming_activities }: UmatDashboardProps) {
    return (
        <AuthenticatedLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Jemaat" />

            <div className="space-y-6 p-6 dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #1a4d20 0%, #235829 25%, #2d5f35 75%, #3e7147 100%)' }}>

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-lg">
                        Selamat Datang, {user.name}!
                    </h1>
                    <p className="text-white/80 mt-1">
                        Dashboard Jemaat ST. Paulus Kwimi
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                    <Link href="/umat/announcements">
                        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white cursor-pointer hover:-translate-y-1 transition-transform duration-200">
                            <CardContent className="p-4 flex items-center gap-3">
                                <div className="rounded-full bg-white/20 p-2">
                                    <Bell className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-white/80">Pengumuman</p>
                                    <p className="text-lg font-bold">{announcements.length > 0 ? 'Ada baru' : 'Lihat →'}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/umat/worship-schedules">
                        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-violet-600 text-white cursor-pointer hover:-translate-y-1 transition-transform duration-200">
                            <CardContent className="p-4 flex items-center gap-3">
                                <div className="rounded-full bg-white/20 p-2">
                                    <Calendar className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-white/80">Jadwal Ibadah</p>
                                    <p className="text-lg font-bold">{worship_schedules.length > 0 ? `${worship_schedules.length} mendatang` : 'Lihat →'}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/umat/activities">
                        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-amber-600 text-white cursor-pointer hover:-translate-y-1 transition-transform duration-200">
                            <CardContent className="p-4 flex items-center gap-3">
                                <div className="rounded-full bg-white/20 p-2">
                                    <Activity className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-white/80">Agenda</p>
                                    <p className="text-lg font-bold">{upcoming_activities.length > 0 ? `${upcoming_activities.length} mendatang` : 'Lihat →'}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/umat/church-officials">
                        <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-500 to-emerald-600 text-white cursor-pointer hover:-translate-y-1 transition-transform duration-200">
                            <CardContent className="p-4 flex items-center gap-3">
                                <div className="rounded-full bg-white/20 p-2">
                                    <Users className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-white/80">Pengurus</p>
                                    <p className="text-lg font-bold">Lihat →</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Profil */}
                    <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
                        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg pb-3">
                            <CardTitle className="flex items-center gap-2 text-green-800 text-base">
                                <div className="rounded-full bg-green-100 p-2">
                                    <User className="h-4 w-4 text-green-600" />
                                </div>
                                Profil Saya
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-5 space-y-3 text-sm">
                            <div>
                                <span className="text-slate-500 text-xs font-medium uppercase tracking-wide">Nama</span>
                                <p className="font-semibold text-slate-800 mt-0.5">{user.name}</p>
                            </div>
                            <div>
                                <span className="text-slate-500 text-xs font-medium uppercase tracking-wide">Username</span>
                                <p className="font-semibold text-slate-800 mt-0.5">{user.username}</p>
                            </div>
                            {user.community && (
                                <div>
                                    <span className="text-slate-500 text-xs font-medium uppercase tracking-wide">Komunitas</span>
                                    <p className="font-semibold text-slate-800 mt-0.5 flex items-center gap-1">
                                        <Building2 className="h-3 w-3 text-green-600" />
                                        {user.community.name}
                                    </p>
                                </div>
                            )}
                            <div>
                                <span className="text-slate-500 text-xs font-medium uppercase tracking-wide">Status</span>
                                <div className="mt-0.5">
                                    <Badge className={user.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}>
                                        {user.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                                    </Badge>
                                </div>
                            </div>
                            <div className="pt-2 border-t border-slate-100">
                                <Button asChild size="sm" variant="outline" className="w-full text-white bg-green-600 border-green-200 hover:bg-green-700 hover:text-white">
                                    <Link href="/settings/profile">Edit Profil</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pengumuman */}
                    <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg pb-3">
                            <CardTitle className="flex items-center justify-between text-blue-800 text-base">
                                <div className="flex items-center gap-2">
                                    <div className="rounded-full bg-blue-100 p-2">
                                        <Bell className="h-4 w-4 text-blue-600" />
                                    </div>
                                    Pengumuman Terbaru
                                </div>
                                <Link href="/umat/announcements" className="text-blue-500 hover:text-blue-700 transition-colors">
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            {announcements.length > 0 ? (
                                <div className="space-y-3">
                                    {announcements.map((a) => (
                                        <Link key={a.id} href={`/umat/announcements/${a.id}`}>
                                            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-50 to-white border border-blue-100 hover:shadow-md hover:border-blue-200 transition-all duration-200 cursor-pointer">
                                                <p className="text-sm font-semibold text-slate-800 line-clamp-2">{a.title}</p>
                                                <p className="text-xs text-slate-500 mt-1">{formatDate(a.created_at)}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="rounded-full bg-blue-100 p-4 w-fit mx-auto mb-3">
                                        <Bell className="h-7 w-7 text-blue-400" />
                                    </div>
                                    <p className="text-sm text-slate-500">Belum ada pengumuman</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Jadwal Ibadah */}
                    <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
                        <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg pb-3">
                            <CardTitle className="flex items-center justify-between text-purple-800 text-base">
                                <div className="flex items-center gap-2">
                                    <div className="rounded-full bg-purple-100 p-2">
                                        <Calendar className="h-4 w-4 text-purple-600" />
                                    </div>
                                    Jadwal Ibadah
                                </div>
                                <Link href="/umat/worship-schedules" className="text-purple-500 hover:text-purple-700 transition-colors">
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            {worship_schedules.length > 0 ? (
                                <div className="space-y-3">
                                    {worship_schedules.map((ws) => (
                                        <Link key={ws.id} href={`/umat/worship-schedules/${ws.id}`}>
                                            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-50 to-white border border-purple-100 hover:shadow-md hover:border-purple-200 transition-all duration-200 cursor-pointer">
                                                <p className="text-sm font-semibold text-slate-800 line-clamp-1">{ws.name}</p>
                                                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        {formatDate(ws.date)}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {formatTime(ws.time_start)}
                                                    </span>
                                                </div>
                                                {ws.pic && (
                                                    <p className="text-xs text-slate-500 mt-1">PIC: {ws.pic}</p>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="rounded-full bg-purple-100 p-4 w-fit mx-auto mb-3">
                                        <Calendar className="h-7 w-7 text-purple-400" />
                                    </div>
                                    <p className="text-sm text-slate-500">Jadwal ibadah akan segera diumumkan</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Agenda Kegiatan */}
                <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
                    <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg pb-3">
                        <CardTitle className="flex items-center justify-between text-orange-800 text-base">
                            <div className="flex items-center gap-2">
                                <div className="rounded-full bg-orange-100 p-2">
                                    <Activity className="h-4 w-4 text-orange-600" />
                                </div>
                                Agenda Kegiatan Mendatang
                            </div>
                            <Link href="/umat/activities" className="text-orange-500 hover:text-orange-700 transition-colors">
                                <ChevronRight className="h-4 w-4" />
                            </Link>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        {upcoming_activities.length > 0 ? (
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {upcoming_activities.map((act) => (
                                    <Link key={act.id} href={`/umat/activities/${act.id}`}>
                                        <div className="p-4 rounded-xl bg-gradient-to-r from-orange-50 to-white border border-orange-100 hover:shadow-md hover:border-orange-200 transition-all duration-200 cursor-pointer h-full">
                                            <p className="text-sm font-semibold text-slate-800 line-clamp-2">{act.name}</p>
                                            <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                                                <Calendar className="h-3 w-3 text-orange-500" />
                                                <span>{formatDate(act.date)}</span>
                                            </div>
                                            {act.time_start && (
                                                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                                                    <Clock className="h-3 w-3 text-orange-500" />
                                                    <span>{formatTime(act.time_start)}</span>
                                                </div>
                                            )}
                                            {act.location && (
                                                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                                                    <MapPin className="h-3 w-3 text-orange-500" />
                                                    <span className="line-clamp-1">{act.location}</span>
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="rounded-full bg-orange-100 p-4 w-fit mx-auto mb-3">
                                    <Activity className="h-7 w-7 text-orange-400" />
                                </div>
                                <p className="text-sm text-slate-500">Belum ada kegiatan mendatang</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Quick Links */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <Link href="/umat/church-officials">
                        <Card className="border-0 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                            <CardContent className="p-5 flex items-center gap-4">
                                <div className="rounded-full bg-teal-100 p-3">
                                    <Users className="h-6 w-6 text-teal-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800">Pengurus Gereja</p>
                                    <p className="text-sm text-slate-500">Lihat daftar pengurus aktif</p>
                                </div>
                                <ChevronRight className="h-5 w-5 text-slate-400 ml-auto" />
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/umat/finances">
                        <Card className="border-0 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                            <CardContent className="p-5 flex items-center gap-4">
                                <div className="rounded-full bg-green-100 p-3">
                                    <HandCoins className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800">Transparansi Keuangan</p>
                                    <p className="text-sm text-slate-500">Laporan keuangan gereja</p>
                                </div>
                                <ChevronRight className="h-5 w-5 text-slate-400 ml-auto" />
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}