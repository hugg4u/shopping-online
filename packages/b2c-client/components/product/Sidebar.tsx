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
            className="fixed bottom-6 left-6 top-6 w-[260px] overflow-y-auto rounded-md border bg-white p-2.5"
            style={{ backgroundColor: 'white' }}
            width={300}
        >
            <div className="mb-4">
                <Search
                    enterButton
                    onSearch={onSearch}
                    placeholder="Nhập tên sản phẩm để tìm kiếm..."
                />
            </div>
            <div className="mb-6">
                <div className="mb-4 text-base font-bold">
                    <span className="text-base font-bold">Tất Cả Danh Mục</span>
                </div>
                <Menu
                    mode="inline"
                    selectedKeys={[selectedCategory || '']}
                    style={{ borderRight: 0 }}
                >
                    {visibleCategories.map((category) => (
                        <Menu.Item
                            className="text-primary font-bold"
                            key={category.id}
                            onClick={() => handleCategoryChange(category.id)}
                        >
                            {category.name}
                        </Menu.Item>
                    ))}
                    {categories.length > 3 && (
                        <Menu.Item
                            className="text-primary font-bold"
                            key="toggle"
                        >
                            <Button
                                className="w-full pl-0 text-left"
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
            <div className="mb-6">
                <div className="mb-4 text-base font-bold">
                    <span className="text-base font-bold">Thương Hiệu</span>
                </div>
                <div className="flex flex-col">
                    {visibleBrands.map((brand) => (
                        <Checkbox
                            checked={selectedBrands.includes(brand.id)}
                            className="mb-2"
                            key={brand.id}
                            onChange={() => handleBrandChange(brand.id)}
                        >
                            {brand.name}
                        </Checkbox>
                    ))}
                    {brands.length > 3 && (
                        <div key="toggle">
                            <Button
                                className="w-full pl-0 text-left"
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
                className="bg-primary mt-2.5 w-full cursor-pointer rounded-md border-none text-center font-bold text-white transition-colors duration-500 hover:bg-red-600 hover:text-white"
                onClick={handleResetFilters}
                type="link"
            >
                Xóa bộ lọc
            </Button>
            <div className="my-5 border-b border-gray-200" />
            <div className="mt-5">
                <div className="mb-4 text-base font-bold">
                    <span className="text-base font-bold">
                        Sản phẩm mới nhất
                    </span>
                </div>
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
