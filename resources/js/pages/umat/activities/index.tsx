import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Calendar, MapPin, Clock, Eye, Archive, Image as ImageIcon } from 'lucide-react';
import { formatDistanceToNow, format, isToday, isTomorrow, isThisWeek, isPast } from 'date-fns';
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

interface PaginatedActivities {
    data: Activity[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    activities: PaginatedActivities;
}

export default function ActivitiesIndex({ activities }: Props) {
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return {
                full: format(date, 'EEEE, dd MMMM yyyy', { locale: id }),
                short: format(date, 'dd MMM yyyy', { locale: id }),
                dayName: format(date, 'EEEE', { locale: id })
            };
        } catch {
            return {
                full: 'Tanggal tidak valid',
                short: 'Invalid',
                dayName: 'Invalid'
            };
        }
    };

    const formatTime = (timeString: string) => {
        try {
            if (!timeString) return '-';
            const time = new Date(`2000-01-01 ${timeString}`);
            return format(time, 'HH:mm', { locale: id });
        } catch {
            return '-';
        }
    };

    const getDateBadgeInfo = (dateString: string) => {
        try {
            const date = new Date(dateString);
            if (isToday(date)) {
                return { text: 'Hari Ini', variant: 'default' as const, color: 'bg-red-500 text-white' };
            }
            if (isTomorrow(date)) {
                return { text: 'Besok', variant: 'secondary' as const, color: 'bg-orange-500 text-white' };
            }
            if (isThisWeek(date)) {
                return { text: 'Minggu Ini', variant: 'outline' as const, color: 'bg-blue-500 text-white' };
            }
            if (isPast(date)) {
                return { text: 'Sudah Lewat', variant: 'outline' as const, color: 'bg-gray-400 text-white' };
            }
            return { text: 'Mendatang', variant: 'outline' as const, color: 'bg-church-primary text-white' };
        } catch {
            return { text: 'Invalid', variant: 'outline' as const, color: 'bg-gray-400 text-white' };
        }
    };

    return (
        <AppLayout>
            <Head title="Agenda Kegiatan" />

            <div className="min-h-screen bg-gradient-to-br from-church-cream via-white to-church-light">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <div className="bg-church-primary/10 p-3 rounded-full mr-4">
                                    <Calendar className="h-8 w-8 text-church-primary" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold text-church-dark">
                                        Agenda Kegiatan
                                    </h1>
                                    <p className="text-lg text-church-text/80">
                                        Kegiatan dan acara Gereja St. Paulus Kwimi
                                    </p>
                                </div>
                            </div>
                            
                            <Link href="/umat/activities/archive/all">
                                <Button variant="outline" className="border-church-primary/20 text-church-primary hover:bg-church-primary/10">
                                    <Archive className="h-4 w-4 mr-2" />
                                    Arsip Kegiatan
                                </Button>
                            </Link>
                        </div>

                        {/* Stats Card */}
                        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-church-primary/10">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-church-dark">{activities.total}</p>
                                    <p className="text-church-text/70 text-sm">Total Kegiatan</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-church-dark">{activities.current_page}</p>
                                    <p className="text-church-text/70 text-sm">Halaman Saat Ini</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-church-dark">{activities.last_page}</p>
                                    <p className="text-church-text/70 text-sm">Total Halaman</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-church-dark">{activities.per_page}</p>
                                    <p className="text-church-text/70 text-sm">Per Halaman</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Activities Grid */}
                    {activities.data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {activities.data.map((activity) => {
                                const dateInfo = formatDate(activity.date);
                                const timeInfo = formatTime(activity.time_start);
                                const badgeInfo = getDateBadgeInfo(activity.date);
                                
                                return (
                                    <Card key={activity.id} className="group hover:shadow-lg transition-all duration-300 border-church-primary/20 bg-white/80 backdrop-blur-sm overflow-hidden">
                                        {/* Date Header */}
                                        <div className="bg-gradient-to-r from-church-primary to-church-secondary p-4 text-white">
                                            <div className="flex justify-between items-center mb-2">
                                                <div className={`px-2 py-1 rounded-full text-xs font-medium ${badgeInfo.color}`}>
                                                    {badgeInfo.text}
                                                </div>
                                                <div className="text-xs opacity-90">
                                                    {dateInfo.dayName}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="text-2xl font-bold">
                                                    {format(new Date(activity.date), 'dd', { locale: id })}
                                                </div>
                                                <div className="text-right text-sm">
                                                    <div className="font-medium">
                                                        {format(new Date(activity.date), 'MMM yyyy', { locale: id })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-lg text-church-dark group-hover:text-church-primary transition-colors duration-300 line-clamp-2">
                                                {activity.name}
                                            </CardTitle>
                                        </CardHeader>

                                        <CardContent className="pt-0">
                                            <p className="text-church-text/80 text-sm mb-4 line-clamp-3">
                                                {activity.description || 'Tidak ada deskripsi tersedia.'}
                                            </p>

                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center text-sm text-church-text/70">
                                                    <Clock className="h-4 w-4 mr-2 text-church-secondary" />
                                                    <span>{timeInfo}</span>
                                                </div>
                                                {activity.location && (
                                                    <div className="flex items-center text-sm text-church-text/70">
                                                        <MapPin className="h-4 w-4 mr-2 text-church-accent" />
                                                        <span className="line-clamp-1">{activity.location}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="text-xs text-church-text/60">
                                                    {dateInfo.short}
                                                </div>
                                                
                                                <Link
                                                    href={`/umat/activities/${activity.id}`}
                                                    className="inline-flex items-center px-3 py-1 text-xs bg-church-primary text-white rounded-full hover:bg-church-primary/90 transition-colors duration-300"
                                                >
                                                    <Eye className="h-3 w-3 mr-1" />
                                                    Lihat Detail
                                                    <ChevronRight className="h-3 w-3 ml-1" />
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="bg-church-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Calendar className="h-12 w-12 text-church-primary/50" />
                            </div>
                            <h3 className="text-xl font-semibold text-church-dark mb-2">
                                Belum Ada Kegiatan
                            </h3>
                            <p className="text-church-text/70 max-w-md mx-auto">
                                Kegiatan gereja akan ditampilkan di sini ketika sudah tersedia.
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    {activities.last_page > 1 && (
                        <div className="flex justify-center items-center space-x-2">
                            {activities.links.map((link, index) => {
                                if (!link.url) {
                                    return (
                                        <span
                                            key={index}
                                            className="px-3 py-2 text-church-text/50 bg-white/50 rounded-md border border-church-primary/10"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                }

                                return (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`px-3 py-2 rounded-md border transition-colors duration-300 ${
                                            link.active
                                                ? 'bg-church-primary text-white border-church-primary'
                                                : 'bg-white/70 text-church-dark border-church-primary/20 hover:bg-church-primary/10'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}