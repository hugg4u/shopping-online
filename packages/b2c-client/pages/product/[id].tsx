import React from 'react';
import { useQuery } from '@tanstack/react-query';
import * as request from '@shopping/common/utils/http-request';
import { useRouter } from 'next/router';
import { QueryResponseGetOneType } from '@shopping/common/types';
import { Product } from '@shopping/common/types/product';
import { Breadcrumb, Spin } from 'antd';
import Link from 'next/link';
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
        <div>
            <div className="mt-20 flex px-10">
                <div className="flex-1">
                    <div className="container mb-5">
                        <Breadcrumb
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
                                                        data?.data?.category
                                                            ?.id,
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
                                                    brand: data?.data?.brand
                                                        ?.id,
                                                },
                                            }}
                                        >
                                            {data?.data?.brand?.name}
                                        </Link>
                                    ),
                                },
                                {
                                    title: data?.data?.name,
                                },
                            ]}
                        />
                    </div>
                    <Spin spinning={isFetching}>
                        <ProductDetail data={data?.data} />
                    </Spin>
                </div>
            </div>
        </div>
    );
};

ProductDetailPage.title = 'Thông tin sản phẩm';

export default ProductDetailPage;
