import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { FormEvent } from 'react';

interface UserEdit {
    id: number;
    name: string;
    username: string;
    email: string;
    phone_number?: string;
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

export default function UserEditSimple({ user, communities }: UserEditProps) {
    console.log('UserEditSimple called with:', { user, communities });
    
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

    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
        address: user.address || '',
        birth_date: user.birth_date || '',
        gender: user.gender || 'male',
        status: user.status || 'active',
        community_id: user.community_id || null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Form submitted with data:', data);
        put(route('admin.users.update', user.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Edit Umat - ${user.name}`} />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <Link href={route('admin.users.show', user.id)}>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Edit Umat (Simple Test)</CardTitle>
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
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="Masukkan email"
                                        required
                                    />
                                    {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone_number">Nomor Telepon</Label>
                                    <Input
                                        id="phone_number"
                                        type="text"
                                        value={data.phone_number}
                                        onChange={(e) => setData('phone_number', e.target.value)}
                                        placeholder="Masukkan nomor telepon"
                                    />
                                    {errors.phone_number && <p className="text-sm text-red-600">{errors.phone_number}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender *</Label>
                                    <select 
                                        value={data.gender} 
                                        onChange={(e) => setData('gender', e.target.value as 'male' | 'female')}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                    >
                                        <option value="male">Laki-laki</option>
                                        <option value="female">Perempuan</option>
                                    </select>
                                    {errors.gender && <p className="text-sm text-red-600">{errors.gender}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status">Status *</Label>
                                    <select 
                                        value={data.status} 
                                        onChange={(e) => setData('status', e.target.value as 'active' | 'inactive')}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                    >
                                        <option value="active">Aktif</option>
                                        <option value="inactive">Nonaktif</option>
                                    </select>
                                    {errors.status && <p className="text-sm text-red-600">{errors.status}</p>}
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </Button>
                                <Link href={route('admin.users.show', user.id)}>
                                    <Button type="button" variant="outline">
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
