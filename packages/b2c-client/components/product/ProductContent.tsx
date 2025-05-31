import React from 'react';
import { Layout, Pagination } from 'antd';
import ProductCard from './ProductCard';
import { Product } from '~/types/product';

const { Content } = Layout;

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
        <Layout className="bg-[#f4f1e7]">
            <Content className="min-h-[calc(100vh-64px)]  w-[2000px] bg-[#f4f1e7] p-5">
                {products.length === 0 ? (
                    <div className="mt-[30%] text-center text-2xl text-gray-500">
                        Không có sản phẩm
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-2.5">
                        {products.map((product) => (
                            <div
                                className="mb-4 box-border flex justify-center"
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
            </Content>
        </Layout>
    );
};

export default ProductContent;
