import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function ActivitiesCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        status: 'planned',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.activities.store'));
    };

    const statusOptions = [
        { value: 'planned', label: 'Direncanakan' },
        { value: 'ongoing', label: 'Berlangsung' },
        { value: 'completed', label: 'Selesai' },
        { value: 'cancelled', label: 'Dibatalkan' },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Agenda Kegiatan" />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/activities">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Tambah Agenda Kegiatan</h1>
                        <p className="text-muted-foreground">Buat agenda kegiatan baru untuk jemaat ST. Paulus Kwimi</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Agenda Kegiatan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <Label htmlFor="title">Judul Kegiatan *</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Masukkan judul kegiatan"
                                        className={errors.title ? 'border-red-500' : ''}
                                        required
                                    />
                                    {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="description">Deskripsi Kegiatan *</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Deskripsi detail tentang kegiatan"
                                        className={errors.description ? 'border-red-500' : ''}
                                        rows={4}
                                        required
                                    />
                                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="date">Tanggal Kegiatan *</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => setData('date', e.target.value)}
                                        className={errors.date ? 'border-red-500' : ''}
                                        required
                                    />
                                    {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="time">Waktu Kegiatan</Label>
                                    <Input
                                        id="time"
                                        type="text"
                                        value={data.time}
                                        onChange={(e) => setData('time', e.target.value)}
                                        placeholder="Contoh: 08:00 - 12:00"
                                        className={errors.time ? 'border-red-500' : ''}
                                    />
                                    {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="location">Lokasi Kegiatan</Label>
                                    <Input
                                        id="location"
                                        type="text"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        placeholder="Contoh: Gereja ST. Paulus Kwimi"
                                        className={errors.location ? 'border-red-500' : ''}
                                    />
                                    {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="status">Status Kegiatan *</Label>
                                    <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                        <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Pilih status kegiatan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {statusOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.status && <p className="mt-1 text-sm text-red-500">{errors.status}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Link href="/admin/activities">
                                    <Button type="button" variant="outline">
                                        Batal
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Menyimpan...' : 'Simpan Kegiatan'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
