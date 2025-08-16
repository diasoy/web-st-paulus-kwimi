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
            <section className="flex justify-center items-center bg-gradient-to-r from-primary/10 to-secondary/10 text-center">
              <div className="container flex flex-col justify-start items-center mx-auto px-4 min-h-screen mt-10 md:mt-20">
                <img
                  src="/images/logo.png"
                  alt="Logo Gereja St. Paulus Kwimi"
                  className="w-2/3 max-w-[180px] md:max-w-[220px] lg:max-w-[260px] xl:max-w-[300px] h-auto mx-auto mb-6"
                />
                <h1 className="text-5xl font-bold church-text-gradient mb-4 leading-tight text-center">
                  Selamat Datang di Gereja <br />
                  St. Paulus Kwimi
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed text-center">
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
                  {announcements && announcements.length > 0 ? (
                    announcements.map((announcement) => (
                      <Card key={announcement.id} className="group hover:shadow-xl transition-all duration-300 borderoverflow-hidden rounded-xl p-0">
                        {announcement.image_url && !imageErrors[announcement.id] ? (
                          <div className="aspect-video bg-muted/50 relative">
                            <img
                              src={announcement.image_url}
                              alt={announcement.title}
                              className="absolute inset-0 w-full h-full object-cover rounded-t-xl transition-transform duration-300"
                              onError={() => handleImageError(announcement.id)}
                            />
                          </div>
                        ) : (
                          <div className="aspect-video bg-muted/50 flex items-center justify-center rounded-t-xl">
                            <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
                          </div>
                        )}
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg line-clamp-2">
                            {announcement.title}
                          </CardTitle>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Bell className="h-3 w-3 mr-1" />
                            <span>{formatDate(announcement.created_at, 'dd MMMM yyyy')}</span>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex flex-col items-start h-full min-h-[120px]">
                            <p className="text-sm text-muted-foreground line-clamp-3">
                              {announcement.description}
                            </p>
                            <Button variant="link" asChild className="p-0 h-auto mt-auto w-fit pb-5">
                              <Link href={`/umat/announcements/${announcement.id}`}>
                                Baca Selengkapnya
                                <Eye className="h-4 w-4 ml-1" />
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
            <section id="schedules" className="py-20 bg-muted/50">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold church-text-gradient mb-2">Jadwal Ibadah</h2>
                  <p className="text-muted-foreground">Jadwal ibadah dan kegiatan rohani mingguan.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {worshipSchedules && worshipSchedules.length > 0 ? (
                    worshipSchedules.map((schedule) => (
                      <Card key={schedule.id} className="hover:shadow-xl transition-all duration-300">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">
                            {schedule.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-2">
                          <div className="flex items-center text-muted-foreground text-sm">
                            <CalendarDays className="h-4 w-4 mr-2" />
                            <span>{formatDate(schedule.date, 'EEEE, dd MMMM yyyy')}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground text-sm">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{formatTime(schedule.time_start)} WIT</span>
                          </div>
                          <div className="flex items-center text-muted-foreground text-sm">
                            <Users className="h-4 w-4 mr-2" />
                            <span>{schedule.pic}</span>
                          </div>
                          <Button variant="link" asChild className="p-0 h-auto mt-2">
                            <Link href={`/umat/worship-schedules/${schedule.id}`}>
                              Lihat Detail
                              <Eye className="h-4 w-4 ml-1" />
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
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold church-text-gradient mb-2">Agenda Kegiatan</h2>
                  <p className="text-muted-foreground">Daftar kegiatan dan acara yang akan datang.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activities && activities.length > 0 ? (
                    activities.map((activity) => (
                      <Card key={activity.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden rounded-xl p-0">
                        <div className="relative">
                          {activity.image_url && !imageErrors[activity.id] ? (
                            <div className="aspect-video bg-muted/50 relative">
                              <img
                                src={activity.image_url}
                                alt={activity.name}
                                className="absolute inset-0 w-full h-full object-cover rounded-t-xl transition-transform duration-300"
                                onError={() => handleImageError(activity.id)}
                              />
                            </div>
                          ) : (
                            <div className="aspect-video bg-muted/50 flex items-center justify-center rounded-t-xl">
                              <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
                            </div>
                          )}
                          <div className="absolute top-3 right-3 z-10">
                            <Badge className="bg-primary text-white border-0">
                              {formatDate(activity.date, 'dd MMM')}
                            </Badge>
                          </div>
                        </div>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg line-clamp-2">
                            {activity.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-2">
                          <div className="flex flex-col justify-between items-start">
                            <div>
                              <div className="flex items-center text-muted-foreground text-sm">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span>{activity.location || 'Lokasi belum ditentukan'}</span>
                              </div>
                              <div className="flex items-center text-muted-foreground text-sm">
                                <Clock className="h-4 w-4 mr-2" />
                                <span>{formatTime(activity.time_start)} WIT</span>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-1 mt-2">
                                {activity.description}
                              </p>
                            </div>
                            <Button variant="link" asChild className="p-0 h-auto w-fit mt-4 pb-5">
                              <Link href={`/umat/activities/${activity.id}`}>
                                Lihat Detail
                                <Eye className="h-4 w-4 ml-1" />
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