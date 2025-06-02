/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')([
    'common',
    '@gumlet/react-hls-player',
]);

const withAntdLess = require('next-plugin-antd-less');

const path = require('path');

const nextConfig = withTM(
    withAntdLess({
        output: 'standalone',
        experimental: {
            outputFileTracingRoot: path.join(__dirname, '../../'),
            newNextLinkBehavior: true,
        },
        modifyVars: { '@primary-color': '#028267' },
        lessVarsFilePathAppendToEndOfContent: false,
        cssLoaderOptions: {
            mode: 'local',
            exportLocalsConvention: 'camelCase',
            exportOnlyLocals: false,
            getLocalIdent: () => {
                return '[hash:base64:8]';
            },
        },
        compiler: {
            // Enables the styled-components SWC transform
            styledComponents: true,
        },

        // for Next.js ONLY
        nextjs: {
            localIdentNameFollowDev: true, // default false, for easy to debug on PROD mode
        },

        // Other Config Here...

        webpack(config) {
            // Handle monorepo setup for Vercel
            config.resolve.alias = {
                ...config.resolve.alias,
                'common': path.resolve(__dirname, '../common'),
                '~': path.resolve(__dirname),
            };
            
            // Add fallback for Node.js modules
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                os: false,
                path: false,
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
        reactStrictMode: false,
        swcMinify: true,
        sassOptions: {
            includePaths: [path.join(__dirname, 'styles')],
        },
        
        // Environment variables
        env: {
            NEXT_PUBLIC_SITE: process.env.NEXT_PUBLIC_SITE || 'CLIENT',
            NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://8080--main--hungpc--hung.coder1.hirogo-dev.com',
        },
        
        // Enable static exports for better performance
        trailingSlash: false,
        
        // Optimize for production
        poweredByHeader: false,
        compress: true,
    })
);

module.exports = nextConfig;
