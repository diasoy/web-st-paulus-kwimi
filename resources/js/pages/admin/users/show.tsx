import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Edit, Mail, MapPin, Phone, User, Users } from 'lucide-react';

interface UserShow {
    id: number;
    name: string;
    username: string;
    email: string;
    phone_number?: string;
    address?: string;
    birth_date?: string;
    gender: 'male' | 'female';
    role: string;
    status: 'active' | 'inactive';
    community?: {
        id: number;
        name: string;
    };
    created_at: string;
    updated_at: string;
}

interface UserShowProps {
    user: UserShow;
}

export default function UserShow({ user }: UserShowProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Detail Pengguna - ${user.name}`} />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <nav className="flex items-center text-sm text-muted-foreground">
                            <Link href={route('admin.users')} className="hover:text-foreground">
                                Pengguna
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-foreground">Detail</span>
                        </nav>
                        <h1 className="text-2xl font-bold tracking-tight">Detail Pengguna</h1>
                    </div>
                    <Link href={`/admin/users/${user.id}/edit`}>
                        <Button>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Pengguna
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi Pengguna</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                        <span className="text-2xl font-bold">{user.name.charAt(0).toUpperCase()}</span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">{user.name}</h2>
                                        <p className="text-muted-foreground">@{user.username}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Email</p>
                                            <p className="font-medium">{user.email}</p>
                                        </div>
                                    </div>

                                    {user.phone_number && (
                                        <div className="flex items-center gap-3">
                                            <Phone className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Telepon</p>
                                                <p className="font-medium">{user.phone_number}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-3">
                                        <User className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Gender</p>
                                            <p className="font-medium">{user.gender === 'male' ? 'Laki-laki' : 'Perempuan'}</p>
                                        </div>
                                    </div>

                                    {user.birth_date && (
                                        <div className="flex items-center gap-3">
                                            <Calendar className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Tanggal Lahir</p>
                                                <p className="font-medium">{formatDate(user.birth_date)}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-3">
                                        <Users className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Komunitas Basis</p>
                                            <p className="font-medium">{user.community?.name || '-'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="flex h-5 w-5 items-center justify-center">
                                            <div className={`h-3 w-3 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Status</p>
                                            <Badge
                                                variant={user.status === 'active' ? 'default' : 'destructive'}
                                                className={user.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}
                                            >
                                                {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                {user.address && (
                                    <div className="flex items-start gap-3">
                                        <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Alamat</p>
                                            <p className="font-medium">{user.address}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="border-t pt-4">
                                    <div className="grid grid-cols-1 gap-4 text-sm text-muted-foreground md:grid-cols-2">
                                        <div>
                                            <span className="font-medium">Terdaftar:</span> {formatDate(user.created_at)}
                                        </div>
                                        <div>
                                            <span className="font-medium">Terakhir diupdate:</span> {formatDate(user.updated_at)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
