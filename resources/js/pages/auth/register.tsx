import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Users, Book, Eye, EyeOff, Shield } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RegisterForm, Community } from '@/types/auth/register';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface Props {
    communities: Community[];
}

export default function Register({ communities }: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        username: '',
        address: '',
        birth_date: '',
        birth_place: '',
        gender: 'male',
        password: '',
        password_confirmation: '',
        community_id: communities.length > 0 ? communities[0].id : 1,
        role_id: 2,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <Head title="Register" />

            {/* Background decorative elements - Same as login page */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 py-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
                    {/* Left Side - Church Information */}
                    <div className="space-y-10">
                        <div className="text-center lg:text-left">
                        <div className="mb-4">
                            <Link href="/">
                                <Button variant="outline" size="sm" className="hidden lg:flex rounded-lg bg-secondary hover:bg-secondary/90">
                                    <ArrowLeft />
                                    Kembali ke Home
                                </Button>
                            </Link>
                        </div>
                            <div className="flex justify-center lg:justify-start items-center mb-8">
                                <div className="p-3 bg-primary/10 rounded-2xl backdrop-blur-sm border border-border shadow-lg mr-4">
                                    <img src="/images/logo.png" alt="Logo" className='w-16 h-16 object-contain' />
                                </div>
                                <div>
                                    <h1 className="text-4xl lg:text-5xl font-bold church-text-gradient leading-tight">
                                        Bergabung
                                    </h1>
                                    <h2 className="text-3xl lg:text-4xl font-bold church-text-gradient">
                                        Dengan Kami
                                    </h2>
                                </div>
                            </div>

                            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                                Buat akun Anda untuk menjadi bagian dari komunitas <span className="font-semibold text-primary">Gereja St. Paulus Kwimi</span>
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start gap-6 group">
                                <div className="p-3 bg-secondary/10 rounded-xl backdrop-blur-sm border border-border shadow-lg group-hover:shadow-xl transition-all duration-300 mt-1">
                                    <Shield className="h-6 w-6 text-secondary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-foreground mb-3 text-lg">Data Terlindungi</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Setiap informasi pribadi Anda dijaga kerahasiaannya dengan sistem keamanan terbaik.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="p-3 bg-primary/10 rounded-xl backdrop-blur-sm border border-border shadow-lg group-hover:shadow-xl transition-all duration-300 mt-1">
                                    <Users className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-foreground mb-3 text-lg">Koneksi Komunitas</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Terhubung dengan sesama jemaat dan berpartisipasi dalam kegiatan rohani bersama.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="p-3 bg-accent/10 rounded-xl backdrop-blur-sm border border-border shadow-lg group-hover:shadow-xl transition-all duration-300 mt-1">
                                    <Book className="h-6 w-6 text-accent" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-foreground mb-3 text-lg">Pembinaan Iman</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Dapatkan akses ke materi renungan, jadwal ibadah, dan sumber daya untuk bertumbuh dalam iman.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Registration Form */}
                    <div className="w-full">
                        <div className="w-full text-center">
                            <Link href="/">
                                <Button variant="outline" size="sm" className="rounded-lg bg-secondary hover:bg-secondary/90 lg:hidden mb-6">
                                    <ArrowLeft />
                                    Kembali ke Home
                                </Button>
                            </Link>
                        </div>
                        <div className="bg-card/80 backdrop-blur-xl p-10 rounded-3xl church-shadow border border-border hover:shadow-2xl transition-all duration-500">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold text-foreground mb-3">Daftar Akun Baru</h2>
                                <p className="text-muted-foreground">Isi formulir untuk bergabung dengan komunitas</p>
                            </div>

                            <form className="space-y-6" onSubmit={submit}>
                                {/* Form in 2 columns for better space usage */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="name" className="text-foreground font-semibold">Nama Lengkap</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            disabled={processing}
                                            placeholder="Nama lengkap"
                                            className="h-12 px-4 bg-input border-border focus:border-primary focus:ring-ring rounded-xl shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm"
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="username" className="text-foreground font-semibold">Username</Label>
                                        <Input
                                            id="username"
                                            type="text"
                                            required
                                            tabIndex={2}
                                            autoComplete="username"
                                            value={data.username}
                                            onChange={(e) => setData('username', e.target.value)}
                                            disabled={processing}
                                            placeholder="Username"
                                            className="h-12 px-4 bg-input border-border focus:border-primary focus:ring-ring rounded-xl shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm"
                                        />
                                        <InputError message={errors.username} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Email dan phone_number dihapus */}
                                    <div className="grid gap-3">
                                        <Label htmlFor="birth_place" className="text-foreground font-semibold">Tempat Lahir</Label>
                                        <Input
                                            id="birth_place"
                                            type="text"
                                            required
                                            tabIndex={4}
                                            autoComplete="birth_place"
                                            value={data.birth_place}
                                            onChange={(e) => setData('birth_place', e.target.value)}
                                            disabled={processing}
                                            placeholder="Contoh: Jayapura"
                                            className="h-12 px-4 bg-input border-border focus:border-primary focus:ring-ring rounded-xl shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm"
                                        />
                                        <InputError message={errors.birth_place} />
                                    </div>
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="address" className="text-foreground font-semibold">Alamat</Label>
                                    <Input
                                        id="address"
                                        type="text"
                                        required
                                        tabIndex={5}
                                        autoComplete="street-address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        disabled={processing}
                                        placeholder="Alamat lengkap"
                                        className="h-12 px-4 bg-input border-border focus:border-primary focus:ring-ring rounded-xl shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm"
                                    />
                                    <InputError message={errors.address} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="birth_date" className="text-foreground font-semibold">Tanggal Lahir</Label>
                                        <Input
                                            id="birth_date"
                                            type="date"
                                            required
                                            tabIndex={6}
                                            autoComplete="bday"
                                            value={data.birth_date}
                                            onChange={(e) => setData('birth_date', e.target.value)}
                                            disabled={processing}
                                            className="h-12 px-4 bg-input border-border focus:border-primary focus:ring-ring rounded-xl shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm"
                                        />
                                        <InputError message={errors.birth_date} />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="gender" className="text-foreground font-semibold">Jenis Kelamin</Label>
                                        <Select
                                            value={data.gender}
                                            onValueChange={(value: 'male' | 'female') => setData('gender', value)}
                                            disabled={processing}
                                        >
                                            <SelectTrigger tabIndex={7} className="h-12 px-4 bg-input border-border focus:border-primary focus:ring-ring rounded-xl shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm">
                                                <SelectValue placeholder="Pilih jenis kelamin" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="male">Laki-laki</SelectItem>
                                                <SelectItem value="female">Perempuan</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.gender} />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="community" className="text-foreground font-semibold">Komunitas</Label>
                                        <Select
                                            value={data.community_id.toString()}
                                            onValueChange={(value) => setData('community_id', parseInt(value))}
                                            disabled={processing}
                                        >
                                            <SelectTrigger tabIndex={8} className="h-12 px-4 bg-input border-border focus:border-primary focus:ring-ring rounded-xl shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm">
                                                <SelectValue placeholder="Pilih komunitas" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {communities.map((community) => (
                                                    <SelectItem key={community.id} value={community.id.toString()}>
                                                        {community.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.community_id} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="password" className="text-foreground font-semibold">Kata Sandi</Label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                required
                                                tabIndex={9}
                                                autoComplete="new-password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                disabled={processing}
                                                placeholder="Kata sandi"
                                                className="h-12 px-4 pr-12 bg-input border-border focus:border-primary focus:ring-ring rounded-xl shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted-foreground hover:text-foreground transition-colors"
                                                onClick={() => setShowPassword(!showPassword)}
                                                tabIndex={-1}
                                                disabled={processing}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5" />
                                                ) : (
                                                    <Eye className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="password_confirmation" className="text-foreground font-semibold">Konfirmasi Kata Sandi</Label>
                                        <div className="relative">
                                            <Input
                                                id="password_confirmation"
                                                type={showConfirmPassword ? "text" : "password"}
                                                required
                                                tabIndex={10}
                                                autoComplete="new-password"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                disabled={processing}
                                                placeholder="Konfirmasi kata sandi"
                                                className="h-12 px-4 pr-12 bg-input border-border focus:border-primary focus:ring-ring rounded-xl shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted-foreground hover:text-foreground transition-colors"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                tabIndex={-1}
                                                disabled={processing}
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className="h-5 w-5" />
                                                ) : (
                                                    <Eye className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>
                                        <InputError message={errors.password_confirmation} />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="mt-8 w-full h-12 hover:opacity-90 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:cursor-pointer text-white"
                                    tabIndex={11}
                                    disabled={processing}
                                >
                                    {processing && <LoaderCircle className="h-5 w-5 animate-spin mr-3" />}
                                    {processing ? 'Sedang Mendaftar...' : 'Daftar Sekarang'}
                                </Button>

                                <div className="text-center text-slate-600 mt-8 pt-6 border-t border-slate-200">
                                    Sudah memiliki akun?{' '}
                                    <TextLink
                                        href={route('login')}
                                        tabIndex={12}
                                        className="font-semibold transition-colors duration-200"
                                    >
                                        Masuk di sini
                                    </TextLink>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}