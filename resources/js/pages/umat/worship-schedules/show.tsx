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
        return timeString.substring(0, 5) + ' WIB';
    };

    const isUpcoming = (dateString: string) => {
        return new Date(dateString) >= new Date();
    };

    return (
        <AppLayout>
            <Head title={`Jadwal Ibadah - ${worshipSchedule.name}`} />
            
            <div className="container mx-auto px-4 py-8 space-y-8">
                <div className="flex items-center justify-between gap-4">
                    <h1 className="text-3xl font-bold text-church-dark">Detail Jadwal Ibadah</h1>
                    <Link 
                    
                        href={route('umat.worship-schedules.index')}
                    >
                        <Button variant="outline" className="bg-secondary text-white px-4 py-2 rounded-md hover:cursor-pointer hover:bg-secondary/90 transition-colors">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Kembali ke Jadwal Ibadah
                        </Button>
                    </Link>
                </div>

                {/* Detail Jadwal */}
                <Card className={`hover:shadow-lg transition-all duration-300 border-border bg-card`}>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-2xl text-church-dark leading-tight">
                                {worshipSchedule.name}
                            </CardTitle>
                            {isUpcoming(worshipSchedule.date) && (
                                <Badge className="bg-primary text-white">
                                    Mendatang
                                </Badge>
                            )}
                        </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0 space-y-6">
                        {/* Informasi Utama */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center p-4 bg-muted/50 rounded-lg border border-border">
                                    <CalendarDays className="w-6 h-6 mr-3 text-primary" />
                                    <div>
                                        <h3 className="font-medium text-foreground">Tanggal</h3>
                                        <p className="text-muted-foreground">{formatDate(worshipSchedule.date)}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center p-4 bg-muted/50 rounded-lg border border-border">
                                    <Clock className="w-6 h-6 mr-3 text-primary" />
                                    <div>
                                        <h3 className="font-medium text-foreground">Waktu</h3>
                                        <p className="text-muted-foreground">{formatTime(worshipSchedule.time_start)}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-center p-4 bg-muted/50 rounded-lg border border-border">
                                    <Users className="w-6 h-6 mr-3 text-primary" />
                                    <div>
                                        <h3 className="font-medium text-foreground">Penanggung Jawab</h3>
                                        <p className="text-muted-foreground">{worshipSchedule.pic}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Communities */}
                        {worshipSchedule.communities && worshipSchedule.communities.length > 0 && (
                            <div className="p-4 bg-muted/50 rounded-lg border border-border">
                                <h3 className="font-medium text-foreground mb-3">Komunitas yang Terlibat</h3>
                                <div className="flex flex-wrap gap-2">
                                    {worshipSchedule.communities.map((community) => (
                                        <Badge key={community.id} variant="secondary" className="text-sm">
                                            {community.name}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}