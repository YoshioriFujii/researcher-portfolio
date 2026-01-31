"use client";

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Award } from '@/data/types';

interface AwardListProps {
    data: Award[];
}

export default function AwardList({ data }: AwardListProps) {
    const { t } = useLanguage();

    return (
        <section id="awards" className="mb-24 scroll-mt-24">
            <h2 className="text-3xl font-serif font-bold mb-8 border-b border-gray-100 pb-4">
                {t('section.awards')}
            </h2>
            <ul className="space-y-8">
                {data.map((award) => (
                    <li key={award.id} className="flex gap-4 items-start">
                        {award.imageUrl && (
                            <div className="relative w-24 h-12 md:w-32 md:h-16 shrink-0">
                                <Image
                                    src={award.imageUrl}
                                    alt={t(award.organization)}
                                    fill
                                    className="object-contain object-left"
                                    sizes="(max-width: 768px) 96px, 128px"
                                />
                            </div>
                        )}
                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                                <h3 className="text-lg font-serif font-bold text-gray-900">
                                    {t(award.title)}
                                </h3>
                                <span className="text-sm font-mono text-gray-500 whitespace-nowrap">
                                    {award.date}
                                </span>
                            </div>
                            <div className="text-base font-sans text-gray-700 mt-1">
                                {t(award.organization)}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
