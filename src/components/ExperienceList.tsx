"use client";

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Experience } from '@/data/types';

interface ExperienceListProps {
    data: Experience[];
}

export default function ExperienceList({ data }: ExperienceListProps) {
    const { t } = useLanguage();

    return (
        <section id="experience" className="mb-24 scroll-mt-24">
            <h2 className="text-3xl font-serif font-bold mb-8 border-b border-gray-100 pb-4">
                {t('section.experience')}
            </h2>
            <ul className="space-y-10">
                {data.map((exp) => (
                    <li key={exp.id} className="flex gap-4 items-start">
                        {exp.imageUrl && (
                            <div className="relative w-24 h-12 md:w-32 md:h-16 shrink-0">
                                <Image
                                    src={exp.imageUrl}
                                    alt={t(exp.organization)}
                                    fill
                                    className="object-contain object-left"
                                    sizes="(max-width: 768px) 96px, 128px"
                                />
                            </div>
                        )}
                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                                <h3 className="text-lg font-serif font-bold text-gray-900">
                                    {t(exp.role)}
                                </h3>
                                <span className="text-sm font-mono text-gray-500 whitespace-nowrap">
                                    {exp.period}
                                </span>
                            </div>
                            <div className="text-base font-sans text-gray-800 font-medium mt-1">
                                {t(exp.organization)}
                            </div>
                            {exp.description && (
                                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                                    {t(exp.description)}
                                </p>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
