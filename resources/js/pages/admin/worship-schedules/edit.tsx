import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { FormEvent } from 'react';

interface Community {
    id: number;
    name: string;
}

interface WorshipSchedule {
    id: number;
    name: string;
    date: string;
    pic: string;
    time_start: string;
    communities: Community[];
}

interface WorshipScheduleEditProps {
    worshipSchedule: WorshipSchedule;
    communities: Community[];
}

export default function WorshipScheduleEdit({ worshipSchedule, communities }: WorshipScheduleEditProps) {
    // Format date ke yyyy-MM-dd agar cocok dengan input type date
    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const { data, setData, put, processing, errors } = useForm({
        name: worshipSchedule.name,
        date: formatDate(worshipSchedule.date),
        pic: worshipSchedule.pic,
        time_start: worshipSchedule.time_start.substring(0, 5), // Get HH:MM from HH:MM:SS
        communities: worshipSchedule.communities.map((c) => c.id),
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(route('admin.worship-schedules.update', worshipSchedule.id));
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
            <Head title={`Edit Jadwal - ${worshipSchedule.name}`} />

            <div className="space-y-6 p-6 min-h-screen">
                <div className="space-y-2">
                    <nav className="flex items-center text-sm text-white">
                        <Link href={route('admin.worship-schedules.index')} className="hover:text-gray-300 transition-colors">
                            Jadwal Ibadah
                        </Link>
                        <span className="mx-2 text-gray-300">/</span>
                        <Link href={route('admin.worship-schedules.show', worshipSchedule.id)} className="hover:text-gray-300 transition-colors">
                            Detail
                        </Link>
                        <span className="mx-2 text-gray-300">/</span>
                        <span className="text-white font-medium">Edit</span>
                    </nav>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Edit Jadwal Ibadah</h1>
                </div>

                <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-white mb-6">Form Edit Jadwal Ibadah</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <Label htmlFor="name" className="text-white">Nama Ibadah *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Contoh: Ibadah Minggu Pagi"
                                        className={errors.name ? 'border-red-500 bg-white' : 'bg-white text-black'}
                                        required
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="date" className="text-white">Tanggal *</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => setData('date', e.target.value)}
                                        className={errors.date ? 'border-red-500 bg-white' : 'bg-white text-black'}
                                        required
                                    />
                                    {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="time_start" className="text-white">Waktu Mulai *</Label>
                                    <Input
                                        id="time_start"
                                        type="time"
                                        value={data.time_start}
                                        onChange={(e) => setData('time_start', e.target.value)}
                                        className={errors.time_start ? 'border-red-500 bg-white' : 'bg-white text-black'}
                                        required
                                    />
                                    {errors.time_start && <p className="mt-1 text-sm text-red-500">{errors.time_start}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="pic" className="text-white">Pemimpin *</Label>
                                    <Input
                                        id="pic"
                                        type="text"
                                        value={data.pic}
                                        onChange={(e) => setData('pic', e.target.value)}
                                        placeholder="Contoh: Pastor John, Pendeta Maria"
                                        className={errors.pic ? 'border-red-500 bg-white' : 'bg-white text-black'}
                                        required
                                    />
                                    {errors.pic && <p className="mt-1 text-sm text-red-500">{errors.pic}</p>}
                                </div>

                                {communities && communities.length > 0 && (
                                    <div className="md:col-span-2">
                                        <Label className="text-white">Komunitas Terkait</Label>
                                        <div className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-3">
                                            {communities.map((community) => (
                                                <div key={community.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`community-${community.id}`}
                                                        checked={data.communities.includes(community.id)}
                                                        onCheckedChange={(checked) => handleCommunityChange(community.id, checked as boolean)}
                                                    />
                                                    <Label htmlFor={`community-${community.id}`} className="text-sm text-white">
                                                        {community.name}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="mt-1 text-sm text-gray-300">
                                            Pilih komunitas yang terlibat dalam ibadah ini. Jika tidak dipilih, akan berlaku untuk semua komunitas.
                                        </p>
                                        {errors.communities && <p className="mt-1 text-sm text-red-500">{errors.communities}</p>}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Link href={route('admin.worship-schedules.show', worshipSchedule.id)}>
                                    <Button type="button" variant="outline" className='bg-white text-black text-gray-700 border-gray-300 hover:bg-gray-50'>
                                        Batal
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing} className='bg-green-600 text-white hover:bg-green-700 disabled:bg-green-400'>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
}
