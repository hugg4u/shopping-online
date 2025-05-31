import React, { useEffect, useState } from 'react';
import { Button, Checkbox } from 'antd';
import {
    FilterOutlined,
    FireOutlined,
    ReloadOutlined,
} from '@ant-design/icons';
import LatestProductCard from './LatestProductCard';

type SidebarProps = {
    categories: { id: string; name: string }[];
    brands: { id: string; name: string }[];
    latestProducts: {
        id: string;
        name: string;
        discount_price: number;
        original_price: number;
        thumbnail: string;
    }[];
    setCategory: (category: string) => void;
    setBrand: (brand: string[]) => void;
    handleResetFilters: () => void;
    handleSearch: (
        page: number,
        sort?: string,
        sortOrder?: string,
        category?: string,
        searchTerm?: string,
        pageSize?: number,
        brand?: string[]
    ) => void;
    currentSort?: string;
    currentSortOrder?: string;
    currentCategory?: string;
    currentBrand?: string[];
};

const Sidebar: React.FC<SidebarProps> = ({
    categories = [],
    brands = [],
    latestProducts = [],
    setCategory,
    setBrand,
    handleResetFilters,
    handleSearch,
    currentSort,
    currentSortOrder,
    currentCategory,
    currentBrand,
}) => {
    const [expandedCategories, setExpandedCategories] = useState(false);
    const [expandedBrands, setExpandedBrands] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<
        string | undefined
    >(currentCategory);
    const [selectedBrands, setSelectedBrands] = useState<string[]>(
        currentBrand || []
    );

    useEffect(() => {
        setSelectedCategory(currentCategory);
    }, [currentCategory]);
    useEffect(() => {
        setSelectedBrands(currentBrand || []);
    }, [currentBrand]);

    const handleCategoryChange = (category: string) => {
        if (selectedCategory === category) {
            setCategory('');
            setSelectedCategory('');
            handleSearch(
                1,
                currentSort,
                currentSortOrder,
                '',
                undefined,
                undefined,
                selectedBrands
            );
        } else {
            setCategory(category);
            setSelectedCategory(category);
            handleSearch(
                1,
                currentSort,
                currentSortOrder,
                category,
                undefined,
                undefined,
                selectedBrands
            );
        }
    };

    const handleBrandChange = (brand: string) => {
        const updatedSelectedBrands = selectedBrands.includes(brand)
            ? selectedBrands.filter((b) => b !== brand)
            : [...selectedBrands, brand];
        setBrand(updatedSelectedBrands);
        setSelectedBrands(updatedSelectedBrands);
        handleSearch(
            1,
            currentSort,
            currentSortOrder,
            selectedCategory,
            undefined,
            undefined,
            updatedSelectedBrands
        );
    };

    const visibleCategories = expandedCategories
        ? categories
        : categories.slice(0, 4);
    const visibleBrands = expandedBrands ? brands : brands.slice(0, 4);

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
