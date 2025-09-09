import { Button } from '@/components/ui/button';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock, Edit, Trash2, User, Users, Eye, Info } from 'lucide-react';

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
    description?: string;
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
                                href="/admin/worship-schedules"
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                Jadwal Ibadah
                            </Link>
                            <span className="text-white/50">/</span>
                            <span className="text-white font-medium">Detail</span>
                        </nav>
                    </div>

                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                                    <Eye className="h-10 w-10 text-white" />
                                    Detail Jadwal Ibadah
                                </h1>
                                <p className="text-purple-100 text-lg">
                                    Informasi lengkap jadwal "{worshipSchedule.name}"
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                                    <Calendar className="h-16 w-16 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 mb-8">
                        <Button
                            onClick={() => window.history.back()}
                            className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            <ArrowLeft className="mr-2 h-5 w-5" />
                            Kembali
                        </Button>
                        <Button
                            onClick={() => router.get(`/admin/worship-schedules/${worshipSchedule.id}/edit`)}
                            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            <Edit className="mr-2 h-5 w-5" />
                            Edit
                        </Button>
                        <Button
                            onClick={handleDelete}
                            className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            <Trash2 className="mr-2 h-5 w-5" />
                            Hapus
                        </Button>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Main Details Card */}
                        <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <Calendar className="h-6 w-6 text-purple-600" />
                                Detail Jadwal Ibadah
                            </h2>
                            
                            <div className="space-y-6">
                                <div className="group">
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                        Nama Ibadah
                                    </label>
                                    <p className="text-xl font-semibold text-gray-900 dark:text-white mt-1 group-hover:text-purple-600 transition-colors">
                                        {worshipSchedule.name}
                                    </p>
                                </div>

                                <div className="group">
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                        Tanggal
                                    </label>
                                    <div className="flex items-center gap-3 mt-1">
                                        <Calendar className="h-5 w-5 text-purple-600" />
                                        <p className="text-lg text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">
                                            {formatDate(worshipSchedule.date)}
                                        </p>
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                        Waktu Mulai
                                    </label>
                                    <div className="flex items-center gap-3 mt-1">
                                        <Clock className="h-5 w-5 text-blue-600" />
                                        <p className="text-lg text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                            {formatTime(worshipSchedule.time_start)} WIB
                                        </p>
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                        Pemimpin
                                    </label>
                                    <div className="flex items-center gap-3 mt-1">
                                        <User className="h-5 w-5 text-indigo-600" />
                                        <p className="text-lg text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                                            {worshipSchedule.pic}
                                        </p>
                                    </div>
                                </div>

                                {worshipSchedule.description && (
                                    <div className="group">
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                            Deskripsi
                                        </label>
                                        <p className="text-gray-900 dark:text-white mt-1 group-hover:text-purple-600 transition-colors">
                                            {worshipSchedule.description}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Communities Card */}
                        <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <Users className="h-6 w-6 text-blue-600" />
                                Komunitas Terkait
                            </h2>
                            
                            <div>
                                {worshipSchedule.communities && worshipSchedule.communities.length > 0 ? (
                                    <div className="space-y-3">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                            Jadwal ibadah ini melibatkan {worshipSchedule.communities.length} komunitas:
                                        </p>
                                        <div className="grid gap-3">
                                            {worshipSchedule.communities.map((community, index) => (
                                                <div 
                                                    key={community.id}
                                                    className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 border border-purple-200 dark:border-purple-600 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:scale-105"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                                                            {index + 1}
                                                        </div>
                                                        <span className="text-gray-900 dark:text-white font-medium">
                                                            {community.name}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-12 text-center">
                                        <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl p-8">
                                            <Users className="mx-auto mb-4 h-16 w-16 text-purple-400" />
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                                Semua Komunitas
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                Jadwal ibadah ini berlaku untuk semua komunitas di gereja
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* System Information Card */}
                    <div className="mt-8 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <Info className="h-6 w-6 text-gray-600" />
                            Informasi Sistem
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group">
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                    Dibuat Pada
                                </label>
                                <p className="text-gray-900 dark:text-white mt-1 group-hover:text-blue-600 transition-colors">
                                    {new Date(worshipSchedule.created_at).toLocaleString('id-ID', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                            <div className="group">
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                    Terakhir Diperbarui
                                </label>
                                <p className="text-gray-900 dark:text-white mt-1 group-hover:text-purple-600 transition-colors">
                                    {new Date(worshipSchedule.updated_at).toLocaleString('id-ID', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
