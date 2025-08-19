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
import { Edit, Eye, Filter, Plus, RotateCcw, Search, Trash2, User, Users } from 'lucide-react';
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

      <div className="space-y-6 p-6">
        {/* Flash messages */}
        {props.flash?.success && (
          <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{props.flash.success}</div>
        )}
        {props.flash?.error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{props.flash.error}</div>
        )}

        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manajemen Umat</h1>
          <p className="text-muted-foreground">Kelola semua Umat sistem ST. Paulus Kwimi</p>
        </div>

        {/* Toolbar (Search + Filters) */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <div className="relative w-full max-w-sm">
              <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari nama atau email..."
                className="h-9 pl-8 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <select
              className="h-9 rounded-md border border-input bg-background px-2 text-sm"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="umat">Umat</option>
              <option value="admin">Admin</option>
            </select>
            <div className="flex gap-2">
              <Button onClick={handleSearch} variant="default" size="sm" className="px-2 sm:px-4 text-white " title="Filter">
                <Filter className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline ">Filter</span>
              </Button>
              <Button
                onClick={handleReset}
                size="sm"
                className="px-2 sm:px-4 border text-black cursor-pointer bg-white hover:bg-muted"
                title="Reset"
              >
                <RotateCcw className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Reset</span>
              </Button>
            </div>
          </div>
          <Button asChild className="shrink-0 px-2 sm:px-4 text-white hover:bg-primary/90">
            <Link href={route('admin.users.create')}>
              <Plus className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Tambah Umat</span>
            </Link>
          </Button>
        </div>

        {/* Users List */}
        <div>
          <div className="rounded-md border">
            {users.data.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/60">
                    <TableHead>Nama</TableHead>
                    <TableHead>Tempat Lahir</TableHead>
                    <TableHead>Tanggal Lahir</TableHead>
                    <TableHead>Jenis Kelamin</TableHead>
                    <TableHead>Alamat</TableHead>
                    <TableHead>Umur</TableHead>
                    <TableHead>Kombas</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.data.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <span className="font-semibold">{user.name}</span>
                      </TableCell>
                      <TableCell>
                        {user.birth_place || '-'}
                      </TableCell>
                      <TableCell>
                        {user.birth_date ? new Date(user.birth_date).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '-'}
                      </TableCell>
                      <TableCell>
                        {user.gender === 'male' ? 'Laki-laki' : user.gender === 'female' ? 'Perempuan' : '-'}
                      </TableCell>
                      <TableCell>
                        {user.address || '-'}
                      </TableCell>
                      <TableCell>
                        {user.age !== null && user.age !== undefined ? `${user.age} tahun` : '-'}
                      </TableCell>
                      <TableCell>
                        {user.community ? user.community.name : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" asChild className='bg-secondary hover:bg-secondary/90'>
                            <Link href={route('admin.users.show', user.id)}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild className='bg-primary hover:bg-primary/90'>
                            <Link href={route('admin.users.edit', user.id)}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id, user.name)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="py-12 text-center">
                <Users className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-lg font-medium">Tidak ada Umat ditemukan</p>
                <p className="text-muted-foreground">Coba ubah filter pencarian Anda</p>
              </div>
            )}
          </div>
          {/* Pagination */}
          {users.data.length > 0 && (
            <div className="mt-6 flex items-center justify-between border-t pt-6">
              <div className="text-sm text-muted-foreground">
                Menampilkan {users.data.length} dari {users.total} Umat
              </div>
              <div className="flex gap-2">
                {users.links.map((link, index) => {
                  const baseClass =
                    'px-3 py-1 rounded-md font-medium transition-all duration-150 border cursor-pointer';
                  const activeClass =
                    'bg-secondary text-white border-secondary hover:opacity-80';
                  const inactiveClass =
                    'bg-white text-secondary border-secondary hover:opacity-80';
                  const disabledClass =
                    'bg-secondary text-muted-foreground border-secondary opacity-60 cursor-not-allowed';
                  const label = getLabel(link.label);
                  return link.url ? (
                    <button
                      key={index}
                      className={
                        baseClass +
                        ' ' +
                        (link.active ? activeClass : inactiveClass)
                      }
                      onClick={() => router.visit(link.url!)}
                      dangerouslySetInnerHTML={{ __html: label }}
                      type="button"
                    />
                  ) : (
                    <button
                      key={index}
                      className={baseClass + ' ' + disabledClass}
                      disabled
                      dangerouslySetInnerHTML={{ __html: label }}
                      type="button"
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
