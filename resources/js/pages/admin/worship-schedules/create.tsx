import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, Calendar, Plus, AlertTriangle, ArrowLeft, Loader2, Users } from 'lucide-react';
import { FormEventHandler } from 'react';

interface Community {
    id: number;
    name: string;
}

interface WorshipSchedulesCreateProps {
    communities: Community[];
}

export default function WorshipSchedulesCreate({ communities }: WorshipSchedulesCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        date: '',
        pic: '',
        time_start: '',
        description: '',
        communities: [] as number[],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.worship-schedules.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Jadwal Ibadah" />

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
                                href="/admin/worship-schedules"
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                Jadwal Ibadah
                            </Link>
                            <span className="text-white/50">/</span>
                            <span className="text-white font-medium">Tambah</span>
                        </nav>
                    </div>

                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                                    <Calendar className="h-10 w-10 text-white" />
                                    Tambah Jadwal Ibadah
                                </h1>
                                <p className="text-emerald-100 text-lg">
                                    Buat jadwal ibadah baru untuk komunitas gereja
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
                                        Nama Ibadah *
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Contoh: Ibadah Minggu Pagi"
                                        className={`bg-white dark:bg-slate-800 backdrop-blur-sm border-2 transition-all duration-300 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
                                            errors.name 
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                                : 'border-emerald-200 dark:border-emerald-600 focus:border-teal-500 focus:ring-teal-200 hover:border-emerald-300'
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
                                                : 'border-emerald-200 dark:border-emerald-600 focus:border-teal-500 focus:ring-teal-200 hover:border-emerald-300'
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
                                                : 'border-emerald-200 dark:border-emerald-600 focus:border-teal-500 focus:ring-teal-200 hover:border-emerald-300'
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
                                    <Label htmlFor="pic" className="text-base font-bold text-gray-900 dark:text-white mb-2 block">
                                        Pemimpin *
                                    </Label>
                                    <Input
                                        id="pic"
                                        type="text"
                                        value={data.pic}
                                        onChange={(e) => setData('pic', e.target.value)}
                                        placeholder="Contoh: Pastor John Doe"
                                        className={`bg-white dark:bg-slate-800 backdrop-blur-sm border-2 transition-all duration-300 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
                                            errors.pic 
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                                : 'border-emerald-200 dark:border-emerald-600 focus:border-teal-500 focus:ring-teal-200 hover:border-emerald-300'
                                        } focus:ring-4 focus:ring-offset-2 rounded-xl shadow-sm hover:shadow-md`}
                                        required
                                    />
                                    {errors.pic && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <AlertTriangle className="h-4 w-4" />
                                            {errors.pic}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="description" className="text-base font-bold text-gray-900 dark:text-white mb-2 block">
                                        Deskripsi Ibadah (Opsional)
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Deskripsi singkat tentang ibadah..."
                                        className={`bg-white dark:bg-slate-800 backdrop-blur-sm border-2 transition-all duration-300 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 ${
                                            errors.description 
                                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                                : 'border-emerald-200 dark:border-emerald-600 focus:border-teal-500 focus:ring-teal-200 hover:border-emerald-300'
                                        } focus:ring-4 focus:ring-offset-2 rounded-xl shadow-sm hover:shadow-md`}
                                        rows={4}
                                    />
                                    {errors.description && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                            <AlertTriangle className="h-4 w-4" />
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                        <Users className="h-6 w-6 text-emerald-600" />
                                        Komunitas yang Berpartisipasi
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {communities.map((community) => (
                                            <div 
                                                key={community.id} 
                                                className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-emerald-200 dark:border-emerald-600 rounded-xl p-4 hover:shadow-lg hover:border-teal-300 transition-all duration-300 hover:scale-105"
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <Checkbox
                                                        id={`community-${community.id}`}
                                                        checked={data.communities.includes(community.id)}
                                                        onCheckedChange={(checked) => {
                                                            if (checked) {
                                                                setData('communities', [...data.communities, community.id]);
                                                            } else {
                                                                setData('communities', data.communities.filter(id => id !== community.id));
                                                            }
                                                        }}
                                                        className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                                                    />
                                                    <Label 
                                                        htmlFor={`community-${community.id}`}
                                                        className="text-gray-900 dark:text-white font-medium cursor-pointer group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors"
                                                    >
                                                        {community.name}
                                                    </Label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.communities && (
                                        <p className="mt-3 text-sm text-red-600 flex items-center gap-1">
                                            <AlertTriangle className="h-4 w-4" />
                                            {errors.communities}
                                        </p>
                                    )}
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
                                        className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
