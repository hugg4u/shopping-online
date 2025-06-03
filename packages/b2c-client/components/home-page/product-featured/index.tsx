import React from 'react';
import * as request from '@shopping/common/utils/http-request';
import { useQuery } from '@tanstack/react-query';
import type { ProductFeatured } from '@shopping/common/types/product';
import type { QueryResponseType } from '@shopping/common/types';
import Link from 'next/link';
import { ArrowRightOutlined } from '@ant-design/icons';
import ProductCard from '~/components/product/ProductCard';

const ListProductFeatured = () => {
    const { data, isLoading } = useQuery<
        QueryResponseType<Partial<ProductFeatured>>
    >({
        queryKey: ['product-featured'],
        queryFn: () => request.get('product-featured').then((res) => res.data),
    });

    if (isLoading) {
        return (
            <div className="py-20" style={{ backgroundColor: '#F5F1E8' }}>
                <div className="container mx-auto px-4">
                    <div className="space-y-12">
                        {/* Header Skeleton */}
                        <div className="text-center">
                            <div className="mx-auto mb-4 h-10 w-80 animate-pulse rounded-lg bg-stone-300" />
                            <div className="mx-auto h-6 w-96 animate-pulse rounded-lg bg-stone-200" />
                            <div className="mx-auto mt-6 h-1 w-24 animate-pulse rounded-full bg-amber-300" />
                        </div>

                        {/* Products Grid Skeleton */}
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {Array.from({ length: 8 }, (_, index) => (
                                <div
                                    className="h-[400px] animate-pulse rounded-2xl bg-stone-300/50 shadow-md"
                                    key={`skeleton-item-${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-20" style={{ backgroundColor: '#F5F1E8' }}>
            <div className="container mx-auto px-4">
                <div className="space-y-12">
                    {/* Enhanced Header Section */}
                    <div className="text-center">
                        <div className="mx-auto max-w-3xl">
                            <h2
                                className="mb-6 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl"
                                style={{
                                    color: '#3C2415',
                                    letterSpacing: '0.05em',
                                }}
                            >
                                SẢN PHẨM NỔI BẬT
                            </h2>
                            <p
                                className="mb-8 text-lg leading-relaxed md:text-xl"
                                style={{ color: '#6B5B4F' }}
                            >
                                Những dòng trà cao cấp được khách hàng yêu thích
                                và đánh giá cao nhất
                            </p>
                        </div>
                    </div>

                    {/* Products Grid với enhanced styling */}
                    {data?.data && data.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {data.data.map((item) => (
                                    <div
                                        className="group transform transition-all duration-300 hover:scale-105"
                                        key={item.id}
                                        style={{
                                            filter: 'drop-shadow(0 4px 12px rgba(139, 69, 19, 0.1))',
                                        }}
                                    >
                                        <ProductCard
                                            briefInfo={item.briefInfo || ''}
                                            description={item.description || ''}
                                            discount_price={
                                                item.discount_price || 0
                                            }
                                            id={item.id || ''}
                                            name={item.name || ''}
                                            original_price={
                                                item.original_price || 0
                                            }
                                            quantity={item.quantity || 0}
                                            rating={4.5}
                                            thumbnail={item.thumbnail || ''}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Enhanced Bottom CTA */}
                            <div className="flex justify-center pt-12">
                                <Link href="/product">
                                    <button
                                        className="group relative overflow-hidden rounded-full border-2 px-12 py-4 text-lg font-semibold shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-xl"
                                        style={{
                                            borderColor: '#C8965F',
                                            color: '#3C2415',
                                            background:
                                                'linear-gradient(135deg, rgba(212, 165, 116, 0.1) 0%, rgba(245, 241, 232, 0.8) 100%)',
                                            backdropFilter: 'blur(10px)',
                                        }}
                                        type="button"
                                    >
                                        <span
                                            className="absolute inset-0 -z-10 scale-0 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
                                            style={{
                                                background:
                                                    'linear-gradient(135deg, #C8965F 0%, #D4A574 100%)',
                                            }}
                                        />
                                        <span className="relative z-10 flex items-center gap-3 transition-colors duration-500 group-hover:text-white">
                                            <span>Xem thêm</span>
                                            <ArrowRightOutlined className="transition-transform duration-300 group-hover:translate-x-1" />
                                        </span>
                                    </button>
                                </Link>
                            </div>
                        </>
                    ) : (
                        /* Enhanced Empty State */
                        <div className="py-20 text-center">
                            <div className="mx-auto max-w-md">
                                <div className="mb-6 text-8xl opacity-20">
                                    🍵
                                </div>
                                <h3
                                    className="mb-4 text-2xl font-semibold"
                                    style={{ color: '#6B5B4F' }}
                                >
                                    Chưa có sản phẩm nổi bật
                                </h3>
                                <p
                                    className="text-lg leading-relaxed"
                                    style={{ color: '#8B7355' }}
                                >
                                    Chúng tôi đang cập nhật những sản phẩm trà
                                    tuyệt vời nhất. Hãy quay lại sau để khám
                                    phá!
                                </p>
                                <div className="mt-8">
                                    <Link href="/">
                                        <button
                                            className="rounded-full border-2 px-8 py-3 font-medium transition-all duration-300 hover:scale-105"
                                            style={{
                                                borderColor: '#C8965F',
                                                color: '#3C2415',
                                                background:
                                                    'rgba(212, 165, 116, 0.1)',
                                            }}
                                            type="button"
                                        >
                                            Về trang chủ
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Decorative tea pattern background */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-5"
                        style={{
                            backgroundImage:
                                "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C8965F' fill-opacity='0.1'%3E%3Cpath d='M40 40c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm20 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z'/%3E%3C/g%3E%3C/svg%3E\")",
                            backgroundSize: '80px 80px',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListProductFeatured;
