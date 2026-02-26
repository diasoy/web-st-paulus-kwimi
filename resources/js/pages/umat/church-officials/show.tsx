import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Mail, Phone, Building2, MapPin, Calendar, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { BreadcrumbItem } from '@/types';

interface Official {
    id: number;
    name: string;
    position: string;
    position_label: string;
    phone?: string;
    email?: string;
    address?: string;
    photo_url?: string;
    community?: { id: number; name: string };
    department?: string;
    start_date?: string;
    end_date?: string;
    is_active: boolean;
    notes?: string;
}

interface Props {
    official: Official;
}

const formatDate = (d?: string) => {
    if (!d) return '-';
    try { return format(new Date(d), 'dd MMMM yyyy', { locale: id }); } catch { return d; }
};

export default function UmatChurchOfficialShow({ official }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/umat/dashboard' },
        { title: 'Pengurus Gereja', href: '/umat/church-officials' },
        { title: official.name, href: `/umat/church-officials/${official.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${official.name} - Pengurus Gereja`} />

            <div className="p-6 dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #1a4d20 0%, #235829 40%, #3e7147 100%)' }}>
                {/* Back */}
                <div className="mb-6">
                    <Button asChild variant="ghost" className="text-white/90 hover:text-white hover:bg-white/10">
                        <Link href="/umat/church-officials">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Kembali ke Daftar Pengurus
                        </Link>
                    </Button>
                </div>

                <div className="max-w-2xl mx-auto">
                    <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden">
                        {/* Photo Header */}
                        <div className="h-48 bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center relative">
                            {official.photo_url ? (
                                <img
                                    src={official.photo_url}
                                    alt={official.name}
                                    className="h-full w-full object-cover"
                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                />
                            ) : (
                                <div className="rounded-full bg-white/20 p-8">
                                    <Users className="h-16 w-16 text-white" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            <div className="absolute bottom-4 left-6 text-white">
                                <h1 className="text-2xl font-bold drop-shadow-lg">{official.name}</h1>
                                <Badge className="mt-1 bg-white/20 text-white border-white/30">
                                    {official.position_label || official.position}
                                </Badge>
                            </div>
                        </div>

                        <CardContent className="p-6 space-y-4">
                            {/* Status */}
                            <div className="flex items-center gap-2">
                                <Badge className={official.is_active ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}>
                                    {official.is_active ? 'Aktif' : 'Tidak Aktif'}
                                </Badge>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {official.department && (
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-full bg-teal-100 p-2 mt-0.5">
                                            <Building2 className="h-4 w-4 text-teal-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Departemen</p>
                                            <p className="text-sm font-semibold text-slate-800">{official.department}</p>
                                        </div>
                                    </div>
                                )}
                                {official.community && (
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-full bg-emerald-100 p-2 mt-0.5">
                                            <Building2 className="h-4 w-4 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Komunitas</p>
                                            <p className="text-sm font-semibold text-slate-800">{official.community.name}</p>
                                        </div>
                                    </div>
                                )}
                                {official.email && (
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-full bg-blue-100 p-2 mt-0.5">
                                            <Mail className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Email</p>
                                            <a href={`mailto:${official.email}`} className="text-sm font-semibold text-blue-700 hover:underline">{official.email}</a>
                                        </div>
                                    </div>
                                )}
                                {official.phone && (
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-full bg-green-100 p-2 mt-0.5">
                                            <Phone className="h-4 w-4 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Telepon</p>
                                            <a href={`tel:${official.phone}`} className="text-sm font-semibold text-green-700 hover:underline">{official.phone}</a>
                                        </div>
                                    </div>
                                )}
                                {official.address && (
                                    <div className="flex items-start gap-3 sm:col-span-2">
                                        <div className="rounded-full bg-orange-100 p-2 mt-0.5">
                                            <MapPin className="h-4 w-4 text-orange-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Alamat</p>
                                            <p className="text-sm font-semibold text-slate-800">{official.address}</p>
                                        </div>
                                    </div>
                                )}
                                {official.start_date && (
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-full bg-purple-100 p-2 mt-0.5">
                                            <Calendar className="h-4 w-4 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Mulai Bertugas</p>
                                            <p className="text-sm font-semibold text-slate-800">{formatDate(official.start_date)}</p>
                                        </div>
                                    </div>
                                )}
                                {official.end_date && (
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-full bg-red-100 p-2 mt-0.5">
                                            <Calendar className="h-4 w-4 text-red-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Akhir Bertugas</p>
                                            <p className="text-sm font-semibold text-slate-800">{formatDate(official.end_date)}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {official.notes && (
                                <div className="pt-3 border-t border-gray-100">
                                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-2">Catatan</p>
                                    <p className="text-sm text-slate-700 leading-relaxed">{official.notes}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
