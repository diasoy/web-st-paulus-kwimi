import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Calendar, Clock, Edit, Eye, Plus, Trash2, User } from 'lucide-react';

interface Community {
    id: number;
    name: string;
}

interface WorshipSchedule {
    id: number;
    name: string;
    date: string;
    pic: string;
    time_start: string;
    created_at: string;
    updated_at: string;
    communities: Community[];
}

interface WorshipSchedulesIndexProps {
    worshipSchedules: {
        data: WorshipSchedule[];
        links: any[];
        meta: any;
    };
}

export default function WorshipSchedulesIndex({ worshipSchedules }: WorshipSchedulesIndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus jadwal ibadah ini?')) {
            router.delete(route('admin.worship-schedules.destroy', id));
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (timeString: string) => {
        return timeString.substring(0, 5); // Get HH:MM from HH:MM:SS
    };

    return (
        <AuthenticatedLayout>
            <Head title="Jadwal Ibadah" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Jadwal Ibadah</h1>
                        <p className="text-muted-foreground">Kelola jadwal ibadah untuk jemaat ST. Paulus Kwimi</p>
                    </div>{' '}
                    <Link href={route('admin.worship-schedules.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Jadwal
                        </Button>
                    </Link>
                </div>

                <Card>
                    {' '}
                    <CardHeader>
                        <CardTitle>Daftar Jadwal Ibadah</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        {worshipSchedules.data.length === 0 ? (
                            <div className="py-8 text-center">
                                <p className="text-muted-foreground">Belum ada jadwal ibadah</p>{' '}
                                <Link href={route('admin.worship-schedules.create')}>
                                    <Button className="mt-4">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Buat Jadwal Pertama
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama Ibadah</TableHead>
                                        <TableHead>Tanggal</TableHead>
                                        <TableHead>Waktu</TableHead>
                                        <TableHead>Penanggung Jawab</TableHead>
                                        <TableHead>Komunitas</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {worshipSchedules.data.map((schedule) => (
                                        <TableRow key={schedule.id}>
                                            <TableCell className="font-medium">{schedule.name}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4" />
                                                    {formatDate(schedule.date)}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4" />
                                                    {formatTime(schedule.time_start)}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4" />
                                                    {schedule.pic}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {schedule.communities && schedule.communities.length > 0 ? (
                                                    <div className="flex flex-wrap gap-1">
                                                        {schedule.communities.slice(0, 2).map((community) => (
                                                            <Badge key={community.id} variant="secondary" className="text-xs">
                                                                {community.name}
                                                            </Badge>
                                                        ))}
                                                        {schedule.communities.length > 2 && (
                                                            <Badge variant="outline" className="text-xs">
                                                                +{schedule.communities.length - 2}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground">Semua komunitas</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={route('admin.worship-schedules.show', schedule.id)}>
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={route('admin.worship-schedules.edit', schedule.id)}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(schedule.id)}>
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
                {worshipSchedules.links && worshipSchedules.links.length > 3 && (
                    <div className="flex justify-center space-x-2">
                        {worshipSchedules.links.map((link: any, index: number) => (
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
