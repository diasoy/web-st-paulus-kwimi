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
        return timeString.substring(0, 5);
    };

    const isUpcoming = (dateString: string) => {
        return new Date(dateString) >= new Date();
    };

    return (
        <AppLayout>
            <Head title={`Jadwal Ibadah - ${worshipSchedule.name}`} />
            
            <div className="container mx-auto px-4 py-8 space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <Link 
                            href={route('umat.worship-schedules.index')}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-2 inline-block"
                        >
                            ← Kembali ke Jadwal Ibadah
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Detail Jadwal Ibadah</h1>
                    </div>
                </div>

                {/* Detail Jadwal */}
                <Card className={`${
                    isUpcoming(worshipSchedule.date) ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200'
                }`}>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-2xl text-blue-800">
                                {worshipSchedule.name}
                            </CardTitle>
                            {isUpcoming(worshipSchedule.date) && (
                                <Badge variant="default" className="bg-blue-600">
                                    Mendatang
                                </Badge>
                            )}
                        </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                        {/* Informasi Utama */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center p-4 bg-white rounded-lg border">
                                    <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Tanggal</h3>
                                        <p className="text-gray-600">{formatDate(worshipSchedule.date)}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center p-4 bg-white rounded-lg border">
                                    <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Waktu</h3>
                                        <p className="text-gray-600">{formatTime(worshipSchedule.time_start)} WIB</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-center p-4 bg-white rounded-lg border">
                                    <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <div>
                                        <h3 className="font-medium text-gray-900">Penanggung Jawab</h3>
                                        <p className="text-gray-600">{worshipSchedule.pic}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Communities */}
                        {worshipSchedule.communities && worshipSchedule.communities.length > 0 && (
                            <div className="p-4 bg-white rounded-lg border">
                                <h3 className="font-medium text-gray-900 mb-3">Kombas yang Terlibat</h3>
                                <div className="flex flex-wrap gap-2">
                                    {worshipSchedule.communities.map((community) => (
                                        <Badge key={community.id} variant="outline" className="text-sm">
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