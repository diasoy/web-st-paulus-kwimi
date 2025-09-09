import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { 
  ArrowDown, 
  ArrowUp, 
  Calendar, 
  ChevronsUpDown, 
  Clock, 
  Edit, 
  Eye, 
  Image as ImageIcon, 
  MapPin, 
  Plus, 
  Search, 
  Trash2,
  Download,
  RotateCcw,
  Users
} from 'lucide-react';
import { useState } from 'react';

// Mapping label pagination agar tidak tampil 'pagination.next' di frontend
const labelMap: Record<string, string> = {
  'pagination.next': 'Berikutnya',
  'pagination.previous': 'Sebelumnya',
  'pagination.first': 'Pertama',
  'pagination.last': 'Terakhir',
  '&laquo; Previous': 'Sebelumnya',
  'Next &raquo;': 'Berikutnya',
  '&laquo;': 'Sebelumnya',
  '&raquo;': 'Berikutnya',
};

const getLabel = (label: string) => {
  const cleanLabel = label.replace(/&laquo;|&raquo;/g, '').trim();
  return labelMap[label] || labelMap[cleanLabel] || cleanLabel || label;
};

interface Activity {
  id: number;
  name: string;
  description: string;
  date: string;
  time_start: string;
  location?: string;
  created_at: string;
  updated_at: string;
  image_url?: string | null;
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

interface ActivitiesIndexProps {
  activities: {
    data: Activity[];
    links?: PaginationLink[];
    meta?: PaginationMeta;
  };
}

export default function ActivitiesIndex({ activities }: ActivitiesIndexProps) {
  const params = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : '',
  );

