import { FireOutlined } from '@ant-design/icons';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { get } from 'common/utils/http-request';
import LatestProductCard from './LatestProductCard';

const Sidebar: React.FC = () => {
    const { data: latestProducts, isLoading: latestProductsLoading } = useQuery(
        {
            queryKey: ['latestProducts'],
            queryFn: () =>
                get('product/latest', {
                    params: { limit: 3 },
                }).then((res) => res.data.data),
        }
    );

    return (
        <div className="space-y-6">
            {/* Latest Products */}
            {latestProducts && latestProducts.length > 0 && (
                <div
                    className="overflow-hidden rounded-xl border shadow-sm"
                    style={{
                        backgroundColor: '#F5F1E8',
                        borderColor: '#E5DDD5',
                    }}
                >
                    <div className="p-4" style={{ backgroundColor: '#C8965F' }}>
                        <div className="flex items-center gap-2 text-white">
                            <FireOutlined className="text-lg" />
                            <h3 className="font-bold">Sản phẩm mới nhất</h3>
                        </div>
                    </div>

                    <div className="space-y-4 p-4">
                        {latestProducts.slice(0, 3).map((product) => (
                            <LatestProductCard
                                discount_price={product.discount_price}
                                id={product.id}
                                key={product.id}
                                name={product.name}
                                original_price={product.original_price}
                                thumbnail={product.thumbnail}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

Sidebar.defaultProps = {
    currentSort: '',
    currentSortOrder: '',
    currentCategory: '',
    currentBrand: [],
};

export default Sidebar;
