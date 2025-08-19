import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { usePage, router } from "@inertiajs/react";
import type { Auth } from "@/types";

interface UserHeaderInfoProps {
    onlyDate?: boolean;
    onlyUser?: boolean;
}

const UserHeaderInfo = ({ onlyDate, onlyUser }: UserHeaderInfoProps = {}) => {
    const { auth } = usePage<{ auth: Auth }>().props;
    const today = new Date().toLocaleDateString('id-ID', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    const handleLogout = () => {
        router.post(route('logout'));
    };

    if (onlyDate) {
        return <span className="text-sm text-muted-foreground text-center">{today}</span>;
    }
    if (onlyUser) {
        return (
            <div className="flex flex-row-reverse items-center gap-4">
                <Button variant="destructive" size="sm" onClick={handleLogout} className="ml-2">
                    <LogOut className="mr-1 h-4 w-4" /> Logout
                </Button>
                <div className="flex flex-row-reverse text-right justify-center items-center gap-4">
                    <span className="font-semibold text-base text-start">{auth.user.name}</span>
                    <span
                        className={`inline-block text-center mt-1 px-2 py-0.5 rounded text-xs font-semibold ${auth.user.role === 'admin' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}
                    >
                        {auth.user.role === 'admin' ? 'Admin' : 'Umat'}
                    </span>
                </div>
            </div>
        );
    }
    return (
        <div className="flex flex-row-reverse items-center gap-4">
            <span className="text-sm text-muted-foreground text-center">{today}</span>
            <Button variant="destructive" size="sm" onClick={handleLogout} className="ml-2">
                <LogOut className="mr-1 h-4 w-4" /> Logout
            </Button>
            <div className="flex flex-row-reverse text-right justify-center items-center gap-4">
                <span className="font-semibold text-base text-start">{auth.user.name}</span>
                <span
                    className={`inline-block text-center mt-1 px-2 py-0.5 rounded text-xs font-semibold ${auth.user.role === 'admin' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}
                >
                    {auth.user.role === 'admin' ? 'Admin' : 'Umat'}
                </span>
            </div>
        </div>
    );
};

export { UserHeaderInfo };