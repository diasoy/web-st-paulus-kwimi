import { Head, Link } from "@inertiajs/react";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';

interface Community {
    id: number;
    name: string;
}

interface WorshipSchedule {
    id: number;
    name: string;
    date: string;
    pic: string;
    time_start: string;
    communities: Community[];
    created_at: string;
    updated_at: string;
}

interface PaginatedWorshipSchedules {
    data: WorshipSchedule[];
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
    worshipSchedules: PaginatedWorshipSchedules;
}

export default function WorshipSchedulesIndex({ worshipSchedules }: Props) {
    const getLabel = (label: string) => {
        switch (label) {
            case 'pagination.previous':
            case '&laquo; Previous':
                return 'Sebelumnya';
            case 'pagination.next':
            case 'Next &raquo;':
                return 'Berikutnya';
            default:
                return label.replace(/<[^>]+>/g, '').trim();
        }
    };
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (timeString: string) => {
        if (!timeString) return 'Waktu belum ditentukan';
        return timeString.substring(0, 5) + ' WIT';
    };

    const isUpcoming = (dateString: string) => {
        return new Date(dateString) >= new Date();
    };

    return (
        <AppLayout>
            <Head title="Jadwal Ibadah" />
            <div className="min-h-screen bg-gradient-to-br from-[#1a4d20] via-[#235829] to-[#2d5f35] py-10">
                <div className="container mx-auto px-4 space-y-8">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-4">
                        <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                            Jadwal Ibadah
                        </h1>
                    </div>

                    {/* Jadwal Ibadah */}
                    <div className="space-y-6">
                        {worshipSchedules.data.length === 0 ? (
                            <Card className="border-none shadow-xl rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md border border-slate-700/50">
                                <CardContent className="py-8">
                                    <p className="text-center text-slate-300">Belum ada jadwal ibadah yang terdaftar.</p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {worshipSchedules.data.map((schedule) => (
                                    <Card
                                        key={schedule.id}
                                        className={`border-none shadow-xl rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md border border-slate-700/50 flex flex-col h-full transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${isUpcoming(schedule.date) ? '' : 'opacity-75'}`}
                                    >
                                        <CardHeader className="pb-2">
                                            <div className="flex justify-between items-start">
                                                <CardTitle className="text-xl font-semibold text-white leading-tight">
                                                    {schedule.name}
                                                </CardTitle>
                                                {isUpcoming(schedule.date) && (
                                                    <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-3 py-1 rounded-full text-sm shadow-lg">
                                                        Mendatang
                                                    </Badge>
                                                )}
                                            </div>
                                        </CardHeader>
                                        <CardContent className="pt-4 space-y-6 flex-1 flex flex-col">
                                            {/* Informasi Utama */}
                                            <div className="space-y-4">
                                                <div className="flex items-center p-3 bg-slate-700/50 rounded-xl border border-slate-600/50 shadow-sm backdrop-blur-sm">
                                                    <span className="font-medium text-slate-300 mr-2">Tanggal:</span>
                                                    <span className="text-white">{formatDate(schedule.date)}</span>
                                                </div>
                                                <div className="flex items-center p-3 bg-slate-700/50 rounded-xl border border-slate-600/50 shadow-sm backdrop-blur-sm">
                                                    <span className="font-medium text-slate-300 mr-2">Waktu:</span>
                                                    <span className="text-white">{formatTime(schedule.time_start)}</span>
                                                </div>
                                                <div className="flex items-center p-3 bg-slate-700/50 rounded-xl border border-slate-600/50 shadow-sm backdrop-blur-sm">
                                                    <span className="font-medium text-slate-300 mr-2">Pemimpin:</span>
                                                    <span className="text-white">{schedule.pic}</span>
                                                </div>
                                            </div>

                                            {/* Communities */}
                                            {schedule.communities && schedule.communities.length > 0 && (
                                                <div className="p-3 bg-slate-700/50 rounded-xl border border-slate-600/50 shadow-sm backdrop-blur-sm">
                                                    <span className="font-medium text-slate-300 mb-2 block">Komunitas yang Terlibat:</span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {schedule.communities.map((community) => (
                                                            <Badge key={community.id} variant="secondary" className="text-sm px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition border border-emerald-500/30">
                                                                {community.name}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex-1" />
                                            {/* Link to detail selalu di bawah */}
                                            <div className="pt-3 border-t border-slate-600/50">
                                                <Link
                                                    href={route('umat.worship-schedules.show', schedule.id)}
                                                >
                                                    <span className="text-sm font-medium transition-colors bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-4 py-2 rounded-xl shadow text-white hover:shadow-lg transform hover:scale-[1.02] inline-block">Lihat Detail</span>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {worshipSchedules.last_page > 1 && (
                            <div className="flex justify-center mt-12">
                                <div className="flex space-x-2">
                                    {worshipSchedules.links.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200 shadow ${
                                                link.active
                                                    ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg'
                                                    : link.url
                                                    ? 'bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 text-white hover:bg-slate-700/80'
                                                    : 'bg-slate-800/50 text-slate-400 cursor-not-allowed'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: getLabel(link.label) }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}