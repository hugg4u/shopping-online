import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { get } from '@shopping/common/utils/http-request';
import { PAGE_SIZE_CLIENT_PRODUCT } from '@shopping/common/constant';
import { Spin } from '@shopping/common/components/spin';
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
    minPrice?: number;
    maxPrice?: number;
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
            minPrice: params.minPrice ?? '',
            maxPrice: params.maxPrice ?? '',
        };

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
            minPrice: Number(routerQuery.minPrice) || undefined,
            maxPrice: Number(routerQuery.maxPrice) || undefined,
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
        brandParam?: string[],
        minPriceParam?: number,
        maxPriceParam?: number
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
            minPrice: minPriceParam ?? Number(routerQuery.minPrice),
            maxPrice: maxPriceParam ?? Number(routerQuery.maxPrice),
        };

        updateUrlAndFetchProducts(params);
    };

    const handleCategoryChange = (categoryId: string) => {
        handleSearch(
            1,
            routerQuery.sort as string,
            routerQuery.sortOrder as string,
            categoryId,
            routerQuery.search as string,
            undefined,
            (routerQuery.brand as string)?.split(','),
            Number(routerQuery.minPrice),
            Number(routerQuery.maxPrice)
        );
    };

    const handlePriceRangeChange = (minPrice: number, maxPrice: number) => {
        handleSearch(
            1,
            routerQuery.sort as string,
            routerQuery.sortOrder as string,
            routerQuery.category as string,
            routerQuery.search as string,
            undefined,
            (routerQuery.brand as string)?.split(','),
            minPrice,
            maxPrice
        );
    };

    const handleResetFilters = () => {
        handleSearch(
            1,
            routerQuery.sort as string,
            routerQuery.sortOrder as string,
            '', // reset category
            routerQuery.search as string,
            undefined,
            (routerQuery.brand as string)?.split(','),
            undefined, // reset minPrice
            undefined // reset maxPrice
        );
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto max-w-[1400px] px-4 py-8">
                <Spin spinning={isLoading} />
                <div className="grid grid-cols-12 gap-8">
                    {/* Sidebar - Fixed width 280px */}
                    <div className="col-span-12 w-[280px] lg:col-span-3">
                        <Sidebar
                            onCategoryChange={handleCategoryChange}
                            onPriceRangeChange={handlePriceRangeChange}
                            onResetFilters={handleResetFilters}
                        />
                    </div>

                    {/* Main Content Area */}
                    <div className="col-span-12 lg:col-span-9">
                        <div className="space-y-6">
                            {/* Header Bar */}
                            <div className="bg-white">
                                <HeaderBar
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
                                            )?.split(','),
                                            Number(routerQuery.minPrice),
                                            Number(routerQuery.maxPrice)
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
                                            )?.split(','),
                                            Number(routerQuery.minPrice),
                                            Number(routerQuery.maxPrice)
                                        );
                                    }}
                                    totalProducts={totalProducts}
                                />
                            </div>

                            {/* Product Content */}
                            <div className="bg-white">
                                <Content className="min-h-[600px]">
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
                                                )?.split(','),
                                                Number(routerQuery.minPrice),
                                                Number(routerQuery.maxPrice)
                                            )
                                        }
                                        pageSize={
                                            Number(routerQuery.pageSize) ||
                                            PAGE_SIZE_CLIENT_PRODUCT
                                        }
                                        products={[...products]}
                                        total={totalProducts}
                                    />
                                </Content>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
