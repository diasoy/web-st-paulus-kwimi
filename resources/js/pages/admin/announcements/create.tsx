import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, Upload, X } from 'lucide-react';
import { FormEventHandler, useRef } from 'react';

export default function AnnouncementsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        image: null as File | null,
        is_publish: false as boolean,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.announcements.store'), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);
    };

    const removeImage = () => {
        setData('image', null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Pengumuman" />

            <div className="space-y-6 p-6">
                {/* Opsi 3: Header dengan breadcrumb style (uncomment untuk menggunakan) */}
                <div className="space-y-2">
                    <nav className="flex items-center text-sm text-muted-foreground">
                        <Link href={route('admin.announcements.index')} className="hover:text-foreground">
                            Pengumuman
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-foreground">Tambah Baru</span>
                    </nav>
                    <h1 className="text-2xl font-bold tracking-tight">Tambah Pengumuman</h1>
                </div>

                <Card>
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
                                        placeholder="Masukkan judul pengumuman"
                                        className={errors.title ? 'border-red-500' : ''}
                                        required
                                    />
                                    {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="description">Deskripsi *</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Deskripsi pengumuman"
                                        className={errors.description ? 'border-red-500' : ''}
                                        rows={3}
                                        required
                                    />
                                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
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
                                                id="image-upload"
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => fileInputRef.current?.click()}
                                                className={`${errors.image ? 'border-red-500' : ''}`}
                                            >
                                                <Upload className="mr-2 h-4 w-4" />
                                                Pilih Gambar
                                            </Button>
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
                                        <p className="text-sm text-muted-foreground">Unggah gambar untuk pengumuman (jpg, png, webp).</p>
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="is_publish"
                                            checked={Boolean(data.is_publish)}
                                            onCheckedChange={(checked) => setData('is_publish', Boolean(checked))}
                                        />
                                        <Label htmlFor="is_publish" className="text-sm">
                                            Publikasikan pengumuman
                                        </Label>
                                    </div>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Jika dicentang, pengumuman akan langsung terlihat oleh jemaat
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Link href={route('admin.announcements.index')}>
                                    <Button type="button" variant="outline">
                                        Batal
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Menyimpan...' : 'Simpan Pengumuman'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
