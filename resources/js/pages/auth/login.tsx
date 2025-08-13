import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Users, Book, Shield, Eye, EyeOff } from 'lucide-react';
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Head title="Login" />
      
      {/* Background decorative elements */}
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
              <div className="flex justify-center lg:justify-start items-center mb-8">
                <div className="p-3 bg-primary/10 rounded-2xl backdrop-blur-sm border border-border shadow-lg mr-4">
                  <img src="/images/logo.png" alt="Logo" className='w-16 h-16 object-contain' />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold church-text-gradient leading-tight">
                    Selamat Datang
                  </h1>
                  <h2 className="text-3xl lg:text-4xl font-bold church-text-gradient">
                    Kembali
                  </h2>
                </div>
              </div>

              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                Masuk ke akun Anda untuk mengakses komunitas <span className="font-semibold text-primary">Gereja St. Paulus Kwimi</span>
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="p-3 bg-secondary/10 rounded-xl backdrop-blur-sm border border-border shadow-lg group-hover:shadow-xl transition-all duration-300 mt-1">
                  <Shield className="h-6 w-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-3 text-lg">Akun yang Aman</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Data dan privasi Anda dilindungi dengan sistem keamanan terbaik untuk kenyamanan beribadah digital.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="p-3 bg-primary/10 rounded-xl backdrop-blur-sm border border-border shadow-lg group-hover:shadow-xl transition-all duration-300 mt-1">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-3 text-lg">Terhubung dengan Jemaat</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Bergabung dengan komunitas, ikuti kegiatan, dan tetap terhubung dengan keluarga rohani.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="p-3 bg-accent/10 rounded-xl backdrop-blur-sm border border-border shadow-lg group-hover:shadow-xl transition-all duration-300 mt-1">
                  <Book className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-3 text-lg">Materi Rohani</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Akses jadwal ibadah, renungan harian, dan berbagai materi pembinaan iman.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full">
            <div className="bg-card/80 backdrop-blur-xl p-10 rounded-3xl church-shadow border border-border transition-all duration-500">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-foreground mb-3">Masuk ke Akun</h2>
                <p className="text-muted-foreground">Masukkan email dan kata sandi Anda</p>
              </div>

              {status && (
                <div className="mb-8 text-center text-sm font-medium text-secondary bg-secondary/10 p-4 rounded-xl border border-secondary/20 shadow-sm">
                  {status}
                </div>
              )}

              <form className="space-y-7" onSubmit={submit}>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email" className="text-foreground font-semibold">Alamat Email</Label>
                    <div className="relative">
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
                        className="h-12 px-4 bg-input border-border focus:border-primary focus:ring-ring rounded-xl shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm"
                      />
                    </div>
                    <InputError message={errors.email} />
                  </div>

                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password" className="text-foreground font-semibold">Kata Sandi</Label>
                      {canResetPassword && (
                        <TextLink 
                          href={route('password.request')} 
                          className="ml-auto text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200" 
                          tabIndex={7}
                        >
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
                        className="h-12 px-4 pr-12 bg-input border-border focus:border-primary focus:ring-ring rounded-xl shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted-foreground hover:text-foreground transition-colors duration-200"
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

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="remember"
                        name="remember"
                        checked={data.remember}
                        onClick={() => setData('remember', !data.remember)}
                        tabIndex={3}
                        disabled={processing}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <Label htmlFor="remember" className="text-foreground font-medium cursor-pointer">Ingat saya</Label>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="mt-8 w-full h-12 hover:opacity-90 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:cursor-pointer text-white" 
                    tabIndex={5} 
                    disabled={processing}
                  >
                    {processing && <LoaderCircle className="h-5 w-5 animate-spin mr-3" />}
                    {processing ? 'Sedang Masuk...' : 'Masuk ke Akun'}
                  </Button>
                </div>

                <div className="text-center text-slate-600 mt-8 pt-6 border-t border-slate-200">
                  Belum memiliki akun?{' '}
                  <TextLink 
                    href={route('register')} 
                    tabIndex={6}
                    className="font-semibold transition-colors duration-200"
                  >
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