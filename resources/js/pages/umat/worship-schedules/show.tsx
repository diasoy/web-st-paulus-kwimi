import { Head, Link } from "@inertiajs/react";
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { CalendarDays, Clock, Users, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";

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

interface Props {
    worshipSchedule: WorshipSchedule;
}

export default function WorshipScheduleShow({ worshipSchedule }: Props) {
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
            <Head title={`Jadwal Ibadah - ${worshipSchedule.name}`} />
            
            <div className="p-6 dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #1a4d20 0%, #235829 40%, #3e7147 100%)' }}>
                <div className="container mx-auto space-y-6">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between gap-4">
                        <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                            Detail Jadwal Ibadah
                        </h1>
                        <Link href={route('umat.worship-schedules.index')}>
                            <Button 
                                variant="outline" 
                                className="bg-white/10 text-white backdrop-blur-md border-white/30 px-4 py-2 rounded-xl hover:bg-white/20 transition-all duration-300"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Kembali
                            </Button>
                        </Link>
                    </div>

                    {/* Detail Card */}
                    <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
                        {/* Accent bar */}
                        <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-600" />

                        <div className="p-6 space-y-6">
                            {/* Title + Badge */}
                            <div className="flex justify-between items-start gap-3">
                                <h2 className="text-2xl font-bold text-slate-800 leading-tight">
                                    {worshipSchedule.name}
                                </h2>
                                {isUpcoming(worshipSchedule.date) ? (
                                    <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 whitespace-nowrap shrink-0">
                                        Mendatang
                                    </Badge>
                                ) : (
                                    <Badge className="bg-gray-100 text-gray-600 border-gray-200 whitespace-nowrap shrink-0">
                                        Sudah Lewat
                                    </Badge>
                                )}
                            </div>

                            {/* Informasi Utama */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
                                    <div className="rounded-full bg-purple-100 p-3">
                                        <CalendarDays className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Tanggal</p>
                                        <p className="text-sm font-bold text-slate-800 mt-0.5">{formatDate(worshipSchedule.date)}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                                    <div className="rounded-full bg-indigo-100 p-3">
                                        <Clock className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Waktu</p>
                                        <p className="text-sm font-bold text-slate-800 mt-0.5">{formatTime(worshipSchedule.time_start)}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4 p-4 bg-violet-50 rounded-xl border border-violet-100 md:col-span-2">
                                    <div className="rounded-full bg-violet-100 p-3">
                                        <Users className="w-5 h-5 text-violet-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Pemimpin Ibadah</p>
                                        <p className="text-sm font-bold text-slate-800 mt-0.5">{worshipSchedule.pic}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Communities */}
                            {worshipSchedule.communities && worshipSchedule.communities.length > 0 && (
                                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                                    <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-3">Komunitas yang Terlibat</p>
                                    <div className="flex flex-wrap gap-2">
                                        {worshipSchedule.communities.map((community) => (
                                            <Badge 
                                                key={community.id} 
                                                className="bg-emerald-100 text-emerald-800 border-emerald-200 text-sm px-3 py-1"
                                            >
                                                {community.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}