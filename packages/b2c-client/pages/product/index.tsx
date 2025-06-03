import React, { useEffect, useState } from 'react';
import { Layout, Spin } from 'antd';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { get } from '@shopping/common/utils/http-request';
import { PAGE_SIZE_CLIENT_PRODUCT } from '@shopping/common/constant';
import Sidebar from '../../components/product/Sidebar';
import HeaderBar from '../../components/product/HeaderBar';
import ProductContent from '../../components/product/ProductContent';

const { Content } = Layout;

type SearchParams = {
    page: number;
    pageSize: number;
    sortBy?: string;
    sortOrder?: string;
    categoryId?: string;
    search?: string;
    brandIds?: string[];
};

const Products: NextPage = () => {
    const router = useRouter();
    const { query: routerQuery } = router;

    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchProducts = async (params: SearchParams) => {
        setIsLoading(true);
        try {
            const res = await get('product/search', { params });
            setTotalProducts(res.data.total);
            setProducts(res.data.data);
        } finally {
            setIsLoading(false);
        }
    };

    const updateUrlAndFetchProducts = (params: SearchParams) => {
        const updatedQuery: Record<string, string | number> = {
            page: params.page,
            pageSize: params.pageSize,
            sort: params.sortBy ?? '',
            sortOrder: params.sortOrder ?? '',
            category: params.categoryId ?? '',
            search: params.search ?? '',
            brand: params.brandIds?.join(',') ?? '',
        };

        // Remove empty string values from query
        Object.keys(updatedQuery).forEach(
            (key) =>
                (updatedQuery[key] === '' || updatedQuery[key] === undefined) &&
                delete updatedQuery[key]
        );

        router.push(
            {
                pathname: router.pathname,
                query: updatedQuery,
            },
            undefined,
            { shallow: true }
        );

        fetchProducts(params);
    };

    useEffect(() => {
        const brandIds = (routerQuery.brand as string)?.split(',') || [];

        const params: SearchParams = {
            page: Number(routerQuery.page) || 1,
            pageSize: Number(routerQuery.pageSize) || PAGE_SIZE_CLIENT_PRODUCT,
            sortBy: (routerQuery.sort as string) || 'updatedAt',
            sortOrder: (routerQuery.sortOrder as string) || 'desc',
            categoryId: routerQuery.category as string,
            search: routerQuery.search as string,
            brandIds: brandIds.length > 0 ? brandIds : undefined,
        };
        fetchProducts(params);
    }, [router.query]);

    const handleSearch = (
        page = 1,
        sortParam?: string,
        sortOrderParam?: string,
        categoryParam?: string,
        searchParam?: string,
        pageSizeParam?: number,
        brandParam?: string[]
    ) => {
        const params: SearchParams = {
            page,
            pageSize:
                pageSizeParam ??
                (Number(routerQuery.pageSize) || PAGE_SIZE_CLIENT_PRODUCT),
            sortBy: sortParam ?? (routerQuery.sort as string),
            sortOrder: sortOrderParam ?? (routerQuery.sortOrder as string),
            categoryId: categoryParam ?? (routerQuery.category as string),
            search: searchParam ?? (routerQuery.search as string),
            brandIds: brandParam ?? (routerQuery.brand as string)?.split(','),
        };

        updateUrlAndFetchProducts(params);
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#FAF6F0' }}>
            {/* Main Content */}
            <div className="container relative z-10 mx-auto py-8">
                <Spin size="large" spinning={isLoading}>
                    <div className="grid grid-cols-12 gap-8">
                        {/* Sidebar */}
                        <div className="col-span-12 lg:col-span-3">
                            <div className="sticky top-8">
                                <Sidebar />
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="col-span-12 lg:col-span-9">
                            <div className="space-y-6">
                                {/* Header Bar */}
                                <div
                                    className="rounded-xl border shadow-sm"
                                    style={{
                                        backgroundColor: '#F5F1E8',
                                        borderColor: '#E5DDD5',
                                    }}
                                >
                                    <HeaderBar
                                        currentSort={routerQuery.sort as string}
                                        currentSortOrder={
                                            routerQuery.sortOrder as string
                                        }
                                        handleSearch={handleSearch}
                                        setSort={(newSort) => {
                                            handleSearch(
                                                1,
                                                newSort,
                                                routerQuery.sortOrder as string,
                                                routerQuery.category as string,
                                                routerQuery.search as string,
                                                undefined,
                                                (
                                                    routerQuery.brand as string
                                                )?.split(',')
                                            );
                                        }}
                                        setSortOrder={(newSortOrder) => {
                                            handleSearch(
                                                1,
                                                routerQuery.sort as string,
                                                newSortOrder,
                                                routerQuery.category as string,
                                                routerQuery.search as string,
                                                undefined,
                                                (
                                                    routerQuery.brand as string
                                                )?.split(',')
                                            );
                                        }}
                                    />
                                </div>

                                {/* Product Content */}
                                <div
                                    className="overflow-hidden rounded-xl border shadow-sm"
                                    style={{
                                        backgroundColor: '#F5F1E8',
                                        borderColor: '#E5DDD5',
                                    }}
                                >
                                    <Content className="min-h-[600px] p-6">
                                        <ProductContent
                                            currentPage={
                                                Number(routerQuery.page) || 1
                                            }
                                            onPageChange={(page, newPageSize) =>
                                                handleSearch(
                                                    page,
                                                    routerQuery.sort as string,
                                                    routerQuery.sortOrder as string,
                                                    routerQuery.category as string,
                                                    routerQuery.search as string,
                                                    newPageSize,
                                                    (
                                                        routerQuery.brand as string
                                                    )?.split(',')
                                                )
                                            }
                                            pageSize={
                                                Number(routerQuery.pageSize) ||
                                                PAGE_SIZE_CLIENT_PRODUCT
                                            }
                                            products={products}
                                            total={totalProducts}
                                        />
                                    </Content>
                                </div>
                            </div>
                        </div>
                    </div>
                </Spin>
            </div>
        </div>
    );
};

export default Products;
