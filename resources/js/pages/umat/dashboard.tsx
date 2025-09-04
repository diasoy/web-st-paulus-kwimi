import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Bell, User, Activity } from 'lucide-react';

interface UmatDashboardProps {
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
    recent_activities: Array<{
        title: string;
        date: string;
    }>;
    announcements: Array<{
        title: string;
        content?: string;
    }>;
    jadwal_ibadah: Array<{
        nama: string;
        waktu: string;
    }>;
}

export default function UmatDashboard({ user, recent_activities, announcements, jadwal_ibadah }: UmatDashboardProps) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard Umat" />
            
            <div className="space-y-6 mx-4 dashboard-gradient min-h-screen p-6" style={{ backgroundColor: '#1a4d20', background: 'linear-gradient(135deg, #1a4d20 0%, #235829 25%, #2d5f35 75%, #3e7147 100%)' }}>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white-shadow">
                        Selamat Datang, {user.name}!
                    </h1>
                    <p className="text-white-shadow">
                        Dashboard Jemaat ST. Paulus Kwimi
                    </p>
                </div>

                {/* Welcome Card */}
                <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
                    <CardHeader className="bg-gradient-to-r from-green-50/80 to-emerald-50/80 rounded-t-lg">
                        <CardTitle className="flex items-center gap-2 text-green-800">
                            <div className="rounded-full bg-green-100 p-2">
                                <User className="h-5 w-5 text-green-600" />
                            </div>
                            Profil Saya
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-3">
                            <p className="text-slate-700"><span className="font-semibold text-slate-800">Nama:</span> {user.name}</p>
                            <p className="text-slate-700"><span className="font-semibold text-slate-800">Email:</span> {user.email}</p>
                            <p className="text-slate-700"><span className="font-semibold text-slate-800">Status:</span> 
                                <span className="ml-2 inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200">
                                    Jemaat
                                </span>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Pengumuman */}
                    <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
                        <CardHeader className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-t-lg">
                            <CardTitle className="flex items-center gap-2 text-blue-800">
                                <div className="rounded-full bg-blue-100 p-2">
                                    <Bell className="h-5 w-5 text-blue-600" />
                                </div>
                                Pengumuman
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            {announcements.length > 0 ? (
                                <div className="space-y-4">
                                    {announcements.map((announcement, index) => (
                                        <div key={index} className="p-3 rounded-xl bg-gradient-to-r from-blue-50 to-white border border-blue-100 hover:shadow-md transition-all duration-200">
                                            <div className="flex items-start space-x-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100">
                                                    <Bell className="h-4 w-4 text-blue-600" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm font-semibold text-slate-800">{announcement.title}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="rounded-full bg-blue-100 p-4 w-fit mx-auto mb-4">
                                        <Bell className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <p className="text-sm text-slate-600 font-medium">
                                        Belum ada pengumuman terbaru
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Jadwal Ibadah */}
                    <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
                        <CardHeader className="bg-gradient-to-r from-purple-50/80 to-pink-50/80 rounded-t-lg">
                            <CardTitle className="flex items-center gap-2 text-purple-800">
                                <div className="rounded-full bg-purple-100 p-2">
                                    <Calendar className="h-5 w-5 text-purple-600" />
                                </div>
                                Jadwal Ibadah
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            {jadwal_ibadah.length > 0 ? (
                                <div className="space-y-4">
                                    {jadwal_ibadah.map((jadwal, index) => (
                                        <div key={index} className="p-3 rounded-xl bg-gradient-to-r from-purple-50 to-white border border-purple-100 hover:shadow-md transition-all duration-200">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-pink-100">
                                                        <Calendar className="h-4 w-4 text-purple-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-800">{jadwal.nama}</p>
                                                        <p className="text-sm text-slate-600">{jadwal.waktu}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="rounded-full bg-purple-100 p-4 w-fit mx-auto mb-4">
                                        <Calendar className="h-8 w-8 text-purple-600" />
                                    </div>
                                    <p className="text-sm text-slate-600 font-medium">
                                        Jadwal ibadah akan segera diumumkan
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Kegiatan Terbaru */}
                <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
                    <CardHeader className="bg-gradient-to-r from-orange-50/80 to-amber-50/80 rounded-t-lg">
                        <CardTitle className="flex items-center gap-2 text-orange-800">
                            <div className="rounded-full bg-orange-100 p-2">
                                <Activity className="h-5 w-5 text-orange-600" />
                            </div>
                            Kegiatan Terbaru
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        {recent_activities.length > 0 ? (
                            <div className="space-y-4">
                                {recent_activities.map((activity, index) => (
                                    <div key={index} className="p-3 rounded-xl bg-gradient-to-r from-orange-50 to-white border border-orange-100 hover:shadow-md transition-all duration-200">
                                        <div className="flex items-start space-x-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-amber-100 mt-1">
                                                <div className="w-2 h-2 bg-orange-600 rounded-full" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-semibold text-slate-800">{activity.title}</p>
                                                <p className="text-xs text-slate-600 mt-1">{activity.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="rounded-full bg-orange-100 p-4 w-fit mx-auto mb-4">
                                    <Activity className="h-8 w-8 text-orange-600" />
                                </div>
                                <p className="text-sm text-slate-600 font-medium">
                                    Belum ada kegiatan yang tercatat
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
