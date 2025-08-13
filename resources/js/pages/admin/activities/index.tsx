import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Calendar, Clock, Edit, Eye, MapPin, Plus, Trash2, Image as ImageIcon } from 'lucide-react';

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
                    <Link href={route('admin.activities.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Kegiatan
                        </Button>
                    </Link>
                </div>{' '}
                <Card>
                    <CardContent className="p-6">
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
                            <Table>
                                {' '}
                                <TableHeader>
                                    <TableRow>
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
                                                        <img src={`/storage/${activity.image_url}`} alt={activity.name} className="h-10 w-14 rounded object-cover" />
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
                        )}
                    </CardContent>
                </Card>
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
