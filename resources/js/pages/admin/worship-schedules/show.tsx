import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock, Edit, Trash2, User, Users } from 'lucide-react';

interface Community {
    id: number;
    name: string;
}

interface WorshipSchedule {
    id: number;
    name: string;
    date: string;
    pic: string;
    time_start: string;
    created_at: string;
    updated_at: string;
    communities: Community[];
}

interface WorshipScheduleShowProps {
    worshipSchedule: WorshipSchedule;
}

export default function WorshipScheduleShow({ worshipSchedule }: WorshipScheduleShowProps) {
    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus jadwal ibadah ini?')) {
            router.delete(route('admin.worship-schedules.destroy', worshipSchedule.id));
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (timeString: string) => {
        return timeString.substring(0, 5); // Get HH:MM from HH:MM:SS
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Detail Jadwal - ${worshipSchedule.name}`} />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <nav className="flex items-center text-sm text-muted-foreground">
                            <Link href={route('admin.worship-schedules.index')} className="hover:text-foreground">
                                Jadwal Ibadah
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-foreground">Detail</span>
                        </nav>
                        <h1 className="text-2xl font-bold tracking-tight">Detail Jadwal Ibadah</h1>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('admin.worship-schedules.index')}>
                            <Button variant="outline" className="bg-secondary hover:bg-secondary/90 text-white" >
                                <ArrowLeft />
                                Kembali
                            </Button>
                        </Link>
                        <Link href={route('admin.worship-schedules.edit', worshipSchedule.id)}>
                            <Button variant="outline" className="bg-primary hover:bg-primary/90 text-white" >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </Link>
                        <Button variant="destructive" onClick={handleDelete}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Detail Jadwal */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Detail Jadwal Ibadah</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Nama Ibadah</label>
                                <p className="text-lg font-semibold">{worshipSchedule.name}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Tanggal</label>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <p>{formatDate(worshipSchedule.date)}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Waktu Mulai</label>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <p>{formatTime(worshipSchedule.time_start)}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Penanggung Jawab</label>
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <p>{worshipSchedule.pic}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Komunitas Terkait */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Komunitas Terkait
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {worshipSchedule.communities && worshipSchedule.communities.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {worshipSchedule.communities.map((community) => (
                                        <Badge key={community.id} variant="secondary">
                                            {community.name}
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-8 text-center text-muted-foreground">
                                    <Users className="mx-auto mb-2 h-12 w-12 opacity-50" />
                                    <p>Jadwal ini berlaku untuk semua komunitas</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Informasi Tambahan */}
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Sistem</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Dibuat pada</label>
                                <p className="text-sm">{new Date(worshipSchedule.created_at).toLocaleString('id-ID')}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Terakhir diperbarui</label>
                                <p className="text-sm">{new Date(worshipSchedule.updated_at).toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
