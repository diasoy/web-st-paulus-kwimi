import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import dayjs from 'dayjs';
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  ChevronsUpDown,
  Clock,
  Edit,
  Eye,
  Plus,
  Search,
  Trash2,
  User,
  Download,
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
  // Clean HTML entities
  const cleanLabel = label.replace(/&laquo;|&raquo;/g, '').trim();
  return labelMap[label] || labelMap[cleanLabel] || cleanLabel || label;
};

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
  created_at: string;
  updated_at: string;
  communities: Community[];
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

interface WorshipSchedulesIndexProps {
  worshipSchedules: {
    data: WorshipSchedule[];
    links?: PaginationLink[];
    meta?: PaginationMeta;
  };
}

export default function WorshipSchedulesIndex({ worshipSchedules }: WorshipSchedulesIndexProps) {
  // Debug: Log the received data
  console.log('WorshipSchedules data:', worshipSchedules);
  console.log('Meta:', worshipSchedules.meta);
  console.log('Links:', worshipSchedules.links);
  console.log('Data length:', worshipSchedules.data?.length);

  const params = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : '',
  );

  const [search, setSearch] = useState<string>(params.get('search') || '');
  const [sortBy, setSortBy] = useState<string>(params.get('sort') || 'date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>(
    (params.get('direction') as 'asc' | 'desc') || 'desc',
  );
  const [filterType, setFilterType] = useState<string>('all');
  const [customStart, setCustomStart] = useState<string>('');
  const [customEnd, setCustomEnd] = useState<string>('');

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus jadwal ibadah ini?')) {
      router.delete(route('admin.worship-schedules.destroy', id));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    return timeString.substring(0, 5);
  };

  // Fungsi untuk download PDF sesuai filter
  const handleDownloadPdf = () => {
    const url = route('admin.worship-schedules.exportpdf');
    const params: Record<string, string> = {};

    if (filterType === 'week') {
      params.start = dayjs().format('YYYY-MM-DD');
      params.end = dayjs().add(7, 'day').format('YYYY-MM-DD');
    } else if (filterType === 'month') {
      params.start = dayjs().format('YYYY-MM-DD');
      params.end = dayjs().add(1, 'month').format('YYYY-MM-DD');
    } else if (filterType === 'custom' && customStart && customEnd) {
      params.start = customStart;
      params.end = customEnd;
    }

    const query = Object.keys(params).length
      ? '?' + new URLSearchParams(params).toString()
      : '';
    window.open(url + query, '_blank');
  };

  return (
    <AuthenticatedLayout>
      <Head title="Jadwal Ibadah" />

      <div className="dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl overflow-hidden border border-gray-200/50 shadow-2xl mb-8">
            <div className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 p-8 border-b border-gray-200/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Jadwal Ibadah</h1>
                    <p className="text-white/90 text-lg">Kelola jadwal ibadah untuk jemaat ST. Paulus Kwimi</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={handleDownloadPdf}
                    variant="outline"
                    className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  <Link href={route('admin.worship-schedules.create')}>
                    <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <Plus className="mr-2 h-4 w-4" />
                      Tambah Jadwal
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Search & Filter Section */}
            <div className="p-8 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200/50">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Search Bar */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === 'Enter' &&
                        router.get(
                          route('admin.worship-schedules.index'),
                          { search, sort: sortBy, direction: sortDir },
                          { preserveState: true, replace: true, preserveScroll: true },
                        )
                      }
                      placeholder="Cari berdasarkan nama ibadah atau penanggung jawab..."
                      className="pl-10 bg-white/80 backdrop-blur-sm border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-200 hover:border-blue-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Filter & Actions */}
                <div className="flex flex-wrap gap-3 items-center">
                  <Button
                    size="sm"
                    onClick={() =>
                      router.get(
                        route('admin.worship-schedules.index'),
                        { search, sort: sortBy, direction: sortDir },
                        { preserveState: true, replace: true, preserveScroll: true },
                      )
                    }
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Cari
                  </Button>

                  {search && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        router.get(
                          route('admin.worship-schedules.index'),
                          { sort: sortBy, direction: sortDir },
                          { preserveState: true, replace: true, preserveScroll: true },
                        )
                      }
                      className="bg-white hover:bg-gray-50 border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
                    >
                      Reset
                    </Button>
                  )}

                  <select
                    className="h-9 rounded-xl border-2 border-blue-200 bg-white/80 backdrop-blur-sm px-3 text-sm font-medium text-gray-700 focus:border-blue-500 focus:ring-blue-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all duration-300"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="all">📅 Semua Jadwal</option>
                    <option value="week">📆 Seminggu ke depan</option>
                    <option value="month">🗓️ Sebulan ke depan</option>
                    <option value="custom">🎯 Custom Tanggal</option>
                  </select>

                  {filterType === 'custom' && (
                    <div className="flex gap-2">
                      <input
                        type="date"
                        className="h-9 rounded-xl border-2 border-blue-200 bg-white/80 backdrop-blur-sm px-3 text-sm font-medium text-gray-700 focus:border-blue-500 focus:ring-blue-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all duration-300"
                        value={customStart}
                        onChange={(e) => setCustomStart(e.target.value)}
                      />
                      <span className="flex items-center text-gray-500 font-medium">—</span>
                      <input
                        type="date"
                        className="h-9 rounded-xl border-2 border-blue-200 bg-white/80 backdrop-blur-sm px-3 text-sm font-medium text-gray-700 focus:border-blue-500 focus:ring-blue-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all duration-300"
                        value={customEnd}
                        onChange={(e) => setCustomEnd(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl text-white shadow-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-8 w-8" />
                    <div>
                      <p className="text-blue-100 text-sm">Total Jadwal</p>
                      <p className="text-2xl font-bold">{worshipSchedules.meta?.total || 0}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 rounded-xl text-white shadow-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="h-8 w-8" />
                    <div>
                      <p className="text-emerald-100 text-sm">Halaman Saat Ini</p>
                      <p className="text-2xl font-bold">{worshipSchedules.meta?.current_page || 1}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-xl text-white shadow-lg">
                  <div className="flex items-center gap-3">
                    <User className="h-8 w-8" />
                    <div>
                      <p className="text-purple-100 text-sm">Per Halaman</p>
                      <p className="text-2xl font-bold">{worshipSchedules.meta?.per_page || 10}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl overflow-hidden border border-gray-200/50 shadow-2xl">
            {!worshipSchedules.data || worshipSchedules.data.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Belum Ada Jadwal Ibadah</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Anda belum memiliki jadwal ibadah. Mulai dengan membuat jadwal pertama untuk jemaat.
                </p>
                <Link href={route('admin.worship-schedules.create')}>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <Plus className="mr-2 h-4 w-4" />
                    Buat Jadwal Pertama
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                      <TableHead className="font-bold text-gray-800">
                        <SortButton
                          title="Nama Ibadah"
                          field="name"
                          sortBy={sortBy}
                          sortDir={sortDir}
                          setSortBy={setSortBy}
                          setSortDir={setSortDir}
                          search={search}
                        />
                      </TableHead>
                      <TableHead className="font-bold text-gray-800">
                        <SortButton
                          title="Tanggal"
                          field="date"
                          sortBy={sortBy}
                          sortDir={sortDir}
                          setSortBy={setSortBy}
                          setSortDir={setSortDir}
                          search={search}
                        />
                      </TableHead>
                      <TableHead className="font-bold text-gray-800">
                        <SortButton
                          title="Waktu"
                          field="time_start"
                          sortBy={sortBy}
                          sortDir={sortDir}
                          setSortBy={setSortBy}
                          setSortDir={setSortDir}
                          search={search}
                        />
                      </TableHead>
                      <TableHead className="font-bold text-gray-800">Penanggung Jawab</TableHead>
                      <TableHead className="font-bold text-gray-800">Komunitas</TableHead>
                      <TableHead className="font-bold text-gray-800 text-center">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {worshipSchedules.data && worshipSchedules.data.map((schedule, index) => (
                      <TableRow 
                        key={schedule.id} 
                        className={`hover:bg-blue-50/50 transition-colors ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                        }`}
                      >
                        <TableCell className="font-medium text-gray-900">
                          <div className="flex items-center gap-2">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-2 h-8 rounded-full"></div>
                            {schedule.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-blue-500" />
                            <span className="text-gray-700">{formatDate(schedule.date)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-emerald-500" />
                            <span className="font-medium text-gray-700">{formatTime(schedule.time_start)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-purple-500" />
                            <span className="text-gray-700">{schedule.pic}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {schedule.communities.map((community) => (
                              <Badge 
                                key={community.id} 
                                variant="secondary"
                                className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border border-blue-200 hover:from-blue-200 hover:to-purple-200 transition-colors"
                              >
                                {community.name}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Link href={route('admin.worship-schedules.show', schedule.id)}>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="bg-blue-500 hover:bg-blue-600 text-white border-blue-500 hover:border-blue-600 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Link href={route('admin.worship-schedules.edit', schedule.id)}>
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
                              onClick={() => handleDelete(schedule.id)}
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
                {worshipSchedules.links && worshipSchedules.links.length > 3 && (
                  <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        {worshipSchedules.meta?.total && worshipSchedules.meta.total > 0 
                          ? `Menampilkan ${worshipSchedules.meta.from || 1} - ${worshipSchedules.meta.to || 0} dari ${worshipSchedules.meta.total} jadwal`
                          : 'Tidak ada data jadwal ibadah'
                        }
                      </p>
                      <div className="flex items-center gap-2">
                        {worshipSchedules.links && worshipSchedules.links.map((link, index) => (
                          <Link
                            key={index}
                            href={link.url || '#'}
                            className={`px-3 py-2 text-sm rounded-lg transition-all duration-300 ${
                              link.active
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                                : link.url
                                ? 'bg-white hover:bg-blue-50 text-gray-700 border border-gray-300 hover:border-blue-300 shadow-sm hover:shadow-md transform hover:scale-105'
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
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

interface SortButtonProps {
  title: string;
  field: string;
  sortBy: string;
  sortDir: 'asc' | 'desc';
  setSortBy: (field: string) => void;
  setSortDir: (dir: 'asc' | 'desc') => void;
  search: string;
}

function SortButton({
  title,
  field,
  sortBy,
  sortDir,
  setSortBy,
  setSortDir,
  search,
}: SortButtonProps) {
  const handleSort = () => {
    const nextDir: 'asc' | 'desc' =
      sortBy === field && sortDir === 'asc' ? 'desc' : 'asc';
    setSortBy(field);
    setSortDir(nextDir);
    router.get(
      route('admin.worship-schedules.index'),
      { search, sort: field, direction: nextDir },
      { preserveState: true, replace: true, preserveScroll: true },
    );
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleSort} className="flex items-center gap-2 h-auto p-0 font-bold text-gray-800 hover:text-blue-600">
      {title}
      {sortBy === field ? (
        sortDir === 'asc' ? (
          <ArrowUp className="h-4 w-4 text-blue-500" />
        ) : (
          <ArrowDown className="h-4 w-4 text-blue-500" />
        )
      ) : (
        <ChevronsUpDown className="h-4 w-4 text-gray-400" />
      )}
    </Button>
  );
}
