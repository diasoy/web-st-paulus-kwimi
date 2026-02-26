import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
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

            <div className="p-6 dashboard-gradient min-h-screen" style={{ background: 'linear-gradient(135deg, #1a4d20, #235829, #2d5f35)' }}>
                <div className="container mx-auto">
                    {/* Header Navigation */}
                    <div className="mb-6">
                        <Link href="/umat/announcements">
                            <Button
                                variant="outline"
                                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Kembali ke Pengumuman
                            </Button>
                        </Link>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
                        {/* Accent bar */}
                        <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600" />

                        {/* Image Header */}
                        {announcement.image_url && !imageError && (
                            <div className="relative aspect-video bg-gray-100 overflow-hidden">
                                <img
                                    src={announcement.image_url}
                                    alt={announcement.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    onError={handleImageError}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                            </div>
                        )}

                        {/* Meta Information */}
                        <div className="bg-blue-50 px-8 py-5 border-b border-blue-100">
                            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
                                <div className="flex items-center gap-2">
                                    <div className="rounded-full bg-blue-100 p-1.5">
                                        <User className="h-3.5 w-3.5 text-blue-600" />
                                    </div>
                                    <span>Oleh: <strong className="text-slate-800">{announcement.user?.name || 'Admin'}</strong></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="rounded-full bg-indigo-100 p-1.5">
                                        <Calendar className="h-3.5 w-3.5 text-indigo-600" />
                                    </div>
                                    <span title={dateInfo.full} className="text-slate-600">{dateInfo.relative}</span>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            {/* Title + Description */}
                            <div className="mb-8">
                                <h1 className="text-2xl font-bold mb-4 text-slate-800">
                                    {announcement.title}
                                </h1>
                                <div className="prose prose-lg max-w-none">
                                    <p className="text-slate-700 leading-relaxed text-lg text-justify whitespace-pre-wrap">
                                        {announcement.description}
                                    </p>
                                </div>
                            </div>

                            {/* Detailed Content */}
                            {announcement.content && announcement.content.trim() !== '' && (
                                <div className="border-t border-gray-100 pt-8">
                                    <h2 className="text-xl font-semibold text-slate-800 mb-4">
                                        Detail Lengkap
                                    </h2>
                                    <div className="prose prose-lg max-w-none">
                                        <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                                            {announcement.content}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 px-8 py-5 border-t border-gray-100">
                            <div className="text-sm text-slate-500">
                                Terakhir diperbarui: {format(new Date(announcement.updated_at), 'dd MMMM yyyy HH:mm', { locale: id })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}