  const [search, setSearch] = useState<string>(params.get('search') || '');
  const [sortBy] = useState<string>(params.get('sort') || 'date');
  const [sortDir] = useState<'asc' | 'desc'>(
    (params.get('direction') as 'asc' | 'desc') || 'desc',
  );

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus agenda kegiatan ini?')) {
      router.delete(route('admin.activities.destroy', id));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01 ${timeString}`).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSort = (field: string) => {
    const newDirection = field === sortBy && sortDir === 'asc' ? 'desc' : 'asc';
    router.get(
      route('admin.activities.index'),
      { search, sort: field, direction: newDirection },
      { preserveState: true, replace: true, preserveScroll: true },
    );
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (field !== sortBy) return <ChevronsUpDown className="ml-1 h-4 w-4" />;
    return sortDir === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />;
  };

  const handleSearch = () => {
    router.get(
      route('admin.activities.index'),
      { search, sort: sortBy, direction: sortDir },
      { preserveState: true, replace: true, preserveScroll: true },
    );
  };

  const handleReset = () => {
    setSearch('');
    router.get(
      route('admin.activities.index'),
      { sort: sortBy, direction: sortDir },
      { preserveState: true, replace: true, preserveScroll: true },
    );
  };

  const isUpcoming = (dateString: string) => {
    const activityDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return activityDate >= today;
  };

  return (
    <AuthenticatedLayout>
      <Head title="Agenda Kegiatan" />

      <div className="dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb Navigation */}
          <div className="mb-8">
            <nav className="flex items-center space-x-2 text-sm">
              <Link
                href="/admin/dashboard"
                className="text-white/70 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <span className="text-white/50">/</span>
              <span className="text-white font-medium">Agenda Kegiatan</span>
            </nav>
          </div>

          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                  <Calendar className="h-10 w-10 text-white" />
                  Agenda Kegiatan
                </h1>
                <p className="text-green-100 text-lg">
                  Kelola agenda kegiatan untuk jemaat ST. Paulus Kwimi
                </p>
              </div>
              <div className="hidden md:block">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                  <Users className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>

            {/* Search and Actions */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mt-8">
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Cari kegiatan..."
                    className="pl-10 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 focus:border-white/50 transition-all duration-300"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleSearch}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50 backdrop-blur-sm transition-all duration-300"
                    variant="outline"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Cari
                  </Button>
                  {search && (
                    <Button
                      onClick={handleReset}
                      className="bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-300"
                      variant="outline"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50 backdrop-blur-sm transition-all duration-300"
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Link href={route('admin.activities.create')}>
                  <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0">
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Kegiatan
                  </Button>
                </Link>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl text-white shadow-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="h-8 w-8" />
                  <div>
                    <p className="text-blue-100 text-sm">Total Kegiatan</p>
                    <p className="text-2xl font-bold">{activities.meta?.total || 0}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 rounded-xl text-white shadow-lg">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8" />
                  <div>
                    <p className="text-emerald-100 text-sm">Halaman Saat Ini</p>
                    <p className="text-2xl font-bold">{activities.meta?.current_page || 1}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-xl text-white shadow-lg">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8" />
                  <div>
                    <p className="text-purple-100 text-sm">Per Halaman</p>
                    <p className="text-2xl font-bold">{activities.meta?.per_page || 10}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl overflow-hidden border border-gray-200/50 shadow-2xl">
            {!activities.data || activities.data.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Belum Ada Agenda Kegiatan</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Anda belum memiliki agenda kegiatan. Mulai dengan membuat kegiatan pertama untuk jemaat.
                </p>
                <Link href={route('admin.activities.create')}>
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Plus className="mr-2 h-5 w-5" />
                    Buat Kegiatan Pertama
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-gray-50 to-green-50 border-b border-gray-200">
                      <TableHead className="text-gray-800 font-semibold">Gambar</TableHead>
                      <TableHead className="text-gray-800 font-semibold">
                        <button
                          onClick={() => handleSort('name')}
                          className="flex items-center hover:text-green-600 transition-colors"
                        >
                          Nama Kegiatan
                          <SortIcon field="name" />
                        </button>
                      </TableHead>
                      <TableHead className="text-gray-800 font-semibold">
                        <button
                          onClick={() => handleSort('date')}
                          className="flex items-center hover:text-green-600 transition-colors"
                        >
                          Tanggal
                          <SortIcon field="date" />
                        </button>
                      </TableHead>
                      <TableHead className="text-gray-800 font-semibold">Waktu</TableHead>
                      <TableHead className="text-gray-800 font-semibold">Lokasi</TableHead>
                      <TableHead className="text-gray-800 font-semibold">Status</TableHead>
                      <TableHead className="text-center text-gray-800 font-semibold">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activities.data && activities.data.map((activity, index) => (
                      <TableRow 
                        key={activity.id} 
                        className={`hover:bg-green-50/50 transition-colors ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                        }`}
                      >
                        <TableCell className="w-20">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center shadow-md">
                            {activity.image_url ? (
                              <img 
                                src={activity.image_url} 
                                alt={activity.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <ImageIcon className="h-8 w-8 text-green-600" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-gray-900">
                          <div className="flex flex-col">
                            <span className="font-semibold">{activity.name}</span>
                            <span className="text-sm text-gray-600 line-clamp-2">
                              {activity.description}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-700">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-green-600" />
                            {formatDate(activity.date)}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-700">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-600" />
                            {formatTime(activity.time_start)}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-700">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-red-600" />
                            <span className="truncate max-w-32">
                              {activity.location || 'Tidak ditentukan'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                            isUpcoming(activity.date)
                              ? 'bg-green-100 text-green-800 border border-green-200'
                              : 'bg-gray-100 text-gray-600 border border-gray-200'
                          }`}>
                            {isUpcoming(activity.date) ? 'Akan Datang' : 'Selesai'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Link href={`/admin/activities/${activity.id}`}>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="bg-blue-500 hover:bg-blue-600 text-white border-blue-500 hover:border-blue-600 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Link href={`/admin/activities/${activity.id}/edit`}>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-500 hover:border-emerald-600 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDelete(activity.id)}
                              className="bg-red-500 hover:bg-red-600 text-white border-red-500 hover:border-red-600 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination */}
                {activities.links && activities.links.length > 3 && (
                  <div className="p-6 bg-gradient-to-r from-gray-50 to-green-50 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        {activities.meta?.total && activities.meta.total > 0 
                          ? `Menampilkan ${activities.meta.from || 1} - ${activities.meta.to || 0} dari ${activities.meta.total} kegiatan`
                          : 'Tidak ada data kegiatan'
                        }
                      </p>
                      <div className="flex items-center gap-2">
                        {activities.links && activities.links.map((link, index) => (
                          <Link
                            key={index}
                            href={link.url || '#'}
                            className={`px-3 py-2 text-sm rounded-lg transition-all duration-300 ${
                              link.active
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md'
                                : link.url
                                ? 'bg-white hover:bg-green-50 text-gray-700 border border-gray-300 hover:border-green-300 shadow-sm hover:shadow-md transform hover:scale-105'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            <span>{getLabel(link.label)}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
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
