import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { UserHeaderInfo } from '@/components/user-header-info';
import { useIsMobile } from '@/hooks/use-mobile';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const isMobile = useIsMobile();
    return (
        <header className="flex h-16 shrink-0 items-center border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            {/* Kiri: Sidebar dan Breadcrumbs */}
            <div className="flex items-center gap-2 flex-1">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            {/* Tengah: Tanggal */}
            <div className="flex-1 flex justify-center">
                {!isMobile && <UserHeaderInfo onlyDate />}
            </div>
            {/* Kanan: User info dan logout */}
            <div className="flex items-center gap-4 flex-1 justify-end">
                {!isMobile && <UserHeaderInfo onlyUser />}
            </div>
        </header>
    );
}
