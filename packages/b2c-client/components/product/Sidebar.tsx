import { FireOutlined } from '@ant-design/icons';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { get } from 'common/utils/http-request';
import { Product } from '~/types/product';
import LatestProductCard from './LatestProductCard';

// Define types
interface Brand {
    id: string;
    name: string;
}

interface Category {
    id: string;
    name: string;
}

// Define props interface
interface SidebarProps {
    brands?: Brand[];
    categories?: Category[];
    currentBrand?: string[];
    currentCategory?: string;
    currentSort?: string;
    currentSortOrder?: string;
    handleResetFilters?: () => void;
    handleSearch?: (
        page?: number,
        sortParam?: string,
        sortOrderParam?: string,
        categoryParam?: string,
        searchParam?: string,
        pageSizeParam?: number,
        brandParam?: string[]
    ) => void;
    latestProducts?: Product[];
    setBrand?: (brand: string[]) => void;
    setCategory?: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = () => {
    const { data: latestProducts } = useQuery({
        queryKey: ['latestProducts'],
        queryFn: () =>
            get('product/latest', {
                params: { limit: 3 },
            }).then((res) => res.data.data),
    });

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
                        {latestProducts.slice(0, 3).map((product: Product) => (
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

export default Sidebar;
