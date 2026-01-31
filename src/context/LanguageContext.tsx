"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Translatable } from '@/data/types';

type Language = 'en' | 'ja';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    toggleLanguage: () => void;
    lang: Language; // Alias for language, used by components
    t: (content: Translatable | string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<Language>('en');

    const toggleLanguage = () => {
        setLanguageState(prev => prev === 'en' ? 'ja' : 'en');
    };

    // Simple dictionary for static UI elements (fallback)
    const translations: Record<string, Record<Language, string>> = {
        'nav.home': { en: 'Home', ja: 'ホーム' },
        'nav.news': { en: 'News', ja: 'ニュース' },
        'nav.experience': { en: 'Experience', ja: '研究経歴' },
        'nav.awards': { en: 'Awards', ja: '受賞歴' },
        'nav.projects': { en: 'Projects', ja: '研究プロジェクト' },
        'nav.publications': { en: 'Publications', ja: '業績' },
        'section.news': { en: 'Latest News', ja: '最新ニュース' },
        'section.experience': { en: 'Research Experience', ja: '研究経歴' },
        'section.awards': { en: 'Selected Awards', ja: '主な受賞歴' },
        'section.projects': { en: 'Research Projects', ja: '研究プロジェクト' },
        'section.publications': { en: 'Publications', ja: '研究業績' },
        'footer.copyright': { en: 'All Rights Reserved.', ja: 'All Rights Reserved.' },
    };

    const t = (content: Translatable | string): string => {
        if (typeof content === 'string') {
            // Try lookup in static dictionary, otherwise return string as is
            return translations[content]?.[language] || content;
        }
        // Handle object based translation { en: '...', ja: '...' }
        return content[language] || content['en'] || '';
    };

    return (
        <LanguageContext.Provider value={{
            language,
            setLanguage: setLanguageState,
            toggleLanguage,
            lang: language,
            t
        }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
