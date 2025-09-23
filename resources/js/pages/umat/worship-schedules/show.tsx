import { Head, Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
            
            <div className="min-h-screen bg-gradient-to-br from-[#1a4d20] via-[#235829] to-[#2d5f35] py-10">
                <div className="container mx-auto px-4 space-y-8">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between gap-4">
                        <h1 className="text-3xl font-bold text-white drop-shadow-lg">
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
                    <Card className="border-none shadow-xl rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md border border-slate-700/50">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-2xl font-semibold text-white leading-tight">
                                    {worshipSchedule.name}
                                </CardTitle>
                                {isUpcoming(worshipSchedule.date) && (
                                    <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-3 py-1 rounded-full text-sm shadow-lg">
                                        Mendatang
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>
                        
                        <CardContent className="pt-4 space-y-6">
                            {/* Informasi Utama */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center p-4 bg-slate-700/50 rounded-xl border border-slate-600/50 shadow-sm backdrop-blur-sm">
                                        <CalendarDays className="w-6 h-6 mr-3 text-emerald-400" />
                                        <div>
                                            <h3 className="font-medium text-slate-300">Tanggal</h3>
                                            <p className="text-white">{formatDate(worshipSchedule.date)}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center p-4 bg-slate-700/50 rounded-xl border border-slate-600/50 shadow-sm backdrop-blur-sm">
                                        <Clock className="w-6 h-6 mr-3 text-emerald-400" />
                                        <div>
                                            <h3 className="font-medium text-slate-300">Waktu</h3>
                                            <p className="text-white">{formatTime(worshipSchedule.time_start)}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center p-4 bg-slate-700/50 rounded-xl border border-slate-600/50 shadow-sm backdrop-blur-sm">
                                        <Users className="w-6 h-6 mr-3 text-emerald-400" />
                                        <div>
                                            <h3 className="font-medium text-slate-300">Pemimpin</h3>
                                            <p className="text-white">{worshipSchedule.pic}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Communities */}
                            {worshipSchedule.communities && worshipSchedule.communities.length > 0 && (
                                <div className="p-4 bg-slate-700/50 rounded-xl border border-slate-600/50 shadow-sm backdrop-blur-sm">
                                    <h3 className="font-medium text-slate-300 mb-3">Komunitas yang Terlibat</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {worshipSchedule.communities.map((community) => (
                                            <Badge 
                                                key={community.id} 
                                                variant="secondary" 
                                                className="text-sm px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition border border-emerald-500/30"
                                            >
                                                {community.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}