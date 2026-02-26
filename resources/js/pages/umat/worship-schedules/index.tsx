import { Head, Link } from "@inertiajs/react";
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
            <div className="p-6 dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #1a4d20 0%, #235829 40%, #3e7147 100%)' }}>
                <div className="container mx-auto space-y-6">
                    {/* Header */}
                    <div className="relative bg-gradient-to-r from-purple-700 via-violet-700 to-indigo-800 rounded-2xl p-8 shadow-2xl overflow-hidden">
                        <div className="relative z-10 text-center">
                            <div className="relative inline-block mb-3">
                                <h1 className="text-4xl font-bold text-white drop-shadow-lg">Jadwal Ibadah</h1>
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-lg blur opacity-20"></div>
                            </div>
                            <p className="text-white/90 text-lg font-medium">
                                Jadwal ibadah Gereja ST. Paulus Kwimi
                            </p>
                        </div>
                        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
                    </div>

                    {/* Jadwal Ibadah */}
                    <div className="space-y-6">
                        {worshipSchedules.data.length === 0 ? (
                            <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-16 text-center">
                                <div className="rounded-full bg-purple-100 p-5 w-fit mx-auto mb-4">
                                    <span className="text-4xl">🕊️</span>
                                </div>
                                <p className="text-gray-500 text-lg font-medium">Belum ada jadwal ibadah yang terdaftar.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {worshipSchedules.data.map((schedule) => (
                                    <div
                                        key={schedule.id}
                                        className={`rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full overflow-hidden ${!isUpcoming(schedule.date) ? 'opacity-80' : ''}`}
                                    >
                                        {/* Card top accent */}
                                        <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-600" />
                                        <div className="p-5 flex-1 flex flex-col">
                                            {/* Title + Badge */}
                                            <div className="flex justify-between items-start mb-4 gap-2">
                                                <h3 className="text-lg font-bold text-slate-800 leading-tight line-clamp-2">
                                                    {schedule.name}
                                                </h3>
                                                {isUpcoming(schedule.date) ? (
                                                    <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 whitespace-nowrap shrink-0 text-xs">
                                                        Mendatang
                                                    </Badge>
                                                ) : (
                                                    <Badge className="bg-gray-100 text-gray-600 border-gray-200 whitespace-nowrap shrink-0 text-xs">
                                                        Sudah Lewat
                                                    </Badge>
                                                )}
                                            </div>

                                            {/* Info rows */}
                                            <div className="space-y-3 flex-1">
                                                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl border border-purple-100">
                                                    <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide min-w-[60px] mt-0.5">Tanggal</span>
                                                    <span className="text-sm text-slate-800 font-medium">{formatDate(schedule.date)}</span>
                                                </div>
                                                <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                                                    <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide min-w-[60px]">Waktu</span>
                                                    <span className="text-sm text-slate-800 font-medium">{formatTime(schedule.time_start)}</span>
                                                </div>
                                                <div className="flex items-center gap-3 p-3 bg-violet-50 rounded-xl border border-violet-100">
                                                    <span className="text-xs font-semibold text-violet-600 uppercase tracking-wide min-w-[60px]">Pemimpin</span>
                                                    <span className="text-sm text-slate-800 font-medium">{schedule.pic}</span>
                                                </div>

                                                {/* Communities */}
                                                {schedule.communities && schedule.communities.length > 0 && (
                                                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                                                        <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide block mb-2">Komunitas</span>
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {schedule.communities.map((community) => (
                                                                <Badge key={community.id} className="text-xs bg-emerald-100 text-emerald-800 border-emerald-200">
                                                                    {community.name}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Link to detail */}
                                            <div className="mt-4 pt-4 border-t border-gray-100">
                                                <Link href={route('umat.worship-schedules.show', schedule.id)}>
                                                    <span className="flex items-center justify-center gap-2 w-full text-sm font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
                                                        Lihat Detail
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {worshipSchedules.last_page > 1 && (
                            <div className="flex justify-center mt-6">
                                <div className="flex space-x-2 flex-wrap gap-y-2">
                                    {worshipSchedules.links.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                                                link.active
                                                    ? 'bg-purple-600 text-white shadow-md'
                                                    : link.url
                                                    ? 'bg-white border border-gray-200 text-gray-700 hover:bg-purple-50 hover:border-purple-300'
                                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
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