import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const merriweather = Merriweather({
    weight: ['300', '400', '700', '900'],
    subsets: ['latin'],
    variable: '--font-merriweather',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Researcher Portfolio',
    description: 'Academic portfolio for HCI & Robotics researcher',
};

import Sidebar from '@/components/Sidebar';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
            <body className="antialiased bg-white text-gray-900">
                <LanguageProvider>
                    <div className="min-h-screen">
                        <Sidebar />
                        <main className="w-full md:pl-64 lg:pl-72 pt-16 md:pt-0">
                            {children}
                        </main>
                    </div>
                </LanguageProvider>
            </body>
        </html>
    );
}
