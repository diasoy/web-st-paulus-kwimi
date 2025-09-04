import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, Mail, Phone, User, Users } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    phone_number?: string;
    created_at: string;
}

interface Community {
    id: number;
    name: string;
    users?: User[];
    created_at: string;
    updated_at: string;
}

interface CommunityShowProps {
    community: Community;
}

export default function CommunityShow({ community }: CommunityShowProps) {
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
            <Head title={`Detail Komunitas - ${community.name}`} />

            <div className="space-y-6 p-6 min-h-screen">
                {/* Header dengan breadcrumb + action */}
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <nav className="flex items-center text-sm text-white">
                            <Link href={route('admin.communities.index')} className="hover:text-gray-300 transition-colors">
                                Komunitas Basis
                            </Link>
                            <span className="mx-2 text-gray-300">/</span>
                            <span className="text-white font-medium">Detail</span>
                        </nav>
                        <h1 className="text-2xl font-bold tracking-tight text-white">Detail Komunitas Basis</h1>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <Link href={route('admin.communities.index')}>
                            <Button variant="outline" size="sm" className="rounded-lg bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali ke Detail
                            </Button>
                        </Link>
                        <Link href={`/admin/communities/${community.id}/edit`}>
                            <Button className='bg-green-600 text-white hover:bg-green-700' size="sm">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Komunitas
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Informasi Komunitas */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-6">
                        <Users className="h-5 w-5 text-white" />
                        <h2 className="text-lg font-semibold text-white">Informasi Komunitas</h2>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-300">Nama Komunitas</label>
                            <p className="text-lg font-semibold text-white">{community.name}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-300">Jumlah Anggota</label>
                            <p className="text-lg font-semibold text-white">{community.users?.length || 0} orang</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-300">Status</label>
                            <div className="mt-1">
                                <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Daftar Anggota */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-6">
                        <User className="h-5 w-5 text-white" />
                        <h2 className="text-lg font-semibold text-white">Daftar Anggota Komunitas</h2>
                    </div>
                    {!community.users || community.users.length === 0 ? (
                        <div className="py-12 text-center">
                            <User className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-white">Belum ada anggota</h3>
                            <p className="mt-1 text-sm text-gray-300">Komunitas ini belum memiliki anggota terdaftar.</p>
                        </div>
                    ) : (
                        <div className="border border-gray-600 rounded-lg overflow-hidden bg-gray-800">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-700 border-gray-600">
                                        <TableHead className="pl-6 text-white font-semibold">Nama</TableHead>
                                        <TableHead className="text-white font-semibold">Email</TableHead>
                                        <TableHead className="text-white font-semibold">Telepon</TableHead>
                                        <TableHead className="pr-6 text-white font-semibold">Bergabung Sejak</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {community.users.map((user) => (
                                        <TableRow key={user.id} className="hover:bg-gray-700 border-gray-600">
                                            <TableCell className="pl-6 font-medium">
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4 text-gray-300" />
                                                    <span className="text-white">{user.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Mail className="h-4 w-4 text-gray-300" />
                                                    <span className="text-gray-300">{user.email}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {user.phone_number ? (
                                                    <div className="flex items-center gap-2">
                                                        <Phone className="h-4 w-4 text-gray-300" />
                                                        <span className="text-gray-300">{user.phone_number}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-500">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="pr-6 text-sm text-gray-300">{formatDate(user.created_at)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
