import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  Edit,
  Eye,
  Mail,
  Phone,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  Users,
  Building2,
} from 'lucide-react';
import { useState } from 'react';

const labelMap: Record<string, string> = {
  'pagination.next': 'Berikutnya',
  'pagination.previous': 'Sebelumnya',
  '&laquo; Previous': 'Sebelumnya',
  'Next &raquo;': 'Berikutnya',
  '&laquo;': 'Sebelumnya',
  '&raquo;': 'Berikutnya',
};

const getLabel = (label: string) => {
  const cleanLabel = label.replace(/&laquo;|&raquo;/g, '').trim();
  return labelMap[label] || labelMap[cleanLabel] || cleanLabel || label;
};

interface Official {
  id: number;
  name: string;
  position: string;
  phone?: string;
  email?: string;
  address?: string;
  photo?: string;
  photo_url?: string;
  community_id?: number;
  community?: {
    id: number;
    name: string;
  };
  department?: string;
  start_date?: string;
  end_date?: string;
  is_active: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface PaginationLink {
  url?: string;
  label: string;
  active: boolean;
}

interface PaginationMeta {
  current_page: number;
  from: number;
  to: number;
  per_page: number;
  total: number;
}

interface Position {
  value: string;
  label: string;
}

interface ChurchOfficialsIndexProps {
  officials: {
    data: Official[];
    links?: PaginationLink[];
    meta?: PaginationMeta;
  };
  positions: Position[];
}

export default function ChurchOfficialsIndex({ officials, positions }: ChurchOfficialsIndexProps) {
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const [search, setSearch] = useState<string>(params.get('search') || '');
  const [sortBy, setSortBy] = useState<string>(params.get('sort') || 'name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>((params.get('direction') as 'asc' | 'desc') || 'asc');
  const [positionFilter, setPositionFilter] = useState<string>(params.get('position') || 'all');
  const [statusFilter, setStatusFilter] = useState<string>(params.get('status') || 'all');

  const handleSort = (field: string) => {
    const newDirection = field === sortBy && sortDir === 'asc' ? 'desc' : 'asc';
    setSortBy(field);
    setSortDir(newDirection);
    router.get(
      route('admin.church-officials.index'),
      { search, sort: field, direction: newDirection, position: positionFilter, status: statusFilter },
      { preserveState: true, replace: true, preserveScroll: true }
    );
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (field !== sortBy) return <ChevronsUpDown className="ml-1 h-4 w-4" />;
    return sortDir === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />;
  };

  const handleSearch = () => {
    router.get(
      route('admin.church-officials.index'),
      { 
        search, 
        sort: sortBy, 
        direction: sortDir, 
        position: positionFilter === 'all' ? '' : positionFilter, 
        status: statusFilter === 'all' ? '' : statusFilter 
      },
      { preserveState: true, replace: true, preserveScroll: true }
    );
  };

  const handleReset = () => {
    setSearch('');
    setPositionFilter('all');
    setStatusFilter('all');
    router.get(
      route('admin.church-officials.index'),
      { sort: sortBy, direction: sortDir },
      { preserveState: true, replace: true, preserveScroll: true }
    );
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data pengurus ini?')) {
      router.delete(route('admin.church-officials.destroy', id));
    }
  };

  const getPositionLabel = (position: string): string => {
    const pos = positions.find(p => p.value === position);
    return pos?.label || position;
  };

  return (
    <AuthenticatedLayout>
      <Head title="Data Pengurus Gereja" />

      <div className="dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
        <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
          {/* Header */}
          <div className="relative z-10 space-y-4">
            <div className="text-center">
              <div className="relative inline-block">
                <h1 className="text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-lg flex items-center justify-center gap-4">
                  <Users className="h-12 w-12 text-blue-400" />
                  Data Pengurus Gereja
                </h1>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25"></div>
              </div>
              <p className="text-white/95 text-xl font-medium drop-shadow-md">
                Kelola data pastor paroki dan pengurus lingkungan
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
                  <Input
                    placeholder="Cari nama, email, telepon..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-12 bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-blue-400 focus:bg-white/15 rounded-xl h-12"
                  />
                </div>
              </div>

              {/* Position Filter */}
              <div>
                <Select value={positionFilter} onValueChange={setPositionFilter}>
                  <SelectTrigger className="bg-white/10 border-white/30 text-white h-12 rounded-xl">
                    <SelectValue placeholder="Semua Jabatan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Jabatan</SelectItem>
                    {positions.map((pos) => (
                      <SelectItem key={pos.value} value={pos.value}>
                        {pos.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filter */}
              <div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-white/10 border-white/30 text-white h-12 rounded-xl">
                    <SelectValue placeholder="Semua Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="inactive">Tidak Aktif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <Button
                onClick={handleSearch}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Search className="h-5 w-5 mr-2" />
                Cari
              </Button>
              {(search || (positionFilter !== 'all') || (statusFilter !== 'all')) && (
                <Button
                  onClick={handleReset}
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              )}
              <Link href={route('admin.church-officials.create')}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-xl border-0 px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Tambah Pengurus
                </Button>
              </Link>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
            {officials.data.length === 0 ? (
              <div className="text-center py-16 px-8">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full mb-6">
                  <Users className="h-12 w-12 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Belum ada data pengurus</h3>
                <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
                  Mulai dengan menambahkan data pengurus gereja pertama
                </p>
                <Link href={route('admin.church-officials.create')}>
                  <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                    <Plus className="mr-3 h-5 w-5" />
                    Tambah Pengurus Pertama
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/20 hover:bg-white/5 bg-gradient-to-r from-white/10 to-white/5">
                        <TableHead className="text-white font-bold pl-8 py-6">
                          <button
                            type="button"
                            onClick={() => handleSort('name')}
                            className="flex items-center font-bold hover:text-blue-300 transition-colors"
                          >
                            Nama
                            <SortIcon field="name" />
                          </button>
                        </TableHead>
                        <TableHead className="text-white font-bold py-6">
                          <button
                            type="button"
                            onClick={() => handleSort('position')}
                            className="flex items-center font-bold hover:text-green-300 transition-colors"
                          >
                            Jabatan
                            <SortIcon field="position" />
                          </button>
                        </TableHead>
                        <TableHead className="text-white font-bold py-6">Kontak</TableHead>
                        <TableHead className="text-white font-bold py-6">Lingkungan</TableHead>
                        <TableHead className="text-white font-bold py-6">Status</TableHead>
                        <TableHead className="text-white font-bold pr-8 text-right py-6">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {officials.data.map((official) => (
                        <TableRow
                          key={official.id}
                          className="border-white/10 hover:bg-white/5 transition-all duration-200"
                        >
                          <TableCell className="pl-8 py-5">
                            <div className="flex items-center gap-4">
                              <img
                                src={official.photo_url || '/images/default-avatar.png'}
                                alt={official.name}
                                className="h-12 w-12 rounded-full object-cover border-2 border-white/30"
                              />
                              <div>
                                <div className="font-semibold text-white text-lg">{official.name}</div>
                                {official.department && (
                                  <div className="text-sm text-white/60">{official.department}</div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-5">
                            <Badge className="bg-blue-500/20 text-blue-200 border border-blue-400/30 px-3 py-1">
                              {getPositionLabel(official.position)}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-5">
                            <div className="space-y-1">
                              {official.phone && (
                                <div className="flex items-center gap-2 text-white/80 text-sm">
                                  <Phone className="h-3 w-3" />
                                  {official.phone}
                                </div>
                              )}
                              {official.email && (
                                <div className="flex items-center gap-2 text-white/80 text-sm">
                                  <Mail className="h-3 w-3" />
                                  {official.email}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="py-5">
                            {official.community ? (
                              <div className="flex items-center gap-2 text-white/80">
                                <Building2 className="h-4 w-4" />
                                {official.community.name}
                              </div>
                            ) : (
                              <span className="text-white/40">-</span>
                            )}
                          </TableCell>
                          <TableCell className="py-5">
                            <Badge
                              className={
                                official.is_active
                                  ? 'bg-green-500/20 text-green-200 border border-green-400/30'
                                  : 'bg-red-500/20 text-red-200 border border-red-400/30'
                              }
                            >
                              {official.is_active ? 'Aktif' : 'Tidak Aktif'}
                            </Badge>
                          </TableCell>
                          <TableCell className="pr-8 text-right py-5">
                            <div className="flex items-center justify-end gap-2">
                              <Link href={route('admin.church-officials.show', official.id)}>
                                <Button
                                  size="sm"
                                  className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 border border-blue-400/30"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Link href={route('admin.church-officials.edit', official.id)}>
                                <Button
                                  size="sm"
                                  className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/30"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Button
                                size="sm"
                                onClick={() => handleDelete(official.id)}
                                className="bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-400/30"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {officials.links && officials.links.length > 0 && (
                  <div className="flex items-center justify-center gap-1 px-6 py-6 border-t border-white/10">
                    {officials.links.map((link, index) => {
                      const isDisabled = !link.url;
                      const isActive = link.active;

                      return (
                        <Button
                          key={index}
                          variant={isActive ? 'default' : 'outline'}
                          size="sm"
                          disabled={isDisabled}
                          onClick={() => {
                            if (link.url) {
                              router.visit(link.url);
                            }
                          }}
                          className={`${
                            isActive
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                          } ${isDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                          dangerouslySetInnerHTML={{ __html: getLabel(link.label) }}
                        />
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
