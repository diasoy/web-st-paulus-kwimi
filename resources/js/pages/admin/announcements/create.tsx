import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function AnnouncementsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        content: '',
        image_url: '',
        is_publish: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.announcements.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Pengumuman" />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/announcements">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Tambah Pengumuman</h1>
                        <p className="text-muted-foreground">Buat pengumuman baru untuk jemaat ST. Paulus Kwimi</p>
                    </div>
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
                                        placeholder="Masukkan judul pengumuman"
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
                                        placeholder="Deskripsi singkat pengumuman"
                                        className={errors.description ? 'border-red-500' : ''}
                                        rows={3}
                                        required
                                    />
                                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="content">Konten Detail</Label>
                                    <Textarea
                                        id="content"
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        placeholder="Konten detail pengumuman (opsional)"
                                        className={errors.content ? 'border-red-500' : ''}
                                        rows={6}
                                    />
                                    {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="image_url">URL Gambar</Label>
                                    <Input
                                        id="image_url"
                                        type="url"
                                        value={data.image_url}
                                        onChange={(e) => setData('image_url', e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                        className={errors.image_url ? 'border-red-500' : ''}
                                    />
                                    {errors.image_url && <p className="mt-1 text-sm text-red-500">{errors.image_url}</p>}
                                    <p className="mt-1 text-sm text-muted-foreground">URL gambar untuk pengumuman (opsional)</p>
                                </div>

                                <div className="md:col-span-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="is_publish"
                                            checked={data.is_publish}
                                            onCheckedChange={(checked) => setData('is_publish', checked as boolean)}
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
                                <Link href="/admin/announcements">
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
