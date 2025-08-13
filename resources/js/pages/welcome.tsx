import { Head, Link, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import {
    Bell,
    CalendarDays,
    Clock,
    Eye,
    Image as ImageIcon,
    MapPin,
    Users,
} from 'lucide-react';
import React, { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

// ==============================
// Mock Data for demonstration
// Nanti ini diganti dengan data dari backend melalui Inertia props
// ==============================
const mockAnnouncements = [
    {
        id: 1,
        title: 'Pengumuman Misa Natal Bersama 2024',
        description:
            'Jemaat diundang untuk merayakan Misa Natal bersama di gereja pada tanggal 25 Desember 2024 pukul 09.00 WITA. Mari kita rayakan kelahiran Kristus dengan penuh sukacita dan kebersamaan.',
        image_url: 'https://images.unsplash.com/photo-1543329244-a0352cf662e6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        created_at: new Date(2024, 11, 20).toISOString(),
    },
    {
        id: 2,
        title: 'Kebaktian Kenaikan Isa Almasih',
        description:
            'Kami mengundang seluruh jemaat untuk menghadiri kebaktian khusus memperingati Kenaikan Isa Almasih pada hari Kamis, 9 Mei 2024, pukul 17.00 WITA. Mari bersama-sama merenungkan keagungan-Nya.',
        image_url: 'https://images.unsplash.com/photo-1616785800473-b328a6f3a38b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        created_at: new Date(2024, 4, 1).toISOString(),
    },
    {
        id: 3,
        title: 'Jadwal Paskah 2024 dan Perjamuan Kudus',
        description:
            'Informasi penting mengenai rangkaian ibadah Paskah 2024, termasuk jadwal Perjamuan Kudus. Mohon perhatian seluruh jemaat agar dapat mengikuti semua rangkaian ibadah dengan khidmat.',
        image_url: 'https://images.unsplash.com/photo-1552596825-f7614d6935ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        created_at: new Date(2024, 2, 25).toISOString(),
    },
];

const mockSchedules = [
    {
        id: 1,
        name: 'Ibadah Minggu Pagi',
        date: new Date(2025, 8, 17).toISOString(),
        time_start: '08:00:00',
        pic: 'Pastor Budi',
    },
    {
        id: 2,
        name: 'Ibadah Sekolah Minggu',
        date: new Date(2025, 8, 17).toISOString(),
        time_start: '10:00:00',
        pic: 'Kak Maria',
    },
    {
        id: 3,
        name: 'Doa Bersama Kombas',
        date: new Date(2025, 8, 19).toISOString(),
        time_start: '19:00:00',
        pic: 'Ibu Santi',
    },
];

const mockActivities = [
    {
        id: 1,
        name: 'Retret Pemuda Gereja',
        description: 'Retret tahunan untuk memperdalam iman dan kebersamaan di antara para pemuda gereja.',
        date: new Date(2025, 9, 5).toISOString(),
        time_start: '09:00:00',
        location: 'Villa Bukit Damai, Sentani',
        image_url: 'https://images.unsplash.com/photo-1502422079085-f55e5a746a51?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 2,
        name: 'Bakti Sosial Paroki',
        description: 'Kegiatan sosial berbagi kasih dengan masyarakat di sekitar gereja yang membutuhkan.',
        date: new Date(2025, 9, 12).toISOString(),
        time_start: '13:00:00',
        location: 'Balai Warga RW 05',
        image_url: 'https://images.unsplash.com/photo-1549414603-455b57d4a520?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 3,
        name: 'Workshop Koor Gereja',
        description: 'Latihan intensif untuk paduan suara dalam mempersiapkan penampilan di acara-acara gereja.',
        date: new Date(2025, 9, 20).toISOString(),
        time_start: '16:00:00',
        location: 'Ruang Serbaguna Gereja',
        image_url: 'https://images.unsplash.com/photo-1520140683050-0e1075306d8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
];

export default function Welcome() {
    const { auth } = usePage().props;
    const [imageErrors, setImageErrors] = useState({});

    const handleImageError = (id) => {
        setImageErrors((prev) => ({ ...prev, [id]: true }));
    };

    return (
        <>
            <Head title="Selamat Datang" />

            <div className="min-h-screen bg-background relative text-foreground">
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10">
                    <Navbar />
                    <main>
                        {/* Hero Section */}
                        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-24 text-center">
                            <div className="container mx-auto px-4">
                                <h1 className="text-5xl font-bold church-text-gradient mb-4 leading-tight">
                                    Selamat Datang di Gereja <br />
                                    St. Paulus Kwimi
                                </h1>
                                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                    Temukan kedamaian, komunitas, dan pertumbuhan rohani bersama kami.
                                </p>
                            </div>
                        </section>

                        {/* Pengumuman Terkini */}
                        <section id="announcements" className="py-20">
                            <div className="container mx-auto px-4">
                                <div className="text-center mb-12">
                                    <h2 className="text-4xl font-bold church-text-gradient mb-2">Pengumuman Terkini</h2>
                                    <p className="text-muted-foreground">Informasi terbaru seputar kegiatan gereja dan jemaat.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {mockAnnouncements.map((announcement) => (
                                        <Card key={announcement.id} className="group hover:shadow-xl transition-all duration-300">
                                            <div className="relative">
                                                {announcement.image_url && !imageErrors[announcement.id] ? (
                                                    <div className="aspect-video bg-muted/50 relative overflow-hidden rounded-t-xl">
                                                        <img
                                                            src={announcement.image_url}
                                                            alt={announcement.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                            onError={() => handleImageError(announcement.id)}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="aspect-video bg-muted/50 flex items-center justify-center rounded-t-xl">
                                                        <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
                                                    </div>
                                                )}
                                            </div>
                                            <CardHeader className="pb-3">
                                                <CardTitle className="text-lg line-clamp-2">
                                                    {announcement.title}
                                                </CardTitle>
                                                <div className="flex items-center text-xs text-muted-foreground">
                                                    <Bell className="h-3 w-3 mr-1" />
                                                    <span>{format(new Date(announcement.created_at), 'dd MMMM yyyy', { locale: id })}</span>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="pt-0">
                                                <p className="text-sm text-muted-foreground line-clamp-3">
                                                    {announcement.description}
                                                </p>
                                                <Button variant="link" asChild className="p-0 h-auto mt-2">
                                                    <Link href={`/announcements/${announcement.id}`}>
                                                        Baca Selengkapnya
                                                        <Eye className="h-4 w-4 ml-1" />
                                                    </Link>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </section>
                        <hr />

                        {/* Jadwal Ibadah */}
                        <section id="schedules" className="py-20 bg-muted/50">
                            <div className="container mx-auto px-4">
                                <div className="text-center mb-12">
                                    <h2 className="text-4xl font-bold church-text-gradient mb-2">Jadwal Ibadah</h2>
                                    <p className="text-muted-foreground">Jadwal ibadah dan kegiatan rohani mingguan.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {mockSchedules.map((schedule) => (
                                        <Card key={schedule.id} className="hover:shadow-xl transition-all duration-300">
                                            <CardHeader className="pb-3">
                                                <CardTitle className="text-lg">
                                                    {schedule.name}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="pt-0 space-y-2">
                                                <div className="flex items-center text-muted-foreground text-sm">
                                                    <CalendarDays className="h-4 w-4 mr-2" />
                                                    <span>{format(new Date(schedule.date), 'EEEE, dd MMMM yyyy', { locale: id })}</span>
                                                </div>
                                                <div className="flex items-center text-muted-foreground text-sm">
                                                    <Clock className="h-4 w-4 mr-2" />
                                                    <span>{schedule.time_start.substring(0, 5)} WITA</span>
                                                </div>
                                                <div className="flex items-center text-muted-foreground text-sm">
                                                    <Users className="h-4 w-4 mr-2" />
                                                    <span>{schedule.pic}</span>
                                                </div>
                                                <Button variant="link" asChild className="p-0 h-auto mt-2">
                                                    <Link href={`/worship-schedules/${schedule.id}`}>
                                                        Lihat Detail
                                                        <Eye className="h-4 w-4 ml-1" />
                                                    </Link>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </section>
                        <hr />

                        {/* Agenda Kegiatan */}
                        <section id="activities" className="py-20">
                            <div className="container mx-auto px-4">
                                <div className="text-center mb-12">
                                    <h2 className="text-4xl font-bold church-text-gradient mb-2">Agenda Kegiatan</h2>
                                    <p className="text-muted-foreground">Daftar kegiatan dan acara yang akan datang.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {mockActivities.map((activity) => (
                                        <Card key={activity.id} className="group hover:shadow-xl transition-all duration-300">
                                            <div className="relative">
                                                {activity.image_url && !imageErrors[activity.id] ? (
                                                    <div className="aspect-video bg-muted/50 relative overflow-hidden rounded-t-xl">
                                                        <img
                                                            src={activity.image_url}
                                                            alt={activity.name}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                            onError={() => handleImageError(activity.id)}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="aspect-video bg-muted/50 flex items-center justify-center rounded-t-xl">
                                                        <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
                                                    </div>
                                                )}
                                                <div className="absolute top-3 right-3">
                                                    <Badge className="bg-primary text-primary-foreground border-0">
                                                        {format(new Date(activity.date), 'dd MMM', { locale: id })}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <CardHeader className="pb-3">
                                                <CardTitle className="text-lg line-clamp-2">
                                                    {activity.name}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="pt-0 space-y-2">
                                                <div className="flex items-center text-muted-foreground text-sm">
                                                    <MapPin className="h-4 w-4 mr-2" />
                                                    <span>{activity.location}</span>
                                                </div>
                                                <div className="flex items-center text-muted-foreground text-sm">
                                                    <Clock className="h-4 w-4 mr-2" />
                                                    <span>{activity.time_start.substring(0, 5)} WITA</span>
                                                </div>
                                                <p className="text-sm text-muted-foreground line-clamp-3 mt-4">
                                                    {activity.description}
                                                </p>
                                                <Button variant="link" asChild className="p-0 h-auto mt-2">
                                                    <Link href={`/activities/${activity.id}`}>
                                                        Lihat Detail
                                                        <Eye className="h-4 w-4 ml-1" />
                                                    </Link>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
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