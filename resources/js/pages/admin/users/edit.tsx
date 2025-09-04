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
    const formatBirthDate = (date?: string) => {
        if (!date) return '';
        const d = new Date(date);
        if (isNaN(d.getTime())) return '';
        // Pad month and day
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };
    // Ambil pdfs dari user jika ada
    const initialPdfs = Array.isArray((user as any).pdfs) ? (user as any).pdfs : [];
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT' as const,
        name: user.name ?? '',
        username: user.username ?? '',
        birth_place: (user.birth_place !== undefined && user.birth_place !== null) ? String(user.birth_place) : '',
        address: user.address ?? '',
        birth_date: formatBirthDate(user.birth_date),
        gender: user.gender ?? 'male',
        status: user.status ?? 'active',
        community_id: user.community_id ?? null,
        pdfs: [null, null, null, null] as (File | null)[],
        existingPdfs: initialPdfs,
        removePdf: [false, false, false, false],
    });

    // Handler untuk setiap input PDF
    const handleSinglePdfChange = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        const newPdfs = [...data.pdfs];
        newPdfs[idx] = file;
        setData('pdfs', newPdfs);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.users.update', user.id), { forceFormData: true, preserveScroll: true });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Edit Umat - ${user.name}`} />

            <div className="space-y-6 p-6 min-h-screen">
                <div className="space-y-2">
                    <nav className="flex items-center text-sm text-white">
                        <Link href={route('admin.users')} className="hover:text-gray-300 transition-colors">
                            Umat
                        </Link>
                        <span className="mx-2 text-gray-300">/</span>
                        <Link href={route('admin.users.show', user.id)} className="hover:text-gray-300 transition-colors">
                            Detail
                        </Link>
                        <span className="mx-2 text-gray-300">/</span>
                        <span className="text-white font-medium">Edit</span>
                    </nav>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Edit Umat</h1>
                </div>
                <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-white">Edit Umat</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-white font-medium">Nama Lengkap *</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Masukkan nama lengkap"
                                    className="bg-white text-black border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="username" className="text-white font-medium">Username *</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    value={data.username}
                                    onChange={(e) => setData('username', e.target.value)}
                                    placeholder="Masukkan username"
                                    className="bg-white text-black border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                                {errors.username && <p className="text-sm text-red-600">{errors.username}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="birth_place" className="text-white font-medium">Tempat Lahir</Label>
                                <Input
                                    id="birth_place"
                                    type="text"
                                    value={data.birth_place}
                                    onChange={(e) => setData('birth_place', e.target.value)}
                                    placeholder="Masukkan tempat lahir"
                                    className="bg-white text-black border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                                {errors.birth_place && <p className="text-sm text-red-600">{errors.birth_place}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="birth_date" className="text-white font-medium">Tanggal Lahir</Label>
                                <Input
                                    id="birth_date"
                                    type="date"
                                    value={data.birth_date}
                                    onChange={(e) => setData('birth_date', e.target.value)}
                                    className="bg-white text-black border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                                {errors.birth_date && <p className="text-sm text-red-600">{errors.birth_date}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="gender" className="text-white font-medium">Gender *</Label>
                                <select
                                    id="gender"
                                    value={data.gender}
                                    onChange={(e) => setData('gender', e.target.value as 'male' | 'female')}
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                    required
                                >
                                    <option value="male">Laki-laki</option>
                                    <option value="female">Perempuan</option>
                                </select>
                                {errors.gender && <p className="text-sm text-red-600">{errors.gender}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="community_id" className="text-white font-medium">Komunitas Basis</Label>
                                <select
                                    id="community_id"
                                    value={data.community_id || ''}
                                    onChange={(e) => setData('community_id', e.target.value ? parseInt(e.target.value) : null)}
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="">Tidak ada</option>
                                    {communities &&
                                        communities.map((community) => (
                                            <option key={community.id} value={community.id}>
                                                {community.name}
                                            </option>
                                        ))}
                                </select>
                                {errors.community_id && <p className="text-sm text-red-600">{errors.community_id}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status" className="text-white font-medium">Status *</Label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value as 'active' | 'inactive')}
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                    required
                                >
                                    <option value="active">Aktif</option>
                                    <option value="inactive">Nonaktif</option>
                                </select>
                                {errors.status && <p className="text-sm text-red-600">{errors.status}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address" className="text-white font-medium">Alamat</Label>
                                <textarea
                                    id="address"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    placeholder="Masukkan alamat lengkap"
                                    className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                                    rows={3}
                                />
                                {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-white font-medium">Upload PDF (maksimal 4, opsional)</Label>
                            <p className="text-xs text-gray-300 mb-2">File lama akan tetap digunakan jika tidak memilih file baru atau tidak menghapus file lama.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[0, 1, 2, 3].map(idx => (
                                    <div key={idx} className="space-y-1">
                                        <Label className="text-xs font-bold text-white">Dokumen {idx + 1}</Label>
                                        {/* Info nama dokumen default jika ada */}
                                        {data.existingPdfs && data.existingPdfs[idx] && !data.removePdf[idx] && (
                                            <div className="text-xs text-gray-300 mb-1">Dokumen yang sudah ada: <span className="font-semibold text-white">{data.existingPdfs[idx].file_name}</span></div>
                                        )}
                                        <input
                                            type="file"
                                            accept="application/pdf"
                                            id={`pdf-input-${idx}`}
                                            onChange={handleSinglePdfChange(idx)}
                                            className="hidden"
                                        />
                                        <label htmlFor={`pdf-input-${idx}`} className="flex items-center gap-2 cursor-pointer px-3 py-2 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 transition text-gray-700">
                                            <Upload className="w-4 h-4 mr-1" />
                                            <span>Pilih File</span>
                                        </label>
                                        {/* Jika ada file baru diinput */}
                                        {data.pdfs[idx] && (
                                            <div className="mt-1 text-sm text-gray-300">File baru: <span className="font-medium text-white">{data.pdfs[idx]?.name}</span></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {errors.pdfs && <p className="text-sm text-red-600">{errors.pdfs}</p>}
                        </div>


                        <div className="flex gap-4 pt-4">
                            <Button type="submit" disabled={processing} className='bg-green-600 text-white hover:bg-green-700 disabled:bg-green-400'>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </Button>{' '}
                            <Link href={route('admin.users.show', user.id)}>
                                <Button type="button" variant="outline" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900">
                                    Batal
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
