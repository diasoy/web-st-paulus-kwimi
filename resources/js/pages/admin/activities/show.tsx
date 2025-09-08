import { Button } from '@/components/ui/button';
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

            <div className="space-y-6 p-6 min-h-screen">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <nav className="flex items-center text-sm text-white">
                            <Link href={route('admin.activities.index')} className="hover:text-gray-300 transition-colors">
                                Agenda Kegiatan
                            </Link>
                            <span className="mx-2 text-gray-300">/</span>
                            <span className="text-white font-medium">Detail</span>
                        </nav>
                        <h1 className="text-2xl font-bold tracking-tight text-white">Detail Kegiatan</h1>
                    </div>
                    <div className='flex gap-4'>
                        <Link href={route('admin.activities.index')}>
                            <Button className='bg-white text-gray-700 border-gray-300 hover:bg-gray-50'>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali ke Agenda
                            </Button>
                        </Link>
                        <Link href={route('admin.activities.edit', activity.id)}>
                            <Button className='bg-green-600 text-white hover:bg-green-700'>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Kegiatan
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6">
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-white mb-6">Informasi Kegiatan</h2>
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white">{activity.name}</h2>
                            </div>

                            {activity.image_url && (
                                <img src={`/files/${encodeURIComponent(activity.image_url)}`} alt={activity.name} className="w-full max-w-xl rounded-md border" />
                            )}

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-white" />
                                    <div>
                                        <p className="text-sm text-gray-300">Tanggal</p>
                                        <p className="font-medium text-white">{formatDate(activity.date)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Clock className="h-5 w-5 text-white" />
                                    <div>
                                        <p className="text-sm text-gray-300">Waktu</p>
                                        <p className="font-medium text-white">{activity.time_start ? formatTime(activity.time_start) : '-'}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <MapPin className="h-5 w-5 text-white" />
                                    <div>
                                        <p className="text-sm text-gray-300">Tempat</p>
                                        <p className="font-medium text-white">{activity.location || '-'}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-lg font-semibold text-white">Deskripsi</h3>
                                <div className="prose max-w-none">
                                    <p className="whitespace-pre-wrap text-gray-300">{activity.description || 'Tidak ada deskripsi'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
