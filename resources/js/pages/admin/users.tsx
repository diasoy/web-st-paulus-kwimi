import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, Eye, Filter, Search, Trash2, User as UserIcon, Users } from 'lucide-react';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    gender: 'male' | 'female';
    status: 'active' | 'inactive';
    community?: {
        id: number;
        name: string;
    };
    created_at: string;
}

interface UsersManagementProps {
    users: {
        data: User[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        current_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search?: string;
        role?: string;
    };
}

export default function UsersManagement({ users, filters }: UsersManagementProps) {
    const { props } = usePage<{ flash?: { success?: string; error?: string } }>();
    const [search, setSearch] = useState(filters.search || '');
    const [roleFilter, setRoleFilter] = useState(filters.role || 'umat');

    const handleSearch = () => {
        router.get(
            route('admin.users'),
            {
                search: search,
                role: roleFilter,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleReset = () => {
        setSearch('');
        setRoleFilter('umat');
        router.get(route('admin.users'), { role: 'umat' });
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Apakah Anda yakin ingin menghapus pengguna "${name}" secara permanen?`)) {
            router.delete(route('admin.users.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Manajemen Pengguna" />

            <div className="space-y-6 p-6">
                {/* Flash messages */}
                {props.flash?.success && (
                    <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{props.flash.success}</div>
                )}
                {props.flash?.error && (
                    <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{props.flash.error}</div>
                )}

                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Manajemen Pengguna</h1>
                    <p className="text-muted-foreground">Kelola semua pengguna sistem ST. Paulus Kwimi</p>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <div className="relative flex-1">
                                <Search className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Cari nama atau email..."
                                    className="pl-10"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>
                            <select
                                className="rounded-md border border-input bg-background px-3 py-2"
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                            >
                                <option value="umat">Umat</option>
                                <option value="admin">Admin</option>
                            </select>
                            <div className="flex gap-2">
                                <Button onClick={handleSearch} variant="default">
                                    <Filter className="mr-2 h-4 w-4" />
                                    Filter
                                </Button>
                                <Button onClick={handleReset} variant="outline">
                                    Reset
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Users List */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Daftar Pengguna ({users.total})
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        {users.data.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama Pengguna</TableHead>
                                        <TableHead>Komunitas Basis</TableHead>
                                        <TableHead>Gender</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.data.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                                        <span className="text-sm font-medium">{user.name.charAt(0).toUpperCase()}</span>
                                                    </div>
                                                    <span className="font-semibold">{user.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {user.community ? (
                                                    <span className="text-sm">{user.community.name}</span>
                                                ) : (
                                                    <span className="text-sm text-muted-foreground">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex h-8 w-8 items-center justify-center">
                                                    {user.gender === 'male' ? (
                                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                            <UserIcon className="h-4 w-4" />
                                                        </div>
                                                    ) : (
                                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-100 text-pink-600">
                                                            <UserIcon className="h-4 w-4" />
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={user.status === 'active' ? 'default' : 'destructive'}
                                                    className={user.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}
                                                >
                                                    {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={route('admin.users.show', user.id)}>
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={route('admin.users.edit', user.id)}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id, user.name)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="py-12 text-center">
                                <Users className="mx-auto h-12 w-12 text-muted-foreground/50" />
                                <p className="mt-4 text-lg font-medium">Tidak ada pengguna ditemukan</p>
                                <p className="text-muted-foreground">Coba ubah filter pencarian Anda</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {users.data.length > 0 && (
                            <div className="mt-6 flex items-center justify-between border-t pt-6">
                                <div className="text-sm text-muted-foreground">
                                    Menampilkan {users.data.length} dari {users.total} pengguna
                                </div>
                                <div className="flex gap-2">
                                    {users.links.map((link, index) =>
                                        link.url ? (
                                            <Button
                                                key={index}
                                                variant={link.active ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => router.visit(link.url!)}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <Button
                                                key={index}
                                                variant="outline"
                                                size="sm"
                                                disabled
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ),
                                    )}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
