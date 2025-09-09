import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, Upload, X, AlertTriangle } from 'lucide-react';
import { FormEventHandler, useRef } from 'react';
import { useState } from 'react';

export default function AnnouncementsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        image: null as File | null,
        is_publish: false as boolean,
    });
        const [imageError, setImageError] = useState('');

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
            <Head title="Tambah Pengumuman" />

            <div className="dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
                <div className="mx-auto max-w-4xl px-6 py-8 space-y-8">
                    {/* Header Section */}
                    <div className="relative z-10 space-y-4">
                        <nav className="flex items-center text-sm font-medium">
                            <Link 
                                href={route('admin.announcements.index')} 
                                className="text-white/90 hover:text-white transition-colors duration-200 flex items-center gap-1"
                            >
                                <span>← Kembali ke Daftar Pengumuman</span>
                            </Link>
                        </nav>
                        <div className="text-center">
                            <div className="relative inline-block">
                                <h1 className="text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-lg">
                                    Tambah Pengumuman
                                </h1>
                                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg blur opacity-25"></div>
                            </div>
                            <p className="text-white/95 text-xl font-medium drop-shadow-md">
                                Buat pengumuman baru untuk jemaat ST. Paulus Kwimi
                            </p>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="bg-white/95 backdrop-blur-lg rounded-3xl overflow-hidden border border-gray-200/50 shadow-2xl">
                        <div className="bg-gradient-to-r from-orange-500/90 to-red-500/90 p-8 border-b border-gray-200/50">
                            <div className="flex items-center gap-4">
                                <div className="bg-white/20 p-3 rounded-xl">
                                    <Upload className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-1">Informasi Pengumuman</h2>
                                    <p className="text-white/90 text-lg">Isi detail pengumuman yang akan dipublikasikan</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8">
                        <form onSubmit={submit} className="space-y-8">
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <Label htmlFor="title" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        Judul Pengumuman *
                                    </Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Masukkan judul pengumuman"
                                        className={`mt-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 transition-all duration-300 ${
                                            errors.title 
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                                : 'border-orange-200 dark:border-orange-600 focus:border-orange-500 focus:ring-orange-200 hover:border-orange-300'
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
                                    <Label htmlFor="description" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        Deskripsi *
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Deskripsi pengumuman"
                                        className={`mt-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 transition-all duration-300 ${
                                            errors.description 
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                                : 'border-orange-200 dark:border-orange-600 focus:border-orange-500 focus:ring-orange-200 hover:border-orange-300'
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

                                <div className="md:col-span-2">
                                    <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        Gambar (opsional)
                                    </Label>
                                    <div className="mt-3 space-y-4">
                                        <div className="flex items-center gap-4">
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
                                                className={`bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                                                    errors.image ? 'ring-2 ring-red-300' : ''
                                                }`}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <Upload className="mr-2 h-4 w-4" />
                                                <span>Pilih Gambar</span>
                                            </Button>
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
                                        {errors.image && (
                                            <p className="text-sm text-red-600 flex items-center gap-1">
                                                <AlertTriangle className="h-4 w-4" />
                                                {errors.image}
                                            </p>
                                        )}
                                        <p className="text-sm text-slate-600 dark:text-slate-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-700">
                                            💡 Unggah gambar untuk pengumuman (jpg, png, webp). Ukuran maksimal 2MB.
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
                                            <Label htmlFor="is_publish" className="text-sm font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                                                Publikasikan pengumuman
                                            </Label>
                                        </div>
                                        <p className="mt-2 ml-7 text-sm text-slate-600 dark:text-slate-400">
                                            ✨ Jika dicentang, pengumuman akan langsung terlihat oleh jemaat
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <Link href={route('admin.announcements.index')}>
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        className="bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
                                    >
                                        Batal
                                    </Button>
                                </Link>
                                <Button 
                                    type="submit" 
                                    disabled={processing} 
                                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                                >
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Menyimpan...' : 'Simpan Pengumuman'}
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
