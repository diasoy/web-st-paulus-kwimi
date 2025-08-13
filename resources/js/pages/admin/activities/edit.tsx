import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { FormEvent, useRef } from 'react';

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

interface ActivityEditProps {
    activity: Activity;
}

export default function ActivityEdit({ activity }: ActivityEditProps) {
    // Normalize possible "HH:MM:SS" or other time strings to "HH:MM"
    const toHHmm = (val?: string | null) => {
        if (!val) return '';
        if (/^\d{2}:\d{2}/.test(val)) return val.substring(0, 5);
        try {
            const d = new Date(`2000-01-01T${val}`);
            const h = String(d.getHours()).padStart(2, '0');
            const m = String(d.getMinutes()).padStart(2, '0');
            return `${h}:${m}`;
        } catch {
            return '';
        }
    };

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT' as const,
        name: activity.name || '',
        description: activity.description || '',
        date: activity.date || '',
        time_start: toHHmm(activity.time_start),
        location: activity.location || '',
        image: null as File | null,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setData('time_start', toHHmm(data.time_start));
        post(route('admin.activities.update', activity.id), { forceFormData: true, preserveScroll: true });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Edit Kegiatan - ${activity.name}`} />

            <div className="space-y-6 p-6">
                <div className="space-y-2">
                    <nav className="flex items-center text-sm text-muted-foreground">
                        <Link href={route('admin.activities.index')} className="hover:text-foreground">
                            Agenda Kegiatan
                        </Link>
                        <span className="mx-2">/</span>
                        <Link href={route('admin.activities.show', activity.id)} className="hover:text-foreground">
                            Detail
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-foreground">Edit</span>
                    </nav>
                    <h1 className="text-2xl font-bold tracking-tight">Edit Kegiatan</h1>
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

                            <div className="md:col-span-2">
                                {activity.image_url && (
                                    <>
                                        <Label>Gambar Saat Ini</Label>
                                        <div className="mt-2">
                                            <img
                                                src={`/storage/${activity.image_url}`}
                                                alt={activity.name}
                                                className="h-40 rounded-md border object-cover"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <Label htmlFor="image">Ganti Gambar (opsional)</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setData('image', e.target.files && e.target.files[0] ? (e.target.files[0] as unknown as File) : null)
                                    }
                                    className={errors.image ? 'border-red-500' : ''}
                                />
                                {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
