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

            <div className="dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
                <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
                    {/* Header Section */}
                    <div className="relative z-10 space-y-4">
                        <nav className="flex items-center text-sm font-medium">
                            <Link 
                                href={route('admin.communities.index')} 
                                className="text-white/90 hover:text-white transition-colors duration-200 flex items-center gap-1"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span>Kembali ke Daftar Komunitas</span>
                            </Link>
                        </nav>
                        <div className="text-center">
                            <div className="relative inline-block">
                                <h1 className="text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-lg">
                                    Detail Komunitas Basis
                                </h1>
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25"></div>
                            </div>
                            <p className="text-white/95 text-xl font-medium drop-shadow-md">
                                Informasi lengkap komunitas "{community.name}"
                            </p>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex justify-center gap-4 pt-4">
                            <Link href={`/admin/communities/${community.id}/edit`}>
                                <Button className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white border-0 px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl">
                                    <Edit className="mr-2 h-5 w-5" />
                                    Edit Komunitas
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Community Information Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Community Name Card */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-3 rounded-xl border border-blue-500/30">
                                    <Users className="h-8 w-8 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-white/70 text-sm font-semibold uppercase tracking-wide">Nama Komunitas</h3>
                                    <p className="text-white text-2xl font-bold">{community.name}</p>
                                </div>
                            </div>
                        </div>

                        {/* Members Count Card */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-3 rounded-xl border border-green-500/30">
                                    <User className="h-8 w-8 text-green-400" />
                                </div>
                                <div>
                                    <h3 className="text-white/70 text-sm font-semibold uppercase tracking-wide">Jumlah Anggota</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-white text-2xl font-bold">{community.users?.length || 0}</span>
                                        <span className="text-green-400 font-semibold">orang</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Status Card */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 p-3 rounded-xl border border-green-500/30">
                                    <Badge className="h-8 w-8 text-green-400" />
                                </div>
                                <div>
                                    <h3 className="text-white/70 text-sm font-semibold uppercase tracking-wide">Status</h3>
                                    <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 px-4 py-2 rounded-xl border border-green-500/30 inline-flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        <span className="text-green-300 font-bold">Aktif</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Members Section */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-8 border-b border-white/20">
                            <div className="flex items-center gap-4">
                                <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-3 rounded-xl">
                                    <User className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-1">Daftar Anggota Komunitas</h2>
                                    <p className="text-white/80 text-lg">
                                        {community.users?.length || 0} anggota terdaftar
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        {!community.users || community.users.length === 0 ? (
                            <div className="text-center py-16 px-8">
                                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full mb-6">
                                    <User className="h-12 w-12 text-purple-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">Belum ada anggota</h3>
                                <p className="text-white/70 text-lg max-w-md mx-auto">
                                    Komunitas ini belum memiliki anggota terdaftar dalam sistem.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-white/20 hover:bg-white/5 bg-gradient-to-r from-white/10 to-white/5">
                                            <TableHead className="text-white font-bold pl-8 py-6 text-lg">Nama</TableHead>
                                            <TableHead className="text-white font-bold py-6 text-lg">Email</TableHead>
                                            <TableHead className="text-white font-bold py-6 text-lg">Telepon</TableHead>
                                            <TableHead className="text-white font-bold pr-8 py-6 text-lg">Bergabung Sejak</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {community.users.map((user, index) => (
                                            <TableRow 
                                                key={user.id} 
                                                className={`border-white/10 hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 transition-all duration-300 ${
                                                    index % 2 === 0 ? 'bg-white/5' : 'bg-transparent'
                                                }`}
                                            >
                                                <TableCell className="pl-8 font-semibold py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-2.5 rounded-xl border border-blue-500/30">
                                                            <User className="h-5 w-5 text-blue-400" />
                                                        </div>
                                                        <span className="text-white font-bold text-lg">{user.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-2.5 rounded-xl border border-green-500/30">
                                                            <Mail className="h-5 w-5 text-green-400" />
                                                        </div>
                                                        <span className="text-white/90 font-medium text-lg">{user.email}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-6">
                                                    {user.phone_number ? (
                                                        <div className="flex items-center gap-4">
                                                            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 p-2.5 rounded-xl border border-orange-500/30">
                                                                <Phone className="h-5 w-5 text-orange-400" />
                                                            </div>
                                                            <span className="text-white/90 font-medium text-lg">{user.phone_number}</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-white/50 text-lg">-</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="pr-8 text-white/90 font-medium text-lg py-6">
                                                    {formatDate(user.created_at)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
