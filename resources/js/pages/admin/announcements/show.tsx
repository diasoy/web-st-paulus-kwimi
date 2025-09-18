import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, Edit, Trash2, Eye, Calendar } from 'lucide-react';

interface Announcement {
    id: number;
    title: string;
    description: string;
    image_url?: string | null;
    is_publish: boolean;
    created_at: string;
    updated_at: string;
}

export default function AnnouncementShow({ announcement }: { announcement: Announcement }) {
    const { props } = usePage<{ flash?: { success?: string; error?: string } }>();

    const handleDelete = () => {
        if (!confirm(`Hapus pengumuman:\n\n"${announcement.title}"?`)) return;
        router.delete(route('admin.announcements.destroy', announcement.id), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Pengumuman - ${announcement.title}`} />

            <div className="dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
                <div className="container mx-auto px-4 py-8">
                    {/* Header Section */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="space-y-2">
                            <nav className="flex items-center text-sm text-white/80">
                                <Link href={route('admin.announcements.index')} className="hover:text-white transition-colors">
                                    Pengumuman
                                </Link>
                                <span className="mx-2 text-white/60">/</span>
                                <span className="text-white font-medium">Detail</span>
                            </nav>
                            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-xl">
                                    <Eye className="h-8 w-8 text-white" />
                                </div>
                                Detail Pengumuman
                            </h1>
                        </div>
                        <div className="flex gap-3">
                            <Link href={route('admin.announcements.index')}>
                                <Button 
                                    variant="outline" 
                                    className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Kembali
                                </Button>
                            </Link>

                            <Link href={route('admin.announcements.edit', announcement.id)}>
                                <Button 
                                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </Button>
                            </Link>

                            <Button 
                                variant="destructive" 
                                onClick={handleDelete}
                                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Flash Messages */}
                    {props.flash?.success && (
                        <div className="bg-green-500/10 backdrop-blur-sm border border-green-400/30 rounded-xl px-6 py-4 text-green-100 shadow-lg">
                            ✅ {props.flash.success}
                        </div>
                    )}
                    {props.flash?.error && (
                        <div className="bg-red-500/10 backdrop-blur-sm border border-red-400/30 rounded-xl px-6 py-4 text-red-100 shadow-lg">
                            ❌ {props.flash.error}
                        </div>
                    )}

                    {/* Main Content Card */}
                    <div className="bg-white/95 backdrop-blur-lg rounded-3xl overflow-hidden border border-gray-200/50 shadow-2xl">
                        {/* Header with gradient */}
                        <div className="bg-gradient-to-r from-purple-600/90 to-blue-600/90 p-8 border-b border-gray-200/50">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h2 className="text-3xl font-bold text-white mb-3">{announcement.title}</h2>
                                    <div className="flex items-center gap-4">
                                        <Badge 
                                            variant={announcement.is_publish ? 'default' : 'secondary'} 
                                            className={`${
                                                announcement.is_publish 
                                                    ? 'bg-green-500 hover:bg-green-600 text-white shadow-md' 
                                                    : 'bg-gray-300 hover:bg-gray-400 text-gray-800 shadow-md'
                                            } px-3 py-1 text-sm font-semibold`}
                                        >
                                            {announcement.is_publish ? '🌟 Dipublikasikan' : '📝 Draft'}
                                        </Badge>
                                        <div className="flex items-center gap-2 text-white/80 text-sm">
                                            <Calendar className="h-4 w-4" />
                                            Dibuat: {new Date(announcement.created_at).toLocaleDateString('id-ID')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Text Content */}
                                <div className="lg:col-span-2 space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                            📄 Deskripsi Pengumuman
                                        </h3>
                                        <div className="bg-slate-50 dark:bg-slate-800/20 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                                            <p className="text-slate-700 dark:text-slate-300 leading-7 whitespace-pre-line text-base">
                                                {announcement.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Image and Metadata */}
                                <div className="space-y-6">
                                    {announcement.image_url && (
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                                🖼️ Gambar
                                            </h3>
                                            <div className="relative group">
                                                <img 
                                                    src={announcement.image_url} 
                                                    alt={announcement.title} 
                                                    className="w-full rounded-xl border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Metadata Card */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                            ℹ️ Informasi
                                        </h3>
                                        <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-700 space-y-4">
                                            <div className="flex items-center justify-between py-2 border-b border-purple-200 dark:border-purple-700">
                                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Status:</span>
                                                <Badge 
                                                    variant={announcement.is_publish ? 'default' : 'secondary'} 
                                                    className={announcement.is_publish ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}
                                                >
                                                    {announcement.is_publish ? 'Aktif' : 'Draft'}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between py-2 border-b border-purple-200 dark:border-purple-700">
                                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Dibuat:</span>
                                                <span className="text-sm text-slate-800 dark:text-slate-200 font-semibold">
                                                    {new Date(announcement.created_at).toLocaleDateString('id-ID', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between py-2">
                                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Diperbarui:</span>
                                                <span className="text-sm text-slate-800 dark:text-slate-200 font-semibold">
                                                    {new Date(announcement.updated_at).toLocaleDateString('id-ID', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                        </div>
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
