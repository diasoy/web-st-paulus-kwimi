import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { FormEvent } from 'react';

interface Activity {
    id: number;
    name: string;
    description: string;
    date: string;
    time_start: string;
    location?: string;
    created_at: string;
    updated_at: string;
}

interface ActivityEditProps {
    activity: Activity;
}

export default function ActivityEdit({ activity }: ActivityEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: activity.name || '',
        description: activity.description || '',
        date: activity.date || '',
        time_start: activity.time_start || '',
        location: activity.location || '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(`/admin/activities/${activity.id}`);
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Edit Kegiatan - ${activity.name}`} />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <Link href={`/admin/activities/${activity.id}`}>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Edit Kegiatan</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama Kegiatan *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Masukkan nama kegiatan"
                                        required
                                    />
                                    {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="location">Tempat</Label>
                                    <Input
                                        id="location"
                                        type="text"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        placeholder="Masukkan tempat kegiatan"
                                    />
                                    {errors.location && <p className="text-sm text-red-600">{errors.location}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="date">Tanggal *</Label>
                                    <Input id="date" type="date" value={data.date} onChange={(e) => setData('date', e.target.value)} required />
                                    {errors.date && <p className="text-sm text-red-600">{errors.date}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="time_start">Waktu Mulai</Label>
                                    <Input
                                        id="time_start"
                                        type="time"
                                        value={data.time_start}
                                        onChange={(e) => setData('time_start', e.target.value)}
                                        placeholder="Contoh: 08:00"
                                    />
                                    {errors.time_start && <p className="text-sm text-red-600">{errors.time_start}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Deskripsi</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Masukkan deskripsi kegiatan"
                                    rows={5}
                                />
                                {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </Button>
                                <Link href={`/admin/activities/${activity.id}`}>
                                    <Button type="button" variant="outline">
                                        Batal
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
