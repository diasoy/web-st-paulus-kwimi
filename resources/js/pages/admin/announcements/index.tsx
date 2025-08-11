import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Edit, Eye, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Announcement {
    id: number;
    title: string;
    description: string;
    content?: string;
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
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus pengumuman ini?')) {
            // TODO: Implement delete functionality
            console.log('Delete announcement:', id);
        }
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
                    <Link href="/admin/announcements/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Pengumuman
                        </Button>
                    </Link>
                </div>

                <Card>
                    {' '}
                    <CardHeader>
                        <CardTitle>Daftar Pengumuman</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        {announcements.data.length === 0 ? (
                            <div className="py-8 text-center">
                                <p className="text-muted-foreground">Belum ada pengumuman</p>
                                <Link href="/admin/announcements/create">
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
                                                {announcement.title}
                                                {announcement.image_url && <span className="ml-2 text-blue-600">📷</span>}
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
                                                        <Link href={`/admin/announcements/${announcement.id}`}>
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={`/admin/announcements/${announcement.id}/edit`}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(announcement.id)}>
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

                {/* Pagination */}
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
