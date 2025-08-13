import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <Link href={route('admin.announcements.index')}>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Button>
                    </Link>
                    <div className="flex gap-2">
                        <Link href={route('admin.announcements.edit', announcement.id)}>
                            <Button variant="outline">
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

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>{announcement.title}</span>
                            <Badge variant={announcement.is_publish ? 'default' : 'secondary'}>
                                {announcement.is_publish ? 'Published' : 'Draft'}
                            </Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {announcement.image_url && (
                            <img src={`/storage/${announcement.image_url}`} alt={announcement.title} className="w-full max-w-xl rounded-md border" />
                        )}
                        <div>
                            <p className="text-sm leading-6 whitespace-pre-line text-muted-foreground">{announcement.description}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
