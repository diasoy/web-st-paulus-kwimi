/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowDown, ArrowUp, ChevronsUpDown, Edit, Eye, Plus, RotateCcw, Search, Trash2, Users } from 'lucide-react';
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
    const [searchTerm, setSearchTerm] = useState<string>(search);

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
        if (field !== sortBy) return <ChevronsUpDown className="ml-1 h-4 w-4" />;
        return sortDir === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />;
    };

    const handleSearch = () => {
        setSearch(searchTerm);
        router.get(
            typeof window !== 'undefined' ? window.location.pathname : '/admin/communities',
            { search: searchTerm, sort: sortBy, direction: sortDir },
            { preserveState: true, replace: true, preserveScroll: true },
        );
    };

    const handleReset = () => {
        setSearch('');
        setSearchTerm('');
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
            <Head title="Komunitas Basis" />

            <div className="dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
                <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">
                    {/* Header Section */}
                    <div className="relative z-10 space-y-4">
                        <div className="text-center">
                            <div className="relative inline-block">
                                <h1 className="mb-4 text-5xl font-bold tracking-tight text-white drop-shadow-lg">Komunitas Basis Gerejawi</h1>
                                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-green-600 to-blue-600 opacity-25 blur"></div>
                            </div>
                            <p className="text-xl font-medium text-white/95 drop-shadow-md">
                                Kelola semua komunitas basis di Gereja ST. Paulus Kwimi
                            </p>
                        </div>
                    </div>

                    {/* Search and Actions */}
                    <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-sm">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div className="max-w-md flex-1">
                                <div className="relative">
                                    <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-white/60" />
                                    <Input
                                        placeholder="Cari komunitas basis..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="h-12 rounded-xl border-white/30 bg-white/10 pl-12 text-lg text-white placeholder:text-white/60 focus:border-blue-400 focus:bg-white/15"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Button
                                    onClick={handleSearch}
                                    className="transform rounded-xl border-0 bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-blue-700"
                                >
                                    <Search className="mr-2 h-5 w-5" />
                                    Cari
                                </Button>
                                {search && (
                                    <Button
                                        onClick={handleReset}
                                        className="rounded-xl border border-white/30 bg-white/20 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-white/30"
                                    >
                                        <RotateCcw className="mr-2 h-4 w-4" />
                                        Reset
                                    </Button>
                                )}
                                <Link href="/admin/communities/create">
                                    <Button
                                        size="lg"
                                        className="transform rounded-xl border-0 bg-gradient-to-r from-green-500 to-green-600 px-8 py-3 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:from-green-600 hover:to-green-700"
                                    >
                                        <Plus className="mr-2 h-5 w-5" />
                                        Tambah Komunitas
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* Content Section */}
                    <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-sm">
                        {communities.data.length === 0 ? (
                            <div className="px-8 py-16 text-center">
                                <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                                    <Users className="h-12 w-12 text-blue-400" />
                                </div>
                                <h3 className="mb-3 text-2xl font-bold text-white">Belum ada komunitas basis</h3>
                                <p className="mx-auto mb-8 max-w-md text-lg text-white/70">
                                    Mulai dengan membuat komunitas basis pertama untuk Gereja ST. Paulus
                                </p>
                                <Link href="/admin/communities/create">
                                    <Button className="transform rounded-xl border-0 bg-gradient-to-r from-green-500 to-green-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-green-600 hover:to-green-700">
                                        <Plus className="mr-3 h-5 w-5" />
                                        Buat Komunitas Pertama
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-white/20 bg-gradient-to-r from-white/10 to-white/5 hover:bg-white/5">
                                            <TableHead className="py-6 pl-8 text-lg font-bold text-white">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleSort('name')}
                                                    className="flex items-center font-bold transition-colors duration-200 hover:text-blue-300"
                                                >
                                                    Nama Komunitas
                                                    <SortIcon field="name" />
                                                </button>
                                            </TableHead>
                                            <TableHead className="py-6 text-lg font-bold text-white">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleSort('users_count')}
                                                    className="flex items-center font-bold transition-colors duration-200 hover:text-green-300"
                                                >
                                                    Anggota
                                                    <SortIcon field="users_count" />
                                                </button>
                                            </TableHead>
                                            <TableHead className="py-6 text-lg font-bold text-white">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleSort('created_at')}
                                                    className="flex items-center font-bold transition-colors duration-200 hover:text-purple-300"
                                                >
                                                    Tanggal Dibuat
                                                    <SortIcon field="created_at" />
                                                </button>
                                            </TableHead>
                                            <TableHead className="py-6 pr-8 text-right text-lg font-bold text-white">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {communities.data.map((community, index) => (
                                            <TableRow
                                                key={community.id}
                                                className={`border-white/10 transition-all duration-300 hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 ${
                                                    index % 2 === 0 ? 'bg-white/5' : 'bg-transparent'
                                                }`}
                                            >
                                                <TableCell className="py-6 pl-8 text-lg font-semibold text-white">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"></div>
                                                        {community.name}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="rounded-xl border border-green-500/30 bg-gradient-to-r from-green-500/20 to-green-600/20 p-2.5">
                                                            <Users className="h-5 w-5 text-green-400" />
                                                        </div>
                                                        <span className="text-lg font-bold text-white">{community.users_count || 0}</span>
                                                        <span className="font-medium text-green-300">anggota</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-6 text-lg font-medium text-white/90">
                                                    {formatDate(community.created_at)}
                                                </TableCell>
                                                <TableCell className="py-6 pr-8 text-right">
                                                    <div className="flex justify-end gap-3">
                                                        <Button
                                                            size="sm"
                                                            asChild
                                                            className="transform rounded-xl border border-blue-500/40 bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 shadow-md transition-all duration-300 hover:scale-105 hover:from-blue-500/30 hover:to-blue-600/30"
                                                        >
                                                            <Link href={`/admin/communities/${community.id}`}>
                                                                <Eye className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            asChild
                                                            className="transform rounded-xl border border-yellow-500/40 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 shadow-md transition-all duration-300 hover:scale-105 hover:from-yellow-500/30 hover:to-orange-500/30"
                                                        >
                                                            <Link href={`/admin/communities/${community.id}/edit`}>
                                                                <Edit className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            onClick={() => handleDelete(community.id)}
                                                            className="transform rounded-xl border border-red-500/40 bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-300 shadow-md transition-all duration-300 hover:scale-105 hover:from-red-500/30 hover:to-red-600/30"
                                                        >
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
                        <div className="flex justify-center">
                            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-sm">
                                <div className="flex items-center gap-3">
                                    {communities.links.map((link: any, index: number) => {
                                        if (link.url) {
                                            return (
                                                <Link
                                                    key={index}
                                                    href={link.url}
                                                    className={`transform rounded-xl px-5 py-3 font-semibold transition-all duration-300 hover:scale-105 ${
                                                        link.active
                                                            ? 'border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl'
                                                            : 'border border-white/30 bg-white/10 text-white hover:bg-white/20'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            );
                                        } else {
                                            return (
                                                <span
                                                    key={index}
                                                    className="cursor-not-allowed rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white/40"
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
