/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Calendar, Edit, MapPin, User, Users } from 'lucide-react';
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

    const handleDelete = (pdfId: number) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus dokumen ini?')) {
            router.delete(
                route('admin.users.pdfs.delete', { user: user.id, pdf: pdfId }),
                {
                    onSuccess: () => {
                        setPdfs((prev: any[]) => prev.filter((pdf) => pdf.id !== pdfId));
                        setSuccessDelete('File PDF berhasil dihapus.');
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

            <div className="space-y-6 p-6 min-h-screen">
                {successDelete && (
                    <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                        {successDelete}
                    </div>
                )}
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <nav className="flex items-center text-sm text-white">
                            <Link href={route('admin.users')} className="hover:text-gray-300 transition-colors">
                                Umat
                            </Link>
                            <span className="mx-2 text-gray-300">/</span>
                            <span className="text-white font-medium">Detail</span>
                        </nav>
                        <h1 className="text-2xl font-bold tracking-tight text-white">Detail Umat</h1>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <Link href="/admin/users">
                            <Button variant="outline" size="sm" className="hidden lg:flex rounded-lg bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali ke Umat
                            </Button>
                        </Link>
                        <Link href={`/admin/users/${user.id}/edit`}>
                            <Button className='bg-green-600 text-white hover:bg-green-700'>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Umat
                            </Button>
                        </Link>
                        <Button variant="outline" size="sm" onClick={handleDownloadDetailPdf} className="flex items-center gap-2 bg-secondary hover:bg-secondary/90">
                            <Users className="mr-2 h-4 w-4" />
                            Unduh Informasi Umat
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6">
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-white">Informasi Umat</h2>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-700">
                                    <span className="text-2xl font-bold text-white">{user.name.charAt(0).toUpperCase()}</span>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                                    <p className="text-gray-300">@{user.username}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="flex items-center gap-3">
                                    <User className="h-5 w-5 text-white" />
                                    <div>
                                        <p className="text-sm text-gray-300">Gender</p>
                                        <p className="font-medium text-white">{user.gender === 'male' ? 'Laki-laki' : 'Perempuan'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-white" />
                                    <div>
                                        <p className="text-sm text-gray-300">Tanggal Lahir</p>
                                        <p className="font-medium text-white">{user.birth_date ? formatDate(user.birth_date) : '-'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="h-5 w-5 text-white" />
                                    <div>
                                        <p className="text-sm text-gray-300">Tempat Lahir</p>
                                        <p className="font-medium text-white">{user.birth_place || '-'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Users className="h-5 w-5 text-white" />
                                    <div>
                                        <p className="text-sm text-gray-300">Komunitas Basis</p>
                                        <p className="font-medium text-white">{user.community?.name || '-'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-5 w-5 items-center justify-center">
                                        <div className={`h-3 w-3 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-300">Status</p>
                                        <Badge
                                            variant={user.status === 'active' ? 'default' : 'destructive'}
                                            className={user.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}
                                        >
                                            {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            {user.address && (
                                <div className="flex items-start gap-3">
                                    <MapPin className="mt-0.5 h-5 w-5 text-white" />
                                    <div>
                                        <p className="text-sm text-gray-300">Alamat</p>
                                        <p className="font-medium text-white">{user.address}</p>
                                    </div>
                                </div>
                            )}

                            {/* PDF List Section */}
                            {pdfs && pdfs.length > 0 && (
                                <div className="border-t border-gray-600 pt-4 w-full">
                                    <h3 className="font-semibold mb-2 text-white">File PDF Umat</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                        {pdfs.map((pdf: { id: number; file_name: string; file_url: string }, idx: number) => (
                                            <div key={pdf.id} className="flex items-center gap-2 bg-gray-700 rounded p-3 w-full">
                                                <span className="font-bold mr-2 text-white">{idx + 1}.</span>
                                                <span className="text-sm text-gray-300 flex-1 truncate">{pdf.file_name}</span>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm" 
                                                    className="flex items-center border rounded bg-white text-gray-700 hover:bg-gray-50 flex-shrink-0"
                                                    onClick={() => handleDownloadUserPdf(pdf.id)}
                                                >
                                                    Unduh
                                                </Button>
                                                <Button variant="destructive" size="sm" onClick={() => handleDelete(pdf.id)}>Hapus</Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="border-t border-gray-600 pt-4">
                                <div className="grid grid-cols-1 gap-4 text-sm text-gray-300 md:grid-cols-2">
                                    <div>
                                        <span className="font-medium text-white">Terdaftar:</span> {formatDate(user.created_at)}
                                    </div>
                                    <div>
                                        <span className="font-medium text-white">Terakhir diupdate:</span> {formatDate(user.updated_at)}
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
