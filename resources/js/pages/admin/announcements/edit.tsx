import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, X, AlertTriangle, Edit3 } from 'lucide-react';
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

            <div className="dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
                <div className="container mx-auto px-4 py-8">
                    {/* Breadcrumb Navigation */}
                    <nav className="flex items-center text-sm text-white/80 mb-6">
                        <Link href={route('admin.announcements.index')} className="hover:text-white transition-colors">
                            Pengumuman
                        </Link>
                        <span className="mx-2 text-white/60">/</span>
                        <Link href={route('admin.announcements.show', announcement.id)} className="hover:text-white transition-colors">
                            Detail
                        </Link>
                        <span className="mx-2 text-white/60">/</span>
                        <span className="text-white font-medium">Edit</span>
                    </nav>

                    {/* Header Section */}
                    <div className="bg-white/95 backdrop-blur-lg rounded-3xl overflow-hidden border border-gray-200/50 shadow-2xl">
                        <div className="bg-gradient-to-r from-yellow-500/90 to-orange-500/90 p-8 border-b border-gray-200/50">
                            <div className="flex items-center gap-4">
                                <div className="bg-white/20 p-3 rounded-xl">
                                    <Edit3 className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-1">Edit Pengumuman</h2>
                                    <p className="text-white/90 text-lg">Perbarui informasi pengumuman</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8">
                        <form onSubmit={submit} className="space-y-8">
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <Label htmlFor="title" className="text-base font-bold text-gray-900 dark:text-white mb-2 block">
                                        Judul Pengumuman *
                                    </Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className={`mt-2 bg-white dark:bg-slate-800 backdrop-blur-sm border-2 transition-all duration-300 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
                                            errors.title 
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                                : 'border-yellow-200 dark:border-yellow-600 focus:border-orange-500 focus:ring-orange-200 hover:border-yellow-300'
                                        } focus:ring-4 focus:ring-offset-2 rounded-xl shadow-sm hover:shadow-md`}
                                        required
                                    />
                                    {errors.title && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <AlertTriangle className="h-4 w-4" />
                                            {errors.title}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="description" className="text-base font-bold text-gray-900 dark:text-white mb-2 block">
                                        Deskripsi Singkat *
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className={`mt-2 bg-white dark:bg-slate-800 backdrop-blur-sm border-2 transition-all duration-300 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
                                            errors.description 
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                                : 'border-yellow-200 dark:border-yellow-600 focus:border-orange-500 focus:ring-orange-200 hover:border-yellow-300'
                                        } focus:ring-4 focus:ring-offset-2 rounded-xl shadow-sm hover:shadow-md resize-none`}
                                        rows={4}
                                        required
                                    />
                                    {errors.description && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <AlertTriangle className="h-4 w-4" />
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                {announcement.image_url && (
                                    <div className="md:col-span-2">
                                        <Label className="text-base font-bold text-gray-900 dark:text-white mb-2 block">
                                            Gambar Saat Ini
                                        </Label>
                                        <div className="mt-3">
                                            <div className="relative inline-block">
                                                <img
                                                    src={announcement.image_url}
                                                    alt={announcement.title}
                                                    className="h-40 w-auto rounded-xl border-2 border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="md:col-span-2">
                                    <Label htmlFor="image" className="text-base font-bold text-gray-900 dark:text-white mb-2 block">
                                        Ganti Gambar (opsional)
                                    </Label>
                                    <div className="mt-3 space-y-3">
                                        <div className="flex items-center gap-4">
                                            <input
                                                ref={fileInputRef}
                                                id="image"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageSelect}
                                                className={`bg-white dark:bg-slate-800 backdrop-blur-sm border-2 transition-all duration-300 text-gray-900 dark:text-white ${
                                                    errors.image 
                                                        ? 'border-red-300 focus:border-red-500' 
                                                        : 'border-yellow-200 dark:border-yellow-600 focus:border-orange-500 hover:border-yellow-300'
                                                } focus:ring-4 focus:ring-offset-2 focus:ring-orange-200 rounded-xl shadow-sm hover:shadow-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-yellow-500 file:to-orange-500 file:text-white hover:file:from-yellow-600 hover:file:to-orange-600 file:cursor-pointer`}
                                            />
                                            {imageError && (
                                                <div className="flex items-center gap-1 text-red-600 text-sm">
                                                    <AlertTriangle className="h-4 w-4" />
                                                    {imageError}
                                                </div>
                                            )}
                                            {data.image && (
                                                <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg border border-green-200 dark:border-green-700">
                                                    <span className="text-sm text-green-700 dark:text-green-300 font-medium">{data.image.name}</span>
                                                    <Button 
                                                        type="button" 
                                                        variant="ghost" 
                                                        size="sm" 
                                                        onClick={removeImage} 
                                                        className="h-6 w-6 p-0 text-green-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-700">
                                            💡 Pilih gambar baru jika ingin mengganti yang sudah ada. Format: JPG, PNG, WEBP. Ukuran maksimal 2MB.
                                        </p>
                                    </div>
                                </div>

                                <div className="md:col-span-2">
                                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-700">
                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                id="is_publish"
                                                checked={Boolean(data.is_publish)}
                                                onCheckedChange={(checked) => setData('is_publish', Boolean(checked))}
                                                className="border-2 border-blue-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                                            />
                                            <Label htmlFor="is_publish" className="text-base font-bold text-gray-900 dark:text-white cursor-pointer">
                                                Publikasikan pengumuman
                                            </Label>
                                        </div>
                                        <p className="mt-2 ml-7 text-sm font-medium text-gray-800 dark:text-gray-200">
                                            ✨ Jika dicentang, pengumuman akan langsung terlihat oleh jemaat
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <Link href={route('admin.announcements.show', announcement.id)}>
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        className="bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400 hover:text-gray-800 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
                                    >
                                        Batal
                                    </Button>
                                </Link>
                                <Button 
                                    type="submit" 
                                    disabled={processing} 
                                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                                >
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </Button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
