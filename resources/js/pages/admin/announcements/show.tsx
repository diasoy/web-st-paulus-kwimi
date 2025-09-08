import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

interface Announcement {
    id: number;
    title: string;
    description: string;
    image_url?: string | null;
    is_publish: boolean;
    created_at: string;
    updated_at: string;
}

export default function AnnouncementShow({ announcement }: { announcement: Announcement }) {
    const { props } = usePage<{ flash?: { success?: string; error?: string } }>();

    const handleDelete = () => {
        if (!confirm(`Hapus pengumuman:\n\n"${announcement.title}"?`)) return;
        router.delete(route('admin.announcements.destroy', announcement.id), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Pengumuman - ${announcement.title}`} />

            <div className="space-y-6 p-6 min-h-screen">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <nav className="flex items-center text-sm text-white">
                            <Link href={route('admin.announcements.index')} className="hover:text-gray-300 transition-colors">
                                Pengumuman
                            </Link>
                            <span className="mx-2 text-gray-300">/</span>
                            <span className="text-white font-medium">Detail</span>
                        </nav>
                        <h1 className="text-2xl font-bold tracking-tight text-white">Detail Pengumuman</h1>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('admin.announcements.index')}>
                            <Button variant="outline" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali ke Pengumuman
                            </Button>
                        </Link>

                        <Link href={route('admin.announcements.edit', announcement.id)}>
                            <Button variant="outline" className="bg-green-600 text-white hover:bg-green-700">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                        </Link>

                        <Button variant="destructive" onClick={handleDelete}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus
                        </Button>
                    </div>
                </div>

                {props.flash?.success && (
                    <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{props.flash.success}</div>
                )}
                {props.flash?.error && (
                    <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{props.flash.error}</div>
                )}

                <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-white">{announcement.title}</h2>
                        <Badge variant={announcement.is_publish ? 'default' : 'secondary'} className='text-white'>
                            {announcement.is_publish ? 'Dipublish' : 'Draft'}
                        </Badge>
                    </div>
                    <div className="space-y-4">
                        {announcement.image_url && (
                            <img src={`/files/${encodeURIComponent(announcement.image_url)}`} alt={announcement.title} className="w-full max-w-xl rounded-md border" />
                        )}
                        <div>
                            <p className="text-sm leading-6 whitespace-pre-line text-gray-300">{announcement.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
