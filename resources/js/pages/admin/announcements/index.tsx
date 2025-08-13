import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, Eye, Plus, Trash2 } from 'lucide-react';
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
                    <Link href={route('admin.announcements.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Pengumuman
                        </Button>
                    </Link>
                </div>

                {props.flash?.success && (
                    <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{props.flash.success}</div>
                )}
                {props.flash?.error && (
                    <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{props.flash.error}</div>
                )}

                <Card>
                    <CardContent className="p-6">
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
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Judul</TableHead>
                                        <TableHead>Deskripsi</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Tanggal Dibuat</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {announcements.data.map((announcement) => (
                                        <TableRow key={announcement.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-3">
                                                    {announcement.image_url ? (
                                                        <img
                                                            src={`/storage/${announcement.image_url}`}
                                                            alt={announcement.title}
                                                            className="h-10 w-14 rounded object-cover"
                                                        />
                                                    ) : (
                                                        <div className="h-10 w-14 rounded bg-muted" />
                                                    )}
                                                    <span className="font-semibold">{announcement.title}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="max-w-md">
                                                <div className="truncate">{announcement.description}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={announcement.is_publish ? 'default' : 'secondary'}>
                                                    {announcement.is_publish ? 'Published' : 'Draft'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{formatDate(announcement.created_at)}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={route('admin.announcements.show', announcement.id)}>
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="outline" size="sm" asChild>
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
                        )}
                    </CardContent>
                </Card>

                {announcements.links && announcements.links.length > 3 && (
                    <div className="flex justify-center space-x-2">
                        {announcements.links.map((link: any, index: number) => (
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
