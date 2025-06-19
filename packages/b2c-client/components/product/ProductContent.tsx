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
        <div className="bg-white">
            <div className="min-h-[calc(100vh-200px)] bg-white">
                {products.length === 0 ? (
                    <div className="py-20 text-center">
                        <div className="mb-4 text-6xl opacity-20">🍵</div>
                        <h3 className="mb-2 text-lg font-medium text-gray-600 sm:text-xl">
                            Không tìm thấy sản phẩm
                        </h3>
                        <p className="text-sm text-gray-500 sm:text-base">
                            Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                        </p>
                    </div>
                ) : (
                    <div className="responsive-grid justify-items-center">
                        {products.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>
                )}
                <div className="mt-6 flex justify-center sm:mt-8 sm:justify-end">
                    {total > 0 && (
                        <Pagination
                            className="sm:size-default"
                            current={currentPage}
                            defaultCurrent={1}
                            hideOnSinglePage
                            onChange={onPageChange}
                            pageSize={pageSize}
                            pageSizeOptions={[pageSize]}
                            showSizeChanger={false}
                            size="small"
                            total={total}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductContent;
