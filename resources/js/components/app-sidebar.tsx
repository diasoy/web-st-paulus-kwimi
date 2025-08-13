import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Activity, Bell, Calendar, CalendarDays, LayoutGrid, MessageSquare, Settings, UsersIcon, User } from 'lucide-react';
import AppLogo from './app-logo';



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
                    title: 'Pengguna',
                    href: '/admin/users',
                    icon: User,
                },
                {
                    title: 'Komunitas Basis',
                    href: '/admin/communities',
                    icon: UsersIcon,
                },
                {
                    title: 'Pengumuman',
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
                title: 'Pengumuman',
                href: '/umat/announcements',
                icon: MessageSquare,
            },
            {
                title: 'Jadwal Ibadah',
                href: '/umat/worship-schedules',
                icon: CalendarDays,
            },
            {
                title: 'Agenda Kegiatan',
                href: '/umat/activities',
                icon: Activity,
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
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
