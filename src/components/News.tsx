"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { NewsItem } from '@/data/types';

interface NewsProps {
    data: NewsItem[];
}

export default function News({ data }: NewsProps) {
    const { t } = useLanguage();

    return (
        <section id="news" className="mb-24 scroll-mt-24">
            <h2 className="text-3xl font-serif font-bold mb-8 border-b border-gray-100 pb-4">
                {t('section.news')}
            </h2>
            <ul className="space-y-6">
                {data.map((item, index) => (
                    <li key={index} className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-baseline group">
                        <span className="text-sm text-gray-400 font-mono shrink-0 w-24">
                            {item.date}
                        </span>
                        <div className="text-base text-gray-800 leading-relaxed font-sans">
                            {item.link ? (
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline hover:text-blue-700 transition-colors"
                                >
                                    {t(item.title)}
                                </a>
                            ) : (
                                <span>{t(item.title)}</span>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
