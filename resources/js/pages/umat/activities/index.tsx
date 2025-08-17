// Mapping label pagination agar tidak tampil 'pagination.next' di frontend
const labelMap: Record<string, string> = {
    'pagination.next': 'Berikutnya',
    'pagination.previous': 'Sebelumnya',
    'pagination.first': 'Pertama',
    'pagination.last': 'Terakhir',
};

const getLabel = (label: string) => labelMap[label] || label;
import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { Calendar, MapPin, Clock, Eye, Image as ImageIcon } from 'lucide-react';
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
    const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
    const [filter, setFilter] = useState('default');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const applyFilter = () => {
        const query: any = { filter };
        if (filter === 'custom') {
            query.start_date = startDate;
            query.end_date = endDate;
        }
        router.get('/umat/activities', query, { preserveScroll: true });
    };

    const handleImageError = (activityId: number) => {
        setImageErrors(prev => ({
            ...prev,
            [activityId]: true
        }));
    };

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return {
                full: format(date, 'EEEE, dd MMMM yyyy', { locale: id }),
                short: format(date, 'dd MMM yyyy', { locale: id }),
                dayName: format(date, 'EEEE', { locale: id }),
                relative: formatDistanceToNow(date, {
                    addSuffix: true,
                    locale: id
                })
            };
        } catch {
            return {
                full: 'Tanggal tidak valid',
                short: 'Invalid',
                dayName: 'Invalid',
                relative: 'Invalid'
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

    const getDateBadgeInfo = (dateString: string) => {
        try {
            const date = new Date(dateString);
            if (isToday(date)) {
                return { text: 'Hari Ini', color: 'bg-red-500 text-white' };
            }
            if (isTomorrow(date)) {
                return { text: 'Besok', color: 'bg-orange-500 text-white' };
            }
            if (isThisWeek(date)) {
                return { text: 'Minggu Ini', color: 'bg-blue-500 text-white' };
            }
            if (isPast(date)) {
                return { text: 'Sudah Lewat', color: 'bg-gray-400 text-white' };
            }
            return { text: 'Mendatang', color: 'bg-secondary text-white' };
        } catch {
            return { text: 'Invalid', color: 'bg-gray-400 text-white' };
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
                                <div className="bg-secondary/10 p-3 rounded-full mr-4">
                                    <Calendar className="h-8 w-8 text-secondary" />
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
                        </div>
                    </div>

                    {/* Filter */}
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="border rounded-lg px-3 py-2"
                        >
                            <option value="default">Semua Mendatang</option>
                            <option value="week">Seminggu ke Depan</option>
                            <option value="month">Sebulan ke Depan</option>
                            <option value="custom">Custom</option>
                        </select>

                        {filter === 'custom' && (
                            <>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="border rounded-lg px-3 py-2"
                                />
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="border rounded-lg px-3 py-2"
                                />
                            </>
                        )}

                        <button
                            onClick={applyFilter}
                            className="bg-secondary text-white px-4 py-2 rounded-lg hover:cursor-pointer"
                        >
                            Terapkan
                        </button>
                    </div>

                    {/* Activities Grid */}
                    {activities.data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {activities.data.map((activity) => {
                                const dateInfo = formatDate(activity.date);
                                const timeInfo = formatTime(activity.time_start);
                                const badgeInfo = getDateBadgeInfo(activity.date);

                                return (
                                    <Card key={activity.id} className="group hover:shadow-lg transition-all duration-300 border-secondary/20 bg-white/80 backdrop-blur-sm overflow-hidden rounded-xl p-0">
                                        <div className="relative">
                                            {activity.image_url && !imageErrors[activity.id] ? (
                                                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                                                    <img
                                                        src={activity.image_url}
                                                        alt={activity.name}
                                                        className="absolute inset-0 w-full h-full object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
                                                        onError={() => handleImageError(activity.id)}
                                                        loading="lazy"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="aspect-video bg-gray-100 flex items-center justify-center rounded-t-xl">
                                                    <ImageIcon className="h-12 w-12 text-secondary/50" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-t-xl" />
                                            {/* Date Badge */}
                                            <div className="absolute top-3 right-3 z-10">
                                                <Badge className={`${badgeInfo.color} border-0 shadow-lg`}>
                                                    {badgeInfo.text}
                                                </Badge>
                                            </div>
                                        </div>

                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-xl text-church-dark group-hover:text-secondary transition-colors duration-300 line-clamp-2">
                                                {activity.name}
                                            </CardTitle>

                                            <div className="space-y-2 text-sm text-church-text/80">
                                                <div className="flex items-center">
                                                    <Calendar className="h-4 w-4 mr-2 text-secondary" />
                                                    <span title={dateInfo.full}>{dateInfo.short}</span>
                                                </div>

                                                <div className="flex items-center">
                                                    <Clock className="h-4 w-4 mr-2 text-church-secondary" />
                                                    <span>{timeInfo}</span>
                                                </div>

                                                {activity.location && (
                                                    <div className="flex items-center">
                                                        <MapPin className="h-4 w-4 mr-2 text-church-accent" />
                                                        <span className="truncate">{activity.location}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </CardHeader>

                                        <CardContent className="pt-0 pb-5">
                                            <Link
                                                href={`/umat/activities/${activity.id}`}
                                                className="inline-flex items-center px-4 py-2 text-sm bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors duration-300"
                                            >
                                                <Eye className="h-4 w-4 mr-2" />
                                                Lihat Detail
                                            </Link>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="bg-secondary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Calendar className="h-12 w-12 text-secondary/50" />
                            </div>
                            <h3 className="text-xl font-semibold text-church-dark mb-2">
                                Belum Ada Kegiatan
                            </h3>
                            <p className="text-church-text/70 max-w-md mx-auto">
                                Kegiatan atau acara gereja akan ditampilkan di sini ketika sudah dijadwalkan.
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    {activities.last_page > 1 && (
                        <div className="flex justify-center items-center space-x-2">
                            {activities.links.map((link, index) => {
                                const label = getLabel(link.label);
                                if (!link.url) {
                                    return (
                                        <span
                                            key={index}
                                            className="px-3 py-2 text-church-text/50 bg-white/50 rounded-md border border-secondary/10"
                                            dangerouslySetInnerHTML={{ __html: label }}
                                        />
                                    );
                                }
                                return (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`px-3 py-2 rounded-md border transition-colors duration-300 ${link.active
                                            ? 'bg-secondary text-white border-secondary'
                                            : 'bg-white/70 text-church-dark border-secondary/20 hover:bg-secondary/10'
                                            }`}
                                        dangerouslySetInnerHTML={{ __html: label }}
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