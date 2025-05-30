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
            {/* Main Filter Card */}
            <div
                className="overflow-hidden rounded-xl border shadow-sm"
                style={{
                    backgroundColor: '#F5F1E8',
                    borderColor: '#E5DDD5',
                }}
            >
                {/* Header */}
                <div
                    className="relative p-6 text-white"
                    style={{
                        background:
                            'linear-gradient(135deg, #C8965F 0%, #3C2415 100%)',
                    }}
                >
                    <div className="absolute right-2 top-2 text-3xl opacity-30">
                        🍃
                    </div>
                    <div className="relative z-10">
                        <div className="mb-2 flex items-center gap-3">
                            <div
                                className="flex h-8 w-8 items-center justify-center rounded-full"
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                }}
                            >
                                <FilterOutlined className="text-lg" />
                            </div>
                            <h2 className="text-lg font-bold">
                                Bộ lọc sản phẩm
                            </h2>
                        </div>
                        <p
                            className="text-sm opacity-90"
                            style={{ color: '#F5F1E8' }}
                        >
                            Tìm trà phù hợp với bạn
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-6 p-6">
                    {/* Categories */}
                    <div>
                        <h3
                            className="mb-4 flex items-center gap-2 font-semibold"
                            style={{ color: '#3C2415' }}
                        >
                            <div
                                className="h-5 w-1 rounded-full"
                                style={{ backgroundColor: '#C8965F' }}
                            />
                            Danh mục sản phẩm
                        </h3>
                        <div className="space-y-2">
                            {visibleCategories.map((category) => (
                                <div
                                    className={`group relative cursor-pointer overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                                        selectedCategory === category.id
                                            ? 'text-white shadow-lg'
                                            : 'border hover:shadow-sm'
                                    }`}
                                    key={category.id}
                                    onClick={() =>
                                        handleCategoryChange(category.id)
                                    }
                                    onKeyDown={(e) => {
                                        if (
                                            e.key === 'Enter' ||
                                            e.key === ' '
                                        ) {
                                            e.preventDefault();
                                            handleCategoryChange(category.id);
                                        }
                                    }}
                                    role="button"
                                    style={{
                                        backgroundColor:
                                            selectedCategory === category.id
                                                ? '#C8965F'
                                                : '#FAF6F0',
                                        borderColor: '#E5DDD5',
                                    }}
                                    tabIndex={0}
                                >
                                    <div className="flex items-center justify-between p-3">
                                        <span
                                            className="text-sm font-medium"
                                            style={{
                                                color:
                                                    selectedCategory ===
                                                    category.id
                                                        ? 'white'
                                                        : '#3C2415',
                                            }}
                                        >
                                            {category.name}
                                        </span>
                                        <div
                                            className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                                                selectedCategory === category.id
                                                    ? 'text-white'
                                                    : ''
                                            }`}
                                            style={{
                                                backgroundColor:
                                                    selectedCategory ===
                                                    category.id
                                                        ? 'rgba(255,255,255,0.3)'
                                                        : '#E5DDD5',
                                                color:
                                                    selectedCategory ===
                                                    category.id
                                                        ? 'white'
                                                        : '#C8965F',
                                            }}
                                        >
                                            ✓
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {categories.length > 4 && (
                                <Button
                                    className="w-full border text-sm"
                                    onClick={() =>
                                        setExpandedCategories(
                                            !expandedCategories
                                        )
                                    }
                                    style={{
                                        borderColor: '#C8965F',
                                        color: '#3C2415',
                                        backgroundColor: '#FAF6F0',
                                    }}
                                    type="dashed"
                                >
                                    {expandedCategories
                                        ? 'Thu gọn'
                                        : `Xem thêm (${categories.length - 4})`}
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Brands */}
                    <div>
                        <h3
                            className="mb-4 flex items-center gap-2 font-semibold"
                            style={{ color: '#3C2415' }}
                        >
                            <div
                                className="h-5 w-1 rounded-full"
                                style={{ backgroundColor: '#C8965F' }}
                            />
                            Thương hiệu
                        </h3>
                        <div className="space-y-2">
                            {visibleBrands.map((brand) => (
                                <div
                                    className="flex items-center gap-3 rounded-lg p-2 transition-colors"
                                    key={brand.id}
                                    style={{
                                        backgroundColor:
                                            selectedBrands.includes(brand.id)
                                                ? '#FAF6F0'
                                                : 'transparent',
                                    }}
                                >
                                    <Checkbox
                                        checked={selectedBrands.includes(
                                            brand.id
                                        )}
                                        onChange={() =>
                                            handleBrandChange(brand.id)
                                        }
                                        style={{
                                            accentColor: '#C8965F',
                                        }}
                                    />
                                    <span
                                        className="text-sm font-medium"
                                        style={{ color: '#3C2415' }}
                                    >
                                        {brand.name}
                                    </span>
                                </div>
                            ))}

                            {brands.length > 4 && (
                                <Button
                                    className="w-full border text-sm"
                                    onClick={() =>
                                        setExpandedBrands(!expandedBrands)
                                    }
                                    style={{
                                        borderColor: '#C8965F',
                                        color: '#3C2415',
                                        backgroundColor: '#FAF6F0',
                                    }}
                                    type="dashed"
                                >
                                    {expandedBrands
                                        ? 'Thu gọn'
                                        : `Xem thêm (${brands.length - 4})`}
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Reset Filter Button */}
                    <Button
                        className="h-10 w-full font-medium text-white"
                        icon={<ReloadOutlined />}
                        onClick={handleResetFilters}
                        style={{
                            backgroundColor: '#C8965F',
                            borderColor: '#C8965F',
                        }}
                        type="primary"
                    >
                        Đặt lại bộ lọc
                    </Button>
                </div>
            </div>

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
