import React from 'react';
import { useQuery } from '@tanstack/react-query';
import * as request from '@shopping/common/utils/http-request';
import { useRouter } from 'next/router';
import { QueryResponseGetOneType } from '@shopping/common/types';
import { Product } from '@shopping/common/types/product';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { Spin } from '@shopping/common/components/spin';
import ProductDetail from '~/components/product/product-details';
import { NextPageWithLayout } from '../_app';

const ProductDetailPage: NextPageWithLayout = () => {
    const { query } = useRouter();

    const { data, isFetching } = useQuery<QueryResponseGetOneType<Product>>({
        queryKey: ['product-public-info', query?.id],
        queryFn: () =>
            request
                .get(`/productPublicInfo/${query?.id}`)
                .then((res) => res.data),
        enabled: !!query?.id,
    });
    return (
        <div className="min-h-screen bg-white">
            <div className="responsive-container py-4 sm:py-6 lg:py-8">
                <div className="mb-4 sm:mb-6">
                    <Breadcrumb
                        className="text-xs sm:text-sm"
                        items={[
                            {
                                title: <Link href="/">Trang chủ</Link>,
                            },
                            {
                                title: (
                                    <Link
                                        href={{
                                            pathname: '/product',
                                            query: {
                                                category:
                                                    data?.data?.category?.id,
                                            },
                                        }}
                                    >
                                        {data?.data?.category?.name}
                                    </Link>
                                ),
                            },
                            {
                                title: (
                                    <Link
                                        href={{
                                            pathname: '/product',
                                            query: {
                                                brand: data?.data?.brand?.id,
                                            },
                                        }}
                                    >
                                        {data?.data?.brand?.name}
                                    </Link>
                                ),
                            },
                            {
                                title: (
                                    <span className="line-clamp-1">
                                        {data?.data?.name}
                                    </span>
                                ),
                            },
                        ]}
                    />
                </div>
                <Spin spinning={isFetching} />
                <ProductDetail data={data?.data} />
            </div>
        </div>
    );
};

ProductDetailPage.title = 'Thông tin sản phẩm';

export default ProductDetailPage;
