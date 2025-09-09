/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, Upload } from 'lucide-react';
import { FormEvent } from 'react';

interface UserEdit {
    id: number;
    name: string;
    username: string;
    birth_place?: string;
    address?: string;
    birth_date?: string;
    gender: 'male' | 'female';
    role: string;
    status: 'active' | 'inactive';
    community_id?: number | null;
    created_at: string;
    pdfs?: any[];
}

interface Community {
    id: number;
    name: string;
}

interface UserEditProps {
    user: UserEdit;
    communities: Community[];
}

export default function UserEdit({ user, communities }: UserEditProps) {
    console.log('UserEdit called with:', { user, communities });
    console.log('DEBUG birth_place:', user.birth_place);

    // Protective check
    if (!user) {
        return (
            <AuthenticatedLayout>
                <Head title="Edit Umat" />
                <div className="p-6">
                    <p>Data Umat tidak ditemukan.</p>
                </div>
            </AuthenticatedLayout>
        );
    }

    // Format birth_date to yyyy-MM-dd for input type="date"
    const formatBirthDate = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const initialPdfs = Array.isArray(user.pdfs) ? user.pdfs : [];
    
    // Initialize 4 slots for PDFs, matching backend structure
    const initialPdfSlots = [null, null, null, null];
    initialPdfs.forEach((pdf, index) => {
        if (index < 4) {
            initialPdfSlots[index] = pdf;
        }
    });
    
    console.log('PDF Debug:', { initialPdfs, initialPdfSlots, userPdfs: user.pdfs });

    const { data, setData, post, processing, errors } = useForm<{
        name: string;
        username: string;
        birth_place: string;
        address: string;
        birth_date: string;
        gender: 'male' | 'female';
        status: 'active' | 'inactive';
        community_id: number | null;
        pdfs: (File | null)[];
        existingPdfs: any[];
        removePdf: boolean[];
        _method: string;
    }>({
        name: user.name ?? '',
        username: user.username ?? '',
        birth_place: user.birth_place ?? '',
        address: user.address ?? '',
        birth_date: formatBirthDate(user.birth_date),
        gender: user.gender ?? 'male',
        status: user.status ?? 'active',
        community_id: user.community_id ?? null,
        pdfs: [null, null, null, null],
        existingPdfs: initialPdfSlots,
        removePdf: [false, false, false, false],
        _method: 'PUT',
    });

    const handleSinglePdfChange = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        const newPdfs = [...data.pdfs];
        newPdfs[idx] = file;
        setData('pdfs', newPdfs);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.users.update', user.id), { 
            forceFormData: true, 
            preserveScroll: true,
            onSuccess: () => {
                // Reset form or show success message
            },
            onError: (errors) => {
                console.error('Form submission errors:', errors);
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Edit Umat - ${user.name}`} />

            <div className="dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
                <div className="mx-auto max-w-4xl px-6 py-8 space-y-8">
                    {/* Header Section */}
                    <div className="relative z-10 space-y-4">
                        <nav className="flex items-center text-sm font-medium">
                            <Link 
                                href={route('admin.users')} 
                                className="text-white/90 hover:text-white transition-colors duration-200 flex items-center gap-1"
                            >
                                <span>← Kembali ke Daftar Umat</span>
                            </Link>
                        </nav>
                        <div className="text-center">
                            <div className="relative inline-block">
                                <h1 className="text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-lg">
                                    Edit Data Umat
                                </h1>
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25"></div>
                            </div>
                            <p className="text-white/95 text-xl font-medium drop-shadow-md">
                                Perbarui informasi umat: <span className="font-semibold text-blue-300">{user.name}</span>
                            </p>
                        </div>
                    </div>
                    <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
                    <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-white/5 blur-xl"></div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Information Card */}
                        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white p-6">
                                <h2 className="text-2xl font-bold flex items-center gap-3">
                                    <div className="rounded-full bg-white/20 p-2">
                                        <Save className="h-5 w-5 text-white" />
                                    </div>
                                    Informasi Dasar
                                </h2>
                            </div>
                            <div className="p-8">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Nama Lengkap *</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl bg-white text-gray-900 placeholder-gray-500"
                                            placeholder="Masukkan nama lengkap"
                                        />
                                        {errors.name && <p className="text-sm text-red-500 font-medium">{errors.name}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="username" className="text-sm font-semibold text-gray-700">Username *</Label>
                                        <Input
                                            id="username"
                                            type="text"
                                            value={data.username}
                                            onChange={(e) => setData('username', e.target.value)}
                                            className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl bg-white text-gray-900 placeholder-gray-500"
                                            placeholder="Masukkan username"
                                        />
                                        {errors.username && <p className="text-sm text-red-500 font-medium">{errors.username}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="birth_place" className="text-sm font-semibold text-gray-700">Tempat Lahir</Label>
                                        <Input
                                            id="birth_place"
                                            type="text"
                                            value={data.birth_place || ''}
                                            onChange={(e) => setData('birth_place', e.target.value)}
                                            className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl bg-white text-gray-900 placeholder-gray-500"
                                            placeholder="Masukkan tempat lahir"
                                        />
                                        {errors.birth_place && <p className="text-sm text-red-500 font-medium">{errors.birth_place}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="birth_date" className="text-sm font-semibold text-gray-700">Tanggal Lahir</Label>
                                        <Input
                                            id="birth_date"
                                            type="date"
                                            value={data.birth_date || ''}
                                            onChange={(e) => setData('birth_date', e.target.value)}
                                            className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl bg-white text-gray-900"
                                        />
                                        {errors.birth_date && <p className="text-sm text-red-500 font-medium">{errors.birth_date}</p>}
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <Label htmlFor="address" className="text-sm font-semibold text-gray-700">Alamat Lengkap</Label>
                                        <Input
                                            id="address"
                                            type="text"
                                            value={data.address || ''}
                                            onChange={(e) => setData('address', e.target.value)}
                                            className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl bg-white text-gray-900 placeholder-gray-500"
                                            placeholder="Masukkan alamat lengkap"
                                        />
                                        {errors.address && <p className="text-sm text-red-500 font-medium">{errors.address}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="gender" className="text-sm font-semibold text-gray-700">Jenis Kelamin</Label>
                                        <select
                                            id="gender"
                                            value={data.gender}
                                            onChange={(e) => setData('gender', e.target.value as 'male' | 'female')}
                                            className="h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-4 text-lg text-gray-900 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                                        >
                                            <option value="male">Laki-laki</option>
                                            <option value="female">Perempuan</option>
                                        </select>
                                        {errors.gender && <p className="text-sm text-red-500 font-medium">{errors.gender}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="status" className="text-sm font-semibold text-gray-700">Status</Label>
                                        <select
                                            id="status"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value as 'active' | 'inactive')}
                                            className="h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-4 text-lg text-gray-900 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                                        >
                                            <option value="active">Aktif</option>
                                            <option value="inactive">Nonaktif</option>
                                        </select>
                                        {errors.status && <p className="text-sm text-red-500 font-medium">{errors.status}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="community_id" className="text-sm font-semibold text-gray-700">Komunitas Basis</Label>
                                        <select
                                            id="community_id"
                                            value={data.community_id || ''}
                                            onChange={(e) => setData('community_id', e.target.value ? Number(e.target.value) : null)}
                                            className="h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-4 text-lg text-gray-900 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                                        >
                                            <option value="">Pilih Komunitas</option>
                                            {communities.map((community) => (
                                                <option key={community.id} value={community.id}>
                                                    {community.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.community_id && <p className="text-sm text-red-500 font-medium">{errors.community_id}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PDF Upload Section */}
                        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
                            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white p-6">
                                <h2 className="text-2xl font-bold flex items-center gap-3">
                                    <div className="rounded-full bg-white/20 p-2">
                                        <Upload className="h-5 w-5 text-white" />
                                    </div>
                                    Dokumen PDF
                                </h2>
                            </div>
                            <div className="p-8">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {[
                                        'Dokumen 1',
                                        'Dokumen 2', 
                                        'Dokumen 3',
                                        'Dokumen 4'
                                    ].map((label, idx) => (
                                        <div key={idx} className="space-y-2">
                                            <Label className="text-sm font-semibold text-gray-700">{label}</Label>
                                            <div className="space-y-3">
                                                {data.existingPdfs[idx] && !data.removePdf[idx] && (
                                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                                        <p className="text-sm font-medium text-gray-800">File saat ini:</p>
                                                        <p className="text-sm text-blue-600 font-semibold truncate">{data.existingPdfs[idx].file_name}</p>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => {
                                                                const newRemove = [...data.removePdf];
                                                                newRemove[idx] = true;
                                                                setData('removePdf', newRemove);
                                                            }}
                                                            className="mt-2 text-red-500 bg-white border-red-500 hover:bg-red-50 hover:text-red-500 font-medium"
                                                        >
                                                            Hapus File
                                                        </Button>
                                                    </div>
                                                )}
                                                <Input
                                                    type="file"
                                                    accept=".pdf"
                                                    onChange={handleSinglePdfChange(idx)}
                                                    className="h-12 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl bg-white text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                                                />
                                            </div>
                                            {(errors as any)[`pdfs.${idx}`] && (
                                                <p className="text-sm text-red-500 font-medium">{(errors as any)[`pdfs.${idx}`]}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-4 pt-6">
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => window.location.href = route('admin.users.show', user.id)}
                                className="h-12 px-8 text-lg font-semibold border-2 border-gray-300 hover:border-gray-400 rounded-xl transition-all duration-200 hover:bg-primary/90"
                            >
                                Batal
                            </Button>
                            <Button 
                                type="submit" 
                                disabled={processing}
                                className="h-12 px-8 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                            >
                                <Save className="mr-2 h-5 w-5" />
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
