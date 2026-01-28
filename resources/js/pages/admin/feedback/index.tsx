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
import { ArrowDown, ArrowUp, ChevronsUpDown, Eye, MessageSquare, RotateCcw, Search, Trash2, CheckCircle, Circle } from 'lucide-react';
import { useState } from 'react';

interface Feedback {
  id: number;
  name: string;
  message: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

interface FeedbackIndexProps {
  feedbacks: {
    data: Feedback[];
    links: any[];
    meta: any;
  };
}

export default function FeedbackIndex({ feedbacks }: FeedbackIndexProps) {
  const { props } = usePage<{ flash?: { success?: string; error?: string } }>();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const [search, setSearch] = useState<string>(params.get('search') || '');
  const [sortBy, setSortBy] = useState<string>(params.get('sort') || 'created_at');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>((params.get('direction') as 'asc' | 'desc') || 'desc');

  // Safe access to unread count
  const unreadCount = feedbacks?.data ? feedbacks.data.filter((f) => !f.is_read).length : 0;

  const toggleSort = (field: string) => {
    const nextDir: 'asc' | 'desc' = field === sortBy ? (sortDir === 'asc' ? 'desc' : 'asc') : 'asc';
    setSortBy(field);
    setSortDir(nextDir);
    router.get(
      route('admin.feedback.index'),
      { search, sort: field, direction: nextDir },
      { preserveState: true, replace: true, preserveScroll: true },
    );
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (field !== sortBy) return <ChevronsUpDown className="ml-1 h-4 w-4 " />;
    return sortDir === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />;
  };

  const handleDelete = (id: number, name: string) => {
    if (!confirm(`Hapus feedback dari:\n\n"${name}"?`)) return;
    setDeletingId(id);
    router.delete(route('admin.feedback.destroy', id), {
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
      <Head title="Kritik dan Saran" />

      <div className="dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
        <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
          {/* Header Section */}
          <div className="relative z-10 space-y-4">
            <div className="text-center">
              <div className="relative inline-block">
                <h1 className="text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-lg">
                  Kritik dan Saran
                </h1>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25"></div>
              </div>
              <p className="text-white/95 text-xl font-medium drop-shadow-md">
                Kelola semua kritik dan saran dari jemaat
              </p>
              {unreadCount > 0 && (
                <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full font-medium">
                  <Circle className="h-4 w-4 fill-white" />
                  {unreadCount} Pesan Belum Dibaca
                </div>
              )}
            </div>
          </div>

          {/* Flash Messages */}
          {props.flash?.success && (
            <div className="relative z-10 rounded-lg bg-green-50 border border-green-200 px-6 py-4 shadow-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <p className="text-green-800 font-medium text-lg">{props.flash.success}</p>
              </div>
            </div>
          )}
          {props.flash?.error && (
            <div className="relative z-10 rounded-lg bg-red-50 border border-red-200 px-6 py-4 shadow-lg">
              <div className="flex items-center gap-3">
                <Circle className="h-6 w-6 text-red-600" />
                <p className="text-red-800 font-medium text-lg">{props.flash.error}</p>
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div className="relative z-10 rounded-xl bg-white/10 backdrop-blur-md p-6 shadow-xl border border-white/20">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-300" />
                <Input
                  type="text"
                  placeholder="Cari berdasarkan nama atau isi pesan..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      router.get(
                        route('admin.feedback.index'),
                        { search, sort: sortBy, direction: sortDir },
                        { preserveState: true, replace: true, preserveScroll: true },
                      );
                    }
                  }}
                  className="pl-12 h-12 bg-white/90 border-purple-200 focus:border-purple-400 focus:ring-purple-400 text-gray-800 placeholder:text-gray-500 rounded-lg"
                />
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <Button
                  onClick={() =>
                    router.get(
                      route('admin.feedback.index'),
                      { search, sort: sortBy, direction: sortDir },
                      { preserveState: true, replace: true, preserveScroll: true },
                    )
                  }
                  className="flex-1 md:flex-none h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  <Search className="mr-2 h-5 w-5" /> Cari
                </Button>
                <Button
                  onClick={() => {
                    setSearch('');
                    router.get(route('admin.feedback.index'), {}, { preserveState: true, replace: true, preserveScroll: true });
                  }}
                  variant="outline"
                  className="h-12 bg-white/90 text-purple-700 border-purple-300 hover:bg-purple-50 font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  <RotateCcw className="mr-2 h-5 w-5" /> Reset
                </Button>
              </div>
            </div>
          </div>

          {/* Table Card */}
          <div className="relative z-10 rounded-xl bg-white/95 backdrop-blur-md shadow-2xl overflow-hidden border border-white/30">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-b-0">
                    <TableHead className="text-white font-bold text-base h-14">
                      <button onClick={() => toggleSort('name')} className="flex items-center hover:text-purple-200 transition-colors">
                        Nama
                        <SortIcon field="name" />
                      </button>
                    </TableHead>
                    <TableHead className="text-white font-bold text-base h-14">
                      Pesan
                    </TableHead>
                    <TableHead className="text-white font-bold text-base h-14">
                      <button onClick={() => toggleSort('is_read')} className="flex items-center hover:text-purple-200 transition-colors">
                        Status
                        <SortIcon field="is_read" />
                      </button>
                    </TableHead>
                    <TableHead className="text-white font-bold text-base h-14">
                      <button onClick={() => toggleSort('created_at')} className="flex items-center hover:text-purple-200 transition-colors">
                        Tanggal
                        <SortIcon field="created_at" />
                      </button>
                    </TableHead>
                    <TableHead className="text-white font-bold text-base text-center h-14">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!feedbacks?.data || feedbacks.data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-16">
                        <div className="flex flex-col items-center justify-center space-y-4">
                          <MessageSquare className="h-20 w-20 text-gray-300" />
                          <p className="text-gray-500 text-xl font-medium">Tidak ada kritik dan saran</p>
                          <p className="text-gray-400">Belum ada masukan dari jemaat</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    feedbacks.data.map((feedback, idx) => (
                      <TableRow
                        key={feedback.id}
                        className={`
                          ${idx % 2 === 0 ? 'bg-white' : 'bg-purple-50/50'}
                          hover:bg-purple-100 transition-colors border-b border-purple-100
                          ${!feedback.is_read ? 'font-semibold' : ''}
                        `}
                      >
                        <TableCell className="font-medium text-gray-800">
                          <div className="flex items-center gap-2">
                            {!feedback.is_read && <Circle className="h-3 w-3 fill-red-500 text-red-500" />}
                            {feedback.name}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-800 max-w-md">
                          <p className="line-clamp-2">{feedback.message}</p>
                        </TableCell>
                        <TableCell>
                          <Badge variant={feedback.is_read ? 'outline' : 'default'} className={feedback.is_read ? 'bg-green-100 text-green-700' : 'bg-red-500 text-white'}>
                            {feedback.is_read ? (
                              <span className="flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" />
                                Sudah Dibaca
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <Circle className="h-3 w-3" />
                                Belum Dibaca
                              </span>
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600 text-sm">{formatDate(feedback.created_at)}</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Button size="sm" variant="outline" asChild className="bg-white hover:bg-purple-50 hover:text-black border-purple-200 text-black">
                              <Link href={route('admin.feedback.show', feedback.id)}>
                                <Eye className="h-4 w-4 mr-1" />
                                Lihat
                              </Link>
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(feedback.id, feedback.name)}
                              disabled={deletingId === feedback.id}
                              className="hover:bg-red-700"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              {deletingId === feedback.id ? 'Menghapus...' : 'Hapus'}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {feedbacks?.data && feedbacks.data.length > 0 && feedbacks.meta && feedbacks.links && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-t border-purple-100">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-700 font-medium">
                    Menampilkan {feedbacks.meta.from || 0} hingga {feedbacks.meta.to || 0} dari {feedbacks.meta.total || 0} feedback
                  </p>
                  <div className="flex gap-2">
                    {feedbacks.links.map((link: any, i: number) => (
                      <Button
                        key={i}
                        size="sm"
                        variant={link.active ? 'default' : 'outline'}
                        disabled={!link.url}
                        onClick={() => link.url && router.visit(link.url, { preserveState: true, preserveScroll: true })}
                        className={
                          link.active
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700'
                            : 'bg-white text-purple-700 border-purple-300 hover:bg-purple-50'
                        }
                        dangerouslySetInnerHTML={{ __html: getLabel(link.label) }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
