import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
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
  // Map pagination labels to user-friendly text
  const getLabel = (label: string) => {
    switch (label) {
      case 'pagination.previous':
        return 'Sebelumnya';
      case 'pagination.next':
        return 'Berikutnya';
      case '&laquo; Previous':
        return 'Sebelumnya';
      case 'Next &raquo;':
        return 'Berikutnya';
      default:
        // Remove HTML tags for page numbers
        return label.replace(/<[^>]+>/g, '').trim();
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Pengumuman Gereja" />

      <div className="p-6 dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #1a4d20, #235829, #2d5f35)' }}>
        <div className="container mx-auto space-y-6">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-2xl p-8 shadow-2xl overflow-hidden">
            <div className="relative z-10 text-center">
              <div className="relative inline-block mb-3">
                <h1 className="text-4xl font-bold text-white drop-shadow-lg">Pengumuman Gereja</h1>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-lg blur opacity-20"></div>
              </div>
              <p className="text-white/90 text-lg font-medium">
                Informasi terbaru dari Gereja ST. Paulus Kwimi
              </p>
            </div>
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
          </div>

          {/* Pengumuman */}
          <div className="space-y-6">
            {announcements.data.length === 0 ? (
              <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-16 text-center">
                <div className="rounded-full bg-blue-100 p-5 w-fit mx-auto mb-4">
                  <User className="h-10 w-10 text-blue-400" />
                </div>
                <p className="text-gray-500 text-lg font-medium">Belum ada pengumuman yang terdaftar.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {announcements.data.map((announcement) => {
                  const dateInfo = formatDate(announcement.created_at);
                  return (
                    <div key={announcement.id} className="group bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full overflow-hidden">
                      {/* Image */}
                      {announcement.image_url && !imageErrors[announcement.id] ? (
                        <div className="aspect-video bg-gray-100 relative overflow-hidden">
                          <img
                            src={announcement.image_url}
                            alt={announcement.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={() => handleImageError(announcement.id)}
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                          <ImageIcon className="h-12 w-12 text-blue-300" />
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        <span className="text-xs text-slate-400 mb-2" title={dateInfo.full}>
                          {dateInfo.relative}
                        </span>
                        <h3 className="text-base font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-200 line-clamp-2 mb-2">
                          {announcement.title}
                        </h3>
                        <p className="text-sm text-slate-600 mb-4 line-clamp-2 flex-1">
                          {announcement.description}
                        </p>

                        <Link
                          href={`/umat/announcements/${announcement.id}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 w-fit mt-auto"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Baca Selengkapnya
                        </Link>

                        {announcement.content && announcement.content.trim() !== '' && (
                          <div className="border-t border-gray-100 pt-3 mt-3">
                            <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Detail:</h4>
                            <div className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                              {announcement.content}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {announcements.last_page > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
                {announcements.links.map((link, index) => {
                  if (!link.url) {
                    return (
                      <span
                        key={index}
                        className="px-4 py-2 text-sm font-medium text-gray-400 bg-white border border-gray-200 rounded-lg cursor-not-allowed"
                        dangerouslySetInnerHTML={{ __html: getLabel(link.label) }}
                      />
                    );
                  }

                  return (
                    <Link
                      key={index}
                      href={link.url}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${link.active
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300'
                        }`}
                      dangerouslySetInnerHTML={{ __html: getLabel(link.label) }}
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