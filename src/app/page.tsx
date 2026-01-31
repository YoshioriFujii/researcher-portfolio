"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import News from '@/components/News';
import ExperienceList from '@/components/ExperienceList';
import AwardList from '@/components/AwardList';
import ProjectCard from '@/components/ProjectCard';
import PublicationList from '@/components/PublicationList';

import profileData from '@/data/profile.json';
import newsData from '@/data/news.json';
import experienceData from '@/data/experience.json';
import awardsData from '@/data/awards.json';
import projectsData from '@/data/projects.json';
import publicationsData from '@/data/publications.json';

import { Publication } from '@/data/types';

export default function Home() {
    const { t, language } = useLanguage();

    return (
        <div className="max-w-4xl px-6 md:px-12 py-12 md:py-24 space-y-24">
            {/* About Section */}
            <section id="about">
                <h1 className="font-serif text-4xl md:text-5xl font-bold mb-8 text-gray-900 leading-tight">
                    {/* ... existing code ... */}
                    {language === 'en' && "Hello, I'm "}<span className="text-gray-600">{t(profileData.name)}</span>{language === 'en' && '.'}
                </h1>
                <div className="space-y-4 text-lg text-gray-700 font-sans leading-relaxed max-w-3xl">
                    {profileData.about.map((paragraph, index) => (
                        <p key={index}>{t(paragraph)}</p>
                    ))}
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="scroll-mt-24">
                <h2 className="text-3xl font-serif font-bold mb-8 border-b border-gray-100 pb-4">
                    {t('section.projects')}
                </h2>
                {projectsData.length >= 3 ? (
                    <div
                        className="flex overflow-x-auto gap-6 pb-8 -mx-6 px-6 md:mx-0 md:px-0 no-scrollbar snap-x snap-mandatory"
                    >
                        {projectsData.map((project) => (
                            <div key={project.id} className="w-[260px] sm:w-[320px] flex-shrink-0 snap-start selection:bg-transparent">
                                <ProjectCard project={project} className="h-full" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                        {projectsData.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                )}
            </section>

            {/* Publications Section */}
            <PublicationList data={publicationsData as Publication[]} />

            {/* Awards Section */}
            <AwardList data={awardsData} />

            {/* Experience Section */}
            <ExperienceList data={experienceData} />

            {/* News Section */}
            <News data={newsData} />

            {/* Footer */}
            <footer className="pt-12 border-t border-gray-100 text-sm text-gray-400 font-mono">
                &copy; {new Date().getFullYear()} {t(profileData.name)}. {t('footer.copyright')}
            </footer>
        </div>
    );
}
