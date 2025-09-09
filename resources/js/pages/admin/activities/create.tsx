import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, Upload, X, Calendar, Plus, AlertTriangle, ArrowLeft, Loader2 } from 'lucide-react';
import { FormEventHandler, useRef, useState } from 'react';

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
        setData('time_start', toHHmm(data.time_start));
        post(route('admin.activities.store'), { 
            forceFormData: true, 
            preserveScroll: true 
        });
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
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setImageError('');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Kegiatan" />

            <div className="dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
                <div className="container mx-auto px-4 py-8">
                    {/* Breadcrumb Navigation */}
                    <div className="mb-8">
                        <nav className="flex items-center space-x-2 text-sm">
                            <Link
                                href="/admin/dashboard"
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                Dashboard
                            </Link>
                            <span className="text-white/50">/</span>
                            <Link
                                href="/admin/activities"
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                Agenda Kegiatan
                            </Link>
                            <span className="text-white/50">/</span>
                            <span className="text-white font-medium">Tambah</span>
                        </nav>
                    </div>

                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                                    <Calendar className="h-10 w-10 text-white" />
                                    Tambah Kegiatan
                                </h1>
                                <p className="text-green-100 text-lg">
                                    Buat agenda kegiatan baru untuk jemaat
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                                    <Plus className="h-16 w-16 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
                        <form onSubmit={submit} className="space-y-8">
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <Label htmlFor="name" className="text-base font-bold text-gray-900 dark:text-white mb-2 block">
                                        Nama Kegiatan *
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Contoh: Retreat Remaja"
                                        className={`bg-white dark:bg-slate-800 backdrop-blur-sm border-2 transition-all duration-300 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
                                            errors.name 
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                                : 'border-green-200 dark:border-green-600 focus:border-emerald-500 focus:ring-emerald-200 hover:border-green-300'
                                        } focus:ring-4 focus:ring-offset-2 rounded-xl shadow-sm hover:shadow-md`}
                                        required
                                    />
                                    {errors.name && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <AlertTriangle className="h-4 w-4" />
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="date" className="text-base font-bold text-gray-900 dark:text-white mb-2 block">
                                        Tanggal *
                                    </Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => setData('date', e.target.value)}
                                        className={`bg-white dark:bg-slate-800 backdrop-blur-sm border-2 transition-all duration-300 text-gray-900 dark:text-white ${
                                            errors.date 
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                                : 'border-green-200 dark:border-green-600 focus:border-emerald-500 focus:ring-emerald-200 hover:border-green-300'
                                        } focus:ring-4 focus:ring-offset-2 rounded-xl shadow-sm hover:shadow-md`}
                                        required
                                    />
                                    {errors.date && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <AlertTriangle className="h-4 w-4" />
                                            {errors.date}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="time_start" className="text-base font-bold text-gray-900 dark:text-white mb-2 block">
                                        Waktu Mulai *
                                    </Label>
                                    <Input
                                        id="time_start"
                                        type="time"
                                        value={data.time_start}
                                        onChange={(e) => setData('time_start', e.target.value)}
                                        className={`bg-white dark:bg-slate-800 backdrop-blur-sm border-2 transition-all duration-300 text-gray-900 dark:text-white ${
                                            errors.time_start 
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                                : 'border-green-200 dark:border-green-600 focus:border-emerald-500 focus:ring-emerald-200 hover:border-green-300'
                                        } focus:ring-4 focus:ring-offset-2 rounded-xl shadow-sm hover:shadow-md`}
                                        required
                                    />
                                    {errors.time_start && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <AlertTriangle className="h-4 w-4" />
                                            {errors.time_start}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="location" className="text-base font-bold text-gray-900 dark:text-white mb-2 block">
                                        Lokasi *
                                    </Label>
                                    <Input
                                        id="location"
                                        type="text"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        placeholder="Contoh: Aula Gereja ST. Paulus Kwimi"
                                        className={`bg-white dark:bg-slate-800 backdrop-blur-sm border-2 transition-all duration-300 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
                                            errors.location 
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                                : 'border-green-200 dark:border-green-600 focus:border-emerald-500 focus:ring-emerald-200 hover:border-green-300'
                                        } focus:ring-4 focus:ring-offset-2 rounded-xl shadow-sm hover:shadow-md`}
                                        required
                                    />
                                    {errors.location && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <AlertTriangle className="h-4 w-4" />
                                            {errors.location}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="description" className="text-base font-bold text-gray-900 dark:text-white mb-2 block">
                                        Deskripsi Kegiatan *
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Deskripsi singkat tentang kegiatan..."
                                        className={`bg-white dark:bg-slate-800 backdrop-blur-sm border-2 transition-all duration-300 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
                                            errors.description 
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                                : 'border-green-200 dark:border-green-600 focus:border-emerald-500 focus:ring-emerald-200 hover:border-green-300'
                                        } focus:ring-4 focus:ring-offset-2 rounded-xl shadow-sm hover:shadow-md`}
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
                                    <Label htmlFor="image" className="text-base font-bold text-gray-900 dark:text-white mb-2 block">
                                        Gambar Kegiatan (Opsional)
                                    </Label>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageSelect}
                                                className="hidden"
                                            />
                                            <Button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                                            >
                                                <Upload className="mr-2 h-5 w-5" />
                                                Pilih Gambar
                                            </Button>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                Maksimal 2MB
                                            </span>
                                        </div>

                                        {data.image && (
                                            <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-gray-100 border border-green-200">
                                                <img
                                                    src={URL.createObjectURL(data.image)}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={removeImage}
                                                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-all duration-300 hover:scale-110"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        )}

                                        {imageError && (
                                            <p className="text-sm text-red-600 flex items-center gap-1">
                                                <AlertTriangle className="h-4 w-4" />
                                                {imageError}
                                            </p>
                                        )}
                                        {errors.image && (
                                            <p className="text-sm text-red-600 flex items-center gap-1">
                                                <AlertTriangle className="h-4 w-4" />
                                                {errors.image}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="md:col-span-2 flex justify-end space-x-4 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => window.history.back()}
                                        className="px-8 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md hover:scale-105"
                                    >
                                        <ArrowLeft className="mr-2 h-5 w-5" />
                                        Batal
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        {processing ? (
                                            <>
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                Menyimpan...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-5 w-5" />
                                                Simpan
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
