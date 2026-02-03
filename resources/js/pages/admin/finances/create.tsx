import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { CalendarClock, HandCoins, Plus } from 'lucide-react';

export default function FinancesCreate() {
  const today = new Date().toISOString().slice(0, 10);

  const { data, setData, post, processing, errors } = useForm({
    title: '',
    type: 'income',
    amount: '',
    date: today,
    category: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('admin.finances.store'));
  };

  return (
    <AuthenticatedLayout>
      <Head title="Catat Transaksi Keuangan" />

      <div className="dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
        <div className="mx-auto max-w-5xl px-6 py-8 space-y-8">
          {/* Header */}
          <div className="relative z-10 space-y-4">
            <nav className="flex items-center text-sm font-medium">
              <Link
                href={route('admin.finances.index')}
                className="text-white/90 hover:text-white transition-colors duration-200 flex items-center gap-1"
              >
                ← Kembali ke Keuangan
              </Link>
            </nav>
            <div className="text-center">
              <div className="relative inline-block">
                <h1 className="text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-lg">
                  Catat Transaksi Keuangan
                </h1>
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg blur opacity-25"></div>
              </div>
              <p className="text-white/95 text-xl font-medium drop-shadow-md">
                Pencatatan sederhana pemasukan dan pengeluaran tanpa laporan neraca atau laba rugi.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
            <div className="bg-gradient-to-r from-emerald-500/25 to-blue-500/25 p-8 border-b border-white/20">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-3 rounded-xl">
                  <HandCoins className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Detail Transaksi</h2>
                  <p className="text-white/80 text-lg">Isi data pemasukan atau pengeluaran gereja</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="title" className="text-white font-semibold text-lg flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      Judul Transaksi *
                    </Label>
                    <Input
                      id="title"
                      type="text"
                      value={data.title}
                      onChange={(e) => setData('title', e.target.value)}
                      placeholder="Contoh: Kolekte Minggu, Renovasi Kapel"
                      required
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-emerald-400 focus:bg-white/15 rounded-xl h-14 text-lg font-medium shadow-lg"
                    />
                    {errors.title && (
                      <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-xl">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <p className="text-red-200 font-medium">{errors.title}</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white font-semibold text-lg flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      Tipe Transaksi *
                    </Label>
                    <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                      <SelectTrigger className="bg-white/10 border-white/30 text-white h-14 rounded-xl text-lg">
                        <SelectValue placeholder="Pilih tipe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Pemasukan</SelectItem>
                        <SelectItem value="expense">Pengeluaran</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.type && (
                      <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-xl">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <p className="text-red-200 font-medium">{errors.type}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-white font-semibold text-lg flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      Jumlah (Rp) *
                    </Label>
                    <Input
                      type="number"
                      inputMode="decimal"
                      step="0.01"
                      min="0"
                      value={data.amount}
                      onChange={(e) => setData('amount', e.target.value)}
                      placeholder="0"
                      required
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-emerald-400 focus:bg-white/15 rounded-xl h-14 text-lg font-semibold shadow-lg"
                    />
                    {errors.amount && (
                      <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-xl">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <p className="text-red-200 font-medium">{errors.amount}</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white font-semibold text-lg flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      Tanggal Transaksi *
                    </Label>
                    <div className="relative">
                      <CalendarClock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                      <Input
                        type="date"
                        value={data.date}
                        onChange={(e) => setData('date', e.target.value)}
                        required
                        className="pl-12 bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-emerald-400 focus:bg-white/15 rounded-xl h-14 text-lg font-semibold shadow-lg"
                      />
                    </div>
                    {errors.date && (
                      <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-xl">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <p className="text-red-200 font-medium">{errors.date}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-white font-semibold text-lg flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      Kategori (Opsional)
                    </Label>
                    <Input
                      type="text"
                      value={data.category}
                      onChange={(e) => setData('category', e.target.value)}
                      placeholder="Contoh: Kolekte, Donasi, Operasional"
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-emerald-400 focus:bg-white/15 rounded-xl h-14 text-lg font-medium shadow-lg"
                    />
                    {errors.category && (
                      <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-xl">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <p className="text-red-200 font-medium">{errors.category}</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white font-semibold text-lg flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      Keterangan (Opsional)
                    </Label>
                    <Textarea
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                      placeholder="Catat detail singkat, misal sumber dana atau tujuan pengeluaran."
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-emerald-400 focus:bg-white/15 rounded-xl min-h-[120px] text-lg font-medium shadow-lg"
                    />
                    {errors.description && (
                      <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-xl">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <p className="text-red-200 font-medium">{errors.description}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:justify-end gap-4 pt-4">
                  <Link href={route('admin.finances.index')}>
                    <Button
                      type="button"
                      className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-lg"
                    >
                      Batal
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    disabled={processing}
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-xl text-lg"
                  >
                    {processing ? 'Menyimpan...' : 'Simpan Transaksi'}
                    <Plus className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
