import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';

interface Community {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

interface CommunityEditProps {
    community: Community;
}

export default function CommunityEdit({ community }: CommunityEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: community.name,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/communities/${community.id}`);
    };
    return (
        <AuthenticatedLayout>
            <Head title={`Edit Komunitas - ${community.name}`} />

            <div className="space-y-6 p-6 min-h-screen">
                <div className="space-y-2">
                    <nav className="flex items-center text-sm text-white">
                        <Link href={route('admin.communities.index')} className="hover:text-gray-300 transition-colors">
                            Komunitas Basis
                        </Link>
                        <span className="mx-2 text-gray-300">/</span>
                        <span className="text-white font-medium">Edit</span>
                    </nav>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Edit Komunitas Basis</h1>
                </div>
                <div className="max-w-2xl space-y-6">
                    <h2 className="text-lg font-semibold text-white mb-6">Informasi Komunitas</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-white font-medium">Nama Komunitas</Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Masukkan nama komunitas basis"
                                className={`bg-white text-black border-gray-300 focus:border-green-500 focus:ring-green-500 ${errors.name ? 'border-red-500' : ''}`}
                            />
                            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                        </div>

                        <div className="flex justify-end space-x-2">
                            <Link href="/admin/communities">
                                <Button type="button" variant="outline" className='bg-white text-gray-700 border-gray-300 hover:bg-gray-50'>
                                    Batal
                                </Button>
                            </Link>
                            <Button type="submit" className='bg-green-600 text-white hover:bg-green-700 disabled:bg-green-400' disabled={processing}>
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
