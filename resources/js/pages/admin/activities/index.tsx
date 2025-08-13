import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Calendar, Clock, Edit, Eye, Image as ImageIcon, MapPin, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Activity {
    id: number;
    name: string;
    description: string;
    date: string;
    time_start: string;
    location?: string;
    created_at: string;
    updated_at: string;
    image_url?: string | null;
}

interface ActivitiesIndexProps {
    activities: {
        data: Activity[];
        links: any[];
        meta: any;
    };
}

export default function ActivitiesIndex({ activities }: ActivitiesIndexProps) {
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const [search, setSearch] = useState<string>(params.get('search') || '');
    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus agenda kegiatan ini?')) {
            router.delete(route('admin.activities.destroy', id));
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (timeString: string) => {
        return new Date(`2000-01-01 ${timeString}`).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };
    return (
        <AuthenticatedLayout>
            <Head title="Agenda Kegiatan" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Agenda Kegiatan</h1>
                        <p className="text-muted-foreground">Kelola agenda kegiatan untuk jemaat ST. Paulus Kwimi</p>
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
                                        route('admin.activities.index'),
                                        { search },
                                        { preserveState: true, replace: true, preserveScroll: true },
                                    )
                                }
                                placeholder="Cari kegiatan..."
                                className="h-9 pl-8 text-sm"
                            />
                        </div>
                        <Button
                            size="sm"
                            onClick={() =>
                                router.get(route('admin.activities.index'), { search }, { preserveState: true, replace: true, preserveScroll: true })
                            }
                        >
                            Cari
                        </Button>
                        {search && (
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                    router.get(route('admin.activities.index'), {}, { preserveState: true, replace: true, preserveScroll: true })
                                }
                            >
                                Reset
                            </Button>
                        )}
                    </div>
                    <Link href={route('admin.activities.create')} className="shrink-0">
                        <Button className="px-2 sm:px-4">
                            <Plus className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Tambah Kegiatan</span>
                        </Button>
                    </Link>
                </div>

                {activities.data.length === 0 ? (
                    <div className="py-8 text-center">
                        <p className="text-muted-foreground">Belum ada agenda kegiatan</p>
                        <Link href="/admin/activities/create">
                            <Button className="mt-4">
                                <Plus className="mr-2 h-4 w-4" />
                                Buat Kegiatan Pertama
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="rounded-md border">
                        <Table>
                            {' '}
                            <TableHeader>
                                <TableRow className="bg-muted/60">
                                    <TableHead>Judul Kegiatan</TableHead>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead>Waktu</TableHead>
                                    <TableHead>Tempat</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {activities.data.map((activity) => (
                                    <TableRow key={activity.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-3">
                                                {activity.image_url ? (
                                                    <img
                                                        src={`/storage/${activity.image_url}`}
                                                        alt={activity.name}
                                                        className="h-10 w-14 rounded object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-10 w-14 items-center justify-center rounded bg-muted text-muted-foreground">
                                                        <ImageIcon className="h-4 w-4" />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-semibold">{activity.name}</div>
                                                    <div className="max-w-xs truncate text-sm text-muted-foreground">{activity.description}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                {formatDate(activity.date)}
                                            </div>
                                        </TableCell>{' '}
                                        <TableCell>
                                            {activity.time_start ? (
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4" />
                                                    {formatTime(activity.time_start)}
                                                </div>
                                            ) : (
                                                <span className="text-muted-foreground">-</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {activity.location ? (
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4" />
                                                    <span className="max-w-xs truncate">{activity.location}</span>
                                                </div>
                                            ) : (
                                                <span className="text-muted-foreground">-</span>
                                            )}{' '}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={route('admin.activities.show', activity.id)}>
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={route('admin.activities.edit', activity.id)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button variant="destructive" size="sm" onClick={() => handleDelete(activity.id)}>
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

                {/* Pagination */}
                {activities.links && activities.links.length > 3 && (
                    <div className="flex justify-center space-x-2">
                        {activities.links.map((link: any, index: number) => (
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
