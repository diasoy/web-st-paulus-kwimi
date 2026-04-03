import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Building2, Users } from 'lucide-react';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/umat/dashboard' },
    { title: 'Komunitas Basis', href: '/umat/communities' },
];

interface Community {
    id: number;
    name: string;
    users_count: number;
}

interface Props {
    communities: Community[];
    my_community_id: number | null;
}

export default function UmatCommunitiesIndex({ communities, my_community_id }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Komunitas Basis Gerejawi" />

            <div className="p-6 dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #1a4d20 0%, #235829 40%, #3e7147 100%)' }}>
                {/* Header */}
                <div className="mb-6 relative bg-gradient-to-r from-emerald-700 via-green-700 to-teal-800 rounded-2xl p-8 shadow-2xl overflow-hidden">
                    <div className="relative z-10 text-center">
                        <div className="relative inline-block mb-3">
                            <h1 className="text-4xl font-bold text-white drop-shadow-lg">Komunitas Basis Gerejawi</h1>
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg blur opacity-20"></div>
                        </div>
                        <p className="text-white/90 text-lg font-medium">
                            Daftar komunitas basis Gerejawi ST. Paulus Kwimi
                        </p>
                    </div>
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
                </div>

                {/* Stats */}
                <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-5 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-emerald-100 p-3">
                            <Building2 className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-800">{communities.length}</p>
                            <p className="text-sm text-slate-500">Total Komunitas Basis</p>
                        </div>
                        {my_community_id && (
                            <div className="ml-auto">
                                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                                    Komunitas Saya Terdaftar
                                </Badge>
                            </div>
                        )}
                    </div>
                </div>

                {/* Grid of communities */}
                <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-6">
                    {communities.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="rounded-full bg-emerald-100 p-5 w-fit mx-auto mb-4">
                                <Building2 className="h-10 w-10 text-emerald-400" />
                            </div>
                            <p className="text-gray-500 text-lg font-medium">Belum ada komunitas terdaftar</p>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {communities.map((community) => {
                                const isMyComm = community.id === my_community_id;
                                return (
                                    <div
                                        key={community.id}
                                        className={`rounded-xl border-2 p-5 flex flex-col gap-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ${
                                            isMyComm
                                                ? 'border-emerald-400 bg-gradient-to-b from-emerald-50 to-white'
                                                : 'border-gray-200 bg-gradient-to-b from-white to-gray-50'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`rounded-full p-2.5 ${isMyComm ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                                                <Building2 className={`h-5 w-5 ${isMyComm ? 'text-emerald-600' : 'text-gray-500'}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`font-bold text-sm leading-tight ${isMyComm ? 'text-emerald-800' : 'text-slate-800'}`}>
                                                    {community.name}
                                                </p>
                                                {isMyComm && (
                                                    <Badge className="mt-1 bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                                                        Komunitas Saya
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                            <Users className="h-4 w-4 text-emerald-400" />
                                            <span>
                                                <span className="font-semibold text-slate-700">{community.users_count}</span> anggota
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
