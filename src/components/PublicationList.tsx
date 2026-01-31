"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Publication } from '@/data/types';
import { FileText, Link as LinkIcon } from 'lucide-react';

interface PublicationListProps {
    data: Publication[];
}

export default function PublicationList({ data }: PublicationListProps) {
    const { t } = useLanguage();

    const journals = data.filter(p => p.category === 'journal');
    const conferences = data.filter(p => p.category === 'conference');
    const others = data.filter(p => !p.category);

    // Helper to format authors with bold/underline for "Y. Fujii"
    const FormatAuthors = ({ authors }: { authors: string }) => {
        const parts = authors.split(/(Y\. Fujii)/g);
        return (
            <span>
                {parts.map((part, i) =>
                    part === 'Y. Fujii' ? (
                        <span key={i} className="font-bold text-gray-900 border-b border-gray-900">
                            {part}
                        </span>
                    ) : (
                        <span key={i}>{part}</span>
                    )
                )}
            </span>
        );
    };

    const PublicationItem = ({ pub }: { pub: Publication }) => (
        <li className="flex flex-col gap-1">
            <h3 className="font-serif text-lg font-semibold text-gray-900 leading-tight">
                {t(pub.title)}
            </h3>
            <div className="text-sm font-sans text-gray-700 leading-relaxed">
                <FormatAuthors authors={pub.authors} />
            </div>
            <div className="text-sm font-sans text-gray-500 italic">
                {pub.venue}, {pub.year}
            </div>

            <div className="flex gap-4 mt-2">
                {pub.pdfLink && (
                    <a
                        href={pub.pdfLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-blue-700 transition-colors uppercase tracking-wider border border-gray-200 px-2 py-1 rounded-sm hover:border-blue-700"
                    >
                        <FileText size={12} /> PDF
                    </a>
                )}
                {pub.doi && (
                    <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-blue-700 transition-colors uppercase tracking-wider border border-gray-200 px-2 py-1 rounded-sm hover:border-blue-700"
                    >
                        <LinkIcon size={12} /> DOI
                    </a>
                )}
            </div>
        </li>
    );

    return (
        <section id="publications" className="mb-24 scroll-mt-24">
            <h2 className="text-3xl font-serif font-bold mb-8 border-b border-gray-100 pb-4">
                {t('section.publications')}
            </h2>

            <div className="space-y-12">
                {/* Journals */}
                {journals.length > 0 && (
                    <div>
                        <h3 className="text-xl font-serif font-bold mb-6 text-gray-900 opacity-90">
                            Peer-Reviewed Journal Papers
                        </h3>
                        <ul className="space-y-8 pl-1">
                            {journals.map((pub) => (
                                <PublicationItem key={pub.id} pub={pub} />
                            ))}
                        </ul>
                    </div>
                )}

                {/* Conferences */}
                {conferences.length > 0 && (
                    <div>
                        <h3 className="text-xl font-serif font-bold mb-6 text-gray-900 opacity-90">
                            Peer-Reviewed International Conference Proceedings
                        </h3>
                        <ul className="space-y-8 pl-1">
                            {conferences.map((pub) => (
                                <PublicationItem key={pub.id} pub={pub} />
                            ))}
                        </ul>
                    </div>
                )}

                {/* Others (legacy or uncategorized) */}
                {others.length > 0 && (
                    <div>
                        <h3 className="text-xl font-serif font-bold mb-6 text-gray-900 opacity-90">
                            Other Publications
                        </h3>
                        <ul className="space-y-8 pl-1">
                            {others.map((pub) => (
                                <PublicationItem key={pub.id} pub={pub} />
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
}
