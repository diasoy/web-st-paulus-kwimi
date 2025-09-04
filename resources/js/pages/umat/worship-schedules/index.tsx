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
                return 'Sebelumnya';
            case 'pagination.next':
                return 'Berikutnya';
            case '&laquo; Previous':
                return 'Sebelumnya';
            case 'Next &raquo;':
                return 'Berikutnya';
            default:
                // Remove HTML tags for page numbers
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
        return timeString.substring(0, 5); // Format HH:MM
    };

    const isUpcoming = (dateString: string) => {
        return new Date(dateString) >= new Date();
    };

    return (
        <AppLayout>
            <Head title="Jadwal Ibadah" />
            <div className="dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #1a4d20, #235829, #2d5f35)' }}>
                <div className="container mx-auto px-4 py-8 space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white drop-shadow-lg">Jadwal Ibadah</h1>
                </div>

                {/* Jadwal Ibadah */}
                <div className="space-y-6">
                    {worshipSchedules.data.length === 0 ? (
                        <Card>
                            <CardContent className="py-8">
                                <p className="text-center text-white">Belum ada jadwal ibadah yang terdaftar.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {worshipSchedules.data.map((schedule) => (
                                <Card
                                    key={schedule.id}
                                    className={`hover:shadow-lg transition-all duration-300 ${
                                        isUpcoming(schedule.date) ? 'border-secondary-200 bg-secondary-50/30' : 'border-gray-200'
                                    } flex flex-col h-full`}
                                >
                                    <CardHeader className="pb-3">
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-lg text-white leading-tight">
                                                {schedule.name}
                                            </CardTitle>
                                            {isUpcoming(schedule.date) && (
                                                <Badge variant="default" className="text-white">
                                                    Mendatang
                                                </Badge>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0 space-y-3 flex-1 flex flex-col">
                                        {/* Tanggal dan Waktu */}
                                        <div className="space-y-2">
                                            <div className="flex items-center text-gray-700">
                                                <svg className="w-4 h-4 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span className="text-sm font-medium text-white">
                                                    {formatDate(schedule.date)}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-gray-700">
                                                <svg className="w-4 h-4 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-sm font-medium text-white">
                                                    {formatTime(schedule.time_start)} 
                                                </span>
                                            </div>
                                        </div>

                                        {/* PIC */}
                                        <div className="flex items-center text-gray-700">
                                            <svg className="w-4 h-4 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span className="text-sm text-white">
                                                <span className="font-medium">Pemimpin: </span> {schedule.pic}
                                            </span>
                                        </div>

                                        {/* Communities */}
                                        {schedule.communities && schedule.communities.length > 0 && (
                                            <div className="space-y-2">
                                                <span className="text-sm font-medium text-white">Kombas:</span>
                                                <div className="flex flex-wrap gap-1">
                                                    {schedule.communities.map((community) => (
                                                        <Badge key={community.id} variant="outline" className="text-xs">
                                                            {community.name}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex-1" />
                                        {/* Link to detail selalu di bawah */}
                                        <div className="pt-3 border-t">
                                            <Link
                                                href={route('umat.worship-schedules.show', schedule.id)}
                                                className="text-sm font-medium transition-colors bg-white px-3 py-1 rounded hover:bg-white/90"
                                            >
                                                Lihat Detail
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
                                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                                link.active
                                                    ? 'bg-secondary text-white shadow-md'
                                                    : link.url
                                                    ? 'bg-white/20 backdrop-blur-sm border border-white/20 text-white hover:bg-white/30 shadow-sm'
                                                    : 'bg-white/10 text-white/50 cursor-not-allowed'
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