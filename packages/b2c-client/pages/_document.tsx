import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { GA_TRACKING_ID } from '~/lib/gtag';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                    strategy="afterInteractive"
                />
                <Script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${GA_TRACKING_ID}', {
                                page_path: window.location.pathname,
                            });
                        `,
                    }}
                    id="gtag-init"
                    strategy="afterInteractive"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
