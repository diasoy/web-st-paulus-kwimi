import { Link, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Separator } from './ui/separator';

export default function Navbar() {
    const { auth } = usePage().props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md shadow-sm border-b border-border">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    {/* Hamburger Menu for Mobile */}
                    <div className="md:hidden">
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-9 w-9">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle mobile menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex flex-col p-4 w-[250px] sm:w-[300px]">
                                <SheetHeader>
                                    <SheetTitle>Menu</SheetTitle>
                                </SheetHeader>
                                <nav className="mt-4 flex flex-col space-y-2 text-sm font-medium">
                                    <a href="#announcements" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-primary transition-colors">Pengumuman</a>
                                    <a href="#schedules" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-primary transition-colors">Jadwal Ibadah</a>
                                    <a href="#activities" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-primary transition-colors">Kegiatan</a>
                                    <Separator className="my-2" />
                                    {auth.user ? (
                                        <Link href={route('dashboard')}>
                                            <Button size="sm" className="w-full">Dashboard</Button>
                                        </Link>
                                    ) : (
                                        <div className="flex flex-col space-y-2">
                                            <Link href={route('login')}>
                                                <Button variant="ghost" size="sm" className="w-full">Masuk</Button>
                                            </Link>
                                            <Link href={route('register')}>
                                                <Button size="sm" className="w-full">Daftar</Button>
                                            </Link>
                                        </div>
                                    )}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center">
                            <img src="/images/logo.png" alt="Logo" className="w-8 h-8" />
                        </div>
                        <span className="text-lg font-bold">ST. Paulus Kwimi</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
                    <a href="#announcements" className="text-muted-foreground hover:text-primary transition-colors">Pengumuman</a>
                    <a href="#schedules" className="text-muted-foreground hover:text-primary transition-colors">Jadwal Ibadah</a>
                    <a href="#activities" className="text-muted-foreground hover:text-primary transition-colors">Kegiatan</a>

                    {auth.user ? (
                        <Link href={route('dashboard')}>
                            <Button size="sm">Dashboard</Button>
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')}>
                                <Button variant="ghost" size="sm">Masuk</Button>
                            </Link>
                            <Link href={route('register')}>
                                <Button size="sm">Daftar</Button>
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}