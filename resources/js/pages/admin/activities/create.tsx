import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, Upload, X } from 'lucide-react';
import { ChangeEvent, FormEventHandler, useRef, useState } from 'react';

export default function ActivitiesCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        date: '',
        time_start: '',
        location: '',
        image: null as File | null,
    });
    
    const [imageError, setImageError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Ensure time_start is HH:mm (or empty)
        setData('time_start', toHHmm(data.time_start));
        post(route('admin.activities.store'), { forceFormData: true, preserveScroll: true });
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file && file.size > 2 * 1024 * 1024) {
            setImageError('Ukuran gambar maksimal 2MB. Silakan pilih gambar lain.');
            setData('image', null);
        } else {
            setImageError('');
            setData('image', file);
        }
    };

    const removeImage = () => {
        setData('image', null);
        setImageError('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Agenda Kegiatan" />

            <div className="space-y-6 p-6">
                <div className="space-y-2">
                    <nav className="flex items-center text-sm text-muted-foreground">
                        <Link href={route('admin.activities.index')} className="hover:text-foreground">
                            Agenda Kegiatan
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-foreground">Tambah Baru</span>
                    </nav>
                    <h1 className="text-2xl font-bold tracking-tight">Tambah Agenda Kegiatan</h1>
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
                                        value={toHHmm(data.time_start)}
                                        onChange={(e) => setData('time_start', toHHmm(e.target.value))}
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
                                <div className="md:col-span-2">
                                    <Label>Gambar (opsional)</Label>
                                    <div className="mt-2 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageSelect}
                                                className="hidden"
                                                id="activity-image-upload"
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => fileInputRef.current?.click()}
                                                className={`${errors.image ? 'border-red-500' : ''}
                                                hover:cursor-pointer hover:bg-white text-black hover:text-black`}
                                            >
                                                <Upload className="mr-2 h-4 w-4" />
                                                Pilih Gambar
                                            </Button>
                                            {imageError && (
                                                <div style={{ color: 'red', fontSize: '0.875rem', marginLeft: 8 }}>{imageError}</div>
                                            )}
                                            {data.image && (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-muted-foreground">{data.image.name}</span>
                                                    <Button type="button" variant="ghost" size="sm" onClick={removeImage} className="h-6 w-6 p-0">
                                                        <X className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                        {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                                        <p className="text-sm text-muted-foreground">Unggah gambar (jpg, png, webp).</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Link href="/admin/activities">
                                    <Button type="button" variant="outline" className='bg-white border hover:bg-white hover:cursor-pointer text-black hover:text-black'>
                                        Batal
                                    </Button>
                                </Link>
                                <Button type="submit" className='bg-primary text-white hover:bg-primary/80' disabled={processing}>
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
