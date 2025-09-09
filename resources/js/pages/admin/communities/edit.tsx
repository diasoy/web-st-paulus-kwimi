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

            <div className="dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
                <div className="mx-auto max-w-4xl px-6 py-8 space-y-8">
                    {/* Header Section */}
                    <div className="relative z-10 space-y-4">
                        <nav className="flex items-center text-sm font-medium">
                            <Link 
                                href={route('admin.communities.index')} 
                                className="text-white/90 hover:text-white transition-colors duration-200 flex items-center gap-1"
                            >
                                <span>← Kembali ke Daftar Komunitas</span>
                            </Link>
                        </nav>
                        <div className="text-center">
                            <div className="relative inline-block">
                                <h1 className="text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-lg">
                                    Edit Komunitas Basis
                                </h1>
                                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg blur opacity-25"></div>
                            </div>
                            <p className="text-white/95 text-xl font-medium drop-shadow-md">
                                Perbarui informasi komunitas "{community.name}"
                            </p>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
                        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-8 border-b border-white/20">
                            <div className="flex items-center gap-4">
                                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-xl">
                                    <Save className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-1">Informasi Komunitas</h2>
                                    <p className="text-white/80 text-lg">Perbarui detail komunitas basis</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-3">
                                    <Label htmlFor="name" className="text-white font-semibold text-lg flex items-center gap-2">
                                        <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                                        Nama Komunitas *
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Masukkan nama komunitas basis"
                                        required
                                        className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-yellow-400 focus:bg-white/15 rounded-xl h-14 text-lg font-medium shadow-lg"
                                    />
                                    {errors.name && (
                                        <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-xl">
                                            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                            <p className="text-red-300 font-medium">{errors.name}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-end gap-4 pt-8">
                                    <Link href="/admin/communities">
                                        <Button 
                                            type="button" 
                                            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-lg"
                                        >
                                            Batal
                                        </Button>
                                    </Link>
                                    <Button 
                                        type="submit" 
                                        disabled={processing}
                                        className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white border-0 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-xl text-lg"
                                    >
                                        <Save className="mr-3 h-5 w-5" />
                                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
