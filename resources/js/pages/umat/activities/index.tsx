/* eslint-disable @typescript-eslint/no-explicit-any */
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
            return format(time, 'HH:mm', { locale: id }) + ' WIT';
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

            <div className="p-6 dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #1a4d20, #235829, #2d5f35)' }}>
                <div className="container mx-auto space-y-6">
                    {/* Header */}
                    <div className="relative bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-2xl p-8 shadow-2xl overflow-hidden">
                        <div className="relative z-10 text-center">
                            <div className="relative inline-block mb-3">
                                <h1 className="text-4xl font-bold text-white drop-shadow-lg">Agenda Kegiatan</h1>
                                <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-lg blur opacity-20"></div>
                            </div>
                            <p className="text-white/90 text-lg font-medium">
                                Kegiatan dan acara Gereja St. Paulus Kwimi
                            </p>
                        </div>
                        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
                    </div>

                    {/* Filter */}
                    <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-5">
                        <div className="flex flex-wrap items-center gap-3">
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="h-10 border border-gray-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                            >
                                <option value="default">Semua Mendatang</option>
                                <option value="week">Seminggu ke Depan</option>
                                <option value="month">Sebulan ke Depan</option>
                                <option value="custom">Rentang Tanggal</option>
                            </select>

                            {filter === 'custom' && (
                                <>
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="h-10 border border-gray-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                                    />
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="h-10 border border-gray-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                                    />
                                </>
                            )}

                            <button
                                onClick={applyFilter}
                                className="h-10 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer"
                            >
                                Terapkan
                            </button>
                        </div>
                    </div>

                    {/* Activities Grid */}
                    {activities.data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {activities.data.map((activity) => {
                                const dateInfo = formatDate(activity.date);
                                const timeInfo = formatTime(activity.time_start);
                                const badgeInfo = getDateBadgeInfo(activity.date);

                                return (
                                    <div key={activity.id} className="group bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col">
                                        <div className="relative">
                                            {activity.image_url && !imageErrors[activity.id] ? (
                                                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                                                    <img
                                                        src={activity.image_url}
                                                        alt={activity.name}
                                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        onError={() => handleImageError(activity.id)}
                                                        loading="lazy"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="aspect-video bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
                                                    <ImageIcon className="h-12 w-12 text-orange-300" />
                                                </div>
                                            )}
                                            {/* Date Badge */}
                                            <div className="absolute top-3 right-3 z-10">
                                                <Badge className={`${badgeInfo.color} border-0 shadow-lg text-xs`}>
                                                    {badgeInfo.text}
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="p-5 flex flex-col flex-1">
                                            <h3 className="text-base font-bold text-slate-800 group-hover:text-orange-700 transition-colors duration-200 line-clamp-2 mb-3">
                                                {activity.name}
                                            </h3>

                                            <div className="space-y-2 text-sm text-slate-600 mb-4">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-orange-500 shrink-0" />
                                                    <span title={dateInfo.full}>{dateInfo.short}</span>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-indigo-500 shrink-0" />
                                                    <span>{timeInfo}</span>
                                                </div>

                                                {activity.location && (
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="h-4 w-4 text-rose-500 shrink-0" />
                                                        <span className="truncate">{activity.location}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mt-auto">
                                                <Link
                                                    href={`/umat/activities/${activity.id}`}
                                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors duration-200"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                    Lihat Detail
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-16 text-center">
                            <div className="rounded-full bg-orange-100 p-5 w-fit mx-auto mb-4">
                                <Calendar className="h-10 w-10 text-orange-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">Belum Ada Kegiatan</h3>
                            <p className="text-slate-500">
                                Kegiatan atau acara gereja akan ditampilkan di sini ketika sudah dijadwalkan.
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    {activities.last_page > 1 && (
                        <div className="flex justify-center items-center gap-2 flex-wrap">
                            {activities.links.map((link, index) => {
                                const label = getLabel(link.label);
                                if (!link.url) {
                                    return (
                                        <span
                                            key={index}
                                            className="px-4 py-2 text-sm font-medium text-gray-400 bg-white border border-gray-200 rounded-lg cursor-not-allowed"
                                            dangerouslySetInnerHTML={{ __html: label }}
                                        />
                                    );
                                }
                                return (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${link.active
                                            ? 'bg-orange-600 text-white shadow-md'
                                            : 'bg-white border border-gray-200 text-gray-700 hover:bg-orange-50 hover:border-orange-300'
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