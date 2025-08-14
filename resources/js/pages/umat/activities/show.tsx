import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
            return format(time, 'HH:mm', { locale: id }) + ' WITA';
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

            <div className="min-h-screen bg-gradient-to-br from-church-cream via-white to-church-light">
                <div className="container mx-auto px-4 py-8">
                    {/* Header Navigation */}
                    <div className="mb-8">
                        <Link href="/umat/activities">
                            <Button 
                                variant="outline" 
                                className="mb-6 bg-secondary text-white hover:bg-secondary/90 hover:cursor-pointer"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Kembali ke Agenda Kegiatan
                            </Button>
                        </Link>
                    </div>

                    {/* Main Content */}
                    <Card className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm border-secondary/20 shadow-lg overflow-hidden border">
                        {/* Hero Section with Date */}
                        <div className="relative ">
                            {activity.image_url && !imageError ? (
                                <div className=" aspect-video bg-gray-100 relative overflow-hidden">
                                    <img
                                        src={activity.image_url}
                                        alt={activity.name}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        onError={handleImageError}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                </div>
                            ) : (
                                <div className="aspect-video bg-gradient-to-br from-secondary/10 to-church-secondary/10 flex items-center justify-center">
                                    <ImageIcon className="h-24 w-24 text-secondary/50" />
                                </div>
                            )}

                            {/* Status Badge */}
                            <div className="absolute top-3 left-3">
                                <div className={`px-3 py-1 rounded-full bg-secondary text-sm font-medium ${statusInfo.color} border-0 shadow-lg`}>
                                    {statusInfo.text}
                                </div>
                            </div>
                        </div>

                        {/* Activity Info */}
                        <div className="bg-church-cream/30 px-8 py-6 border-b border-church-primary/10">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex items-center">
                                    <div className="bg-church-primary/10 p-3 rounded-full mr-4">
                                        <Calendar className="h-6 w-6 text-church-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-church-text/70">Tanggal</p>
                                        <p className="font-semibold text-church-dark">{dateInfo.full}</p>
                                        <p className="text-xs text-church-text/60">{dateInfo.relative}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="bg-church-secondary/10 p-3 rounded-full mr-4">
                                        <Clock className="h-6 w-6 text-church-secondary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-church-text/70">Waktu</p>
                                        <p className="font-semibold text-church-dark">{timeInfo}</p>
                                    </div>
                                </div>

                                {activity.location && (
                                    <div className="flex items-center">
                                        <div className="bg-church-accent/10 p-3 rounded-full mr-4">
                                            <MapPin className="h-6 w-6 text-church-accent" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-church-text/70">Lokasi</p>
                                            <p className="font-semibold text-church-dark line-clamp-2">
                                                {activity.location}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <CardContent className="p-8">
                            <div className="mb-8">
                                <h2 className="text-2xl font-semibold text-church-dark mb-4">
                                    Deskripsi Kegiatan
                                </h2>
                                <div className="prose prose-lg max-w-none">
                                    {activity.description ? (
                                        <p className="text-church-text leading-relaxed text-lg whitespace-pre-wrap">
                                            {activity.description}
                                        </p>
                                    ) : (
                                        <p className="text-church-text/60 italic">
                                            Deskripsi kegiatan belum tersedia.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </CardContent>

                        {/* Footer */}
                        <div className="bg-church-cream/30 px-8 py-6 border-t border-church-primary/10">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-church-text/70">
                                    Terakhir diperbarui: {format(new Date(activity.updated_at), 'dd MMMM yyyy HH:mm', { locale: id })}
                                </div>
                                <Link href="/umat/activities">
                                    <Button className="bg-church-primary hover:bg-church-primary/90 text-white">
                                        Lihat Kegiatan Lainnya
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}