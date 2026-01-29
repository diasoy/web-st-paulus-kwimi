import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import {
  ArrowLeft,
  Edit,
  Eye,
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  FileText,
  Trash2,
  CheckCircle,
  XCircle,
} from 'lucide-react';

interface Official {
  id: number;
  name: string;
  position: string;
  phone?: string;
  email?: string;
  address?: string;
  photo?: string;
  photo_url?: string;
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

interface ChurchOfficialShowProps {
  official: Official;
}

const positionLabels: Record<string, string> = {
  pastor_paroki: 'Pastor Paroki',
  ketua_lingkungan: 'Ketua Lingkungan',
  sekretaris_lingkungan: 'Sekretaris Lingkungan',
  bendahara_lingkungan: 'Bendahara Lingkungan',
  koordinator_wilayah: 'Koordinator Wilayah',
  dewan_paroki: 'Dewan Paroki',
  ketua_sie: 'Ketua Seksi',
  anggota_sie: 'Anggota Seksi',
};

export default function ChurchOfficialShow({ official }: ChurchOfficialShowProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDelete = () => {
    if (confirm('Apakah Anda yakin ingin menghapus data pengurus ini?')) {
      router.delete(route('admin.church-officials.destroy', official.id));
    }
  };

  const getPositionLabel = (position: string): string => {
    return positionLabels[position] || position;
  };

  return (
    <AuthenticatedLayout>
      <Head title={`Detail Pengurus - ${official.name}`} />

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
              <span className="text-white font-medium">Detail</span>
            </nav>
          </div>

          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                  <Eye className="h-10 w-10 text-white" />
                  Detail Pengurus Gereja
                </h1>
                <p className="text-purple-100 text-lg">
                  Informasi lengkap {official.name}
                </p>
              </div>
              <div className="hidden md:block">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                  <User className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <Link href={route('admin.church-officials.index')}>
                <Button className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300 rounded-xl shadow-lg">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Kembali
                </Button>
              </Link>
              <Link href={route('admin.church-officials.edit', official.id)}>
                <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg">
                  <Edit className="mr-2 h-5 w-5" />
                  Edit
                </Button>
              </Link>
              <Button
                onClick={handleDelete}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg"
              >
                <Trash2 className="mr-2 h-5 w-5" />
                Hapus
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-white/20">
                <CardContent className="p-8">
                  <div className="text-center">
                    <img
                      src={official.photo_url || '/images/default-avatar.png'}
                      alt={official.name}
                      className="w-48 h-48 rounded-full mx-auto mb-6 object-cover border-4 border-blue-200 shadow-lg"
                    />
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{official.name}</h2>
                    <Badge className="bg-blue-500/20 text-blue-700 border border-blue-400/30 px-4 py-2 text-base">
                      {getPositionLabel(official.position)}
                    </Badge>
                    {official.department && (
                      <p className="text-gray-600 mt-2 font-medium">{official.department}</p>
                    )}
                    <div className="mt-6">
                      <Badge
                        className={`${
                          official.is_active
                            ? 'bg-green-500/20 text-green-700 border border-green-400/30'
                            : 'bg-red-500/20 text-red-700 border border-red-400/30'
                        } px-4 py-2 text-base`}
                      >
                        {official.is_active ? (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Aktif
                          </>
                        ) : (
                          <>
                            <XCircle className="mr-2 h-4 w-4" />
                            Tidak Aktif
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-white/20">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Phone className="h-6 w-6 text-green-600" />
                    Informasi Kontak
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-semibold">Telepon</p>
                      <p className="text-lg text-gray-900">{official.phone || '-'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="h-5 w-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-semibold">Email</p>
                      <p className="text-lg text-gray-900">{official.email || '-'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-semibold">Alamat</p>
                      <p className="text-lg text-gray-900">{official.address || '-'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Organization Information */}
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-white/20">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b">
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Building2 className="h-6 w-6 text-purple-600" />
                    Informasi Jabatan
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <Building2 className="h-5 w-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-semibold">Lingkungan</p>
                      <p className="text-lg text-gray-900">
                        {official.community ? official.community.name : 'Tidak ada lingkungan'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Calendar className="h-5 w-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-semibold">Periode Menjabat</p>
                      <p className="text-lg text-gray-900">
                        {official.start_date ? formatDate(official.start_date) : '-'} 
                        {official.end_date && ` s/d ${formatDate(official.end_date)}`}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              {official.notes && (
                <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-white/20">
                  <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b">
                    <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <FileText className="h-6 w-6 text-amber-600" />
                      Catatan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                      {official.notes}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Metadata */}
              <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-white/20">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 font-semibold">Dibuat</p>
                      <p className="text-gray-900">{formatDate(official.created_at)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-semibold">Terakhir Diupdate</p>
                      <p className="text-gray-900">{formatDate(official.updated_at)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
