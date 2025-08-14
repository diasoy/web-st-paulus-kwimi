import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Eye, User, Image as ImageIcon } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { id } from 'date-fns/locale';
import { BreadcrumbItem } from '@/types';

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

export default function Announcements({ announcements }: Props) {
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

  const breadcrumbs: BreadcrumbItem[] = [
      {
          title: 'Pengumuman Gereja',
          href: '/umat/announcements',
      },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Pengumuman Gereja" />

      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Pengumuman Gereja</h1>
        </div>

        {/* Pengumuman */}
        <div className="space-y-6">
          {announcements.data.length === 0 ? (
            <Card>
              <CardContent className="py-8">
                <p className="text-center text-gray-500">Belum ada pengumuman yang terdaftar.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {announcements.data.map((announcement) => {
                const dateInfo = formatDate(announcement.created_at);
                return (
                  <Card key={announcement.id} className="group hover:shadow-lg transition-all duration-300 border-secondary/20 bg-white/80 backdrop-blur-sm overflow-hidden rounded-xl p-0 flex flex-col h-full">
                    {announcement.image_url && !imageErrors[announcement.id] ? (
                      <div className="aspect-video bg-gray-100 relative overflow-hidden">
                        <img
                          src={announcement.image_url}
                          alt={announcement.title}
                          className="absolute inset-0 w-full h-full object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
                          onError={() => handleImageError(announcement.id)}
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gray-100 flex items-center justify-center rounded-t-xl">
                        <ImageIcon className="h-12 w-12 text-church-primary/50" />
                      </div>
                    )}
                    <div className="absolute inset-0 pointer-events-none rounded-t-xl" />

                    <CardHeader>
                      <div className="flex flex-col-reverse mb-2">
                        <span
                          className="text-xs text-church-text/60 mt-2"
                          title={dateInfo.full}
                        >
                          {dateInfo.relative}
                        </span>
                        <CardTitle className="text-xl text-church-dark group-hover:text-church-primary transition-colors duration-300 line-clamp-2">
                          {announcement.title}
                        </CardTitle>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0 flex-1 flex flex-col">
                      <p className="text-church-text/80 text-sm mb-4 line-clamp-2">
                        {announcement.description}
                      </p>

                      <div className="flex items-center justify-between mt-auto pb-5">
                        <Link
                          href={`/umat/announcements/${announcement.id}`}
                          className="inline-flex items-center px-3 py-1 text-xs bg-secondary text-white rounded-full hover:bg-secondary/90 hover:cursor-pointer transition-colors duration-300"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Baca Selengkapnya
                        </Link>
                      </div>

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
                    className={`px-3 py-2 rounded-md border transition-colors duration-300 ${link.active
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
    </AppLayout>
  );
}