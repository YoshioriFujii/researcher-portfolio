export type Translatable = string | { en: string; ja: string };

export interface Profile {
    name: Translatable; // Name might be kanji in JP
    role: Translatable;
    email: string;
    github: string;
    scholar: string;
    linkedin?: string;
    cvLink: string;
    imageUrl: string;
    about: Translatable[];
}

export interface NewsItem {
    date: string;
    title: Translatable;
    link?: string;
}

export interface Project {
    id: string;
    title: Translatable;
    description: Translatable;
    imageUrl: string;
    link?: string;
    tags?: string[];
}

export interface Publication {
    id: string;
    title: Translatable;
    authors: string; // Authors usually stay standardized in citations
    venue: string;
    year: number;
    doi?: string;
    pdfLink?: string;
    projectLink?: string;
    category?: "journal" | "conference";
}

export interface Experience {
    id: string;
    role: Translatable;
    organization: Translatable;
    period: string; // Period usually standard numbers
    description?: Translatable;
    imageUrl?: string;
}

export interface Award {
    id: string;
    title: Translatable;
    organization: Translatable;
    date: string;
    imageUrl?: string;
}
