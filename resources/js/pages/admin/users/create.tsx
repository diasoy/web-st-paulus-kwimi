import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface CreateUserProps {
    communities: { id: number; name: string }[];
}

export default function CreateUser({ communities }: CreateUserProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        username: '',
        birth_place: '',
        address: '',
        birth_date: '',
        gender: 'male',
        status: 'active',
        community_id: '',
        role: 'umat',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.users.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Pengguna" />
            <div className="space-y-6 p-6">
                <div className="space-y-2">
                    <nav className="flex items-center text-sm text-muted-foreground">
                        <Link href={route('admin.users')} className="hover:text-foreground">
                            Pengguna
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-foreground">Tambah Baru</span>
                    </nav>
                    <h1 className="text-2xl font-bold tracking-tight">Tambah Pengguna</h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Pengguna</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label htmlFor="name">Nama</Label>
                                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>
                            <div>
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" value={data.username} onChange={(e) => setData('username', e.target.value)} />
                                {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
                            </div>
                            <div>
                                <Label htmlFor="birth_place">Tempat Lahir</Label>
                                <Input id="birth_place" value={data.birth_place} onChange={(e) => setData('birth_place', e.target.value)} />
                                {errors.birth_place && <p className="mt-1 text-sm text-red-600">{errors.birth_place}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <Label htmlFor="address">Alamat</Label>
                                <Input id="address" value={data.address} onChange={(e) => setData('address', e.target.value)} />
                                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                            </div>
                            <div>
                                <Label htmlFor="birth_date">Tanggal Lahir</Label>
                                <Input id="birth_date" type="date" value={data.birth_date} onChange={(e) => setData('birth_date', e.target.value)} />
                                {errors.birth_date && <p className="mt-1 text-sm text-red-600">{errors.birth_date}</p>}
                            </div>
                            <div>
                                <Label htmlFor="gender">Gender</Label>
                                <select
                                    id="gender"
                                    className="h-9 w-full rounded-md border border-input bg-background px-2"
                                    value={data.gender}
                                    onChange={(e) => setData('gender', e.target.value)}
                                >
                                    <option value="male">Laki-laki</option>
                                    <option value="female">Perempuan</option>
                                </select>
                                {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
                            </div>
                            <div>
                                <Label htmlFor="status">Status</Label>
                                <select
                                    id="status"
                                    className="h-9 w-full rounded-md border border-input bg-background px-2"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                >
                                    <option value="active">Aktif</option>
                                    <option value="inactive">Nonaktif</option>
                                </select>
                                {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <Label htmlFor="community_id">Komunitas Basis</Label>
                                <select
                                    id="community_id"
                                    className="h-9 w-full rounded-md border border-input bg-background px-2"
                                    value={data.community_id}
                                    onChange={(e) => setData('community_id', e.target.value)}
                                >
                                    <option value="">-</option>
                                    {communities.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.community_id && <p className="mt-1 text-sm text-red-600">{errors.community_id}</p>}
                            </div>
                            <div>
                                <Label htmlFor="role">Role</Label>
                                <select
                                    id="role"
                                    className="h-9 w-full rounded-md border border-input bg-background px-2"
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                >
                                    <option value="umat">Umat</option>
                                    <option value="admin">Admin</option>
                                </select>
                                {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                            </div>
                            <div>
                                <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2 md:col-span-2">
                                <Button className='bg-white border hover:bg-white hover:cursor-pointer text-black hover:text-black' type="button" variant="outline" onClick={() => window.location.href = route('admin.users')}>
                                    Batal
                                </Button>
                                <Button type="submit" className='bg-primary text-white hover:bg-primary/80' disabled={processing}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Simpan
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
