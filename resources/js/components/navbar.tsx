import { Link, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Separator } from './ui/separator';

export default function Navbar() {
    const { auth } = usePage<{ auth: { user?: { id: number; name: string } | null } }>().props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    {/* Hamburger Menu for Mobile */}
                    <div className="md:hidden">
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button size="icon" className="h-9 w-9 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white border-0">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle mobile menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex flex-col p-4 w-[250px] sm:w-[300px] bg-gradient-to-b from-green-50 to-teal-50">
                                <SheetHeader>
                                    <SheetTitle className="text-green-800">Menu Navigasi</SheetTitle>
                                </SheetHeader>
                                <nav className="mt-6 flex flex-col space-y-3 text-sm font-medium">
                                    <a 
                                        href="#announcements" 
                                        onClick={() => setIsMobileMenuOpen(false)} 
                                        className="py-3 px-4 rounded-lg bg-white/70 text-green-700 hover:bg-green-100 hover:text-green-800 transition-all duration-300"
                                    >
                                        📢 Pengumuman
                                    </a>
                                    <a 
                                        href="#schedules" 
                                        onClick={() => setIsMobileMenuOpen(false)} 
                                        className="py-3 px-4 rounded-lg bg-white/70 text-green-700 hover:bg-green-100 hover:text-green-800 transition-all duration-300"
                                    >
                                        ⛪ Jadwal Ibadah
                                    </a>
                                    <a 
                                        href="#activities" 
                                        onClick={() => setIsMobileMenuOpen(false)} 
                                        className="py-3 px-4 rounded-lg bg-white/70 text-green-700 hover:bg-green-100 hover:text-green-800 transition-all duration-300"
                                    >
                                        🎯 Kegiatan
                                    </a>
                                    <Separator className="my-4" />
                                    {auth?.user ? (
                                        <Link href={route('dashboard')}>
                                            <Button className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white">
                                                Dashboard
                                            </Button>
                                        </Link>
                                    ) : (
                                        <div className="flex flex-col space-y-3">
                                            <Link href={route('login')}>
                                                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                                                    Masuk
                                                </Button>
                                            </Link>
                                            <Link href={route('register')}>
                                                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                                                    Daftar
                                                </Button>
                                            </Link>
                                        </div>
                                    )}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="flex h-10 w-10 items-center justify-center bg-white rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 p-1">
                                <img
                                    src="/images/logo.png"
                                    alt="Logo Gereja"
                                    className="h-8 w-8 object-contain"
                                />
                            </div>
                            <div className="absolute -inset-1 bg-gradient-to-br from-green-400/50 to-teal-400/50 rounded-xl blur opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                        </div>
                        <div>
                            <span className="text-xl font-bold bg-gradient-to-r from-green-700 to-teal-700 bg-clip-text text-transparent">
                                ST. Paulus Kwimi
                            </span>
                            <p className="text-xs text-gray-600">Gereja Katolik</p>
                        </div>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <div className='flex items-center gap-8 mr-6'>
                        <a 
                            href="#announcements" 
                            className="text-gray-700 hover:text-green-600 transition-all duration-300 flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-green-50 group"
                        >
                            <span className="text-lg group-hover:scale-110 transition-transform duration-300">📢</span>
                            Pengumuman
                        </a>
                        <a 
                            href="#schedules" 
                            className="text-gray-700 hover:text-blue-600 transition-all duration-300 flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-blue-50 group"
                        >
                            <span className="text-lg group-hover:scale-110 transition-transform duration-300">⛪</span>
                            Jadwal Ibadah
                        </a>
                        <a 
                            href="#activities" 
                            className="text-gray-700 hover:text-orange-600 transition-all duration-300 flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-orange-50 group"
                        >
                            <span className="text-lg group-hover:scale-110 transition-transform duration-300">🎯</span>
                            Kegiatan
                        </a>
                    </div>

                    {auth?.user ? (
                        <Link href={route('dashboard')}>
                            <Button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                                Dashboard
                            </Button>
                        </Link>
                    ) : (
                        <div className='flex items-center gap-3'>
                            <Link href={route('login')}>
                                <Button className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300'>
                                    Masuk
                                </Button>
                            </Link>
                            <Link href={route('register')}>
                                <Button className='bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300'>
                                    Daftar
                                </Button>
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}