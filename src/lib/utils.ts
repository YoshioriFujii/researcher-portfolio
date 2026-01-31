// Utility to prepend basePath to image URLs for GitHub Pages deployment
const basePath = process.env.NODE_ENV === 'production' ? '/researcher-portfolio' : '';

export function getImageUrl(path: string): string {
    if (!path || path.startsWith('http')) {
        return path;
    }
    return `${basePath}${path}`;
}
