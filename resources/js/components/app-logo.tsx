
export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md text-sidebar-primary-foreground">
                <img
                    src="/images/logo.png"
                    alt="Logo"
                    width={32}
                    height={32}
                    className="h-6 w-6"
                />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">Gereja St Paulus Kwimi</span>
            </div>
        </>
    );
}
