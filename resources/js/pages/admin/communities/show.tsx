import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Edit, Mail, Phone, User, Users } from 'lucide-react';

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

            <div className="space-y-6 p-6">
                {/* Header dengan breadcrumb + action */}
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <nav className="flex items-center text-sm text-muted-foreground">
                            <Link href={route('admin.communities.index')} className="hover:text-foreground">
                                Komunitas Basis
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-foreground">Detail</span>
                        </nav>
                        <h1 className="text-2xl font-bold tracking-tight">Detail Komunitas Basis</h1>
                    </div>
                    <Link href={`/admin/communities/${community.id}/edit`}>
                        <Button>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Komunitas
                        </Button>
                    </Link>
                </div>

                {/* Judul halaman */}
                {/* <div>
                    <h1 className="text-3xl font-bold tracking-tight">Detail Komunitas Basis</h1>
                    <p className="text-muted-foreground">Informasi lengkap komunitas basis</p>
                </div> */}

                {/* Informasi Komunitas */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Informasi Komunitas
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">Nama Komunitas</label>
                            <p className="text-lg font-semibold">{community.name}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">Jumlah Anggota</label>
                            <p className="text-lg font-semibold">{community.users?.length || 0} orang</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">Status</label>
                            <div className="mt-1">
                                <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Daftar Anggota */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Daftar Anggota Komunitas
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        {!community.users || community.users.length === 0 ? (
                            <div className="py-12 text-center">
                                <User className="mx-auto h-12 w-12 text-muted-foreground" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">Belum ada anggota</h3>
                                <p className="mt-1 text-sm text-muted-foreground">Komunitas ini belum memiliki anggota terdaftar.</p>
                            </div>
                        ) : (
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="pl-6">Nama</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Telepon</TableHead>
                                            <TableHead className="pr-6">Bergabung Sejak</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {community.users.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell className="pl-6 font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-4 w-4 text-muted-foreground" />
                                                        {user.name}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                                        {user.email}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {user.phone_number ? (
                                                        <div className="flex items-center gap-2">
                                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                                            {user.phone_number}
                                                        </div>
                                                    ) : (
                                                        <span className="text-muted-foreground">-</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="pr-6 text-sm text-muted-foreground">{formatDate(user.created_at)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
