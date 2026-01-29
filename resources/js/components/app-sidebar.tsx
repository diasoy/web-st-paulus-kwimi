import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Activity, CalendarDays, LayoutGrid, MessageSquare, Settings, UsersIcon, User, MessageCircle, FileText, Users } from 'lucide-react';
import AppLogo from './app-logo';
import { useIsMobile } from '@/hooks/use-mobile';



export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;
    const isMobile = useIsMobile();

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
                    title: 'Umat',
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
                    title: 'Laporan Kegiatan',
                    href: '/admin/activity-reports',
                    icon: FileText,
                },
                {
                    title: 'Pengurus Gereja',
                    href: '/admin/church-officials',
                    icon: Users,
                },
                {
                    title: 'Kritik & Saran',
                    href: '/admin/feedback',
                    icon: MessageCircle,
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
                title: 'Pengumuman',
                href: '/umat/announcements',
                icon: MessageSquare,
            },
            {
                title: 'Agenda Kegiatan',
                href: '/umat/activities',
                icon: Activity,
            },
            {
                title: 'Jadwal Ibadah',
                href: '/umat/worship-schedules',
                icon: CalendarDays,
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
                            <Link href="/" prefetch>
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
                {isMobile && <NavUser />}
            </SidebarFooter>
        </Sidebar>
    );
}
