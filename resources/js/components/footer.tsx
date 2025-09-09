import { Phone, Mail, MapPin, Cross } from 'lucide-react';
import React from 'react';

export default function Footer() {
    return (
        <footer className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-blue-400/10 to-teal-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-green-400/5 to-emerald-500/5 rounded-full blur-2xl"></div>
                
                {/* Cross pattern overlay */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-10 left-10 w-6 h-6 border-2 border-white rotate-45"></div>
                    <div className="absolute top-20 right-20 w-4 h-4 border-2 border-yellow-400 rotate-45"></div>
                    <div className="absolute bottom-32 left-32 w-8 h-8 border-2 border-blue-400 rotate-45"></div>
                    <div className="absolute bottom-20 right-40 w-5 h-5 border-2 border-orange-400 rotate-45"></div>
                </div>
            </div>

            <div className="relative z-10 py-16">
                <div className="container mx-auto px-4">
                    {/* Main footer content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {/* Church Info Section */}
                        <div className="lg:col-span-1">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                                        <Cross className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="absolute -inset-1 bg-gradient-to-br from-yellow-400/50 to-orange-500/50 rounded-full blur opacity-60"></div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                                        ST. Paulus Kwimi
                                    </h3>
                                    <p className="text-sm text-green-200">Gereja Katolik</p>
                                </div>
                            </div>
                            <p className="text-sm text-green-100 leading-relaxed mb-4">
                                Gereja yang berkomitmen untuk menjadi terang dan garam dunia, 
                                melayani dengan kasih dan membangun komunitas yang kuat dalam iman.
                            </p>
                        </div>
                        {/* Navigation Section */}
                        <div className="lg:col-span-1">
                            <h4 className="text-lg font-semibold mb-6 bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text text-transparent">
                                Navigasi
                            </h4>
                            <ul className="space-y-3">
                                <li>
                                    <a 
                                        href="#announcements" 
                                        className="text-green-200 hover:text-yellow-300 transition-all duration-300 flex items-center group"
                                    >
                                        <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                                        Pengumuman
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="#schedules" 
                                        className="text-green-200 hover:text-blue-300 transition-all duration-300 flex items-center group"
                                    >
                                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                                        Jadwal Ibadah
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="#activities" 
                                        className="text-green-200 hover:text-orange-300 transition-all duration-300 flex items-center group"
                                    >
                                        <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                                        Kegiatan
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Section */}
                        <div className="lg:col-span-1">
                            <h4 className="text-lg font-semibold mb-6 bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text text-transparent">
                                Kontak Kami
                            </h4>
                            <ul className="space-y-4">
                                <li className="flex items-start group">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                                        <Phone className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-green-200">Telepon</p>
                                        <p className="text-sm font-medium text-white">0813-4414-5543</p>
                                    </div>
                                </li>
                                <li className="flex items-start group">
                                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center mr-3 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                                        <Mail className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-green-200">Email</p>
                                        <p className="text-sm font-medium text-white">info@stpauluskwimi.org</p>
                                    </div>
                                </li>
                                <li className="flex items-start group">
                                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-3 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                                        <MapPin className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-green-200">Alamat</p>
                                        <p className="text-sm font-medium text-white leading-relaxed">
                                            Jln.Kubina Rt/Rw, 01/001<br />
                                            Kampung Kwimi, Distrik Arso<br />
                                            Kabupaten Keerom, Papua
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Social Media Section */}
                        <div className="lg:col-span-1">
                            <h4 className="text-lg font-semibold mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                                Ikuti Kami
                            </h4>
                            <p className="text-sm text-green-200 mb-6">
                                Tetap terhubung dengan komunitas kami melalui media sosial
                            </p>
                            <div className="flex space-x-4 mb-6">
                                <a 
                                    href="#" 
                                    className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center hover:scale-110 hover:rotate-12 transition-all duration-300 group"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:scale-110 transition-transform duration-300">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                    </svg>
                                </a>
                                <a 
                                    href="#" 
                                    className="w-12 h-12 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center hover:scale-110 hover:rotate-12 transition-all duration-300 group"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:scale-110 transition-transform duration-300">
                                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 11.6-13.4 8.6 4.5-0.5 9.1-5.6 11-8.6"></path>
                                        <path d="M12 15s-3-2-6-2c2.4-5.3 4.4-6.3 6-7s6-2 8-2v0c-.4 1.3-1.6 2.5-3 3.3"></path>
                                    </svg>
                                </a>
                                <a 
                                    href="#" 
                                    className="w-12 h-12 bg-gradient-to-br from-pink-600 to-purple-600 rounded-xl flex items-center justify-center hover:scale-110 hover:rotate-12 transition-all duration-300 group"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:scale-110 transition-transform duration-300">
                                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                        <line x1="17.5" x2="17.5" y1="6.5" y2="6.5" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* Bottom section with enhanced styling */}
                    <div className="relative">
                        {/* Decorative line */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent mb-8"></div>
                        
                        {/* Copyright and additional info */}
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <div className="text-center md:text-left">
                                <p className="text-sm text-green-200">
                                    © 2025 Gereja St. Paulus Kwimi. All rights reserved.
                                </p>
                            </div>
                            
                            {/* Quick links */}
                            <div className="flex items-center space-x-6 text-sm">
                                <a 
                                    href="#" 
                                    className="text-green-200 hover:text-yellow-300 transition-colors duration-300"
                                >
                                    Kebijakan Privasi
                                </a>
                                <span className="text-green-400">•</span>
                                <a 
                                    href="#" 
                                    className="text-green-200 hover:text-yellow-300 transition-colors duration-300"
                                >
                                    Syarat & Ketentuan
                                </a>
                                <span className="text-green-400">•</span>
                                <a 
                                    href="#" 
                                    className="text-green-200 hover:text-yellow-300 transition-colors duration-300"
                                >
                                    Kontak
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Floating back to top button */}
            <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-50 group"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-white group-hover:scale-110 transition-transform duration-300"
                >
                    <path d="m18 15-6-6-6 6"/>
                </svg>
            </button>
        </footer>
    );
}