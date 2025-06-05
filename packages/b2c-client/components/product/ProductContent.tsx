import { Pagination } from 'antd';
import React from 'react';
import { Product } from '~/types/product';
import ProductCard from './ProductCard';

type ProductContentProps = {
    products: Product[];
    currentPage: number;
    total: number;
    onPageChange: (page: number, pageSize?: number) => void;
    pageSize: number;
};

const ProductContent: React.FC<ProductContentProps> = ({
    products = [],
    currentPage,
    total,
    onPageChange,
    pageSize,
}) => {
    return (
        <div className="bg-[#ffff]">
            <div className="min-h-[calc(100vh-64px)] bg-[#ffff]">
                {products.length === 0 ? (
                    <div className="mt-[30%] text-center text-2xl text-gray-500">
                        Không có sản phẩm
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {products.map((product) => (
                            <div
                                className="flex justify-center"
                                key={product.id}
                            >
                                <ProductCard {...product} />
                            </div>
                        ))}
                    </div>
                )}
                <div className="mt-5 flex justify-end">
                    {total > 0 && (
                        <Pagination
                            current={currentPage}
                            defaultCurrent={1}
                            hideOnSinglePage
                            onChange={onPageChange}
                            pageSize={pageSize}
                            pageSizeOptions={[pageSize]}
                            showSizeChanger={false}
                            total={total}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductContent;
