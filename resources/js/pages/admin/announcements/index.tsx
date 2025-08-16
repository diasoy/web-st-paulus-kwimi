/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowDown, ArrowUp, ChevronsUpDown, Edit, Eye, Image as ImageIcon, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Announcement {
    id: number;
    title: string;
    description: string;
    image_url?: string;
    is_publish: boolean;
    created_at: string;
    updated_at: string;
}

interface AnnouncementsIndexProps {
    announcements: {
        data: Announcement[];
        links: any[];
        meta: any;
    };
}

export default function AnnouncementsIndex({ announcements }: AnnouncementsIndexProps) {
    const { props } = usePage<{ flash?: { success?: string; error?: string } }>();
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const [search, setSearch] = useState<string>(params.get('search') || '');
    const [sortBy, setSortBy] = useState<string>(params.get('sort') || 'created_at');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>((params.get('direction') as 'asc' | 'desc') || 'desc');

    const toggleSort = (field: string) => {
        const nextDir: 'asc' | 'desc' = field === sortBy ? (sortDir === 'asc' ? 'desc' : 'asc') : 'asc';
        setSortBy(field);
        setSortDir(nextDir);
        router.get(
            route('admin.announcements.index'),
            { search, sort: field, direction: nextDir },
            { preserveState: true, replace: true, preserveScroll: true },
        );
    };

    const SortIcon = ({ field }: { field: string }) => {
        if (field !== sortBy) return <ChevronsUpDown className="ml-1 h-4 w-4 text-muted-foreground" />;
        return sortDir === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />;
    };

    const handleDelete = (id: number, title: string) => {
        if (!confirm(`Hapus pengumuman:\n\n"${title}"?`)) return;
        setDeletingId(id);
        router.delete(route('admin.announcements.destroy', id), {
            preserveScroll: true,
            onFinish: () => setDeletingId(null),
        });
    };

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
            <Head title="Kelola Pengumuman" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Kelola Pengumuman</h1>
                        <p className="text-muted-foreground">Kelola semua pengumuman untuk jemaat ST. Paulus Kwimi</p>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) =>
                                    e.key === 'Enter' &&
                                    router.get(
                                        route('admin.announcements.index'),
                                        { search, sort: sortBy, direction: sortDir },
                                        { preserveState: true, replace: true, preserveScroll: true },
                                    )
                                }
                                placeholder="Cari pengumuman..."
                                className="h-9 pl-8 text-sm"
                            />
                        </div>
                        <Button
                            size="sm"
                            className='bg-primary hover:bg-primary/90 text-white'
                            onClick={() =>
                                router.get(
                                    route('admin.announcements.index'),
                                    { search, sort: sortBy, direction: sortDir },
                                    { preserveState: true, replace: true, preserveScroll: true },
                                )
                            }
                        >
                            Cari
                        </Button>
                        {search && (
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                    router.get(
                                        route('admin.announcements.index'),
                                        { sort: sortBy, direction: sortDir },
                                        { preserveState: true, replace: true, preserveScroll: true },
                                    )
                                }
                            >
                                Reset
                            </Button>
                        )}
                    </div>
                    <Link href={route('admin.announcements.create')} className="shrink-0">
                        <Button className="px-2 sm:px-4 text-white bg-primary hover:bg-primary/90">
                            <Plus className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Tambah Pengumuman</span>
                        </Button>
                    </Link>
                </div>

                {props.flash?.success && (
                    <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{props.flash.success}</div>
                )}
                {props.flash?.error && (
                    <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{props.flash.error}</div>
                )}

                {announcements.data.length === 0 ? (
                    <div className="py-8 text-center">
                        <p className="text-muted-foreground">Belum ada pengumuman</p>
                        <Link href={route('admin.announcements.create')}>
                            <Button className="mt-4">
                                <Plus className="mr-2 h-4 w-4" />
                                Buat Pengumuman Pertama
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/60">
                                    <TableHead>Gambar</TableHead>
                                    <TableHead>
                                        <button
                                            type="button"
                                            onClick={() => toggleSort('title')}
                                            className="flex items-center font-semibold hover:text-foreground/90"
                                        >
                                            Judul
                                            <SortIcon field="title" />
                                        </button>
                                    </TableHead>
                                    <TableHead>Deskripsi</TableHead>
                                    <TableHead>
                                        <button
                                            type="button"
                                            onClick={() => toggleSort('is_publish')}
                                            className="flex items-center font-semibold hover:text-foreground/90"
                                        >
                                            Status
                                            <SortIcon field="is_publish" />
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
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {announcements.data.map((announcement) => (
                                    <TableRow key={announcement.id}>
                                        <TableCell>
                                            {announcement.image_url ? (
                                                <img
                                                    src={`/storage/${announcement.image_url}`}
                                                    alt={announcement.title}
                                                    className="h-10 w-14 rounded object-cover"
                                                    onError={(e) => {
                                                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                                                        const fallback = (e.currentTarget.nextSibling as HTMLElement) || null;
                                                        if (fallback) fallback.style.display = 'flex';
                                                    }}
                                                />
                                            ) : null}
                                            <div
                                                className="flex h-10 w-14 items-center justify-center rounded bg-muted text-muted-foreground"
                                                style={{ display: announcement.image_url ? 'none' : 'flex' }}
                                            >
                                                <ImageIcon className="h-4 w-4" />
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">{announcement.title}</TableCell>
                                        <TableCell className="max-w-md">
                                            <div className="truncate">{announcement.description}</div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className='text-white' variant={announcement.is_publish ? 'default' : 'secondary'}>
                                                {announcement.is_publish ? 'Dipublish' : 'Draft'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">{formatDate(announcement.created_at)}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="outline" size="sm" asChild className='bg-secondary hover:bg-secondary/90'>
                                                    <Link href={route('admin.announcements.show', announcement.id)}>
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button variant="outline" size="sm" asChild className='bg-primary hover:bg-primary/90'>
                                                    <Link href={route('admin.announcements.edit', announcement.id)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(announcement.id, announcement.title)}
                                                    disabled={deletingId === announcement.id}
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

                {announcements.links && announcements.links.length > 3 && (
                    <div className="flex justify-center space-x-2">
                        {announcements.links.map((link: any, index: number) => {
                            const baseClass =
                                'px-3 py-1 rounded-md font-medium transition-all duration-150 border cursor-pointer';
                            const activeClass =
                                'bg-secondary text-white border-secondary hover:opacity-80';
                            const inactiveClass =
                                'bg-white text-secondary border-secondary hover:opacity-80';
                            const disabledClass =
                                'bg-secondary text-muted-foreground border-secondary opacity-60 cursor-not-allowed';
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
