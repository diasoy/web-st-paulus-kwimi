import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { ArrowLeft, Calendar, User } from 'lucide-react';
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
}

interface Props {
    announcement: Announcement;
}

export default function AnnouncementShow({ announcement }: Props) {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return {
                relative: formatDistanceToNow(date, {
                    addSuffix: true,
                    locale: id
                }),
                full: format(date, 'EEEE, dd MMMM yyyy HH:mm', {
                    locale: id
                })
            };
        } catch {
            return {
                relative: 'Tanggal tidak valid',
                full: 'Tanggal tidak valid'
            };
        }
    };

    const dateInfo = formatDate(announcement.created_at);

    return (
        <AppLayout>
            <Head title={`${announcement.title} - Pengumuman`} />

            <div className="min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    {/* Header Navigation */}
                    <div className="mb-8">
                        <Link href="/umat/announcements">
                            <Button
                                variant="outline"
                                className="bg-secondary text-white px-4 py-2 rounded-md hover:cursor-pointer hover:bg-secondary/90 transition-colors"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Kembali ke Pengumuman
                            </Button>
                        </Link>
                    </div>

                    {/* Main Content */}
                    <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm border-secondary/20 shadow-lg overflow-hidden">
                        {/* Image Header */}
                        <div className="relative aspect-video bg-gray-100 overflow-hidden">
                            <img
                                src={announcement.image_url}
                                alt={announcement.title}
                                className="absolute inset-0 w-full h-full object-cover"
                                onError={handleImageError}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        </div>


                        {/* Meta Information */}
                        <div className="bg-church-cream/50 px-8 py-6 border-b border-secondary/10">
                            <div className="flex flex-wrap items-center gap-6 text-sm text-church-text/80">
                                <div className="flex items-center">
                                    <User className="h-4 w-4 mr-2" />
                                    <span>Oleh: <strong>{announcement.user?.name || 'Admin'}</strong></span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    <span title={dateInfo.full}>{dateInfo.relative}</span>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <CardContent className="p-8">
                            {/* Description */}
                            <div className="mb-8">
                                <h1 className="text-2xl font-bold mb-4 text-shadow">
                                    {announcement.title}
                                </h1>
                                <div className="prose prose-lg max-w-none">
                                    <p className="text-church-text leading-relaxed text-lg text-justify whitespace-pre-wrap">
                                        {announcement.description}
                                    </p>
                                </div>
                            </div>

                            {/* Detailed Content */}
                            {announcement.content && announcement.content.trim() !== '' && (
                                <div className="border-t border-secondary/10 pt-8">
                                    <h2 className="text-2xl font-semibold text-church-dark mb-4">
                                        Detail Lengkap
                                    </h2>
                                    <div className="prose prose-lg max-w-none">
                                        <div className="text-church-text leading-relaxed whitespace-pre-wrap">
                                            {announcement.content}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>

                        {/* Footer */}
                        <div className="bg-church-cream/30 px-8 py-6 border-t border-secondary/10">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-church-text/70">
                                    Terakhir diperbarui: {format(new Date(announcement.updated_at), 'dd MMMM yyyy HH:mm', { locale: id })}
                                </div>
                                <Link href="/announcements">
                                    <Button className="bg-church-primary hover:bg-church-primary/90 text-white">
                                        Lihat Pengumuman Lainnya
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}