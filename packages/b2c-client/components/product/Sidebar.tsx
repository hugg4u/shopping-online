import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Input, Layout, Menu } from 'antd';
import LatestProductCard from './LatestProductCard';

const { Sider } = Layout;
const { Search } = Input;

type SidebarProps = {
    categories: {
        id: string;
        name: string;
    }[];
    brands: {
        id: string;
        name: string;
    }[];
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
        let updatedSelectedBrands;
        if (selectedBrands.includes(brand)) {
            updatedSelectedBrands = selectedBrands.filter((b) => b !== brand);
        } else {
            updatedSelectedBrands = [...selectedBrands, brand];
        }
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

    const onSearch = (value: string) => {
        handleSearch(
            1,
            currentSort,
            currentSortOrder,
            selectedCategory,
            value,
            undefined,
            selectedBrands
        );
    };

    const visibleCategories = expandedCategories
        ? categories
        : categories.slice(0, 3);
    const visibleBrands = expandedBrands ? brands : brands.slice(0, 3);

    return (
        <Sider
            className="fixed bottom-6 left-6 top-6 w-[280px] overflow-y-auto rounded-l-lg border-r border-gray-200 bg-gradient-to-b from-white to-gray-50 p-4 shadow-xl"
            style={{ backgroundColor: 'transparent' }}
            width={320}
        >
            <div className="mb-6">
                <Search
                    className="rounded-lg shadow-sm"
                    enterButton
                    onSearch={onSearch}
                    placeholder="Nhập tên sản phẩm để tìm kiếm..."
                />
            </div>
            <div className="mb-8">
                <div className="mb-4 text-lg font-bold text-gray-800">
                    <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                        Tất Cả Danh Mục
                    </span>
                </div>
                <Menu
                    className="bg-transparent"
                    mode="inline"
                    selectedKeys={[selectedCategory || '']}
                    style={{ borderRight: 0, backgroundColor: 'transparent' }}
                >
                    {visibleCategories.map((category) => (
                        <Menu.Item
                            className="rounded-md font-medium text-gray-700 hover:bg-rose-50 hover:text-rose-600"
                            key={category.id}
                            onClick={() => handleCategoryChange(category.id)}
                        >
                            {category.name}
                        </Menu.Item>
                    ))}
                    {categories.length > 3 && (
                        <Menu.Item
                            className="rounded-md font-medium text-gray-700 hover:bg-rose-50 hover:text-rose-600"
                            key="toggle"
                        >
                            <Button
                                className="w-full pl-0 text-left text-rose-600 hover:text-rose-700"
                                onClick={() =>
                                    setExpandedCategories(!expandedCategories)
                                }
                                type="link"
                            >
                                {expandedCategories ? 'Rút gọn' : 'Thêm'}
                            </Button>
                        </Menu.Item>
                    )}
                </Menu>
            </div>
            <div className="mb-8">
                <div className="mb-4 text-lg font-bold text-gray-800">
                    <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                        Thương Hiệu
                    </span>
                </div>
                <div className="flex flex-col space-y-2">
                    {visibleBrands.map((brand) => (
                        <Checkbox
                            checked={selectedBrands.includes(brand.id)}
                            className="rounded-md p-2 hover:bg-rose-50"
                            key={brand.id}
                            onChange={() => handleBrandChange(brand.id)}
                        >
                            <span className="font-medium text-gray-700">
                                {brand.name}
                            </span>
                        </Checkbox>
                    ))}
                    {brands.length > 3 && (
                        <div key="toggle">
                            <Button
                                className="w-full pl-0 text-left text-rose-600 hover:text-rose-700"
                                onClick={() =>
                                    setExpandedBrands(!expandedBrands)
                                }
                                type="link"
                            >
                                {expandedBrands ? 'Rút gọn' : 'Thêm'}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <Button
                className="mb-6 w-full cursor-pointer rounded-lg border-none bg-gradient-to-r from-rose-500 to-pink-500 py-3 text-center font-bold text-white shadow-md transition-all duration-300 hover:from-rose-600 hover:to-pink-600 hover:shadow-lg"
                onClick={handleResetFilters}
                type="primary"
            >
                Xóa bộ lọc
            </Button>
            <div className="my-6 border-b border-gray-200" />
            <div className="mt-6">
                <div className="mb-4 text-lg font-bold text-gray-800">
                    <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                        Sản phẩm mới nhất
                    </span>
                </div>
                <div className="space-y-3">
                    {latestProducts.map((product) => (
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
        </Sider>
    );
};

Sidebar.defaultProps = {
    currentSort: '',
    currentSortOrder: '',
    currentCategory: '',
    currentBrand: [],
};

export default Sidebar;
