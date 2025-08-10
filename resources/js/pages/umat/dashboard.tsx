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
            
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Selamat Datang, {user.name}!
                    </h1>
                    <p className="text-muted-foreground">
                        Dashboard Jemaat ST. Paulus Kwimi
                    </p>
                </div>

                {/* Welcome Card */}
                <Card className="border-primary/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Profil Saya
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <p><span className="font-medium">Nama:</span> {user.name}</p>
                            <p><span className="font-medium">Email:</span> {user.email}</p>
                            <p><span className="font-medium">Status:</span> 
                                <span className="ml-2 inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Jemaat
                                </span>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Pengumuman */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="h-5 w-5" />
                                Pengumuman
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {announcements.length > 0 ? (
                                <div className="space-y-4">
                                    {announcements.map((announcement, index) => (
                                        <div key={index} className="border-l-4 border-primary pl-4">
                                            <p className="text-sm">{announcement.title}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Bell className="h-12 w-12 mx-auto text-muted-foreground/50" />
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Belum ada pengumuman terbaru
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Jadwal Ibadah */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Jadwal Ibadah
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {jadwal_ibadah.length > 0 ? (
                                <div className="space-y-4">
                                    {jadwal_ibadah.map((jadwal, index) => (
                                        <div key={index} className="flex justify-between items-center">
                                            <div>
                                                <p className="font-medium">{jadwal.nama}</p>
                                                <p className="text-sm text-muted-foreground">{jadwal.waktu}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground/50" />
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Jadwal ibadah akan segera diumumkan
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Kegiatan Terbaru */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5" />
                            Kegiatan Terbaru
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {recent_activities.length > 0 ? (
                            <div className="space-y-4">
                                {recent_activities.map((activity, index) => (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                                        <div>
                                            <p className="text-sm font-medium">{activity.title}</p>
                                            <p className="text-xs text-muted-foreground">{activity.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <Activity className="h-12 w-12 mx-auto text-muted-foreground/50" />
                                <p className="mt-2 text-sm text-muted-foreground">
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
