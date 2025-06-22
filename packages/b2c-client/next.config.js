/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')([
    '@shopping/common',
    '@gumlet/react-hls-player',
]);

const withAntdLess = require('next-plugin-antd-less');

const path = require('path');

const nextConfig = withTM(
    withAntdLess({
        output: 'standalone',
        experimental: {
            outputFileTracingRoot: path.join(__dirname, '../../'),
        },
        compiler: {
            styledComponents: true,
        },
        images: {
            unoptimized: true,
        },
        reactStrictMode: false,
        swcMinify: true,
        sassOptions: {
            includePaths: [path.join(__dirname, 'styles')],
        },
        webpack(config) {
            return config;
        },
        async rewrites() {
            return [
                {
                    source: '/api/:path*',
                    destination: 'http://server:8080/:path*',
                },
            ];
        },
    })
);

module.exports = nextConfig;
