import { Button } from '@/components/ui/button';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock, Edit, MapPin, Eye, User, ImageIcon, FileText, Activity as ActivityIcon } from 'lucide-react';

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
        if (!timeString) return '-';
        try {
            return new Date(`2000-01-01 ${timeString}`).toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
            });
        } catch {
            return timeString;
        }
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Detail Kegiatan - ${activity.name}`} />

            <div className="dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
                <div className="container mx-auto px-4 py-8">
                    {/* Breadcrumb Navigation */}
                    <div className="mb-8">
                        <nav className="flex items-center space-x-2 text-sm">
                            <Link
                                href="/admin/dashboard"
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                Dashboard
                            </Link>
                            <span className="text-white/50">/</span>
                            <Link
                                href="/admin/activities"
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                Agenda Kegiatan
                            </Link>
                            <span className="text-white/50">/</span>
                            <span className="text-white font-medium">Detail</span>
                        </nav>
                    </div>

                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                                    <Eye className="h-10 w-10 text-white" />
                                    Detail Kegiatan
                                </h1>
                                <p className="text-purple-100 text-lg">
                                    Informasi lengkap tentang kegiatan gereja
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                                    <ActivityIcon className="h-16 w-16 text-white" />
                                </div>
                            </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-4 mt-6">
                            <Link href={route('admin.activities.index')}>
                                <Button className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl hover:scale-105">
                                    <ArrowLeft className="mr-2 h-5 w-5" />
                                    Kembali ke Daftar
                                </Button>
                            </Link>
                            <Link href={route('admin.activities.edit', activity.id)}>
                                <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                    <Edit className="mr-2 h-5 w-5" />
                                    Edit Kegiatan
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Activity Title Card */}
                            <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
                                <div className="flex items-start gap-4">
                                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-3">
                                        <FileText className="h-8 w-8 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                            {activity.name}
                                        </h2>
                                        <div className="prose max-w-none">
                                            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                                                {activity.description || 'Tidak ada deskripsi tersedia untuk kegiatan ini.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Activity Image */}
                            {activity.image_url && (
                                <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-2">
                                            <ImageIcon className="h-6 w-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                            Gambar Kegiatan
                                        </h3>
                                    </div>
                                    <div className="relative rounded-xl overflow-hidden shadow-xl">
                                        <img 
                                            src={activity.image_url} 
                                            alt={activity.name}
                                            className="w-full h-auto max-h-96 object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar Information */}
                        <div className="space-y-8">
                            {/* Activity Details */}
                            <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full p-2">
                                        <Calendar className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        Informasi Kegiatan
                                    </h3>
                                </div>
                                
                                <div className="space-y-6">
                                    <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tanggal</span>
                                        </div>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                                            {formatDate(activity.date)}
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Waktu Mulai</span>
                                        </div>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                                            {formatTime(activity.time_start)}
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Lokasi</span>
                                        </div>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                                            {activity.location || 'Lokasi belum ditentukan'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Metadata */}
                            <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-gradient-to-r from-gray-500 to-gray-600 rounded-full p-2">
                                        <User className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        Metadata
                                    </h3>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">ID Kegiatan</span>
                                        <span className="text-sm font-bold text-gray-900 dark:text-white">#{activity.id}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Dibuat</span>
                                        <span className="text-sm font-bold text-gray-900 dark:text-white">{formatDateTime(activity.created_at)}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Diperbarui</span>
                                        <span className="text-sm font-bold text-gray-900 dark:text-white">{formatDateTime(activity.updated_at)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
