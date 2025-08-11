import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Church, Users, Book, Shield, Eye, EyeOff } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password')
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
            <Head title="Login" />
            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
                    {/* Left Side - Church Information */}
                    <div className="space-y-8">
                        <div className="text-center lg:text-left">
                            <div className="flex justify-center lg:justify-start mb-6">
                                <div className="p-4 bg-primary/10 rounded-full">
                                    <Church className="h-12 w-12 text-primary" />
                                </div>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-bold church-text-gradient mb-4">
                                Selamat Datang Kembali
                            </h1>
                            <p className="text-xl text-muted-foreground mb-8">
                                Masuk ke akun Anda untuk mengakses komunitas Gereja St. Paulus Kwimi
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-secondary/10 rounded-lg mt-1">
                                    <Shield className="h-5 w-5 text-secondary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-2">Akun yang Aman</h3>
                                    <p className="text-muted-foreground">
                                        Data dan privasi Anda dilindungi dengan sistem keamanan terbaik untuk kenyamanan beribadah digital.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-accent/10 rounded-lg mt-1">
                                    <Users className="h-5 w-5 text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-2">Terhubung dengan Jemaat</h3>
                                    <p className="text-muted-foreground">
                                        Bergabung dengan komunitas, ikuti kegiatan, dan tetap terhubung dengan keluarga rohani.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 rounded-lg mt-1">
                                    <Book className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-2">Materi Rohani</h3>
                                    <p className="text-muted-foreground">
                                        Akses jadwal ibadah, renungan harian, dan berbagai materi pembinaan iman.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-card rounded-xl church-shadow border">
                            <blockquote className="text-lg italic text-center text-muted-foreground">
                                "Marilah kepada-Ku, semua yang letih lesu dan berbeban berat, 
                                Aku akan memberi kelegaan kepadamu."
                            </blockquote>
                            <p className="text-center text-sm text-primary mt-3 font-semibold">
                                — Matius 11:28
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="w-full">
                        <div className="bg-card p-8 rounded-2xl church-shadow border">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-foreground mb-2">Masuk ke Akun</h2>
                                <p className="text-muted-foreground">Masukkan email dan kata sandi Anda</p>
                            </div>

                            {status && <div className="mb-6 text-center text-sm font-medium text-green-600 bg-green-50 p-3 rounded-lg">{status}</div>}

                            <form className="space-y-6" onSubmit={submit}>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Alamat Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="email@example.com"
                                            disabled={processing}
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Kata Sandi</Label>
                                            {canResetPassword && (
                                                <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={7}>
                                                    Lupa kata sandi?
                                                </TextLink>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                required
                                                tabIndex={2}
                                                autoComplete="current-password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder="Kata sandi"
                                                disabled={processing}
                                                className="pr-10"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
                                                onClick={() => setShowPassword(!showPassword)}
                                                tabIndex={-1}
                                                disabled={processing}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                id="remember"
                                                name="remember"
                                                checked={data.remember}
                                                onClick={() => setData('remember', !data.remember)}
                                                tabIndex={3}
                                                disabled={processing}
                                            />
                                            <Label htmlFor="remember">Ingat saya</Label>
                                        </div>
                                    </div>

                                    <Button type="submit" className="mt-6 w-full" tabIndex={5} disabled={processing}>
                                        {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                        Masuk
                                    </Button>
                                </div>

                                <div className="text-center text-sm text-muted-foreground mt-6">
                                    Belum memiliki akun?{' '}
                                    <TextLink href={route('register')} tabIndex={6}>
                                        Daftar di sini
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
