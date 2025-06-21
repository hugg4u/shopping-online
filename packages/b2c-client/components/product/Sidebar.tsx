import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { get } from '@shopping/common/utils/http-request';
import { Button, Checkbox, Slider } from 'antd';
import { useRouter } from 'next/router';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { ReloadOutlined } from '@ant-design/icons';

type Category = {
    id: string;
    name: string;
};

type SidebarProps = {
    onPriceRangeChange?: (minPrice: number, maxPrice: number) => void;
    onCategoryChange?: (categoryId: string) => void;
    onResetFilters?: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({
    onPriceRangeChange,
    onCategoryChange,
    onResetFilters,
}) => {
    const router = useRouter();
    const { category: currentCategory } = router.query;

    // Query lấy danh sách danh mục
    const { data: categories } = useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: () => get('category').then((res) => res.data.data),
    });

    // Query lấy khoảng giá
    const { data: priceRangeData } = useQuery({
        queryKey: ['priceRange'],
        queryFn: () => get('product/search').then((res) => res.data.priceRange),
    });

    // State cho khoảng giá
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);

    // Cập nhật state khi có dữ liệu từ API
    useEffect(() => {
        if (priceRangeData) {
            setPriceRange([priceRangeData.min, priceRangeData.max]);
        }
    }, [priceRangeData]);

    // Xử lý khi thay đổi danh mục
    const handleCategoryChange = (
        e: CheckboxChangeEvent,
        categoryId: string
    ) => {
        if (onCategoryChange) {
            onCategoryChange(e.target.checked ? categoryId : '');
        }
    };

    // Xử lý khi thay đổi khoảng giá
    const handlePriceRangeChange = (value: [number, number]) => {
        setPriceRange(value);
        if (onPriceRangeChange) {
            onPriceRangeChange(value[0], value[1]);
        }
    };

    // Xử lý đặt lại bộ lọc
    const handleReset = () => {
        if (onResetFilters) {
            onResetFilters();
        }
        if (priceRangeData) {
            setPriceRange([priceRangeData.min, priceRangeData.max]);
        }
    };

    return (
        <div className="space-y-4 rounded-lg bg-gray-50 p-4 sm:space-y-6 lg:space-y-8 lg:rounded-none lg:bg-transparent lg:p-0">
            {/* Lọc theo danh mục */}
            <div>
                <div className="mb-3 flex items-center justify-between sm:mb-4">
                    <h3 className="text-base font-medium sm:text-lg">
                        Lọc theo danh mục
                    </h3>
                    {currentCategory && (
                        <Button
                            icon={<ReloadOutlined />}
                            onClick={handleReset}
                            size="small"
                            type="text"
                        >
                            Đặt lại
                        </Button>
                    )}
                </div>
                <div className="space-y-2">
                    {categories?.map((category) => (
                        <div className="flex items-center" key={category.id}>
                            <Checkbox
                                checked={currentCategory === category.id}
                                onChange={(e) =>
                                    handleCategoryChange(e, category.id)
                                }
                            >
                                <span className="text-xs text-gray-700 sm:text-sm">
                                    {category.name}
                                </span>
                            </Checkbox>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lọc theo khoảng giá */}
            <div>
                <h3 className="mb-3 text-base font-medium sm:mb-4 sm:text-lg">
                    Lọc trong khoảng giá
                </h3>
                <div className="px-2">
                    <Slider
                        max={priceRangeData?.max || 0}
                        min={priceRangeData?.min || 0}
                        onChange={(value) =>
                            handlePriceRangeChange(value as [number, number])
                        }
                        range
                        step={1000}
                        value={priceRange}
                    />
                    <div className="mt-2 flex items-center justify-between text-xs text-gray-600 sm:text-sm">
                        <span>{priceRange[0].toLocaleString('vi-VN')} VND</span>
                        <span>-</span>
                        <span>{priceRange[1].toLocaleString('vi-VN')} VND</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

Sidebar.defaultProps = {
    onPriceRangeChange: () => {},
    onCategoryChange: () => {},
    onResetFilters: () => {},
};

export default Sidebar;
