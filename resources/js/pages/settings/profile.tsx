import { type BreadcrumbItem, type SharedData } from '@/types';
import { Textarea, Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

interface Community {
    id: number;
    name: string;
}

type ProfileForm = {
    name: string;
    address: string;
    birth_date: string;
    gender: 'male' | 'female';
    community_id: number;
};

interface Props {
    mustVerifyEmail: boolean;
    status?: string;
    communities: Community[];
}

export default function Profile({ mustVerifyEmail, status, communities }: Props) {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;
    
    // Function to format date for date input (expects YYYY-MM-DD)
    const formatDateForDateInput = (dateString: string | undefined): string => {
        if (!dateString) return '';
        
        try {
            // If already in YYYY-MM-DD format
            if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
                return dateString;
            }
            
            // If in MM/DD/YYYY format, convert to YYYY-MM-DD
            if (dateString.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
                const [month, day, year] = dateString.split('/');
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            }
            
            // Try to parse any other date format
            const date = new Date(dateString);
            if (!isNaN(date.getTime())) {
                return date.toISOString().split('T')[0];
            }
        } catch (error) {
            console.error('Error formatting birth_date:', error);
        }
        
        return '';
    };
    
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        name: user?.name || '',
        address: user?.address || '',
        birth_date: formatDateForDateInput(user?.birth_date),
        gender: (user?.gender as 'male' | 'female') || 'male',
        community_id: user?.community_id || (communities.length > 0 ? communities[0].id : 1),
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Profile information" description="Update your profile information"/>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Name only */}
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama Lengkap</Label>
                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Nama lengkap"
                            />
                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        {/* Birth Date only */}
                        <div className="grid gap-2">
                            <Label htmlFor="birth_date">Tanggal Lahir</Label>
                            <Input
                                id="birth_date"
                                type="date"
                                className="mt-1 block w-full"
                                value={data.birth_date}
                                onChange={(e) => setData('birth_date', e.target.value)}
                                autoComplete="bday"
                            />
                            <InputError className="mt-2" message={errors.birth_date} />
                        </div>

                        {/* Gender and Community in 2 columns */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="gender">Jenis Kelamin</Label>
                                <Select
                                    value={data.gender}
                                    onValueChange={(value: 'male' | 'female') => setData('gender', value)}
                                >
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Pilih jenis kelamin" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Laki-laki</SelectItem>
                                        <SelectItem value="female">Perempuan</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError className="mt-2" message={errors.gender} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="community_id">Kombas</Label>
                                <Select
                                    value={data.community_id.toString()}
                                    onValueChange={(value: string) => setData('community_id', parseInt(value))}
                                >
                                    <SelectTrigger className="mt-1">
                                        <SelectValue placeholder="Pilih kombas" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {communities.map((community) => (
                                            <SelectItem key={community.id} value={community.id.toString()}>
                                                {community.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError className="mt-2" message={errors.community_id} />
                            </div>
                        </div>

                        {/* Address as full width textarea */}
                        <div className="grid gap-2">
                            <Label htmlFor="address">Alamat</Label>
                            <Textarea
                                id="address"
                                className="mt-1 block w-full min-h-[100px]"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                autoComplete="street-address"
                                placeholder="Alamat lengkap dengan RT/RW, Kelurahan, Kecamatan, Kota, Provinsi"
                                rows={3}
                            />
                            <InputError className="mt-2" message={errors.address} />
                        </div>                      

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="-mt-4 text-sm">
                                    Alamat email Anda belum diverifikasi.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Klik di sini untuk mengirim ulang email verifikasi.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        Link verifikasi baru telah dikirim ke alamat email Anda.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button className='text-white hover:cursor-pointer' disabled={processing}>Simpan</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Tersimpan</p>
                            </Transition>
                        </div>
                    </form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}