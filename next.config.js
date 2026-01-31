/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/researcher-portfolio',
    assetPrefix: '/researcher-portfolio/',
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
