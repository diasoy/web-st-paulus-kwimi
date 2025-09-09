/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Calendar, Edit, MapPin, User, Users, Download, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface UserShow {
    pdfs: any;
    id: number;
    name: string;
    username: string;
    birth_place?: string;
    address?: string;
    birth_date?: string;
    gender: 'male' | 'female';
    role: string;
    status: 'active' | 'inactive';
    community?: {
        id: number;
        name: string;
    };
    created_at: string;
    updated_at: string;
}

interface UserShowProps {
    user: UserShow;
}

export default function UserShow({ user }: UserShowProps) {
    const [pdfs, setPdfs] = useState(user.pdfs || []);
    const [successDelete, setSuccessDelete] = useState<string | null>(null);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatShortDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const handleDelete = (pdfId: number) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus dokumen ini?')) {
            router.delete(
                route('admin.users.pdfs.delete', { user: user.id, pdf: pdfId }),
                {
                    onSuccess: () => {
                        setPdfs((prev: any[]) => prev.filter((pdf) => pdf.id !== pdfId));
                        setSuccessDelete('Dokumen berhasil dihapus');
                        setTimeout(() => setSuccessDelete(null), 3000);
                    },
                    onError: () => {
                        alert('Terjadi kesalahan saat menghapus dokumen.');
                    },
                }
            );
        }
    };

    const handleDownloadDetailPdf = () => {
        window.open(route('admin.users.detailpdf', { user: user.id }), '_blank');
    };

    const handleDownloadUserPdf = (pdfId: number) => {
        window.location.href = route('admin.users.pdfs.download', { user: user.id, pdf: pdfId });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Detail Umat - ${user.name}`} />

            <div className="dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
                <div className="mx-auto max-w-4xl px-6 py-8 space-y-8">
                    {/* Header Section */}
                    <div className="relative z-10 space-y-4">
                        <nav className="flex items-center text-sm font-medium">
                            <Link
                                href={route('admin.users')}
                                className="text-white/90 hover:text-white transition-colors duration-200 flex items-center gap-1"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span>Kembali ke Daftar Umat</span>
                            </Link>
                        </nav>
                        <div className="text-center">
                            <div className="relative inline-block">
                                <h1 className="text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-lg">
                                    Detail Umat
                                </h1>
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25"></div>
                            </div>
                            <p className="text-white/95 text-xl font-medium drop-shadow-md">
                                Informasi lengkap umat <span className="font-semibold text-blue-300">{user.name}</span>
                            </p>
                        </div>
                    </div>
                    <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
                    <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-white/5 blur-xl"></div>

                    {successDelete && (
                        <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl shadow-md">
                            <p className="font-medium">{successDelete}</p>
                        </div>
                    )}

                    {/* User Information Card */}
                    <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white p-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-white/20 p-4">
                                        <User className="h-8 w-8 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold mb-1">{user.name}</h2>
                                        <p className="text-blue-100 text-lg">@{user.username}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Badge
                                        variant={user.status === 'active' ? 'default' : 'destructive'}
                                        className="text-sm px-4 py-2 font-semibold"
                                    >
                                        {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className="text-sm px-4 py-2 bg-white/20 text-white border-white/30 font-semibold"
                                    >
                                        {user.role === 'admin' ? 'Admin' : 'Umat'}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Informasi Personal</h3>

                                    {user.birth_place && (
                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                            <MapPin className="h-5 w-5 text-blue-600" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-600">Tempat Lahir</p>
                                                <p className="text-lg font-semibold text-gray-900">{user.birth_place}</p>
                                            </div>
                                        </div>
                                    )}

                                    {user.birth_date && (
                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                            <Calendar className="h-5 w-5 text-blue-600" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-600">Tanggal Lahir</p>
                                                <p className="text-lg font-semibold text-gray-900">{formatDate(user.birth_date)}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                        <User className="h-5 w-5 text-blue-600" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">Jenis Kelamin</p>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {user.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Informasi Komunitas</h3>

                                    {user.community ? (
                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                            <Users className="h-5 w-5 text-blue-600" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-600">Komunitas Basis</p>
                                                <p className="text-lg font-semibold text-gray-900">{user.community.name}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                            <Users className="h-5 w-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-600">Komunitas Basis</p>
                                                <p className="text-lg font-semibold text-gray-400">Belum ditentukan</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                        <Calendar className="h-5 w-5 text-blue-600" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">Terdaftar Sejak</p>
                                            <p className="text-lg font-semibold text-gray-900">{formatDate(user.created_at)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {user.address && (
                                <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                                    <p className="text-sm font-medium text-gray-600 mb-2">Alamat Lengkap</p>
                                    <p className="text-lg font-semibold text-gray-900">{user.address}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* PDF Documents Section */}
                    {pdfs && pdfs.length > 0 && (
                        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
                            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white p-6">
                                <h3 className="text-2xl font-bold">Dokumen PDF</h3>
                            </div>
                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {pdfs.map((pdf: any, index: number) => {
                                        const documentLabels = [
                                            'Dokumen 1',
                                            'Dokumen 2', 
                                            'Dokumen 3',
                                            'Dokumen 4'
                                        ];
                                        return (
                                        <div key={pdf.id} className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-200">
                                            <div className="flex items-center justify-between mb-4">
                                                <h4 className="text-lg font-bold text-gray-900">
                                                    {documentLabels[index] || `Dokumen ${index + 1}`}
                                                </h4>
                                                <div className="flex gap-2">
                                                    <Button
                                                        onClick={() => handleDownloadUserPdf(pdf.id)}
                                                        size="sm"
                                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                                    >
                                                        <Download className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleDelete(pdf.id)}
                                                        size="sm"
                                                        variant="destructive"
                                                        className="bg-red-600 hover:bg-red-700"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <span className='text-black'>{pdf.file_name}</span>
                                            <p className="text-xs text-gray-500 mt-2">
                                                Diunggah: {pdf.created_at ? formatShortDate(pdf.created_at) : 'Tanggal tidak tersedia'}
                                            </p>
                                        </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-4">
                        <Button
                            onClick={handleDownloadDetailPdf}
                            className="h-12 px-8 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                            <Download className="mr-2 h-5 w-5" />
                            Download Detail PDF
                        </Button>
                        <Link href={route('admin.users.edit', user.id)}>
                            <Button className="h-12 px-8 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                                <Edit className="mr-2 h-5 w-5" />
                                Edit Umat
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
