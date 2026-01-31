"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import profileDataRaw from '@/data/profile.json';
import { Profile } from '@/data/types';
import { Menu, X, Github, GraduationCap, Mail, FileText, Linkedin } from 'lucide-react';
import { getImageUrl } from '@/lib/utils';
// Note: Lucide icons don't include 'X' brand icon directly usually, but we can use Twitter or similar or just text. 
// Standard lucide has 'Twitter'. For X, we might need a custom SVG or just use Twitter for now.

const profileData = profileDataRaw as Profile;

export default function Sidebar() {
    const { t, language, toggleLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navItems = [
        { key: 'nav.home', href: '/' },
        { key: 'nav.projects', href: '#projects' },
        { key: 'nav.publications', href: '#publications' },
        { key: 'nav.awards', href: '#awards' },
        { key: 'nav.experience', href: '#experience' },
        { key: 'nav.news', href: '#news' },
    ];

    return (
        <>
            {/* Mobile Hamburger */}
            <div className="md:hidden fixed top-0 left-0 w-full bg-white z-50 px-4 py-3 flex justify-between items-center shadow-sm">
                <span className="font-serif font-bold text-xl">{t(profileData.name)}</span>
                <button onClick={toggleMenu} className="p-2">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar Container */}
            <aside className={`
        fixed top-0 left-0 h-full bg-white border-r border-gray-100 z-40 transition-transform duration-300 ease-in-out
        w-64 lg:w-72
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:block
      `}>
                <div className="flex flex-col h-full p-8">
                    {/* Profile Header */}
                    <div className="mb-10 mt-12 md:mt-4">
                        {profileData.imageUrl && (
                            <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-2 border-gray-100 mx-auto md:mx-0">
                                <Image
                                    src={getImageUrl(profileData.imageUrl)}
                                    alt={t(profileData.name)}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}
                        <h1 className="font-serif text-2xl font-bold mb-2">{t(profileData.name)}</h1>
                        <p className="text-gray-500 font-sans text-sm">{t(profileData.role)}</p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-grow">
                        <ul className="space-y-4">
                            {navItems.map((item) => (
                                <li key={item.key}>
                                    <Link
                                        href={item.href}
                                        className="block text-gray-600 hover:text-gray-900 transition-colors font-medium"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {t(item.key)}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <a
                                    href={profileData.cvLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
                                >
                                    <FileText size={18} /> CV
                                </a>
                            </li>
                        </ul>
                    </nav>

                    {/* Footer / Contact */}
                    <div className="mt-auto">
                        <div className="flex gap-4 mb-6 text-gray-400">
                            {profileData.github && (
                                <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                                    <Github size={20} />
                                </a>
                            )}
                            {profileData.scholar && (
                                <a href={profileData.scholar} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                                    <GraduationCap size={20} />
                                </a>
                            )}
                            {profileData.linkedin && (
                                <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                                    <Linkedin size={20} />
                                </a>
                            )}
                            {profileData.email && (
                                <a href={`mailto:${profileData.email}`} className="hover:text-gray-900 transition-colors">
                                    <Mail size={20} />
                                </a>
                            )}
                        </div>

                        <div className="flex gap-2 text-xs font-medium uppercase tracking-wider">
                            <button
                                onClick={() => language !== 'en' && toggleLanguage()}
                                className={`px-2 py-1 rounded transition-colors ${language === 'en' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-900'}`}
                                aria-label="English"
                            >
                                EN
                            </button>
                            <button
                                onClick={() => language !== 'ja' && toggleLanguage()}
                                className={`px-2 py-1 rounded transition-colors ${language === 'ja' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-900'}`}
                                aria-label="日本語"
                            >
                                日本語
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
