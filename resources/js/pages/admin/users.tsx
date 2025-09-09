/* eslint-disable @typescript-eslint/no-explicit-any */
const labelMap: Record<string, string> = {
  'pagination.next': 'Berikutnya',
  'pagination.previous': 'Sebelumnya',
  'pagination.first': 'Pertama',
  'pagination.last': 'Terakhir',
};

const getLabel = (label: string) => labelMap[label] || label;
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, Eye, Filter, Plus, RotateCcw, Search, Trash2, User, Users, Download } from 'lucide-react';
import { useState } from 'react';

interface User {
  age: null;
  address: string;
  birth_date: any;
  birth_place?: string;
  id: number;
  name: string;
  role: string;
  gender: 'male' | 'female';
  status: 'active' | 'inactive';
  community?: {
    id: number;
    name: string;
  };
  created_at: string;
}

interface UsersManagementProps {
  users: {
    data: User[];
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    current_page: number;
    per_page: number;
    total: number;
  };
  filters: {
    search?: string;
    role?: string;
  };
}

export default function UsersManagement({ users, filters }: UsersManagementProps) {
  const { props } = usePage<{ flash?: { success?: string; error?: string } }>();
  const [search, setSearch] = useState(filters.search || '');
  const [roleFilter, setRoleFilter] = useState(filters.role || 'umat');

  const handleSearch = () => {
    router.get(
      route('admin.users'),
      {
        search: search,
        role: roleFilter,
      },
      {
        preserveState: true,
        replace: true,
      },
    );
  };

  const handleReset = () => {
    setSearch('');
    setRoleFilter('umat');
    router.get(route('admin.users'), { role: 'umat' });
  };

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus Umat "${name}" secara permanen?`)) {
      router.delete(route('admin.users.destroy', id));
    }
  };

  return (
    <AuthenticatedLayout>
      <Head title="Manajemen Umat" />

      <div className="dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
        <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
          {/* Header Section */}
          <div className="relative z-10 space-y-4">
            <div className="text-center">
              <div className="relative inline-block">
                <h1 className="text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-lg">
                  Manajemen Umat
                </h1>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25"></div>
              </div>
              <p className="text-white/95 text-xl font-medium drop-shadow-md">
                Kelola semua data umat Gereja ST. Paulus Kwimi
              </p>
            </div>
          </div>
          <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
          <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-white/5 blur-xl"></div>

          {/* Flash messages */}
          {props.flash?.success && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl shadow-md">
              <p className="font-medium">{props.flash.success}</p>
            </div>
          )}
          {props.flash?.error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl shadow-md">
              <p className="font-medium">{props.flash.error}</p>
            </div>
          )}

          {/* Search and Filter Section */}
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white p-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <div className="rounded-full bg-white/20 p-2">
                  <Search className="h-5 w-5 text-white" />
                </div>
                Filter & Pencarian
              </h2>
            </div>
            <div className="p-6">
              <div className="flex flex-col lg:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                  <Search className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Cari nama atau username umat..."
                    className="h-12 pl-11 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl bg-white text-gray-900 placeholder-gray-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <select
                  className="h-12 rounded-xl border-2 border-gray-200 bg-white px-4 text-lg text-gray-900 focus:border-blue-500 focus:ring-blue-500 focus:outline-none min-w-32"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="umat">Umat</option>
                  <option value="admin">Admin</option>
                </select>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={handleSearch} 
                    className="h-12 px-4 xl:px-6 text-sm xl:text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Filter className="h-5 w-5 mr-2" />
                    Filter
                  </Button>
                  <Button
                    onClick={handleReset}
                    className="h-12 px-4 xl:px-6 text-sm xl:text-lg font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Reset
                  </Button>
                  <Button asChild className="h-12 px-4 xl:px-6 text-sm xl:text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                    <Link href={route('admin.users.create')}>
                      <Plus className="h-5 w-5 mr-2" />
                      <span className="hidden sm:inline">Tambah Umat</span>
                      <span className="sm:hidden">Tambah</span>
                    </Link>
                  </Button>
                  <Button
                    className="h-12 px-4 xl:px-6 text-sm xl:text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    onClick={() => window.open(route('admin.users.exportpdf'), '_blank')}
                  >
                    <Download className="h-5 w-5 mr-2" />
                    <span className="hidden sm:inline">Download Data</span>
                    <span className="sm:hidden">Download</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Users List */}
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 text-white p-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <div className="rounded-full bg-white/20 p-2">
                  <Users className="h-5 w-5 text-white" />
                </div>
                Daftar Umat ({users.total} orang)
              </h2>
            </div>
            <div className="overflow-hidden">
              {users.data.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 border-b-2 border-gray-200">
                      <TableHead className="text-gray-900 font-bold text-sm">Nama</TableHead>
                      <TableHead className="text-gray-900 font-bold text-sm">Tempat Lahir</TableHead>
                      <TableHead className="text-gray-900 font-bold text-sm">Tanggal Lahir</TableHead>
                      <TableHead className="text-gray-900 font-bold text-sm">Jenis Kelamin</TableHead>
                      <TableHead className="text-gray-900 font-bold text-sm">Alamat</TableHead>
                      <TableHead className="text-gray-900 font-bold text-sm">Umur</TableHead>
                      <TableHead className="text-gray-900 font-bold text-sm">Komunitas Basis</TableHead>
                      <TableHead className="text-right text-gray-900 font-bold text-sm">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.data.map((user, index) => (
                      <TableRow key={user.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-blue-50/50 transition-colors duration-200`}>
                        <TableCell className="font-medium py-4">
                          <div className="flex items-center gap-3">
                            <div className="rounded-full bg-blue-100 p-2">
                              <User className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="font-semibold text-gray-900">{user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-700 py-4">
                          {user.birth_place || <span className="text-gray-400 italic">Tidak ada data</span>}
                        </TableCell>
                        <TableCell className="text-gray-700 py-4">
                          {user.birth_date ? (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                              {new Date(user.birth_date).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                            </span>
                          ) : (
                            <span className="text-gray-400 italic">Tidak ada data</span>
                          )}
                        </TableCell>
                        <TableCell className="py-4">
                          {user.gender === 'male' ? (
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Laki-laki</span>
                          ) : user.gender === 'female' ? (
                            <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium">Perempuan</span>
                          ) : (
                            <span className="text-gray-400 italic">Tidak ada data</span>
                          )}
                        </TableCell>
                        <TableCell className="text-gray-700 py-4 max-w-48">
                          {user.address ? (
                            <span className="truncate block">{user.address}</span>
                          ) : (
                            <span className="text-gray-400 italic">Tidak ada data</span>
                          )}
                        </TableCell>
                        <TableCell className="text-gray-700 py-4">
                          {user.age !== null && user.age !== undefined ? (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                              {user.age} tahun
                            </span>
                          ) : (
                            <span className="text-gray-400 italic">Tidak ada data</span>
                          )}
                        </TableCell>
                        <TableCell className="text-gray-700 py-4">
                          {user.community ? (
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-lg text-sm font-medium">
                              {user.community.name}
                            </span>
                          ) : (
                            <span className="text-gray-400 italic">Belum ditentukan</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right py-4">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" asChild className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100">
                              <Link href={route('admin.users.show', user.id)}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild className="bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100">
                              <Link href={route('admin.users.edit', user.id)}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleDelete(user.id, user.name)}
                              className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="py-16 text-center">
                  <div className="rounded-full bg-gray-100 p-6 w-24 h-24 mx-auto mb-6">
                    <Users className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada umat ditemukan</h3>
                  <p className="text-gray-600 mb-6">Coba ubah filter pencarian Anda atau tambah umat baru</p>
                  <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                    <Link href={route('admin.users.create')}>
                      <Plus className="h-4 w-4 mr-2" />
                      Tambah Umat Pertama
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
          {/* Pagination */}
          {users.data.length > 0 && (
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-lg font-medium text-gray-700">
                  Menampilkan <span className="font-bold text-blue-600">{users.data.length}</span> dari <span className="font-bold text-blue-600">{users.total}</span> umat
                </div>
                <div className="flex gap-2">
                  {users.links.map((link, index) => {
                    const baseClass = 'px-4 py-2 rounded-xl font-medium transition-all duration-200 border-2';
                    const activeClass = 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-lg';
                    const inactiveClass = 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300';
                    const disabledClass = 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed';
                    const label = getLabel(link.label);
                    return link.url ? (
                      <button
                        key={index}
                        className={`${baseClass} ${link.active ? activeClass : inactiveClass}`}
                        onClick={() => router.visit(link.url!)}
                        dangerouslySetInnerHTML={{ __html: label }}
                        type="button"
                      />
                    ) : (
                      <button
                        key={index}
                        className={`${baseClass} ${disabledClass}`}
                        disabled
                        dangerouslySetInnerHTML={{ __html: label }}
                        type="button"
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
