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
        <div className="space-y-8">
            {/* Lọc theo danh mục */}
            <div>
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-medium">Lọc theo danh mục</h3>
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
                                <span className="text-sm text-gray-700">
                                    {category.name}
                                </span>
                            </Checkbox>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lọc theo khoảng giá */}
            <div>
                <h3 className="mb-4 text-lg font-medium">
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
                    <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
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
