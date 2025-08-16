import { Link } from '@inertiajs/react';
import { Church, MessageSquare, Phone } from 'lucide-react';
import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-card/80 backdrop-blur-md border-t border-border mt-12 py-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <img src="/images/logo.png" alt="Logo" className="w-10 h-10" />
                            <h3 className="text-xl font-bold">ST. Paulus Kwimi</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Gereja yang berkomitmen untuk menjadi terang dan garam dunia.
                        </p>
                    </div>
                    <div className="col-span-1">
                        <h4 className="text-lg font-semibold mb-4">Navigasi</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#announcements" className="text-muted-foreground hover:text-primary transition-colors">Pengumuman</a></li>
                            <li><a href="#schedules" className="text-muted-foreground hover:text-primary transition-colors">Jadwal Ibadah</a></li>
                            <li><a href="#activities" className="text-muted-foreground hover:text-primary transition-colors">Kegiatan</a></li>
                        </ul>
                    </div>
                    <div className="col-span-1">
                        <h4 className="text-lg font-semibold mb-4">Kontak</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center"><Phone className="h-4 w-4 mr-2" />0813-4414-5543</li>
                            <li className="flex items-center"><Church className="h-4 w-4 mr-2" />Jln.Kubina Rt/Rw, 01/001, Kampung Kwimi, Distrik Arso, Kabupaten Keerom, Papua</li>
                            <li className="flex items-center"><MessageSquare className="h-4 w-4 mr-2" /> info@stpauluskwimi.org</li>
                        </ul>
                    </div>
                    <div className="col-span-1">
                        <h4 className="text-lg font-semibold mb-4">Ikuti Kami</h4>
                        <div className="flex space-x-4">
                            {/* Placeholder for social media icons */}
                            <a href="#" className="text-muted-foreground hover:text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></a>
                            <a href="#" className="text-muted-foreground hover:text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 11.6-13.4 8.6 4.5-0.5 9.1-5.6 11-8.6"></path><path d="M12 15s-3-2-6-2c2.4-5.3 4.4-6.3 6-7s6-2 8-2v0c-.4 1.3-1.6 2.5-3 3.3"></path></svg></a>
                            <a href="#" className="text-muted-foreground hover:text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.5" y1="6.5" y2="6.5" /></svg></a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-center text-sm text-muted-foreground border-t border-border pt-6">
                    © 2025 Gereja St. Paulus Kwimi. All rights reserved.
                </div>
            </div>
        </footer>
    );
}