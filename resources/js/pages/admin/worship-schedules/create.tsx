import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { FormEventHandler } from 'react';

interface Community {
    id: number;
    name: string;
}

interface WorshipSchedulesCreateProps {
    communities: Community[];
}

export default function WorshipSchedulesCreate({ communities }: WorshipSchedulesCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        date: '',
        pic: '',
        time_start: '',
        communities: [] as number[],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.worship-schedules.store'));
    };

    const handleCommunityChange = (communityId: number, checked: boolean) => {
        if (checked) {
            setData('communities', [...data.communities, communityId]);
        } else {
            setData(
                'communities',
                data.communities.filter((id) => id !== communityId),
            );
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Jadwal Ibadah" />

            <div className="space-y-6 p-6">
                <div className="space-y-2">
                    <nav className="flex items-center text-sm text-muted-foreground">
                        <Link href={route('admin.worship-schedules.index')} className="hover:text-foreground">
                            Jadwal Ibadah
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-foreground">Tambah Baru</span>
                    </nav>
                    <h1 className="text-2xl font-bold tracking-tight">Tambah Jadwal Ibadah</h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Jadwal Ibadah</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <Label htmlFor="name">Nama Ibadah *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Contoh: Ibadah Minggu Pagi"
                                        className={errors.name ? 'border-red-500' : ''}
                                        required
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="date">Tanggal *</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => setData('date', e.target.value)}
                                        className={errors.date ? 'border-red-500' : ''}
                                        required
                                    />
                                    {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="time_start">Waktu Mulai *</Label>
                                    <Input
                                        id="time_start"
                                        type="time"
                                        value={data.time_start}
                                        onChange={(e) => setData('time_start', e.target.value)}
                                        className={errors.time_start ? 'border-red-500' : ''}
                                        required
                                    />
                                    {errors.time_start && <p className="mt-1 text-sm text-red-500">{errors.time_start}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="pic">Pemimpin*</Label>
                                    <Input
                                        id="pic"
                                        type="text"
                                        value={data.pic}
                                        onChange={(e) => setData('pic', e.target.value)}
                                        placeholder="Contoh: Pastor John, Pendeta Maria"
                                        className={errors.pic ? 'border-red-500' : ''}
                                        required
                                    />
                                    {errors.pic && <p className="mt-1 text-sm text-red-500">{errors.pic}</p>}
                                </div>

                                {communities && communities.length > 0 && (
                                    <div className="md:col-span-2">
                                        <Label>Komunitas Terkait</Label>
                                        <div className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-3">
                                            {communities.map((community) => (
                                                <div key={community.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`community-${community.id}`}
                                                        checked={data.communities.includes(community.id)}
                                                        onCheckedChange={(checked) => handleCommunityChange(community.id, checked as boolean)}
                                                    />
                                                    <Label htmlFor={`community-${community.id}`} className="text-sm">
                                                        {community.name}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Pilih komunitas yang terlibat dalam ibadah ini. Jika tidak dipilih, akan berlaku untuk semua komunitas.
                                        </p>
                                        {errors.communities && <p className="mt-1 text-sm text-red-500">{errors.communities}</p>}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Link href={route('admin.worship-schedules.index')}>
                                    <Button type="button" variant="outline" className='bg-white border hover:bg-white hover:cursor-pointer text-black hover:text-black'>
                                        Batal
                                    </Button>
                                </Link>
                                <Button type="submit" className='bg-primary text-white hover:bg-primary/80' disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Menyimpan...' : 'Simpan Jadwal'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
