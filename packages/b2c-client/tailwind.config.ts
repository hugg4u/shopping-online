import type { Config } from 'tailwindcss';
import color from 'tailwindcss/colors';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        '../common/components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                primary: '#365842',
                secondary: '#dde8dc',
                accent: '#C8965F',
                text: {
                    primary: '#365842',
                    secondary: '#6B5B4F',
                },
            },
        },
        container: {
            center: true,
            screens: {
                sm: '1200px',
            },
        },
    },
    plugins: [],
};
export default config;
