/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowDown, ArrowUp, ChevronsUpDown, Edit, Eye, Plus, Search, Trash2, Users } from 'lucide-react';
import { useState } from 'react';

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
    const [search, setSearch] = useState<string>(params.get('search') || '');

    const toggleSort = (field: string) => {
        const nextDir: 'asc' | 'desc' = field === sortBy ? (sortDir === 'asc' ? 'desc' : 'asc') : 'asc';
        setSortBy(field);
        setSortDir(nextDir);
        router.get(
            typeof window !== 'undefined' ? window.location.pathname : '/admin/communities',
            { sort: field, direction: nextDir, search },
            { preserveState: true, replace: true, preserveScroll: true },
        );
    };

    const SortIcon = ({ field }: { field: string }) => {
        if (field !== sortBy) return <ChevronsUpDown className="ml-1 h-4 w-4 " />;
        return sortDir === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />;
    };

    const handleSearch = () => {
        router.get(
            typeof window !== 'undefined' ? window.location.pathname : '/admin/communities',
            { search, sort: sortBy, direction: sortDir },
            { preserveState: true, replace: true, preserveScroll: true },
        );
    };

    const handleReset = () => {
        setSearch('');
        router.get(
            typeof window !== 'undefined' ? window.location.pathname : '/admin/communities',
            { sort: sortBy, direction: sortDir },
            { preserveState: true, replace: true, preserveScroll: true },
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
                        <p className="">Kelola semua komunitas basis jemaat ST. Paulus Kwimi</p>
                    </div>
                </div>
                {/* Search / Filters */}
                <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute top-2.5 left-2.5 h-4 w-4 " />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                placeholder="Cari komunitas..."
                                className="h-9 pl-8 text-sm"
                            />
                        </div>
                        <Button size="sm" className='text-white hover:bg-primary/90' onClick={handleSearch}>
                            Cari
                        </Button>
                        {search && (
                            <Button size="sm" variant="outline" onClick={handleReset}>
                                Reset
                            </Button>
                        )}
                    </div>
                    <Link href="/admin/communities/create" className="shrink-0 sm:ml-4">
                        <Button className="px-2 sm:px-4 text-white hover:bg-primary/90">
                            <Plus className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline" >Tambah Komunitas</span>
                        </Button>
                    </Link>
                </div>
                <div>
                    {communities.data.length === 0 ? (
                        <div className="py-12 text-center">
                            <p className="">Belum ada komunitas basis</p>
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
                                                    <span className="text-sm ">anggota</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm ">{formatDate(community.created_at)}</TableCell>
                                            <TableCell className="pr-6 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="sm" asChild className='bg-secondary hover:bg-secondary/90'>
                                                        <Link href={`/admin/communities/${community.id}`}>
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="outline" size="sm" asChild className='bg-primary hover:bg-primary/90'>
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
                        {communities.links.map((link: any, index: number) => {
                            const baseClass =
                                'px-3 py-1 rounded-md font-medium transition-all duration-150 border cursor-pointer';
                            const activeClass =
                                'bg-secondary text-white border-secondary hover:opacity-80';
                            const inactiveClass =
                                'bg-white text-secondary border-secondary hover:opacity-80';
                            const disabledClass =
                                'bg-secondary  border-secondary opacity-60 cursor-not-allowed';
                            if (link.url) {
                                return (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={
                                            baseClass +
                                            ' ' +
                                            (link.active ? activeClass : inactiveClass)
                                        }
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                );
                            } else {
                                return (
                                    <span
                                        key={index}
                                        className={baseClass + ' ' + disabledClass}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                );
                            }
                        })}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
