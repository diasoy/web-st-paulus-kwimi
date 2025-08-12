import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { ChangeEvent, FormEventHandler } from 'react';

export default function ActivitiesCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        date: '',
        time_start: '',
        location: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.activities.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Agenda Kegiatan" />

            <div className="space-y-6 p-6">
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
                    <CardContent className="p-6">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {' '}
                                <div className="md:col-span-2">
                                    <Label htmlFor="name">Nama Kegiatan *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Masukkan nama kegiatan"
                                        className={errors.name ? 'border-red-500' : ''}
                                        required
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <Label htmlFor="description">Deskripsi Kegiatan *</Label>{' '}
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setData('description', e.target.value)}
                                        placeholder="Deskripsi detail tentang kegiatan"
                                        className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${errors.description ? 'border-red-500' : ''}`}
                                        rows={4}
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
                                </div>{' '}
                                <div>
                                    <Label htmlFor="time_start">Waktu Mulai</Label>
                                    <Input
                                        id="time_start"
                                        type="time"
                                        value={data.time_start}
                                        onChange={(e) => setData('time_start', e.target.value)}
                                        placeholder="Contoh: 08:00"
                                        className={errors.time_start ? 'border-red-500' : ''}
                                    />
                                    {errors.time_start && <p className="mt-1 text-sm text-red-500">{errors.time_start}</p>}
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
                                    {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}{' '}
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
