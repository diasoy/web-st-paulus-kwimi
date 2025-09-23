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
            <Head title="Tambah Umat" />
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
                                    Tambah Umat Baru
                                </h1>
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25"></div>
                            </div>
                            <p className="text-white/95 text-xl font-medium drop-shadow-md">
                                Lengkapi informasi umat yang akan didaftarkan
                            </p>
                        </div>
                    </div>
                    <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
                    <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-white/5 blur-xl"></div>

                    <Card className="shadow-2xl bg-white/95 backdrop-blur-lg border border-gray-200/50 rounded-2xl overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white">
                            <CardTitle className="text-2xl font-bold flex items-center gap-3">
                                <div className="rounded-full bg-white/20 p-3">
                                    <Plus className="h-6 w-6 text-white" />
                                </div>
                                Form Pendaftaran Umat
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8">
                            <form onSubmit={submit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Nama Lengkap</Label>
                                    <Input 
                                        id="name" 
                                        value={data.name} 
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                                        placeholder="Masukkan nama lengkap"
                                    />
                                    {errors.name && <p className="text-sm text-red-500 font-medium">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="username" className="text-sm font-semibold text-gray-700">Username</Label>
                                    <Input 
                                        id="username" 
                                        value={data.username} 
                                        onChange={(e) => setData('username', e.target.value)}
                                        className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                                        placeholder="Masukkan username"
                                    />
                                    {errors.username && <p className="text-sm text-red-500 font-medium">{errors.username}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="birth_place" className="text-sm font-semibold text-gray-700">Tempat Lahir</Label>
                                    <Input 
                                        id="birth_place" 
                                        value={data.birth_place} 
                                        onChange={(e) => setData('birth_place', e.target.value)}
                                        className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                                        placeholder="Masukkan tempat lahir"
                                    />
                                    {errors.birth_place && <p className="text-sm text-red-500 font-medium">{errors.birth_place}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="birth_date" className="text-sm font-semibold text-gray-700">Tanggal Lahir</Label>
                                    <Input 
                                        id="birth_date" 
                                        type="date" 
                                        value={data.birth_date} 
                                        onChange={(e) => setData('birth_date', e.target.value)}
                                        className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                                    />
                                    {errors.birth_date && <p className="text-sm text-red-500 font-medium">{errors.birth_date}</p>}
                                </div>

                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="address" className="text-sm font-semibold text-gray-700">Alamat Lengkap</Label>
                                    <Input 
                                        id="address" 
                                        value={data.address} 
                                        onChange={(e) => setData('address', e.target.value)}
                                        className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                                        placeholder="Masukkan alamat lengkap"
                                    />
                                    {errors.address && <p className="text-sm text-red-500 font-medium">{errors.address}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="gender" className="text-sm font-semibold text-gray-700">Jenis Kelamin</Label>
                                    <select
                                        id="gender"
                                        className="h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-4 text-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                                        value={data.gender}
                                        onChange={(e) => setData('gender', e.target.value)}
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
                                        className="h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-4 text-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
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
                                        className="h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-4 text-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                                        value={data.community_id}
                                        onChange={(e) => setData('community_id', e.target.value)}
                                    >
                                        <option value="">Pilih Komunitas</option>
                                        {communities.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.community_id && <p className="text-sm text-red-500 font-medium">{errors.community_id}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="role" className="text-sm font-semibold text-gray-700">Role</Label>
                                    <select
                                        id="role"
                                        className="h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-4 text-lg focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                                        value={data.role}
                                        onChange={(e) => setData('role', e.target.value)}
                                    >
                                        <option value="umat">Umat</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    {errors.role && <p className="text-sm text-red-500 font-medium">{errors.role}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
                                    <Input 
                                        id="password" 
                                        type="password" 
                                        value={data.password} 
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                                        placeholder="Masukkan password"
                                    />
                                    {errors.password && <p className="text-sm text-red-500 font-medium">{errors.password}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation" className="text-sm font-semibold text-gray-700">Konfirmasi Password</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="h-12 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                                        placeholder="Konfirmasi password"
                                    />
                                </div>

                                <div className="flex justify-end gap-4 pt-6 md:col-span-2">
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        onClick={() => window.location.href = route('admin.users')}
                                        className="h-12 px-8 text-lg font-semibold border-2 border-gray-300 text-white hover:bg-gray-50 hover:text-black hover:border-gray-400 rounded-xl transition-all duration-200"
                                    >
                                        Batal
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        disabled={processing}
                                        className="h-12 px-8 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                                    >
                                        <Plus className="mr-2 h-5 w-5" />
                                        {processing ? 'Menyimpan...' : 'Simpan Umat'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
