import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, User } from 'lucide-react';

interface AdminDashboardProps {
    stats: {
        total_users: number;
        total_admin: number;
        total_umat: number;
        recent_users: Array<{
            id: number;
            name: string;
            email: string;
            role: string;
            created_at: string;
        }>;
    };
}

export default function AdminDashboard({ stats }: AdminDashboardProps) {
    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />
            
            <div className="space-y-6 mx-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                    <p className="text-muted-foreground">
                        Selamat datang di panel admin ST. Paulus Kwimi
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total User</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_users}</div>
                            <p className="text-xs text-muted-foreground">
                                Semua pengguna terdaftar
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Admin</CardTitle>
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_admin}</div>
                            <p className="text-xs text-muted-foreground">
                                Administrator sistem
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Umat</CardTitle>
                            <User className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_umat}</div>
                            <p className="text-xs text-muted-foreground">
                                Jemaat ST. Paulus Kwimi
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Users */}
                <Card>
                    <CardHeader>
                        <CardTitle>Pengguna Terbaru</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {stats.recent_users.map((user) => (
                                <div key={user.id} className="flex items-center space-x-4">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">
                                            {user.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground truncate">
                                            {user.email}
                                        </p>
                                    </div>
                                    <div className="text-sm">
                                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                            user.role === 'admin' 
                                                ? 'bg-blue-100 text-blue-800' 
                                                : 'bg-green-100 text-green-800'
                                        }`}>
                                            {user.role === 'admin' ? 'Admin' : 'Umat'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
