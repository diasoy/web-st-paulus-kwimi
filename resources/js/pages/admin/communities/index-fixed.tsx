import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Eye, Plus, Trash2, Users } from 'lucide-react';

interface Community {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

interface CommunitiesIndexProps {
    communities: {
        data: Community[];
        links?: any[];
        meta?: any;
    };
}

export default function CommunitiesIndex({ communities }: CommunitiesIndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus komunitas basis ini?')) {
            router.delete(`/admin/communities/${id}`);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Kelola Komunitas Basis" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Kelola Komunitas Basis</h1>
                        <p className="text-muted-foreground">Kelola semua komunitas basis jemaat ST. Paulus Kwimi</p>
                    </div>
                    <Link href="/admin/communities/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Komunitas
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Komunitas Basis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {!communities || !communities.data || communities.data.length === 0 ? (
                            <div className="py-8 text-center">
                                <p className="text-muted-foreground">Belum ada komunitas basis</p>
                                <Link href="/admin/communities/create">
                                    <Button className="mt-4">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Buat Komunitas Pertama
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="border bg-secondary">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-white">
                                        <TableHead>Nama Komunitas</TableHead>
                                        <TableHead>Tanggal Dibuat</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {communities.data.map((community) => (
                                        <TableRow key={community.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <Users className="h-4 w-4 text-muted-foreground" />
                                                    {community.name}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{formatDate(community.created_at)}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={`/admin/communities/${community.id}`}>
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={`/admin/communities/${community.id}/edit`}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(community.id)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {communities.links && communities.links.length > 3 && (
                    <div className="flex justify-center space-x-2">
                        {communities.links.map((link: any, index: number) => (
                            <Button key={index} variant={link.active ? 'default' : 'outline'} size="sm" disabled={!link.url} asChild={!!link.url}>
                                {link.url ? (
                                    <Link href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} />
                                ) : (
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                )}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
