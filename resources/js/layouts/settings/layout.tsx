import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Settings, User, Lock, FileText } from 'lucide-react';
import { type PropsWithChildren } from 'react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profil',
        href: '/settings/profile',
        icon: User,
    },
    {
        title: 'Kata Sandi',
        href: '/settings/password',
        icon: Lock,
    },
    {
        title: 'Unggah Dokumen',
        href: '/settings/document',
        icon: FileText,
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    return (
        <div
            className="min-h-screen w-full"
            style={{ background: 'linear-gradient(135deg, #1a4d20 0%, #235829 40%, #3e7147 100%)' }}
        >
            <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
                {/* Page header */}
                <div className="flex items-center gap-4">
                    <div className="rounded-full bg-white/20 p-3">
                        <Settings className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white drop-shadow">Pengaturan Akun</h1>
                        <p className="text-green-200 text-sm mt-0.5">Kelola profil dan pengaturan akun Anda</p>
                    </div>
                </div>

                {/* Card */}
                <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
                    {/* Card gradient header */}
                    <div className="bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700 px-6 py-4">
                        <p className="text-white/80 text-sm font-medium">
                            {sidebarNavItems.find(i => i.href === currentPath)?.title ?? 'Pengaturan'}
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row">
                        {/* Sidebar nav */}
                        <aside className="w-full lg:w-52 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200">
                            <nav className="flex flex-row lg:flex-col gap-1 p-3">
                                {sidebarNavItems.map((item, index) => {
                                    const Icon = item.icon as React.ElementType | null;
                                    return (
                                        <Link
                                            key={`${item.href}-${index}`}
                                            href={item.href}
                                            prefetch
                                            className={cn(
                                                'flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                                                currentPath === item.href
                                                    ? 'bg-green-700 text-white shadow-sm'
                                                    : 'text-gray-600 hover:bg-green-50 hover:text-green-700',
                                            )}
                                        >
                                            {Icon && <Icon className="h-4 w-4 shrink-0" />}
                                            {item.title}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </aside>

                        {/* Main content */}
                        <div className="flex-1 min-w-0 p-6 lg:p-8">
                            <div className="text-gray-800 space-y-8">{children}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
