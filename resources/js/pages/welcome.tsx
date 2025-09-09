import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Bell, CalendarDays, Clock, Eye, Image as ImageIcon, MapPin, Users } from 'lucide-react';
import { useState } from 'react';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import SEO from '@/components/seo';
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

      <div className="relative min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white">
        {/* Enhanced Background decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Floating orbs with golden glow */}
          <div className="absolute -top-20 -right-32 h-64 w-64 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gradient-to-tr from-blue-400/15 to-teal-500/15 blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 left-1/4 h-48 w-48 rounded-full bg-gradient-to-r from-green-400/10 to-emerald-500/10 blur-2xl animate-pulse delay-500"></div>
          <div className="absolute bottom-1/4 right-1/3 h-56 w-56 rounded-full bg-gradient-to-l from-amber-400/15 to-yellow-500/15 blur-2xl animate-pulse delay-1500"></div>
          
          {/* Cross pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-8 h-8 border-2 border-white rotate-45"></div>
            <div className="absolute top-20 right-20 w-6 h-6 border-2 border-yellow-400 rotate-45"></div>
            <div className="absolute bottom-32 left-32 w-10 h-10 border-2 border-blue-400 rotate-45"></div>
            <div className="absolute bottom-20 right-40 w-7 h-7 border-2 border-orange-400 rotate-45"></div>
          </div>
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.1)_2px)] bg-[length:60px_60px]"></div>
        </div>

        <div className="relative z-10">
          <Navbar />
          <main>
            {/* Hero Section */}
            <section className="relative flex items-center justify-center text-center min-h-screen overflow-hidden">
              {/* Enhanced Background Image with parallax effect */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed transform scale-110"
                style={{
                  backgroundImage: "url('/images/hero.JPG')",
                }}
              >
                {/* Enhanced gradient overlay with church theme */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-green-900/60 to-black/80"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating elements for spiritual atmosphere */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-60"></div>
                <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-300 opacity-80"></div>
                <div className="absolute bottom-40 left-40 w-3 h-3 bg-orange-400 rounded-full animate-bounce delay-700 opacity-50"></div>
                <div className="absolute bottom-60 right-20 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-1000 opacity-70"></div>
              </div>
              
              {/* Content with enhanced styling */}
              <div className="relative z-10 container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-20">
               
                <h1 className="mb-4 md:mb-6 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight font-bold text-white drop-shadow-2xl">
                  <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent animate-pulse">
                    Selamat Datang
                  </span>
                  <span className="block mt-1 md:mt-2 text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                    di Web Lingkungan
                  </span>
                  <span className="block mt-1 md:mt-2 bg-gradient-to-r from-blue-400 via-teal-400 to-blue-500 bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                    St.Paulus Kwimi 
                  </span>
                </h1>
                <p className="mx-auto max-w-4xl text-center text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-white/95 drop-shadow-lg font-light px-2">
                  Temukan informasi seputar lingkungan st paulus Kwimi
                </p>
                
                
              </div>
            </section>

            {/* Pengumuman Terkini */}
            <section id="announcements" className="py-12 md:py-20 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
              {/* Section background decorations */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-green-800/10 to-transparent"></div>
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-gradient-to-tr from-blue-200/20 to-teal-200/20 rounded-full blur-2xl"></div>
              </div>
              
              <div className="container mx-auto px-4 relative z-10">
                <div className="mb-12 md:mb-16 text-center">
                  <div className="inline-flex items-center gap-2 mb-3 md:mb-4 px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full">
                    <Bell className="h-4 w-4 md:h-5 md:w-5 text-orange-600" />
                    <span className="text-xs md:text-sm font-medium text-orange-800">Informasi Terbaru</span>
                  </div>
                  <h2 className="mb-3 md:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-700 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                    Pengumuman Terkini
                  </h2>
                  <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto mb-3 md:mb-4 rounded-full"></div>
                  <p className="text-gray-600 text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4">Informasi terbaru seputar kegiatan gereja dan jemaat yang perlu Anda ketahui.</p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {announcements && announcements.length > 0 ? (
                    announcements.map((announcement, index) => (
                      <Card
                        key={announcement.id}
                        className="group overflow-hidden rounded-2xl p-0 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm"
                        style={{
                          animationDelay: `${index * 100}ms`
                        }}
                      >
                        <div className="relative">
                          {announcement.image_url && !imageErrors[announcement.id] ? (
                            <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                              <img
                                src={announcement.image_url}
                                alt={announcement.title}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={() => handleImageError(announcement.id)}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                            </div>
                          ) : (
                            <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
                              <div className="text-center">
                                <ImageIcon className="h-16 w-16 text-blue-400 mx-auto mb-2" />
                                <span className="text-sm text-blue-600 font-medium">Gambar Pengumuman</span>
                              </div>
                            </div>
                          )}
                          {/* Floating badge */}
                          <div className="absolute top-4 right-4">
                            <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                              Terbaru
                            </div>
                          </div>
                        </div>
                        <CardHeader className="pb-3">
                          <CardTitle className="line-clamp-2 text-lg md:text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                            {announcement.title}
                          </CardTitle>
                          <div className="flex items-center text-xs md:text-sm text-gray-500">
                            <Bell className="mr-2 h-3 w-3 md:h-4 md:w-4 text-orange-500" />
                            <span className="font-medium">{formatDate(announcement.created_at, 'dd MMMM yyyy')}</span>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0 px-4 md:px-6">
                          <div className="flex h-full min-h-[120px] md:min-h-[140px] flex-col items-start">
                            <p className="line-clamp-3 text-xs md:text-sm text-gray-600 leading-relaxed mb-3 md:mb-4">{announcement.description}</p>
                            <Button variant="outline" asChild className="mt-auto group/btn border-2 border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2">
                              <Link href="/login" className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                                Baca Selengkapnya
                                <Eye className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12 md:py-16">
                      <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Bell className="h-8 w-8 md:h-12 md:w-12 text-gray-400" />
                      </div>
                      <p className="text-gray-500 text-base md:text-lg">Belum ada pengumuman tersedia saat ini.</p>
                      <p className="text-gray-400 text-xs md:text-sm mt-2">Pantau terus untuk informasi terbaru dari gereja.</p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

            {/* Jadwal Ibadah */}
            <section id="schedules" className="py-12 md:py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
              {/* Section background decorations */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-green-200/30 to-teal-200/30 rounded-full blur-2xl"></div>
                <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-tr from-blue-200/40 to-purple-200/40 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-yellow-200/20 to-orange-200/20 rounded-full blur-xl"></div>
              </div>

              <div className="container mx-auto px-4 relative z-10">
                <div className="mb-12 md:mb-16 text-center">
                  <div className="inline-flex items-center gap-2 mb-3 md:mb-4 px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-green-100 to-teal-100 rounded-full">
                    <CalendarDays className="h-4 w-4 md:h-5 md:w-5 text-teal-600" />
                    <span className="text-xs md:text-sm font-medium text-teal-800">Ibadah Mingguan</span>
                  </div>
                  <h2 className="mb-3 md:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-700 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                    Jadwal Ibadah
                  </h2>
                  <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto mb-3 md:mb-4 rounded-full"></div>
                  <p className="text-gray-600 text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4">Bergabunglah dengan komunitas kami dalam ibadah dan kegiatan rohani mingguan.</p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {worshipSchedules && worshipSchedules.length > 0 ? (
                    worshipSchedules.map((schedule, index) => (
                      <Card 
                        key={schedule.id} 
                        className="group overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-2 border-0 bg-white/90 backdrop-blur-sm"
                        style={{
                          animationDelay: `${index * 150}ms`
                        }}
                      >
                        {/* Card header with gradient */}
                        <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6 text-white relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-4 -translate-x-4"></div>
                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-3">
                              <CalendarDays className="h-8 w-8 text-white/90" />
                              <div className="bg-white/20 px-3 py-1 rounded-full">
                                <span className="text-xs font-medium">Jadwal</span>
                              </div>
                            </div>
                            <CardTitle className="text-xl font-bold text-white mb-2">{schedule.name}</CardTitle>
                          </div>
                        </div>

                        <CardContent className="p-6 space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                <CalendarDays className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 font-medium">Tanggal</p>
                                <p className="text-sm font-semibold text-gray-800">{formatDate(schedule.date, 'EEEE, dd MMMM yyyy')}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                                <Clock className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 font-medium">Waktu</p>
                                <p className="text-sm font-semibold text-gray-800">{formatTime(schedule.time_start)} WIT</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                                <Users className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 font-medium">Pemimpin</p>
                                <p className="text-sm font-semibold text-gray-800">{schedule.pic}</p>
                              </div>
                            </div>
                          </div>
                          
                          <Button variant="outline" asChild className="w-full mt-6 border-2 border-green-200 hover:border-green-500 hover:bg-green-50 transition-all duration-300 group/btn">
                            <Link href="/login" className="flex items-center justify-center text-green-600 hover:text-green-700 font-medium">
                              Lihat Detail Ibadah
                              <Eye className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-3 text-center py-16">
                      <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CalendarDays className="h-12 w-12 text-green-500" />
                      </div>
                      <p className="text-gray-500 text-lg">Belum ada jadwal ibadah yang tersedia.</p>
                      <p className="text-gray-400 text-sm mt-2">Silakan cek kembali nanti untuk update jadwal terbaru.</p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

            {/* Agenda Kegiatan */}
            <section id="activities" className="py-12 md:py-20 bg-gradient-to-br from-white via-orange-50 to-yellow-50 relative overflow-hidden">
              {/* Section background decorations */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-20 right-10 w-72 h-72 bg-gradient-to-br from-orange-200/40 to-yellow-200/40 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-32 -left-10 w-80 h-80 bg-gradient-to-tr from-red-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
                <div className="absolute top-1/3 left-1/3 w-40 h-40 bg-gradient-to-r from-yellow-200/30 to-orange-200/30 rounded-full blur-2xl"></div>
              </div>

              <div className="container mx-auto px-4 relative z-10">
                <div className="mb-12 md:mb-16 text-center">
                  <div className="inline-flex items-center gap-2 mb-3 md:mb-4 px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full">
                    <CalendarDays className="h-4 w-4 md:h-5 md:w-5 text-orange-600" />
                    <span className="text-xs md:text-sm font-medium text-orange-800">Kegiatan Mendatang</span>
                  </div>
                  <h2 className="mb-3 md:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
                    Agenda Kegiatan
                  </h2>
                  <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-3 md:mb-4 rounded-full"></div>
                  <p className="text-gray-600 text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4">Ikuti berbagai kegiatan menarik dan bermakna yang telah kami persiapkan untuk jemaat.</p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {activities && activities.length > 0 ? (
                    activities.map((activity, index) => (
                      <Card
                        key={activity.id}
                        className="group overflow-hidden rounded-2xl p-0 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-2 border-0 bg-white/90 backdrop-blur-sm"
                        style={{
                          animationDelay: `${index * 200}ms`
                        }}
                      >
                        <div className="relative overflow-hidden">
                          {activity.image_url && !imageErrors[activity.id] ? (
                            <div className="relative aspect-video bg-gradient-to-br from-orange-100 to-yellow-100 overflow-hidden">
                              <img
                                src={activity.image_url}
                                alt={activity.name}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                onError={() => handleImageError(activity.id)}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                            </div>
                          ) : (
                            <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100">
                              <div className="text-center">
                                <ImageIcon className="h-16 w-16 text-orange-400 mx-auto mb-2" />
                                <span className="text-sm text-orange-600 font-medium">Gambar Kegiatan</span>
                              </div>
                            </div>
                          )}
                          
                          {/* Floating date badge */}
                          <div className="absolute top-4 right-4 z-10">
                            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full shadow-lg">
                              <div className="text-center">
                                <div className="text-xs font-medium opacity-90">
                                  {formatDate(activity.date, 'MMM')}
                                </div>
                                <div className="text-lg font-bold leading-none">
                                  {formatDate(activity.date, 'dd')}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                        </div>

                        <CardHeader className="pb-4">
                          <CardTitle className="line-clamp-2 text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                            {activity.name}
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4 pt-0 pb-6">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                <MapPin className="h-5 w-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <p className="text-xs text-gray-500 font-medium">Lokasi</p>
                                <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                                  {activity.location || 'Lokasi akan diumumkan'}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                                <Clock className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 font-medium">Waktu</p>
                                <p className="text-sm font-semibold text-gray-800">{formatTime(activity.time_start)} WIT</p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl">
                            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                              {activity.description}
                            </p>
                          </div>

                          <Button variant="outline" asChild className="w-full border-2 border-orange-200 hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 group/btn">
                            <Link href="/login" className="flex items-center justify-center text-orange-600 hover:text-orange-700 font-medium">
                              Lihat Detail Kegiatan
                              <Eye className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-3 text-center py-16">
                      <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CalendarDays className="h-12 w-12 text-orange-500" />
                      </div>
                      <p className="text-gray-500 text-lg">Belum ada agenda kegiatan yang dijadwalkan.</p>
                      <p className="text-gray-400 text-sm mt-2">Nantikan kegiatan-kegiatan menarik dari kami segera.</p>
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
