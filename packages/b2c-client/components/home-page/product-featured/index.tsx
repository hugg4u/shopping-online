import React from 'react';
import * as request from 'common/utils/http-request';
import { useQuery } from '@tanstack/react-query';
import type { ProductFeatured } from 'common/types/product';
import type { QueryResponseType } from 'common/types';
import Link from 'next/link';
import { Button } from 'antd';
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
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200" />
                    <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-200" />
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 8 }, (_, index) => (
                        <div
                            className="h-[420px] animate-pulse rounded-2xl bg-gray-200"
                            key={`skeleton-item-${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-800">
                        Sản phẩm nổi bật
                    </h3>
                    <p className="text-gray-600">
                        Những sản phẩm được khách hàng yêu thích nhất
                    </p>
                </div>
                <Link href="/product">
                    <Button
                        className="h-10 px-6 font-medium shadow-md transition-all duration-300 hover:shadow-lg"
                        icon={<ArrowRightOutlined />}
                        type="primary"
                    >
                        Xem tất cả
                    </Button>
                </Link>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data?.data?.map((item) => (
                    <ProductCard
                        briefInfo={item.briefInfo || ''}
                        description={item.description || ''}
                        discount_price={item.discount_price || 0}
                        id={item.id || ''}
                        key={item.id}
                        name={item.name || ''}
                        original_price={item.original_price || 0}
                        quantity={item.quantity || 0}
                        thumbnail={item.thumbnail || ''}
                    />
                ))}
            </div>

            {/* Bottom CTA */}
            {data?.data && data.data.length > 0 && (
                <div className="flex justify-center pt-8">
                    <Link href="/product">
                        <Button
                            className="h-12 px-8 text-base font-medium shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                            icon={<ArrowRightOutlined />}
                            size="large"
                            type="primary"
                        >
                            Khám phá thêm sản phẩm
                        </Button>
                    </Link>
                </div>
            )}

            {/* Empty State */}
            {(!data?.data || data.data.length === 0) && !isLoading && (
                <div className="py-16 text-center">
                    <div className="mb-4 text-6xl">🌸</div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-600">
                        Chưa có sản phẩm nổi bật
                    </h3>
                    <p className="text-gray-500">
                        Hãy quay lại sau để khám phá những sản phẩm tuyệt vời
                    </p>
                </div>
            )}
        </div>
    );
};

export default ListProductFeatured;
