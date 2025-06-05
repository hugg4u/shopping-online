/* eslint-disable @typescript-eslint/no-explicit-any */
import '~/styles/globals.css';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Spin } from '@shopping/common/components/spin';
import { ToastContainer, Zoom } from 'react-toastify';
import Head from 'next/head';
import { ConfigProvider } from 'antd';
import { getImageUrl } from '@shopping/common/utils/getImageUrl';
import ScrollToTopButton from '@shopping/common/components/scroll-to-top';
import { DefaultLayout } from '~/components/layouts/default-layout';
import LoginModal from '~/components/modals/login-modal';
import RegisterModal from '~/components/modals/register-modal';

const queryClient = new QueryClient();

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<
    P,
    IP
> & {
    getLayout?: (page: ReactElement) => JSX.Element;
    title?: string;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const router = useRouter();

    const loadingRef = useRef<unknown | undefined>(undefined);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const start = () => {
            if (loadingRef.current) {
                clearTimeout(loadingRef.current as number);
            }
            loadingRef.current = setTimeout(() => {
                setLoading(true);
            }, 200);
        };
        const end = () => {
            if (loadingRef.current) {
                clearTimeout(loadingRef.current as number);
            }
            setLoading(false);
        };
        router.events.on('routeChangeStart', start);
        router.events.on('routeChangeComplete', end);
        router.events.on('routeChangeError', end);
        window.addEventListener('showLoading', start);
        window.addEventListener('hideLoading', end);
        return () => {
            router.events.off('routeChangeStart', start);
            router.events.off('routeChangeComplete', end);
            router.events.off('routeChangeError', end);
            window.removeEventListener('showLoading', start);
            window.removeEventListener('hideLoading', end);
        };
    }, []);

    const getLayout =
        Component.getLayout ||
        ((page) => <DefaultLayout>{page}</DefaultLayout>);

    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        colorPrimary: '#365842',
                        algorithm: true,
                    },
                    Spin: {
                        colorPrimary: '#365842',
                    },
                    Pagination: {
                        colorPrimary: '#365842',
                        algorithm: true,
                    },
                    Radio: {
                        colorPrimary: '#365842',
                        algorithm: true,
                    },
                    Tabs: {
                        colorPrimary: '#365842',
                        algorithm: true,
                    },
                },
                token: {
                    fontSize: 12,
                    colorPrimary: '#365842',
                    colorBgContainer: '#dde8dc',
                    colorBorder: '#365842',
                    colorText: '#365842',
                    colorTextSecondary: '#6B5B4F',
                },
            }}
        >
            <QueryClientProvider client={queryClient}>
                <Spin spinning={loading} />
                <Head>
                    <title>
                        {Component.title ? Component.title : 'Soma Tea'}
                    </title>
                    <link
                        href={getImageUrl('/icon_web.png')}
                        rel="icon"
                        sizes="500x480"
                        type="image/png"
                    />
                </Head>
                <ToastContainer autoClose={1500} stacked transition={Zoom} />
                <LoginModal />
                <RegisterModal />
                {getLayout(<Component {...pageProps} />)}
                <div className="fixed bottom-[40px] right-[40px] cursor-pointer">
                    <ScrollToTopButton />
                </div>
            </QueryClientProvider>
        </ConfigProvider>
    );
}
