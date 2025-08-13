import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock, Edit, MapPin } from 'lucide-react';

interface Activity {
    id: number;
    name: string;
    description: string;
    date: string;
    time_start: string;
    location?: string;
    created_at: string;
    updated_at: string;
    image_url?: string | null;
}

interface ActivityShowProps {
    activity: Activity;
}

export default function ActivityShow({ activity }: ActivityShowProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (timeString: string) => {
        return new Date(`2000-01-01 ${timeString}`).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Detail Kegiatan - ${activity.name}`} />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <Link href={route('admin.activities.index')}>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Button>
                    </Link>
                    <Link href={route('admin.activities.edit', activity.id)}>
                        <Button>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Kegiatan
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Kegiatan</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold">{activity.name}</h2>
                                </div>

                                {activity.image_url && (
                                    <img src={`/storage/${activity.image_url}`} alt={activity.name} className="w-full max-w-xl rounded-md border" />
                                )}

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Tanggal</p>
                                            <p className="font-medium">{formatDate(activity.date)}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Clock className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Waktu</p>
                                            <p className="font-medium">{activity.time_start ? formatTime(activity.time_start) : '-'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Tempat</p>
                                            <p className="font-medium">{activity.location || '-'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-3 text-lg font-semibold">Deskripsi</h3>
                                    <div className="prose max-w-none">
                                        <p className="whitespace-pre-wrap text-muted-foreground">{activity.description || 'Tidak ada deskripsi'}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
