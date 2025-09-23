/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from '@/components/ui/badge';
// Mapping label pagination agar tidak tampil 'pagination.next' di frontend
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
import { ArrowDown, ArrowUp, ChevronsUpDown, Edit, Eye, Image as ImageIcon, Plus, RotateCcw, Search, Trash2, FileText } from 'lucide-react';
import { useState } from 'react';

interface Announcement {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  is_publish: boolean;
  created_at: string;
  updated_at: string;
}

interface AnnouncementsIndexProps {
  announcements: {
    data: Announcement[];
    links: any[];
    meta: any;
  };
}

export default function AnnouncementsIndex({ announcements }: AnnouncementsIndexProps) {
  const { props } = usePage<{ flash?: { success?: string; error?: string } }>();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const [search, setSearch] = useState<string>(params.get('search') || '');
  const [sortBy, setSortBy] = useState<string>(params.get('sort') || 'created_at');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>((params.get('direction') as 'asc' | 'desc') || 'desc');

  const toggleSort = (field: string) => {
    const nextDir: 'asc' | 'desc' = field === sortBy ? (sortDir === 'asc' ? 'desc' : 'asc') : 'asc';
    setSortBy(field);
    setSortDir(nextDir);
    router.get(
      route('admin.announcements.index'),
      { search, sort: field, direction: nextDir },
      { preserveState: true, replace: true, preserveScroll: true },
    );
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (field !== sortBy) return <ChevronsUpDown className="ml-1 h-4 w-4 " />;
    return sortDir === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />;
  };

  const handleDelete = (id: number, title: string) => {
    if (!confirm(`Hapus pengumuman:\n\n"${title}"?`)) return;
    setDeletingId(id);
    router.delete(route('admin.announcements.destroy', id), {
      preserveScroll: true,
      onFinish: () => setDeletingId(null),
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Kelola Pengumuman" />

      <div className="dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
        <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
          {/* Header Section */}
          <div className="relative z-10 space-y-4">
            <div className="text-center">
              <div className="relative inline-block">
                <h1 className="text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-lg">
                  Kelola Pengumuman
                </h1>
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg blur opacity-25"></div>
              </div>
              <p className="text-white/95 text-xl font-medium drop-shadow-md">
                Kelola semua pengumuman untuk jemaat ST. Paulus Kwimi
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
            <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-700 text-white p-6">
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
                    placeholder="Cari judul atau deskripsi pengumuman..."
                    className="h-12 pl-11 text-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-xl bg-white text-gray-900 placeholder-gray-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === 'Enter' &&
                      router.get(
                        route('admin.announcements.index'),
                        { search, sort: sortBy, direction: sortDir },
                        { preserveState: true, replace: true, preserveScroll: true },
                      )
                    }
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={() =>
                      router.get(
                        route('admin.announcements.index'),
                        { search, sort: sortBy, direction: sortDir },
                        { preserveState: true, replace: true, preserveScroll: true },
                      )
                    }
                    className="h-12 px-4 xl:px-6 text-sm xl:text-lg font-semibold bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Cari
                  </Button>
                  {search && (
                    <Button
                      onClick={() =>
                        router.get(
                          route('admin.announcements.index'),
                          { sort: sortBy, direction: sortDir },
                          { preserveState: true, replace: true, preserveScroll: true },
                        )
                      }
                      className="h-12 px-4 xl:px-6 text-sm xl:text-lg font-semibold bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <RotateCcw className="h-5 w-5 mr-2" />
                      Reset
                    </Button>
                  )}
                  <Button asChild className="h-12 px-4 xl:px-6 text-sm xl:text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                    <Link href={route('admin.announcements.create')}>
                      <Plus className="h-5 w-5 mr-2" />
                      <span className="hidden sm:inline">Tambah Pengumuman</span>
                      <span className="sm:hidden">Tambah</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Announcements List */}
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 text-white p-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <div className="rounded-full bg-white/20 p-2">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                Daftar Pengumuman ({announcements.data.length} pengumuman)
              </h2>
            </div>
            <div className="overflow-hidden">
              {announcements.data.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 border-b-2 border-gray-200">
                      <TableHead className="text-gray-900 font-bold text-sm">Gambar</TableHead>
                      <TableHead className="text-gray-900 font-bold text-sm">
                        <button
                          type="button"
                          onClick={() => toggleSort('title')}
                          className="flex items-center font-bold hover:text-orange-600 transition-colors"
                        >
                          Judul
                          <SortIcon field="title" />
                        </button>
                      </TableHead>
                      <TableHead className="text-gray-900 font-bold text-sm">Deskripsi</TableHead>
                      <TableHead className="text-gray-900 font-bold text-sm">
                        <button
                          type="button"
                          onClick={() => toggleSort('is_publish')}
                          className="flex items-center font-bold hover:text-green-600 transition-colors"
                        >
                          Status
                          <SortIcon field="is_publish" />
                        </button>
                      </TableHead>
                      <TableHead className="text-gray-900 font-bold text-sm">
                        <button
                          type="button"
                          onClick={() => toggleSort('created_at')}
                          className="flex items-center font-bold hover:text-purple-600 transition-colors"
                        >
                          Tanggal Dibuat
                          <SortIcon field="created_at" />
                        </button>
                      </TableHead>
                      <TableHead className="text-right text-gray-900 font-bold text-sm">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {announcements.data.map((announcement, index) => (
                      <TableRow key={announcement.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-orange-50/50 transition-colors duration-200`}>
                        <TableCell className="py-4">
                          <div className="flex items-center justify-center">
                            {announcement.image_url ? (
                              <img
                                src={announcement.image_url}
                                alt={announcement.title}
                                className="h-12 w-16 rounded-lg object-cover shadow-md border-2 border-gray-200"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                                  const fallback = (e.currentTarget.nextSibling as HTMLElement) || null;
                                  if (fallback) fallback.style.display = 'flex';
                                }}
                                
                              />
                            ) : null}
                            <div
                              className="flex h-12 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300"
                              style={{ display: announcement.image_url ? 'none' : 'flex' }}
                            >
                              <ImageIcon className="h-5 w-5 text-gray-400" />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium py-4">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-gray-900">{announcement.title}</span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-md py-4">
                          <div className="text-gray-700 truncate">{announcement.description}</div>
                        </TableCell>
                        <TableCell className="py-4">
                          <Badge className={`px-3 py-1 rounded-full text-sm font-medium ${announcement.is_publish
                              ? 'bg-green-100 text-green-800 border border-green-200'
                              : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                            }`}>
                            {announcement.is_publish ? 'Dipublish' : 'Draft'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-700 py-4">
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-lg text-sm font-medium">
                            {formatDate(announcement.created_at)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right py-4">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" asChild className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100">
                              <Link href={route('admin.announcements.show', announcement.id)}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild className="bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100">
                              <Link href={route('admin.announcements.edit', announcement.id)}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(announcement.id, announcement.title)}
                              disabled={deletingId === announcement.id}
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
                    <FileText className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Belum ada pengumuman</h3>
                  <p className="text-gray-600 mb-6">Mulai dengan membuat pengumuman pertama untuk jemaat</p>
                  <Button asChild className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white">
                    <Link href={route('admin.announcements.create')}>
                      <Plus className="h-4 w-4 mr-2" />
                      Buat Pengumuman Pertama
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Pagination */}
          {announcements.data.length > 0 && announcements.links && announcements.links.length > 3 && (
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-lg font-medium text-gray-700">
                  Menampilkan <span className="font-bold text-orange-600">{announcements.data.length}</span> pengumuman
                </div>
                <div className="flex gap-2">
                  {announcements.links.map((link: any, index: number) => {
                    const baseClass = 'px-4 py-2 rounded-xl font-medium transition-all duration-200 border-2';
                    const activeClass = 'bg-gradient-to-r from-orange-600 to-red-600 text-white border-orange-600 shadow-lg';
                    const inactiveClass = 'bg-white text-orange-600 border-orange-200 hover:bg-orange-50 hover:border-orange-300';
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
