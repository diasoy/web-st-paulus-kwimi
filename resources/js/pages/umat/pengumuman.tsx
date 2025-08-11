import { Head } from "@inertiajs/react";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

interface Announcement {
  id: number;
  title: string;
  description: string;
  content?: string;
  image_url?: string;
  is_publish: boolean;
  created_at: string;
  updated_at: string;
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
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AppLayout>
      <Head title="Pengumuman" />

      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Pengumuman Gereja</h1>
        </div>

        {/* Daftar Pengumuman */}
        <div className="space-y-6">
          {announcements.data.length === 0 ? (
            <Card>
              <CardContent className="py-8">
                <p className="text-center text-gray-500">Belum ada pengumuman yang dipublish.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {announcements.data.map((announcement) => (
                <Card key={announcement.id} className="hover:shadow-lg transition-all duration-300 overflow-hidden">
                  {/* Gambar di bagian atas card */}
                  {announcement.image_url && announcement.image_url.trim() !== '' && (
                    <div className="relative w-full h-64 overflow-hidden">
                      <img
                        src={announcement.image_url}
                        alt={announcement.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                          console.log('Failed to load image:', announcement.image_url);
                          e.currentTarget.parentElement?.remove();
                        }}
                        onLoad={() => {
                          console.log('Image loaded successfully:', announcement.image_url);
                        }}
                      />
                      {/* Overlay gradient untuk readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  )}

                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl text-blue-800 leading-tight">
                        {announcement.title}
                      </CardTitle>
                      <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                        {formatDate(announcement.created_at)}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="prose max-w-none">
                      <p className="text-gray-700 whitespace-pre-wrap mb-3 text-base leading-relaxed">
                        {announcement.description}
                      </p>
                      {announcement.content && announcement.content.trim() !== '' && (
                        <div className="border-t border-gray-200 pt-4 mt-4">
                          <h4 className="text-sm font-semibold text-gray-800 mb-2">Detail:</h4>
                          <div className="text-gray-600 text-sm whitespace-pre-wrap leading-relaxed">
                            {announcement.content}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {announcements.last_page > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                {announcements.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url || '#'}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${link.active
                        ? 'bg-blue-600 text-white shadow-md'
                        : link.url
                          ? 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 hover:border-blue-300 shadow-sm'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}