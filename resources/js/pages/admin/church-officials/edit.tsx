import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, Upload, X, Users, AlertTriangle, ArrowLeft, Loader2, Edit } from 'lucide-react';
import { FormEventHandler, useRef, useState } from 'react';

interface Community {
  id: number;
  name: string;
}

interface Position {
  value: string;
  label: string;
}

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
  department?: string;
  start_date?: string;
  end_date?: string;
  is_active: boolean;
  notes?: string;
}

interface ChurchOfficialEditProps {
  official: Official;
  communities: Community[];
  positions: Position[];
}

export default function ChurchOfficialEdit({ official, communities, positions }: ChurchOfficialEditProps) {
  const { data, setData, post, processing, errors } = useForm({
    name: official.name || '',
    position: official.position || '',
    phone: official.phone || '',
    email: official.email || '',
    address: official.address || '',
    photo: null as File | null,
    community_id: official.community_id?.toString() || 'none',
    department: official.department || '',
    start_date: official.start_date || '',
    end_date: official.end_date || '',
    is_active: official.is_active ?? true,
    notes: official.notes || '',
    _method: 'PUT',
  });

  const [imageError, setImageError] = useState('');
  const [imagePreview, setImagePreview] = useState<string>(official.photo_url || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('admin.church-officials.update', official.id), {
      forceFormData: true,
      preserveScroll: true,
    });
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setImageError('Ukuran foto maksimal 2MB. Silakan pilih foto lain.');
        setData('photo', null);
      } else {
        setImageError('');
        setData('photo', file);
        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const removeImage = () => {
    setData('photo', null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setImageError('');
  };

  return (
    <AuthenticatedLayout>
      <Head title="Edit Pengurus Gereja" />

      <div className="dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' }}>
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/admin/dashboard" className="text-white/70 hover:text-white transition-colors">
                Dashboard
              </Link>
              <span className="text-white/50">/</span>
              <Link href={route('admin.church-officials.index')} className="text-white/70 hover:text-white transition-colors">
                Data Pengurus Gereja
              </Link>
              <span className="text-white/50">/</span>
              <span className="text-white font-medium">Edit</span>
            </nav>
          </div>

          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                  <Users className="h-10 w-10 text-white" />
                  Edit Pengurus Gereja
                </h1>
                <p className="text-amber-100 text-lg">
                  Perbarui data {official.name}
                </p>
              </div>
              <div className="hidden md:block">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                  <Edit className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
            <form onSubmit={submit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-blue-200 pb-2">
                  Informasi Personal
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Name */}
                  <div className="md:col-span-2">
                    <Label htmlFor="name" className="text-base font-bold text-gray-900 dark:text-white mb-2 block">
                      Nama Lengkap *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="Contoh: Romo Yohanes Paulus"
                      className={`${
                        errors.name
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                          : 'border-blue-200 focus:border-blue-500 focus:ring-blue-200'
                      }`}
                      required
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Position */}
                  <div>
                    <Label htmlFor="position" className="text-base font-bold text-gray-900 dark:text-white mb-2 block">
                      Jabatan *
                    </Label>
                    <Select value={data.position} onValueChange={(value) => setData('position', value)}>
                      <SelectTrigger className={`${errors.position ? 'border-red-300' : ''}`}>
                        <SelectValue placeholder="Pilih Jabatan" />
                      </SelectTrigger>
                      <SelectContent>
                        {positions.map((pos) => (
                          <SelectItem key={pos.value} value={pos.value}>
                            {pos.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.position && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4" />
                        {errors.position}
                      </p>
                    )}
                  </div>

                  {/* Department */}
                  <div>
                    <Label htmlFor="department" className="text-base font-bold text-gray-900 dark:text-white mb-2 block">
                      Seksi/Bagian
                    </Label>
                    <Input
                      id="department"
                      type="text"
                      value={data.department}
                      onChange={(e) => setData('department', e.target.value)}
                      placeholder="Contoh: Liturgi, Sosial, dll"
                      className={errors.department ? 'border-red-300' : ''}
                    />
                    {errors.department && (
                      <p className="mt-2 text-sm text-red-600">{errors.department}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-green-200 pb-2">
                  Informasi Kontak
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone" className="text-base font-bold text-gray-900 dark:text-white mb-2 block">
                      Nomor Telepon
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={data.phone}
                      onChange={(e) => setData('phone', e.target.value)}
                      placeholder="0812-3456-7890"
                      className={errors.phone ? 'border-red-300' : ''}
                    />
                    {errors.phone && (
                      <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-base font-bold text-gray-900 dark:text-white mb-2 block">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                      placeholder="email@example.com"
                      className={errors.email ? 'border-red-300' : ''}
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <Label htmlFor="address" className="text-base font-bold text-gray-900 dark:text-white mb-2 block">
                      Alamat
                    </Label>
                    <Textarea
                      id="address"
                      value={data.address}
                      onChange={(e) => setData('address', e.target.value)}
                      placeholder="Alamat lengkap..."
                      rows={3}
                      className={errors.address ? 'border-red-300' : ''}
                    />
                    {errors.address && (
                      <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Organization Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-purple-200 pb-2">
                  Informasi Jabatan
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Community */}
                  <div>
                    <Label htmlFor="community_id" className="text-base font-bold text-gray-900 dark:text-white mb-2 block">
                      Lingkungan
                    </Label>
                    <Select value={data.community_id} onValueChange={(value) => setData('community_id', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Lingkungan (Opsional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Tidak Ada</SelectItem>
                        {communities.map((community) => (
                          <SelectItem key={community.id} value={community.id.toString()}>
                            {community.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.community_id && (
                      <p className="mt-2 text-sm text-red-600">{errors.community_id}</p>
                    )}
                  </div>

                  {/* Start Date */}
                  <div>
                    <Label htmlFor="start_date" className="text-base font-bold text-gray-900 dark:text-white mb-2 block">
                      Tanggal Mulai Menjabat
                    </Label>
                    <Input
                      id="start_date"
                      type="date"
                      value={data.start_date}
                      onChange={(e) => setData('start_date', e.target.value)}
                      className={errors.start_date ? 'border-red-300' : ''}
                    />
                    {errors.start_date && (
                      <p className="mt-2 text-sm text-red-600">{errors.start_date}</p>
                    )}
                  </div>

                  {/* End Date */}
                  <div>
                    <Label htmlFor="end_date" className="text-base font-bold text-gray-900 dark:text-white mb-2 block">
                      Tanggal Selesai Menjabat
                    </Label>
                    <Input
                      id="end_date"
                      type="date"
                      value={data.end_date}
                      onChange={(e) => setData('end_date', e.target.value)}
                      className={errors.end_date ? 'border-red-300' : ''}
                    />
                    {errors.end_date && (
                      <p className="mt-2 text-sm text-red-600">{errors.end_date}</p>
                    )}
                  </div>

                  {/* Active Status */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="is_active"
                      checked={data.is_active}
                      onCheckedChange={(checked) => setData('is_active', checked as boolean)}
                    />
                    <Label htmlFor="is_active" className="text-base font-medium text-gray-900 dark:text-white cursor-pointer">
                      Status Aktif
                    </Label>
                  </div>
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-amber-200 pb-2">
                  Foto
                </h2>
                <div>
                  <Label htmlFor="photo" className="text-base font-bold text-gray-900 dark:text-white mb-2 block">
                    Foto Pengurus
                  </Label>
                  <div className="mt-2">
                    {imagePreview ? (
                      <div className="relative inline-block">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="h-48 w-48 object-cover rounded-lg border-4 border-blue-200"
                        />
                        <Button
                          type="button"
                          onClick={removeImage}
                          size="sm"
                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 rounded-full p-1"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="photo"
                          className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-10 h-10 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Klik untuk upload</span>
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 2MB)</p>
                          </div>
                          <input
                            ref={fileInputRef}
                            id="photo"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageSelect}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  {imageError && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4" />
                      {imageError}
                    </p>
                  )}
                  {errors.photo && (
                    <p className="mt-2 text-sm text-red-600">{errors.photo}</p>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor="notes" className="text-base font-bold text-gray-900 dark:text-white mb-2 block">
                  Catatan
                </Label>
                <Textarea
                  id="notes"
                  value={data.notes}
                  onChange={(e) => setData('notes', e.target.value)}
                  placeholder="Catatan tambahan..."
                  rows={4}
                  className={errors.notes ? 'border-red-300' : ''}
                />
                {errors.notes && (
                  <p className="mt-2 text-sm text-red-600">{errors.notes}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t-2 border-gray-200">
                <Link href={route('admin.church-officials.index')}>
                  <Button
                    type="button"
                    variant="outline"
                    className="px-8 py-3 rounded-xl font-semibold"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Batal
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={processing}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-3 rounded-xl font-semibold"
                >
                  {processing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Memperbarui...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-5 w-5" />
                      Perbarui
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
