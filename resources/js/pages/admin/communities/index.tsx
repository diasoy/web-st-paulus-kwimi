import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Edit, Eye, Plus, Trash2, Users, ChevronsUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface Community {
    id: number;
    name: string;
    users_count?: number;
    created_at: string;
    updated_at: string;
}

interface CommunitiesIndexProps {
    communities: {
        data: Community[];
        links: any[];
        meta: any;
    };
}

export default function CommunitiesIndex({ communities }: CommunitiesIndexProps) {
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const [sortBy, setSortBy] = useState<string>(params.get('sort') || 'name');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>((params.get('direction') as 'asc' | 'desc') || 'asc');

    const toggleSort = (field: string) => {
        const nextDir: 'asc' | 'desc' = field === sortBy ? (sortDir === 'asc' ? 'desc' : 'asc') : 'asc';
        setSortBy(field);
        setSortDir(nextDir);
        router.get(
            typeof window !== 'undefined' ? window.location.pathname : '/admin/communities',
            { sort: field, direction: nextDir },
            { preserveState: true, replace: true, preserveScroll: true },
        );
    };

    const SortIcon = ({ field }: { field: string }) => {
        if (field !== sortBy) return <ChevronsUpDown className="ml-1 h-4 w-4 text-muted-foreground" />;
        return sortDir === 'asc' ? (
            <ArrowUp className="ml-1 h-4 w-4" />
        ) : (
            <ArrowDown className="ml-1 h-4 w-4" />
        );
    };
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

            <div className="space-y-6 p-6">
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
                <div>
                    {communities.data.length === 0 ? (
                        <div className="py-12 text-center">
                            <p className="text-muted-foreground">Belum ada komunitas basis</p>
                            <Link href="/admin/communities/create">
                                <Button className="mt-4">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Buat Komunitas Pertama
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/60">
                                        <TableHead className="pl-6">
                                            <button
                                                type="button"
                                                onClick={() => toggleSort('name')}
                                                className="flex items-center font-semibold hover:text-foreground/90"
                                            >
                                                Nama Komunitas
                                                <SortIcon field="name" />
                                            </button>
                                        </TableHead>
                                        <TableHead>
                                            <button
                                                type="button"
                                                onClick={() => toggleSort('users_count')}
                                                className="flex items-center font-semibold hover:text-foreground/90"
                                            >
                                                Anggota
                                                <SortIcon field="users_count" />
                                            </button>
                                        </TableHead>
                                        <TableHead>
                                            <button
                                                type="button"
                                                onClick={() => toggleSort('created_at')}
                                                className="flex items-center font-semibold hover:text-foreground/90"
                                            >
                                                Tanggal Dibuat
                                                <SortIcon field="created_at" />
                                            </button>
                                        </TableHead>
                                        <TableHead className="pr-6 text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {communities.data.map((community) => (
                                        <TableRow key={community.id}>
                                            <TableCell className="pl-6 font-medium">{community.name}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Users className="h-4 w-4" />
                                                    <span className="font-medium">{community.users_count || 0}</span>
                                                    <span className="text-sm text-muted-foreground">anggota</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{formatDate(community.created_at)}</TableCell>
                                            <TableCell className="pr-6 text-right">
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
                </div>
                {/* Pagination */}
                {communities.links && communities.links.length > 3 && (
                    <div className="flex justify-center space-x-2 pt-4">
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
