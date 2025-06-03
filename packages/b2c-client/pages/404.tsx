import { Button } from 'antd';
import Link from 'next/link';
import React from 'react';
import { NextPageWithLayout } from './_app';

const Page404: NextPageWithLayout = () => {
    return (
        <div
            className="flex h-[100vh] w-full flex-col items-center justify-center gap-8"
            style={{ backgroundColor: '#FAF6F0' }}
        >
            <div className="text-center">
                <div
                    className="text-8xl font-extrabold md:text-9xl"
                    style={{ color: '#C8965F' }}
                >
                    404
                </div>
                <div
                    className="mt-4 text-xl font-medium md:text-2xl"
                    style={{ color: '#3C2415' }}
                >
                    Trang bạn tìm kiếm không tồn tại.
                </div>
                <div className="mt-2 text-lg" style={{ color: '#6B5B4F' }}>
                    Có thể trang đã bị di chuyển hoặc đường link không chính
                    xác.
                </div>
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row">
                <Link href="/">
                    <Button
                        className="h-12 px-8 text-lg font-medium text-white"
                        size="large"
                        style={{
                            backgroundColor: '#C8965F',
                            borderColor: '#C8965F',
                        }}
                        type="primary"
                    >
                        🍃 Trở về trang chủ
                    </Button>
                </Link>
                <Link href="/product">
                    <Button
                        className="h-12 px-8 text-lg font-medium"
                        size="large"
                        style={{
                            borderColor: '#C8965F',
                            color: '#3C2415',
                        }}
                        type="default"
                    >
                        🍵 Xem sản phẩm
                    </Button>
                </Link>
            </div>

            {/* Decorative tea elements */}
            <div className="mt-12 text-center opacity-30">
                <div className="text-6xl">🍃</div>
                <div
                    className="mt-2 text-sm font-medium uppercase tracking-wider"
                    style={{ color: '#C8965F' }}
                >
                    Soma Tea
                </div>
            </div>
        </div>
    );
};

Page404.getLayout = (page) => page;
Page404.title = '404';

export default Page404;
