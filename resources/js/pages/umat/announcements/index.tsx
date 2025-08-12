import React, { useState } from 'react';
import { Head, Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { Eye, User, Image as ImageIcon } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { id } from 'date-fns/locale';

interface User {
    id: number;
    name: string;
}

interface Announcement {
  id: number;
  title: string;
  description: string;
  content?: string;
  image_url?: string;
  is_publish: boolean;
  created_at: string;
  updated_at: string;
  user?: User;
  excerpt?: string;
}

interface PaginatedAnnouncements {
  data: Announcement[];
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
  announcements: PaginatedAnnouncements;
}

export default function Pengumuman({ announcements }: Props) {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (announcementId: number) => {
    setImageErrors(prev => ({
      ...prev,
      [announcementId]: true
    }));
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return {
        relative: formatDistanceToNow(date, { 
          addSuffix: true, 
          locale: id 
        }),
        full: format(date, 'dd MMMM yyyy HH:mm', { 
          locale: id 
        }),
        simple: date.toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };
    } catch {
      return {
        relative: 'Tanggal tidak valid',
        full: 'Tanggal tidak valid',
        simple: 'Tanggal tidak valid'
      };
    }
  };

  return (
    <AppLayout>
      <Head title="Pengumuman Gereja" />

      <div className="min-h-screen bg-gradient-to-br from-church-cream via-white to-church-light">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="bg-church-primary/10 p-3 rounded-full mr-4">
                <svg className="h-8 w-8 text-church-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-church-dark">
                  Pengumuman Gereja
                </h1>
                <p className="text-lg text-church-text/80">
                  Informasi terbaru dari Gereja St. Paulus Kwimi
                </p>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-church-primary/10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-church-dark">{announcements.total}</p>
                  <p className="text-church-text/70 text-sm">Total Pengumuman</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-church-dark">{announcements.current_page}</p>
                  <p className="text-church-text/70 text-sm">Halaman Saat Ini</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-church-dark">{announcements.last_page}</p>
                  <p className="text-church-text/70 text-sm">Total Halaman</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-church-dark">{announcements.per_page}</p>
                  <p className="text-church-text/70 text-sm">Per Halaman</p>
                </div>
              </div>
            </div>
          </div>

        {/* Daftar Pengumuman */}
        <div className="space-y-6">
          {announcements.data.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-church-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="h-12 w-12 text-church-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3v-.5a2 2 0 00-2-2H9a2 2 0 00-2 2v.5M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-church-dark mb-2">
                Belum Ada Pengumuman
              </h3>
              <p className="text-church-text/70 max-w-md mx-auto">
                Pengumuman dari gereja akan ditampilkan di sini ketika sudah tersedia.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {announcements.data.map((announcement) => {
                const dateInfo = formatDate(announcement.created_at);
                
                return (
                  <Card key={announcement.id} className="group hover:shadow-lg transition-all duration-300 border-church-primary/20 bg-white/80 backdrop-blur-sm overflow-hidden">
                    <div className="relative">
                      {announcement.image_url && !imageErrors[announcement.id] ? (
                        <div className="aspect-video bg-gray-100 relative overflow-hidden">
                          <img
                            src={announcement.image_url}
                            alt={announcement.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={() => handleImageError(announcement.id)}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                      ) : (
                        <div className="aspect-video bg-gradient-to-br from-church-primary/10 to-church-secondary/10 flex items-center justify-center">
                          <ImageIcon className="h-12 w-12 text-church-primary/50" />
                        </div>
                      )}
                    </div>

                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="bg-church-primary/10 text-church-primary hover:bg-church-primary/20">
                          Dipublish
                        </Badge>
                        <span 
                          className="text-xs text-church-text/60"
                          title={dateInfo.full}
                        >
                          {dateInfo.relative}
                        </span>
                      </div>
                      
                      <CardTitle className="text-xl text-church-dark group-hover:text-church-primary transition-colors duration-300 line-clamp-2">
                        {announcement.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-church-text/80 text-sm mb-4 line-clamp-4">
                        {announcement.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-church-text/60">
                          <User className="h-3 w-3 mr-1" />
                          <span>{announcement.user?.name || 'Admin'}</span>
                        </div>
                        
                        <Link
                          href={`/announcements/${announcement.id}`}
                          className="inline-flex items-center px-3 py-1 text-xs bg-church-primary text-white rounded-full hover:bg-church-primary/90 transition-colors duration-300"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Baca Selengkapnya
                        </Link>
                      </div>

                      {/* Detail content jika ada */}
                      {announcement.content && announcement.content.trim() !== '' && (
                        <div className="border-t border-church-primary/10 pt-4 mt-4">
                          <h4 className="text-sm font-semibold text-church-dark mb-2">Detail:</h4>
                          <div className="text-church-text/80 text-sm whitespace-pre-wrap leading-relaxed line-clamp-3">
                            {announcement.content}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {announcements.last_page > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              {announcements.links.map((link, index) => {
                if (!link.url) {
                  return (
                    <span
                      key={index}
                      className="px-3 py-2 text-church-text/50 bg-white/50 rounded-md border border-church-primary/10"
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                  );
                }

                return (
                  <Link
                    key={index}
                    href={link.url}
                    className={`px-3 py-2 rounded-md border transition-colors duration-300 ${
                      link.active
                        ? 'bg-church-primary text-white border-church-primary'
                        : 'bg-white/70 text-church-dark border-church-primary/20 hover:bg-church-primary/10'
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                );
              })}
            </div>
          )}
        </div>
        </div>
      </div>
    </AppLayout>
  );
}