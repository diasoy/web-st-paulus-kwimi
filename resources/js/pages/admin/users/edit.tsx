/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
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
                <Head title="Edit Pengguna" />
                <div className="p-6">
                    <p>Data pengguna tidak ditemukan.</p>
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
    const { data, setData, put, processing, errors } = useForm({
        name: user.name ?? '',
        username: user.username ?? '',
        birth_place: (user.birth_place !== undefined && user.birth_place !== null) ? String(user.birth_place) : '',
        address: user.address ?? '',
        birth_date: formatBirthDate(user.birth_date),
        gender: user.gender ?? 'male',
        status: user.status ?? 'active',
        community_id: user.community_id ?? null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Form submitted with data:', data);
        put(route('admin.users.update', user.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Edit Pengguna - ${user.name}`} />

            <div className="space-y-6 p-6">
                <div className="space-y-2">
                    <nav className="flex items-center text-sm text-muted-foreground">
                        <Link href={route('admin.users')} className="hover:text-foreground">
                            Pengguna
                        </Link>
                        <span className="mx-2">/</span>
                        <Link href={route('admin.users.show', user.id)} className="hover:text-foreground">
                            Detail
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-foreground">Edit</span>
                    </nav>
                    <h1 className="text-2xl font-bold tracking-tight">Edit Pengguna</h1>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Pengguna</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama Lengkap *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Masukkan nama lengkap"
                                        required
                                    />
                                    {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="username">Username *</Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        value={data.username}
                                        onChange={(e) => setData('username', e.target.value)}
                                        placeholder="Masukkan username"
                                        required
                                    />
                                    {errors.username && <p className="text-sm text-red-600">{errors.username}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="birth_place">Tempat Lahir</Label>
                                    <Input
                                        id="birth_place"
                                        type="text"
                                        value={data.birth_place}
                                        onChange={(e) => setData('birth_place', e.target.value)}
                                        placeholder="Masukkan tempat lahir"
                                    />
                                    {errors.birth_place && <p className="text-sm text-red-600">{errors.birth_place}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="birth_date">Tanggal Lahir</Label>
                                    <Input
                                        id="birth_date"
                                        type="date"
                                        value={data.birth_date}
                                        onChange={(e) => setData('birth_date', e.target.value)}
                                    />
                                    {errors.birth_date && <p className="text-sm text-red-600">{errors.birth_date}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender *</Label>
                                    <select
                                        id="gender"
                                        value={data.gender}
                                        onChange={(e) => setData('gender', e.target.value as 'male' | 'female')}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                        required
                                    >
                                        <option value="male">Laki-laki</option>
                                        <option value="female">Perempuan</option>
                                    </select>
                                    {errors.gender && <p className="text-sm text-red-600">{errors.gender}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="community_id">Komunitas Basis</Label>
                                    <select
                                        id="community_id"
                                        value={data.community_id || ''}
                                        onChange={(e) => setData('community_id', e.target.value ? parseInt(e.target.value) : null)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
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
                                    <Label htmlFor="status">Status *</Label>
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value as 'active' | 'inactive')}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                        required
                                    >
                                        <option value="active">Aktif</option>
                                        <option value="inactive">Nonaktif</option>
                                    </select>
                                    {errors.status && <p className="text-sm text-red-600">{errors.status}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Alamat</Label>
                                <textarea
                                    id="address"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    placeholder="Masukkan alamat lengkap"
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                    rows={3}
                                />
                                {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="submit" disabled={processing} className='text-white hover:opacity-90'>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </Button>{' '}
                                <Link href={route('admin.users.show', user.id)}>
                                    <Button type="button" variant="outline" className="bg-white text-secondary border-secondary hover:opacity-80">
                                        Batal
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
