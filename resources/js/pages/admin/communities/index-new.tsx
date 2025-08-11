import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Eye, Plus, Trash2, Users } from 'lucide-react';

interface Community {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

interface CommunitiesIndexProps {
    communities: {
        data: Community[];
        links?: any[];
        meta?: any;
    };
}

export default function CommunitiesIndex({ communities }: CommunitiesIndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus komunitas basis ini?')) {
            router.delete(`/admin/communities/${id}`);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Kelola Komunitas Basis" />

            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Kelola Komunitas Basis</h1>
                        <p className="text-gray-600">Kelola semua komunitas basis jemaat ST. Paulus Kwimi</p>
                    </div>
                    <Link
                        href="/admin/communities/create"
                        className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out hover:bg-blue-700 focus:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:bg-blue-900"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Komunitas
                    </Link>
                </div>

                <div className="bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <h2 className="mb-4 text-lg font-medium text-gray-900">Daftar Komunitas Basis</h2>

                        {!communities || !communities.data || communities.data.length === 0 ? (
                            <div className="py-12 text-center">
                                <Users className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">Belum ada komunitas basis</h3>
                                <p className="mt-1 text-sm text-gray-500">Mulai dengan membuat komunitas basis pertama.</p>
                                <div className="mt-6">
                                    <Link
                                        href="/admin/communities/create"
                                        className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase hover:bg-blue-700"
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Tambah Komunitas
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                Nama Komunitas
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                Tanggal Dibuat
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {communities.data.map((community) => (
                                            <tr key={community.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{community.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{formatDate(community.created_at)}</div>
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                    <div className="flex justify-end space-x-2">
                                                        <Link
                                                            href={`/admin/communities/${community.id}`}
                                                            className="inline-flex items-center rounded border border-transparent px-2 py-1 text-xs text-blue-600 hover:text-blue-900"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                        <Link
                                                            href={`/admin/communities/${community.id}/edit`}
                                                            className="inline-flex items-center rounded border border-transparent px-2 py-1 text-xs text-green-600 hover:text-green-900"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(community.id)}
                                                            className="inline-flex items-center rounded border border-transparent px-2 py-1 text-xs text-red-600 hover:text-red-900"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
