import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { ArrowLeft, Calendar, User, Eye, Image as ImageIcon } from 'lucide-react';
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

            <div className="min-h-screen bg-gradient-to-br from-church-cream via-white to-church-light">
                <div className="container mx-auto px-4 py-8">
                    {/* Header Navigation */}
                    <div className="mb-8">
                        <Link href="/announcements">
                            <Button 
                                variant="outline" 
                                className="mb-6 border-church-primary/20 text-church-dark hover:bg-church-primary/10"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Kembali ke Pengumuman
                            </Button>
                        </Link>
                    </div>

                    {/* Main Content */}
                    <Card className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm border-church-primary/20 shadow-lg overflow-hidden">
                        {/* Image Header */}
                        {announcement.image_url && !imageError ? (
                            <div className="relative w-full h-96 overflow-hidden">
                                <img
                                    src={announcement.image_url}
                                    alt={announcement.title}
                                    className="w-full h-full object-cover"
                                    onError={handleImageError}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                                
                                {/* Title Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                    <Badge className="mb-4 bg-church-primary/90 text-white hover:bg-church-primary">
                                        Dipublish
                                    </Badge>
                                    <h1 className="text-4xl font-bold mb-2 text-shadow">
                                        {announcement.title}
                                    </h1>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gradient-to-br from-church-primary/10 to-church-secondary/10 p-8">
                                <div className="flex items-center justify-center h-32 mb-6">
                                    <ImageIcon className="h-16 w-16 text-church-primary/50" />
                                </div>
                                <Badge className="mb-4 bg-church-primary/10 text-church-primary hover:bg-church-primary/20">
                                    Dipublish
                                </Badge>
                                <h1 className="text-4xl font-bold text-church-dark">
                                    {announcement.title}
                                </h1>
                            </div>
                        )}

                        {/* Meta Information */}
                        <div className="bg-church-cream/50 px-8 py-6 border-b border-church-primary/10">
                            <div className="flex flex-wrap items-center gap-6 text-sm text-church-text/80">
                                <div className="flex items-center">
                                    <User className="h-4 w-4 mr-2" />
                                    <span>Oleh: <strong>{announcement.user?.name || 'Admin'}</strong></span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    <span title={dateInfo.full}>{dateInfo.relative}</span>
                                </div>
                                <div className="flex items-center">
                                    <Eye className="h-4 w-4 mr-2" />
                                    <span>{dateInfo.full}</span>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <CardContent className="p-8">
                            {/* Description */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-semibold text-church-dark mb-4">
                                    Ringkasan
                                </h2>
                                <div className="prose prose-lg max-w-none">
                                    <p className="text-church-text leading-relaxed text-lg">
                                        {announcement.description}
                                    </p>
                                </div>
                            </div>

                            {/* Detailed Content */}
                            {announcement.content && announcement.content.trim() !== '' && (
                                <div className="border-t border-church-primary/10 pt-8">
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
                        <div className="bg-church-cream/30 px-8 py-6 border-t border-church-primary/10">
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