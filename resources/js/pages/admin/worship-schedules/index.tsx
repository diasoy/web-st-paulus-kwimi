import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Clock, Edit, Eye, MapPin, Plus, Trash2 } from 'lucide-react';

interface Community {
    id: number;
    name: string;
}

interface WorshipSchedule {
    id: number;
    nama: string;
    waktu: string;
    hari: string;
    tempat?: string;
    keterangan?: string;
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
            // TODO: Implement delete functionality
            console.log('Delete worship schedule:', id);
        }
    };

    const getDayColor = (hari: string) => {
        const colors: { [key: string]: string } = {
            Minggu: 'bg-red-100 text-red-800',
            Senin: 'bg-blue-100 text-blue-800',
            Selasa: 'bg-green-100 text-green-800',
            Rabu: 'bg-yellow-100 text-yellow-800',
            Kamis: 'bg-purple-100 text-purple-800',
            Jumat: 'bg-pink-100 text-pink-800',
            Sabtu: 'bg-indigo-100 text-indigo-800',
        };
        return colors[hari] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AuthenticatedLayout>
            <Head title="Jadwal Ibadah" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Jadwal Ibadah</h1>
                        <p className="text-muted-foreground">Kelola jadwal ibadah untuk jemaat ST. Paulus Kwimi</p>
                    </div>
                    <Link href="/admin/worship-schedules/create">
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
                                <p className="text-muted-foreground">Belum ada jadwal ibadah</p>
                                <Link href="/admin/worship-schedules/create">
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
                                        <TableHead>Hari</TableHead>
                                        <TableHead>Waktu</TableHead>
                                        <TableHead>Tempat</TableHead>
                                        <TableHead>Komunitas</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {worshipSchedules.data.map((schedule) => (
                                        <TableRow key={schedule.id}>
                                            <TableCell className="font-medium">{schedule.nama}</TableCell>
                                            <TableCell>
                                                <Badge className={getDayColor(schedule.hari)}>{schedule.hari}</Badge>
                                            </TableCell>
                                            <TableCell className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                {schedule.waktu}
                                            </TableCell>
                                            <TableCell>
                                                {schedule.tempat ? (
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="h-4 w-4" />
                                                        {schedule.tempat}
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
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
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={`/admin/worship-schedules/${schedule.id}`}>
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={`/admin/worship-schedules/${schedule.id}/edit`}>
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
