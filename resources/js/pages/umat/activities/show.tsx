import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { ArrowLeft, Calendar, Clock, MapPin, Image as ImageIcon } from 'lucide-react';
import { format, formatDistanceToNow, isToday, isTomorrow, isPast } from 'date-fns';
import { id } from 'date-fns/locale';

interface Activity {
    id: number;
    name: string;
    description: string;
    date: string;
    time_start: string;
    location?: string;
    image_url?: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    activity: Activity;
}

export default function ActivityShow({ activity }: Props) {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return {
                full: format(date, 'EEEE, dd MMMM yyyy', { locale: id }),
                relative: formatDistanceToNow(date, { 
                    addSuffix: true, 
                    locale: id 
                }),
                dayName: format(date, 'EEEE', { locale: id }),
                dayOnly: format(date, 'dd', { locale: id }),
                monthYear: format(date, 'MMMM yyyy', { locale: id })
            };
        } catch {
            return {
                full: 'Tanggal tidak valid',
                relative: 'Tanggal tidak valid',
                dayName: 'Invalid',
                dayOnly: 'XX',
                monthYear: 'Invalid'
            };
        }
    };

    const formatTime = (timeString: string) => {
        try {
            if (!timeString) return 'Waktu belum ditentukan';
            const time = new Date(`2000-01-01 ${timeString}`);
            return format(time, 'HH:mm', { locale: id }) + ' WIT';
        } catch {
            return 'Waktu tidak valid';
        }
    };

    const getStatusInfo = (dateString: string) => {
        try {
            const date = new Date(dateString);
            if (isToday(date)) {
                return { 
                    text: 'Hari Ini', 
                    color: 'bg-red-500 text-white',
                    description: 'Kegiatan berlangsung hari ini!'
                };
            }
            if (isTomorrow(date)) {
                return { 
                    text: 'Besok', 
                    color: 'bg-orange-500 text-white',
                    description: 'Kegiatan akan berlangsung besok.'
                };
            }
            if (isPast(date)) {
                return { 
                    text: 'Sudah Selesai', 
                    color: 'bg-gray-500 text-white',
                    description: 'Kegiatan ini telah selesai dilaksanakan.'
                };
            }
            return { 
                text: 'Mendatang', 
                color: 'bg-church-primary text-white',
                description: 'Kegiatan akan segera dilaksanakan.'
            };
        } catch {
            return { 
                text: 'Status Tidak Valid', 
                color: 'bg-gray-400 text-white',
                description: 'Status kegiatan tidak dapat ditentukan.'
            };
        }
    };

    const dateInfo = formatDate(activity.date);
    const timeInfo = formatTime(activity.time_start);
    const statusInfo = getStatusInfo(activity.date);

    return (
        <AppLayout>
            <Head title={`${activity.name} - Kegiatan`} />

            <div className="p-6 dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #1a4d20, #235829, #2d5f35)' }}>
                <div className="container mx-auto">
                    {/* Header Navigation */}
                    <div className="mb-6">
                        <Link href="/umat/activities">
                            <Button 
                                variant="outline" 
                                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Kembali ke Agenda Kegiatan
                            </Button>
                        </Link>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
                        {/* Accent bar */}
                        <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-500" />

                        {/* Hero Image */}
                        {activity.image_url && !imageError ? (
                            <div className="aspect-video bg-gray-100 relative overflow-hidden">
                                <img
                                    src={activity.image_url}
                                    alt={activity.name}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    onError={handleImageError}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                            </div>
                        ) : (
                            <div className="aspect-video bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
                                <ImageIcon className="h-24 w-24 text-orange-300" />
                            </div>
                        )}

                        {/* Title + Status */}
                        <div className="px-8 pt-6 pb-2 flex items-start justify-between gap-3">
                            <h1 className="text-2xl font-bold text-slate-800">{activity.name}</h1>
                            <Badge className={`${statusInfo.color} border-0 shadow-sm shrink-0 mt-0.5`}>
                                {statusInfo.text}
                            </Badge>
                        </div>

                        {/* Activity Info */}
                        <div className="bg-orange-50 mx-8 mb-6 rounded-2xl border border-orange-100 p-5">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-orange-100 p-3 rounded-full shrink-0">
                                        <Calendar className="h-5 w-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Tanggal</p>
                                        <p className="font-semibold text-slate-800 text-sm">{dateInfo.full}</p>
                                        <p className="text-xs text-slate-400">{dateInfo.relative}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="bg-indigo-100 p-3 rounded-full shrink-0">
                                        <Clock className="h-5 w-5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Waktu</p>
                                        <p className="font-semibold text-slate-800 text-sm">{timeInfo}</p>
                                    </div>
                                </div>

                                {activity.location && (
                                    <div className="flex items-center gap-3">
                                        <div className="bg-rose-100 p-3 rounded-full shrink-0">
                                            <MapPin className="h-5 w-5 text-rose-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Lokasi</p>
                                            <p className="font-semibold text-slate-800 text-sm line-clamp-2">
                                                {activity.location}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="px-8 pb-8">
                            <h2 className="text-lg font-semibold text-slate-800 mb-3">
                                Deskripsi Kegiatan
                            </h2>
                            {activity.description ? (
                                <p className="text-slate-700 leading-relaxed text-base whitespace-pre-wrap">
                                    {activity.description}
                                </p>
                            ) : (
                                <p className="text-slate-400 italic">
                                    Deskripsi kegiatan belum tersedia.
                                </p>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
                            <div className="text-sm text-slate-500">
                                Terakhir diperbarui: {format(new Date(activity.updated_at), 'dd MMMM yyyy HH:mm', { locale: id })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}