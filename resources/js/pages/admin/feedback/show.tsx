import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, Trash2, Eye, Calendar, User, MessageSquare, CheckCircle, Circle } from 'lucide-react';

interface Feedback {
    id: number;
    name: string;
    message: string;
    is_read: boolean;
    created_at: string;
    updated_at: string;
}

export default function FeedbackShow({ feedback }: { feedback: Feedback }) {
    const { props } = usePage<{ flash?: { success?: string; error?: string } }>();

    const handleDelete = () => {
        if (!confirm(`Hapus feedback dari:\n\n"${feedback.name}"?`)) return;
        router.delete(route('admin.feedback.destroy', feedback.id), {
            preserveScroll: true,
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Feedback - ${feedback.name}`} />

            <div className="dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
                <div className="container mx-auto px-4 py-8">
                    {/* Header Section */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="space-y-2">
                            <nav className="flex items-center text-sm text-white/80">
                                <Link href={route('admin.feedback.index')} className="hover:text-white transition-colors">
                                    Kritik & Saran
                                </Link>
                                <span className="mx-2 text-white/60">/</span>
                                <span className="text-white font-medium">Detail</span>
                            </nav>
                            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                                    <Eye className="h-8 w-8 text-white" />
                                </div>
                                Detail Kritik & Saran
                            </h1>
                        </div>
                        <div className="flex gap-3">
                            <Link href={route('admin.feedback.index')}>
                                <Button 
                                    variant="outline" 
                                    className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Kembali
                                </Button>
                            </Link>

                            <Button 
                                variant="destructive" 
                                onClick={handleDelete}
                                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Hapus
                            </Button>
                        </div>
                    </div>

                    {/* Flash Messages */}
                    {props.flash?.success && (
                        <div className="bg-green-500/10 backdrop-blur-sm border border-green-400/30 rounded-xl px-6 py-4 text-green-100 shadow-lg mb-6">
                            ✅ {props.flash.success}
                        </div>
                    )}
                    {props.flash?.error && (
                        <div className="bg-red-500/10 backdrop-blur-sm border border-red-400/30 rounded-xl px-6 py-4 text-red-100 shadow-lg mb-6">
                            ❌ {props.flash.error}
                        </div>
                    )}

                    {/* Main Content Card */}
                    <div className="bg-white/95 backdrop-blur-lg rounded-3xl overflow-hidden border border-gray-200/50 shadow-2xl">
                        {/* Header with gradient */}
                        <div className="bg-gradient-to-r from-purple-600/90 to-pink-600/90 p-8 border-b border-gray-200/50">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Badge 
                                            className={feedback.is_read 
                                                ? 'bg-green-500/90 text-white font-semibold px-4 py-1.5'
                                                : 'bg-red-500/90 text-white font-semibold px-4 py-1.5'
                                            }
                                        >
                                            {feedback.is_read ? (
                                                <span className="flex items-center gap-1">
                                                    <CheckCircle className="h-4 w-4" />
                                                    Sudah Dibaca
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1">
                                                    <Circle className="h-4 w-4" />
                                                    Belum Dibaca
                                                </span>
                                            )}
                                        </Badge>
                                    </div>
                                    <h2 className="text-3xl font-bold text-white mb-3">Kritik & Saran dari {feedback.name}</h2>
                                    <div className="flex items-center gap-2 text-white/90 text-sm">
                                        <Calendar className="h-4 w-4" />
                                        <span>Dikirim pada {formatDate(feedback.created_at)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-8">
                            {/* Pengirim Info */}
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                        <User className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">Nama Pengirim</p>
                                        <p className="text-lg font-bold text-gray-900">{feedback.name}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Message Content */}
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                                        <MessageSquare className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Pesan</h3>
                                </div>
                                <div className="bg-white rounded-xl p-6 shadow-sm">
                                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-base">
                                        {feedback.message}
                                    </p>
                                </div>
                            </div>

                            {/* Metadata */}
                            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                                <div className="text-sm text-gray-600">
                                    <p>
                                        <span className="font-medium">Dibuat:</span> {formatDate(feedback.created_at)}
                                    </p>
                                    {feedback.updated_at !== feedback.created_at && (
                                        <p className="mt-1">
                                            <span className="font-medium">Diperbarui:</span> {formatDate(feedback.updated_at)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
