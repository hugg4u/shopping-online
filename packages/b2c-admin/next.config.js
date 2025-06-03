/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['common']);
const path = require('path');

const nextConfig = withTM({
    output: 'standalone',
    experimental: {
        outputFileTracingRoot: path.join(__dirname, '../../'),
    },

    webpack(config) {
        // Handle monorepo setup for common package
        config.resolve.alias = {
            ...config.resolve.alias,
            'common': path.resolve(__dirname, '../common'),
            '~': path.resolve(__dirname),
        };
        
        return config;
    },

    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
            {
                protocol: 'http', 
                hostname: '**',
            },
        ],
    },

    // Environment variables
    env: {
        NEXT_PUBLIC_SITE: process.env.NEXT_PUBLIC_SITE || 'ADMIN',
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://8080--main--hungpc--hung.coder1.hirogo-dev.com',
    },
});

module.exports = nextConfig;
