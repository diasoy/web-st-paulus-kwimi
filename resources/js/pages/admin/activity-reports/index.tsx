import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { 
  Calendar, 
  Clock, 
  Download, 
  FileText, 
  Filter, 
  MapPin, 
  RefreshCw,
  BarChart3
} from 'lucide-react';
import { useState } from 'react';

// Mapping label pagination
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

interface Filters {
  filter: string;
  start_date: string;
  end_date: string;
  year: number;
  month: number;
}

interface Statistics {
  total: number;
  this_month: number;
}

interface ActivityReportsIndexProps {
  activities: {
    data: Activity[];
    links?: PaginationLink[];
    meta?: PaginationMeta;
  };
  filters: Filters;
  statistics: Statistics;
}

const months = [
  { value: 1, label: 'Januari' },
  { value: 2, label: 'Februari' },
  { value: 3, label: 'Maret' },
  { value: 4, label: 'April' },
  { value: 5, label: 'Mei' },
  { value: 6, label: 'Juni' },
  { value: 7, label: 'Juli' },
  { value: 8, label: 'Agustus' },
  { value: 9, label: 'September' },
  { value: 10, label: 'Oktober' },
  { value: 11, label: 'November' },
  { value: 12, label: 'Desember' },
];

export default function ActivityReportsIndex({ 
  activities, 
  filters, 
  statistics 
}: ActivityReportsIndexProps) {
  const [filterType, setFilterType] = useState<string>(filters.filter || 'month');
  const [year, setYear] = useState<number>(filters.year);
  const [month, setMonth] = useState<number>(filters.month);
  const [startDate, setStartDate] = useState<string>(filters.start_date || '');
  const [endDate, setEndDate] = useState<string>(filters.end_date || '');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return '-';
    return new Date(`2000-01-01 ${timeString}`).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleApplyFilter = () => {
    const params: Record<string, string | number> = { filter: filterType };
    
    if (filterType === 'month') {
      params.year = year;
      params.month = month;
    } else if (filterType === 'year') {
      params.year = year;
    } else if (filterType === 'custom') {
      params.start_date = startDate;
      params.end_date = endDate;
    }

    router.get(route('admin.activity-reports.index'), params, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleExportPDF = () => {
    const params: Record<string, string | number> = { filter: filterType };
    
    if (filterType === 'month') {
      params.year = year;
      params.month = month;
    } else if (filterType === 'year') {
      params.year = year;
    } else if (filterType === 'custom') {
      params.start_date = startDate;
      params.end_date = endDate;
    }

    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    window.location.href = route('admin.activity-reports.exportpdf') + '?' + queryString;
  };

  const handleReset = () => {
    const now = new Date();
    setFilterType('month');
    setYear(now.getFullYear());
    setMonth(now.getMonth() + 1);
    setStartDate('');
    setEndDate('');
    
    router.get(route('admin.activity-reports.index'), {
      filter: 'month',
      year: now.getFullYear(),
      month: now.getMonth() + 1,
    }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  // Generate years for dropdown (last 5 years + next 2 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 8 }, (_, i) => currentYear - 5 + i);

  return (
    <AuthenticatedLayout>
      <Head title="Laporan Kegiatan Gereja" />

      <div className="dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-blue-400" />
                Laporan Kegiatan Gereja
              </h1>
              <p className="mt-2 text-sm text-gray-300">
                Laporan pelaksanaan kegiatan gereja yang telah terlaksana
              </p>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <Card className="border-gray-700 bg-gradient-to-br from-blue-900/50 to-blue-800/30 backdrop-blur">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Total Kegiatan (Periode Filter)
                </CardTitle>
                <FileText className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {statistics.total}
                </div>
                <p className="text-xs text-gray-300">
                  Kegiatan yang telah dilaksanakan
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-700 bg-gradient-to-br from-green-900/50 to-green-800/30 backdrop-blur">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Kegiatan Bulan Ini
                </CardTitle>
                <Calendar className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {statistics.this_month}
                </div>
                <p className="text-xs text-gray-300">
                  Kegiatan pada bulan berjalan
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filter Section */}
          <Card className="mb-6 border-gray-700 bg-gray-800/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter Laporan
              </CardTitle>
              <CardDescription className="text-gray-300">
                Pilih periode untuk menampilkan laporan kegiatan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                {/* Filter Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Tipe Filter
                  </label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Minggu Ini</SelectItem>
                      <SelectItem value="month">Bulanan</SelectItem>
                      <SelectItem value="year">Tahunan</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Year Selection for month/year filter */}
                {(filterType === 'month' || filterType === 'year') && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">
                      Tahun
                    </label>
                    <Select value={year.toString()} onValueChange={(v) => setYear(parseInt(v))}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((y) => (
                          <SelectItem key={y} value={y.toString()}>
                            {y}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Month Selection */}
                {filterType === 'month' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">
                      Bulan
                    </label>
                    <Select value={month.toString()} onValueChange={(v) => setMonth(parseInt(v))}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((m) => (
                          <SelectItem key={m.value} value={m.value.toString()}>
                            {m.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Custom Date Range */}
                {filterType === 'custom' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">
                        Tanggal Mulai
                      </label>
                      <Input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">
                        Tanggal Akhir
                      </label>
                      <Input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-2">
                <Button onClick={handleApplyFilter} className="bg-blue-600 hover:bg-blue-700">
                  <Filter className="mr-2 h-4 w-4" />
                  Terapkan Filter
                </Button>
                <Button onClick={handleReset} variant="outline" className="border-gray-600 bg-gray-700 text-white hover:bg-gray-600">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
                <Button onClick={handleExportPDF} className="bg-green-600 hover:bg-green-700">
                  <Download className="mr-2 h-4 w-4" />
                  Export PDF
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Activities Table */}
          <Card className="border-gray-700 bg-gray-800/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">Daftar Kegiatan</CardTitle>
              <CardDescription className="text-gray-300">
                {activities.data.length > 0
                  ? `Menampilkan ${activities.meta?.from} - ${activities.meta?.to} dari ${activities.meta?.total} kegiatan`
                  : 'Tidak ada data kegiatan'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-lg border border-gray-700">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700 bg-gray-700/50">
                      <TableHead className="text-white">No</TableHead>
                      <TableHead className="text-white">Nama Kegiatan</TableHead>
                      <TableHead className="text-white">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Tanggal
                        </div>
                      </TableHead>
                      <TableHead className="text-white">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Waktu
                        </div>
                      </TableHead>
                      <TableHead className="text-white">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          Lokasi
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activities.data.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-gray-400 py-8">
                          Tidak ada data kegiatan untuk periode yang dipilih
                        </TableCell>
                      </TableRow>
                    ) : (
                      activities.data.map((activity, index) => (
                        <TableRow key={activity.id} className="border-gray-700 hover:bg-gray-700/30">
                          <TableCell className="text-white">
                            {activities.meta ? activities.meta.from + index : index + 1}
                          </TableCell>
                          <TableCell className="text-white">
                            <div className="font-medium">{activity.name}</div>
                            {activity.description && (
                              <div className="text-sm text-gray-400 line-clamp-1">
                                {activity.description}
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="text-white">
                            {formatDate(activity.date)}
                          </TableCell>
                          <TableCell className="text-white">
                            {formatTime(activity.time_start)}
                          </TableCell>
                          <TableCell className="text-white">
                            {activity.location || '-'}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {activities.links && activities.links.length > 0 && (
                <div className="mt-6 flex items-center justify-center gap-1">
                  {activities.links.map((link, index) => {
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
                            : 'border-gray-600 bg-gray-700 text-white hover:bg-gray-600'
                        } ${isDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                        dangerouslySetInnerHTML={{ __html: getLabel(link.label) }}
                      />
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
