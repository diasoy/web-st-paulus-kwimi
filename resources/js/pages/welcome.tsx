import { Link, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Bell, CalendarDays, Clock, Eye, Image as ImageIcon, MapPin, Users } from 'lucide-react';
import { useState } from 'react';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import SEO from '@/components/seo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Announcement {
    id: number;
    title: string;
    description: string;
    image_url?: string;
    created_at: string;
}

interface Activity {
    id: number;
    name: string;
    description: string;
    image_url?: string;
    date: string;
    time_start: string;
    location?: string;
}

interface WorshipSchedule {
    id: number;
    name: string;
    date: string;
    time_start: string;
    pic: string;
}

interface Props {
    announcements: Announcement[];
    activities: Activity[];
    worshipSchedules: WorshipSchedule[];
}

export default function Welcome({ announcements = [], activities = [], worshipSchedules = [] }: Props) {
    const { auth } = usePage().props;
    const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

    const handleImageError = (id: number) => {
        setImageErrors((prev) => ({ ...prev, [id]: true }));
    };

    const formatDate = (dateString: string, formatStr: string) => {
        try {
            return format(new Date(dateString), formatStr, { locale: id });
        } catch (error) {
            console.error('Error formatting date:', error);
            return dateString;
        }
    };

    const formatTime = (timeString: string) => {
        try {
            return timeString.substring(0, 5);
        } catch (error) {
            console.error('Error formatting time:', error);
            return timeString || '';
        }
    };

    return (
        <>
            <SEO
                title="Pengumuman, Jadwal Ibadah, dan Kegiatan"
                description="Gereja St. Paulus Kwimi — Informasi pengumuman, jadwal ibadah, dan kegiatan jemaat."
                image="/images/logo.png"
                robots="index,follow"
                keywords={['gereja', 'St Paulus', 'Kwimi', 'pengumuman', 'jadwal ibadah', 'kegiatan gereja', 'komunitas']}
                publisher="Gereja St. Paulus Kwimi"
                locale="id_ID"
            />

            <div className="relative min-h-screen bg-background text-foreground">
                {/* Background decorative elements */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-accent/10 blur-3xl"></div>
                </div>

                <div className="relative z-10">
                    <Navbar />
                    <main>
                        {/* Hero Section */}
                        <section className="flex items-center justify-center bg-gradient-to-r from-primary/10 to-secondary/10 text-center">
                            <div className="container mx-auto mt-10 flex min-h-screen flex-col items-center justify-start px-4 md:mt-20">
                                <img
                                    src="/images/logo.png"
                                    alt="Logo Gereja St. Paulus Kwimi"
                                    className="mx-auto mb-6 h-auto w-2/3 max-w-[180px] md:max-w-[220px] lg:max-w-[260px] xl:max-w-[300px]"
                                />
                                <h1 className="church-text-gradient mb-4 text-center text-5xl leading-tight font-bold">
                                    Selamat Datang di Gereja <br />
                                    St. Paulus Kwimi
                                </h1>
                                <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-muted-foreground">
                                    Temukan kedamaian, komunitas, dan pertumbuhan rohani bersama kami.
                                </p>
                            </div>
                        </section>

                        {/* Pengumuman Terkini */}
                        <section id="announcements" className="py-20">
                            <div className="container mx-auto px-4">
                                <div className="mb-12 text-center">
                                    <h2 className="church-text-gradient mb-2 text-4xl font-bold">Pengumuman Terkini</h2>
                                    <p className="text-muted-foreground">Informasi terbaru seputar kegiatan gereja dan jemaat.</p>
                                </div>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {announcements && announcements.length > 0 ? (
                                        announcements.map((announcement) => (
                                            <Card
                                                key={announcement.id}
                                                className="group borderoverflow-hidden rounded-xl p-0 transition-all duration-300 hover:shadow-xl"
                                            >
                                                {announcement.image_url && !imageErrors[announcement.id] ? (
                                                    <div className="relative aspect-video bg-muted/50">
                                                        <img
                                                            src={announcement.image_url}
                                                            alt={announcement.title}
                                                            className="absolute inset-0 h-full w-full rounded-t-xl object-cover transition-transform duration-300"
                                                            onError={() => handleImageError(announcement.id)}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="flex aspect-video items-center justify-center rounded-t-xl bg-muted/50">
                                                        <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
                                                    </div>
                                                )}
                                                <CardHeader className="pb-3">
                                                    <CardTitle className="line-clamp-2 text-lg">{announcement.title}</CardTitle>
                                                    <div className="flex items-center text-xs text-muted-foreground">
                                                        <Bell className="mr-1 h-3 w-3" />
                                                        <span>{formatDate(announcement.created_at, 'dd MMMM yyyy')}</span>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="pt-0">
                                                    <div className="flex h-full min-h-[120px] flex-col items-start">
                                                        <p className="line-clamp-3 text-sm text-muted-foreground">{announcement.description}</p>
                                                        <Button variant="link" asChild className="mt-auto h-auto w-fit p-0 pb-5">
                                                            <Link href={`/umat/announcements/${announcement.id}`}>
                                                                Baca Selengkapnya
                                                                <Eye className="ml-1 h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))
                                    ) : (
                                        <div className="col-span-3 text-center">
                                            <p className="text-muted-foreground">Belum ada pengumuman tersedia.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>

                        <hr />

                        {/* Jadwal Ibadah */}
                        <section id="schedules" className="bg-muted/50 py-20">
                            <div className="container mx-auto px-4">
                                <div className="mb-12 text-center">
                                    <h2 className="church-text-gradient mb-2 text-4xl font-bold">Jadwal Ibadah</h2>
                                    <p className="text-muted-foreground">Jadwal ibadah dan kegiatan rohani mingguan.</p>
                                </div>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {worshipSchedules && worshipSchedules.length > 0 ? (
                                        worshipSchedules.map((schedule) => (
                                            <Card key={schedule.id} className="transition-all duration-300 hover:shadow-xl">
                                                <CardHeader className="pb-3">
                                                    <CardTitle className="text-lg">{schedule.name}</CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-2 pt-0">
                                                    <div className="flex items-center text-sm text-muted-foreground">
                                                        <CalendarDays className="mr-2 h-4 w-4" />
                                                        <span>{formatDate(schedule.date, 'EEEE, dd MMMM yyyy')}</span>
                                                    </div>
                                                    <div className="flex items-center text-sm text-muted-foreground">
                                                        <Clock className="mr-2 h-4 w-4" />
                                                        <span>{formatTime(schedule.time_start)} WIT</span>
                                                    </div>
                                                    <div className="flex items-center text-sm text-muted-foreground">
                                                        <Users className="mr-2 h-4 w-4" />
                                                        <span>{schedule.pic}</span>
                                                    </div>
                                                    <Button variant="link" asChild className="mt-2 h-auto p-0">
                                                        <Link href={`/umat/worship-schedules/${schedule.id}`}>
                                                            Lihat Detail
                                                            <Eye className="ml-1 h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        ))
                                    ) : (
                                        <div className="col-span-3 text-center">
                                            <p className="text-muted-foreground">Belum ada jadwal ibadah.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>

                        <hr />

                        {/* Agenda Kegiatan */}
                        <section id="activities" className="py-20">
                            <div className="container mx-auto px-4">
                                <div className="mb-12 text-center">
                                    <h2 className="church-text-gradient mb-2 text-4xl font-bold">Agenda Kegiatan</h2>
                                    <p className="text-muted-foreground">Daftar kegiatan dan acara yang akan datang.</p>
                                </div>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {activities && activities.length > 0 ? (
                                        activities.map((activity) => (
                                            <Card
                                                key={activity.id}
                                                className="group overflow-hidden rounded-xl p-0 transition-all duration-300 hover:shadow-xl"
                                            >
                                                <div className="relative">
                                                    {activity.image_url && !imageErrors[activity.id] ? (
                                                        <div className="relative aspect-video bg-muted/50">
                                                            <img
                                                                src={activity.image_url}
                                                                alt={activity.name}
                                                                className="absolute inset-0 h-full w-full rounded-t-xl object-cover transition-transform duration-300"
                                                                onError={() => handleImageError(activity.id)}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="flex aspect-video items-center justify-center rounded-t-xl bg-muted/50">
                                                            <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
                                                        </div>
                                                    )}
                                                    <div className="absolute top-3 right-3 z-10">
                                                        <Badge className="border-0 bg-primary text-white">
                                                            {formatDate(activity.date, 'dd MMM')}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <CardHeader className="pb-3">
                                                    <CardTitle className="line-clamp-2 text-lg">{activity.name}</CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-2 pt-0">
                                                    <div className="flex flex-col items-start justify-between">
                                                        <div>
                                                            <div className="flex items-center text-sm text-muted-foreground">
                                                                <MapPin className="mr-2 h-4 w-4" />
                                                                <span>{activity.location || 'Lokasi belum ditentukan'}</span>
                                                            </div>
                                                            <div className="flex items-center text-sm text-muted-foreground">
                                                                <Clock className="mr-2 h-4 w-4" />
                                                                <span>{formatTime(activity.time_start)} WIT</span>
                                                            </div>
                                                            <p className="mt-2 line-clamp-1 text-sm text-muted-foreground">{activity.description}</p>
                                                        </div>
                                                        <Button variant="link" asChild className="mt-4 h-auto w-fit p-0 pb-5">
                                                            <Link href={`/umat/activities/${activity.id}`}>
                                                                Lihat Detail
                                                                <Eye className="ml-1 h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))
                                    ) : (
                                        <div className="col-span-3 text-center">
                                            <p className="text-muted-foreground">Belum ada agenda kegiatan.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </main>

                    <Footer />
                </div>
            </div>
        </>
    );
}
