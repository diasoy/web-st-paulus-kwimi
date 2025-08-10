import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';

export function UserInfo({ user, showEmail = false, showRole = true }: { user: User; showEmail?: boolean; showRole?: boolean }) {
    const getInitials = useInitials();

    const getRoleDisplay = (role: string) => {
        return role === 'admin' ? 'Admin' : 'Umat';
    };

    const getRoleBadgeColor = (role: string) => {
        return role === 'admin' 
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' 
            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    };

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                {showEmail && <span className="truncate text-xs text-muted-foreground">{user.email}</span>}
                {showRole && (
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 w-fit ${getRoleBadgeColor(user.role)}`}>
                        {getRoleDisplay(user.role)}
                    </span>
                )}
            </div>
        </>
    );
}
