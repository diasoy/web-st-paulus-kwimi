import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    Activity,
    Bell,
    BookOpen,
    Calendar,
    CalendarDays,
    Folder,
    LayoutGrid,
    MessageSquare,
    Settings,
    UserCheck,
    Users,
    UsersIcon,
} from 'lucide-react';
import AppLogo from './app-logo';

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    // Menu items berdasarkan role
    const getMainNavItems = (): NavItem[] => {
        if (user.role === 'admin') {
            return [
                {
                    title: 'Dashboard Admin',
                    href: '/admin/dashboard',
                    icon: LayoutGrid,
                },
                {
                    title: 'Kelola Pengguna',
                    href: '/admin/users',
                    icon: Users,
                },
                {
                    title: 'Kelola Pengumuman',
                    href: '/admin/announcements',
                    icon: MessageSquare,
                },
                {
                    title: 'Jadwal Ibadah',
                    href: '/admin/worship-schedules',
                    icon: CalendarDays,
                },
                {
                    title: 'Agenda Kegiatan',
                    href: '/admin/activities',
                    icon: Activity,
                },
                {
                    title: 'Kelola Komunitas Basis',
                    href: '/admin/communities',
                    icon: UsersIcon,
                },
                {
                    title: 'Pengaturan',
                    href: '/settings/profile',
                    icon: Settings,
                },
            ];
        }

        // Menu untuk umat
        return [
            {
                title: 'Dashboard',
                href: '/umat/dashboard',
                icon: LayoutGrid,
            },
            {
                title: 'Profil Saya',
                href: '/umat/profile',
                icon: UserCheck,
            },
            {
                title: 'Pengumuman',
                href: '/umat/announcements',
                icon: Bell,
            },
            {
                title: 'Jadwal Ibadah',
                href: '/umat/schedule',
                icon: Calendar,
            },
            {
                title: 'Pengaturan',
                href: '/settings/profile',
                icon: Settings,
            },
        ];
    };

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={getMainNavItems()} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
