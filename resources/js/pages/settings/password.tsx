import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Password settings',
        href: '/settings/password',
    },
];

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Password settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Perbarui Kata Sandi" description="Pastikan akun Anda menggunakan kata sandi yang panjang dan acak agar tetap aman." />

                    <form onSubmit={updatePassword} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="current_password" className="text-sm font-semibold text-gray-700">Kata Sandi Saat Ini</Label>

                            <Input
                                id="current_password"
                                ref={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) => setData('current_password', e.target.value)}
                                type="password"
                                className="h-10 border-2 border-gray-200 focus:border-green-500 rounded-xl bg-white text-gray-800"
                                autoComplete="current-password"
                                placeholder="Kata sandi saat ini"
                            />

                            <InputError message={errors.current_password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Kata Sandi Baru</Label>

                            <Input
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                type="password"
                                className="h-10 border-2 border-gray-200 focus:border-green-500 rounded-xl bg-white text-gray-800"
                                autoComplete="new-password"
                                placeholder="Kata sandi baru"
                            />

                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation" className="text-sm font-semibold text-gray-700">Konfirmasi Kata Sandi</Label>

                            <Input
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                type="password"
                                className="h-10 border-2 border-gray-200 focus:border-green-500 rounded-xl bg-white text-gray-800"
                                autoComplete="new-password"
                                placeholder="Konfirmasi kata sandi baru"
                            />

                            <InputError message={errors.password_confirmation} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button className='bg-green-700 hover:bg-green-800 hover:cursor-pointer text-white' disabled={processing}>Simpan Kata Sandi</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-green-700 font-medium">Tersimpan</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
