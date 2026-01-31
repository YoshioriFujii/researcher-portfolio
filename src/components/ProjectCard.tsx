"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Project } from '@/data/types';

interface ProjectCardProps {
    project: Project;
    className?: string;
}

export default function ProjectCard({ project, className = "" }: ProjectCardProps) {
    const { t } = useLanguage(); // ProjectCard was missing this!
    return (
        <div className={`flex flex-col gap-4 group ${className}`}>
            {/* Image Container */}
            <div className="relative aspect-video w-full overflow-hidden border border-gray-100 bg-gray-50 rounded-sm">
                {/* Using Next.js Image with unoptimized for static export if needed, but next.config.js handles unoptimized: true */}
                <Image
                    src={project.imageUrl}
                    alt={t(project.title)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2">
                <h3 className="font-serif text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-900 transition-colors">
                    {project.link ? (
                        <Link href={project.link}>{t(project.title)}</Link>
                    ) : (
                        t(project.title)
                    )}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-sans">
                    {t(project.description)}
                </p>

                {project.tags && (
                    <div className="flex flex-wrap gap-2 mt-1">
                        {project.tags.map(tag => (
                            <span key={tag} className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-sm border border-gray-100">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
