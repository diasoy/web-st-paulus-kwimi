import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, X } from 'lucide-react';
import { FormEventHandler, useRef, useState } from 'react';

interface Announcement {
    id: number;
    title: string;
    description: string;
    image_url?: string | null;
    is_publish: boolean;
}

export default function AnnouncementsEdit({ announcement }: { announcement: Announcement }) {
    const [imageError, setImageError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT' as const,
        title: announcement.title,
        description: announcement.description,
        image: null as File | null,
        is_publish: announcement.is_publish,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.announcements.update', announcement.id), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    // Handler untuk validasi gambar
    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file && file.size > 2 * 1024 * 1024) { // 2MB
            setImageError('Ukuran gambar maksimal 2MB. Silakan pilih gambar lain.');
            setData('image', null);
        } else {
            setImageError('');
            setData('image', file);
        }
    };

    const removeImage = () => {
        setData('image', null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Edit Pengumuman - ${announcement.title}`} />

            <div className="space-y-6 p-6">
                <div className="space-y-2">
                    <nav className="flex items-center text-sm text-muted-foreground">
                        <Link href={route('admin.announcements.index')} className="hover:text-foreground">
                            Pengumuman
                        </Link>
                        <span className="mx-2">/</span>
                        <Link href={route('admin.announcements.show', announcement.id)} className="hover:text-foreground">
                            Detail
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-foreground">Edit</span>
                    </nav>
                    <h1 className="text-2xl font-bold tracking-tight">Edit Pengumuman</h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Pengumuman</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <Label htmlFor="title">Judul Pengumuman *</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className={errors.title ? 'border-red-500' : ''}
                                        required
                                    />
                                    {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="description">Deskripsi Singkat *</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className={errors.description ? 'border-red-500' : ''}
                                        rows={4}
                                        required
                                    />
                                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                                </div>

                                {announcement.image_url && (
                                    <div className="md:col-span-2">
                                        <Label>Gambar Saat Ini</Label>
                                        <div className="mt-2">
                                            <img
                                                src={`/storage/${announcement.image_url}`}
                                                alt={announcement.title}
                                                className="h-40 rounded-md border"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="md:col-span-2">
                                    <Label htmlFor="image">Ganti Gambar (opsional)</Label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            ref={fileInputRef}
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageSelect}
                                            className={errors.image ? 'border-red-500' : ''}
                                        />
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
                                    {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="is_publish"
                                            checked={Boolean(data.is_publish)}
                                            onCheckedChange={(checked) => setData('is_publish', Boolean(checked))}
                                        />
                                        <Label htmlFor="is_publish" className="text-sm">
                                            Publikasikan
                                        </Label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-4">
                                <Link href={route('admin.announcements.show', announcement.id)}>
                                    <Button type="button" variant="outline" className='text-black border hover:bg-muted hover:text-black'>
                                        Batal
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing} className='text-white hover:bg-primary/90'>
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
