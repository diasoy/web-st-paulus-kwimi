import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
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
        nama: '',
        waktu: '',
        hari: '',
        tempat: '',
        keterangan: '',
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

    const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Jadwal Ibadah" />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/worship-schedules">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Tambah Jadwal Ibadah</h1>
                        <p className="text-muted-foreground">Buat jadwal ibadah baru untuk jemaat ST. Paulus Kwimi</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Form Jadwal Ibadah</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <Label htmlFor="nama">Nama Ibadah *</Label>
                                    <Input
                                        id="nama"
                                        type="text"
                                        value={data.nama}
                                        onChange={(e) => setData('nama', e.target.value)}
                                        placeholder="Contoh: Ibadah Minggu Pagi"
                                        className={errors.nama ? 'border-red-500' : ''}
                                        required
                                    />
                                    {errors.nama && <p className="mt-1 text-sm text-red-500">{errors.nama}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="hari">Hari *</Label>
                                    <Select value={data.hari} onValueChange={(value) => setData('hari', value)}>
                                        <SelectTrigger className={errors.hari ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Pilih hari" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {daysOfWeek.map((day) => (
                                                <SelectItem key={day} value={day}>
                                                    {day}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.hari && <p className="mt-1 text-sm text-red-500">{errors.hari}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="waktu">Waktu *</Label>
                                    <Input
                                        id="waktu"
                                        type="time"
                                        value={data.waktu}
                                        onChange={(e) => setData('waktu', e.target.value)}
                                        className={errors.waktu ? 'border-red-500' : ''}
                                        required
                                    />
                                    {errors.waktu && <p className="mt-1 text-sm text-red-500">{errors.waktu}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="tempat">Tempat</Label>
                                    <Input
                                        id="tempat"
                                        type="text"
                                        value={data.tempat}
                                        onChange={(e) => setData('tempat', e.target.value)}
                                        placeholder="Contoh: Gereja ST. Paulus Kwimi"
                                        className={errors.tempat ? 'border-red-500' : ''}
                                    />
                                    {errors.tempat && <p className="mt-1 text-sm text-red-500">{errors.tempat}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="keterangan">Keterangan</Label>
                                    <Textarea
                                        id="keterangan"
                                        value={data.keterangan}
                                        onChange={(e) => setData('keterangan', e.target.value)}
                                        placeholder="Keterangan tambahan tentang ibadah"
                                        className={errors.keterangan ? 'border-red-500' : ''}
                                        rows={3}
                                    />
                                    {errors.keterangan && <p className="mt-1 text-sm text-red-500">{errors.keterangan}</p>}
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
                                        <p className="mt-1 text-sm text-muted-foreground">Pilih komunitas yang terlibat dalam ibadah ini</p>
                                        {errors.communities && <p className="mt-1 text-sm text-red-500">{errors.communities}</p>}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Link href="/admin/worship-schedules">
                                    <Button type="button" variant="outline">
                                        Batal
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
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
