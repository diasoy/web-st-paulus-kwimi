import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Church, Users, Heart, Book, Eye, EyeOff } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RegisterForm, Community } from '@/types/auth/register';

interface Props {
    communities: Community[];
}

export default function Register({ communities }: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        username: '',
        email: '',
        phone_number: '',
        address: '',
        birth_date: '',
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
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
            <Head title="Register" />
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
                                Gereja St. Paulus Kwimi
                            </h1>
                            <p className="text-xl text-muted-foreground mb-8">
                                Bergabunglah dengan keluarga besar kami dalam iman dan kasih
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-secondary/10 rounded-lg mt-1">
                                    <Users className="h-5 w-5 text-secondary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-2">Komunitas yang Hangat</h3>
                                    <p className="text-muted-foreground">
                                        Temukan keluarga rohani yang saling mendukung dan bertumbuh bersama dalam iman kepada Tuhan Yesus Kristus.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-accent/10 rounded-lg mt-1">
                                    <Book className="h-5 w-5 text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-2">Pembelajaran Firman</h3>
                                    <p className="text-muted-foreground">
                                        Pelajari dan pahami Firman Tuhan melalui kebaktian, pemahaman Alkitab, dan berbagai kegiatan rohani.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 rounded-lg mt-1">
                                    <Heart className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-2">Pelayanan & Kasih</h3>
                                    <p className="text-muted-foreground">
                                        Wujudkan kasih Kristus melalui berbagai program pelayanan kepada sesama dan masyarakat.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-card rounded-xl church-shadow border">
                            <blockquote className="text-lg italic text-center text-muted-foreground">
                                "Karena di mana dua atau tiga orang berkumpul dalam nama-Ku, 
                                di situ Aku ada di tengah-tengah mereka."
                            </blockquote>
                            <p className="text-center text-sm text-primary mt-3 font-semibold">
                                — Matius 18:20
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Registration Form */}
                    <div className="w-full">
                        <div className="bg-card p-8 rounded-2xl church-shadow border">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-foreground mb-2">Daftar Akun</h2>
                                <p className="text-muted-foreground">Bergabunglah dengan komunitas kami</p>
                            </div>

                            <form className="space-y-4" onSubmit={submit}>
                                {/* Form in 2 columns for better space usage */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Nama Lengkap</Label>
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
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="username">Username</Label>
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
                                        />
                                        <InputError message={errors.username} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            tabIndex={3}
                                            autoComplete="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            disabled={processing}
                                            placeholder="email@example.com"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="phone_number">No. Telepon</Label>
                                        <Input
                                            id="phone_number"
                                            type="tel"
                                            required
                                            tabIndex={4}
                                            autoComplete="tel"
                                            value={data.phone_number}
                                            onChange={(e) => setData('phone_number', e.target.value)}
                                            disabled={processing}
                                            placeholder="+62 812 3456 7890"
                                        />
                                        <InputError message={errors.phone_number} />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="address">Alamat</Label>
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
                                    />
                                    <InputError message={errors.address} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="birth_date">Tanggal Lahir</Label>
                                        <Input
                                            id="birth_date"
                                            type="date"
                                            required
                                            tabIndex={6}
                                            autoComplete="bday"
                                            value={data.birth_date}
                                            onChange={(e) => setData('birth_date', e.target.value)}
                                            disabled={processing}
                                        />
                                        <InputError message={errors.birth_date} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="gender">Jenis Kelamin</Label>
                                        <Select
                                            value={data.gender}
                                            onValueChange={(value: 'male' | 'female') => setData('gender', value)}
                                            disabled={processing}
                                        >
                                            <SelectTrigger tabIndex={7}>
                                                <SelectValue placeholder="Pilih jenis kelamin" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="male">Laki-laki</SelectItem>
                                                <SelectItem value="female">Perempuan</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.gender} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="community">Komunitas</Label>
                                        <Select
                                            value={data.community_id.toString()}
                                            onValueChange={(value) => setData('community_id', parseInt(value))}
                                            disabled={processing}
                                        >
                                            <SelectTrigger tabIndex={8}>
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
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Kata Sandi</Label>
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

                                    <div className="grid gap-2">
                                        <Label htmlFor="password_confirmation">Konfirmasi Kata Sandi</Label>
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
                                                className="pr-10"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                tabIndex={-1}
                                                disabled={processing}
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                        <InputError message={errors.password_confirmation} />
                                    </div>
                                </div>

                                <Button type="submit" className="mt-6 w-full" tabIndex={11} disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                    Daftar Sekarang
                                </Button>

                                <div className="text-center text-sm text-muted-foreground mt-4">
                                    Sudah memiliki akun?{' '}
                                    <TextLink href={route('login')} tabIndex={12}>
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