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
        if (field !== sortBy) return <ChevronsUpDown className="ml-1 h-4 w-4 " />;
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
                <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
                    {/* Header Section */}
                    <div className="relative z-10 space-y-4">
                        <div className="text-center">
                            <div className="relative inline-block">
                                <h1 className="text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-lg">
                                    Komunitas Basis
                                </h1>
                                <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg blur opacity-25"></div>
                            </div>
                            <p className="text-white/95 text-xl font-medium drop-shadow-md">
                                Kelola semua komunitas basis di Gereja ST. Paulus Kwimi
                            </p>
                        </div>
                    </div>

                    {/* Search and Actions */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                            <div className="flex-1 max-w-md">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
                                    <Input
                                        placeholder="Cari komunitas basis..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-12 bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-blue-400 focus:bg-white/15 rounded-xl h-12 text-lg"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Button 
                                    onClick={handleSearch}
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    <Search className="h-5 w-5 mr-2" />
                                    Cari
                                </Button>
                                {search && (
                                    <Button 
                                        onClick={handleReset}
                                        className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                                    >
                                        <RotateCcw className="h-4 w-4 mr-2" />
                                        Reset
                                    </Button>
                                )}
                                <Link href="/admin/communities/create">
                                    <Button 
                                        size="lg"
                                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-xl border-0 px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                                    >
                                        <Plus className="h-5 w-5 mr-2" />
                                        Tambah Komunitas
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* Content Section */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
                        {communities.data.length === 0 ? (
                            <div className="text-center py-16 px-8">
                                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full mb-6">
                                    <Users className="h-12 w-12 text-blue-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">Belum ada komunitas basis</h3>
                                <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
                                    Mulai dengan membuat komunitas basis pertama untuk Gereja ST. Paulus
                                </p>
                                <Link href="/admin/communities/create">
                                    <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                                        <Plus className="mr-3 h-5 w-5" />
                                        Buat Komunitas Pertama
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-white/20 hover:bg-white/5 bg-gradient-to-r from-white/10 to-white/5">
                                            <TableHead className="text-white font-bold pl-8 py-6 text-lg">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleSort('name')}
                                                    className="flex items-center font-bold hover:text-blue-300 transition-colors duration-200"
                                                >
                                                    Nama Komunitas
                                                    <SortIcon field="name" />
                                                </button>
                                            </TableHead>
                                            <TableHead className="text-white font-bold py-6 text-lg">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleSort('users_count')}
                                                    className="flex items-center font-bold hover:text-green-300 transition-colors duration-200"
                                                >
                                                    Anggota
                                                    <SortIcon field="users_count" />
                                                </button>
                                            </TableHead>
                                            <TableHead className="text-white font-bold py-6 text-lg">
                                                <button
                                                    type="button"
                                                    onClick={() => toggleSort('created_at')}
                                                    className="flex items-center font-bold hover:text-purple-300 transition-colors duration-200"
                                                >
                                                    Tanggal Dibuat
                                                    <SortIcon field="created_at" />
                                                </button>
                                            </TableHead>
                                            <TableHead className="text-white font-bold pr-8 text-right py-6 text-lg">Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {communities.data.map((community, index) => (
                                            <TableRow 
                                                key={community.id} 
                                                className={`border-white/10 hover:bg-gradient-to-r hover:from-white/10 hover:to-white/5 transition-all duration-300 ${
                                                    index % 2 === 0 ? 'bg-white/5' : 'bg-transparent'
                                                }`}
                                            >
                                                <TableCell className="pl-8 font-semibold text-white py-6 text-lg">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
                                                        {community.name}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 p-2.5 rounded-xl border border-green-500/30">
                                                            <Users className="h-5 w-5 text-green-400" />
                                                        </div>
                                                        <span className="font-bold text-white text-lg">{community.users_count || 0}</span>
                                                        <span className="text-green-300 font-medium">anggota</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-white/90 py-6 font-medium text-lg">{formatDate(community.created_at)}</TableCell>
                                                <TableCell className="pr-8 text-right py-6">
                                                    <div className="flex justify-end gap-3">
                                                        <Button 
                                                            size="sm" 
                                                            asChild 
                                                            className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 text-blue-300 border border-blue-500/40 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md"
                                                        >
                                                            <Link href={`/admin/communities/${community.id}`}>
                                                                <Eye className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button 
                                                            size="sm" 
                                                            asChild 
                                                            className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 hover:from-yellow-500/30 hover:to-orange-500/30 text-yellow-300 border border-yellow-500/40 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md"
                                                        >
                                                            <Link href={`/admin/communities/${community.id}/edit`}>
                                                                <Edit className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button 
                                                            size="sm" 
                                                            onClick={() => handleDelete(community.id)}
                                                            className="bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 text-red-300 border border-red-500/40 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md"
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
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-xl">
                                <div className="flex items-center gap-3">
                                    {communities.links.map((link: any, index: number) => {
                                        if (link.url) {
                                            return (
                                                <Link
                                                    key={index}
                                                    href={link.url}
                                                    className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                                                        link.active
                                                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl border-0'
                                                            : 'bg-white/10 text-white hover:bg-white/20 border border-white/30'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            );
                                        } else {
                                            return (
                                                <span
                                                    key={index}
                                                    className="px-5 py-3 rounded-xl font-semibold text-white/40 bg-white/5 border border-white/10 cursor-not-allowed"
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
