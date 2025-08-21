/* eslint-disable @typescript-eslint/no-explicit-any */
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
} from 'lucide-react';
import { useState } from 'react';

// Mapping label pagination agar tidak tampil 'pagination.next' di frontend
const labelMap: Record<string, string> = {
  'pagination.next': 'Berikutnya',
  'pagination.previous': 'Sebelumnya',
  'pagination.first': 'Pertama',
  'pagination.last': 'Terakhir',
};

const getLabel = (label: string) => labelMap[label] || label;

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

interface WorshipSchedulesIndexProps {
  worshipSchedules: {
    data: WorshipSchedule[];
    links: any[];
    meta: any;
  };
}

export default function WorshipSchedulesIndex({ worshipSchedules }: WorshipSchedulesIndexProps) {
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

      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Jadwal Ibadah</h1>
            <p className="text-muted-foreground">
              Kelola jadwal ibadah untuk jemaat ST. Paulus Kwimi
            </p>
          </div>
        </div>

        {/* Filter & Action */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            {/* Input Search */}
            <div className="relative w-full max-w-sm">
              <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
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
                placeholder="Cari jadwal ibadah..."
                className="h-9 pl-8 text-sm"
              />
            </div>

            {/* Tombol Cari */}
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={() =>
                router.get(
                  route('admin.worship-schedules.index'),
                  { search, sort: sortBy, direction: sortDir },
                  { preserveState: true, replace: true, preserveScroll: true },
                )
              }
            >
              Cari
            </Button>

            {/* Tombol Reset */}
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
              >
                Reset
              </Button>
            )}

            {/* Filter Dropdown */}
            <select
              className="h-9 rounded-md border border-input bg-background px-2 text-sm"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">Semua Jadwal</option>
              <option value="week">Seminggu ke depan</option>
              <option value="month">Sebulan ke depan</option>
              <option value="custom">Custom Tanggal</option>
            </select>

            {/* Custom Range */}
            {filterType === 'custom' && (
              <>
                <input
                  type="date"
                  className="h-9 rounded-md border border-input bg-background px-2 text-sm"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                />
                <span className="mx-1">s/d</span>
                <input
                  type="date"
                  className="h-9 rounded-md border border-input bg-background px-2 text-sm"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                />
              </>
            )}

            {/* Tombol Download PDF */}
            <Button
              variant="outline"
              className="ml-2 text-primary border-primary hover:bg-primary/10 hover:text-primary"
              onClick={handleDownloadPdf}
            >
              Download PDF
            </Button>
          </div>

          {/* Tambah Jadwal */}
          <Link href={route('admin.worship-schedules.create')} className="shrink-0">
            <Button className="px-2 sm:px-4 text-white bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Tambah Jadwal</span>
            </Button>
          </Link>
        </div>

        {/* Tabel Data */}
        {worshipSchedules.data.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">Belum ada jadwal ibadah</p>
            <Link href={route('admin.worship-schedules.create')}>
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Buat Jadwal Pertama
              </Button>
            </Link>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/60">
                  {/* Kolom Nama Ibadah */}
                  <TableHead>
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

                  {/* Kolom Tanggal */}
                  <TableHead>
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

                  {/* Kolom Waktu */}
                  <TableHead>
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

                  {/* Kolom Pemimpin */}
                  <TableHead>
                    <SortButton
                      title="Pemimpin"
                      field="pic"
                      sortBy={sortBy}
                      sortDir={sortDir}
                      setSortBy={setSortBy}
                      setSortDir={setSortDir}
                      search={search}
                    />
                  </TableHead>

                  <TableHead>Komunitas</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {worshipSchedules.data.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell className="font-medium">{schedule.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {formatDate(schedule.date)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {formatTime(schedule.time_start)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {schedule.pic}
                      </div>
                    </TableCell>
                    <TableCell>
                      {schedule.communities && schedule.communities.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {schedule.communities.slice(0, 2).map((community) => (
                            <Badge key={community.id} variant="secondary" className="text-xs">
                              {community.name}
                            </Badge>
                          ))}
                          {schedule.communities.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{schedule.communities.length - 2}
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Semua komunitas</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="bg-secondary hover:bg-secondary/90"
                        >
                          <Link href={route('admin.worship-schedules.show', schedule.id)}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="bg-primary hover:bg-primary/90"
                        >
                          <Link href={route('admin.worship-schedules.edit', schedule.id)}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(schedule.id)}
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
        )}

        {/* Pagination */}
        {worshipSchedules.links && worshipSchedules.links.length > 3 && (
          <div className="flex justify-center space-x-2">
            {worshipSchedules.links.map((link: any, index: number) => {
              const baseClass =
                'px-3 py-1 rounded-md font-medium transition-all duration-150 border cursor-pointer';
              const activeClass = 'bg-secondary text-white border-secondary hover:opacity-80';
              const inactiveClass = 'bg-white text-secondary border-secondary hover:opacity-80';
              const disabledClass =
                'bg-secondary text-muted-foreground border-secondary opacity-60 cursor-not-allowed';
              const label = getLabel(link.label);

              if (link.url) {
                return (
                  <Link
                    key={index}
                    href={link.url}
                    className={baseClass + ' ' + (link.active ? activeClass : inactiveClass)}
                    dangerouslySetInnerHTML={{ __html: label }}
                  />
                );
              } else {
                return (
                  <span
                    key={index}
                    className={baseClass + ' ' + disabledClass}
                    dangerouslySetInnerHTML={{ __html: label }}
                  />
                );
              }
            })}
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}

/**
 * Komponen SortButton untuk header tabel agar kode lebih ringkas
 */
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
      sortBy === field ? (sortDir === 'asc' ? 'desc' : 'asc') : 'asc';
    setSortBy(field);
    setSortDir(nextDir);
    router.get(
      route('admin.worship-schedules.index'),
      { search, sort: field, direction: nextDir },
      { preserveState: true, replace: true, preserveScroll: true },
    );
  };

  return (
    <button
      type="button"
      onClick={handleSort}
      className="flex items-center font-semibold hover:text-foreground/90"
    >
      {title}
      {sortBy !== field ? (
        <ChevronsUpDown className="ml-1 h-4 w-4 text-muted-foreground" />
      ) : sortDir === 'asc' ? (
        <ArrowUp className="ml-1 h-4 w-4" />
      ) : (
        <ArrowDown className="ml-1 h-4 w-4" />
      )}
    </button>
  );
}
