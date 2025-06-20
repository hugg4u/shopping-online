import React, { useState } from 'react';
import { Button, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

type HeaderBarProps = {
    setSort: (sort: string) => void;
    setSortOrder: (sortOrder: string) => void;
    handleSearch: (
        page: number,
        sort?: string,
        sortOrder?: string,
        category?: string,
        searchTerm?: string,
        pageSize?: number,
        brand?: string[]
    ) => void;
    totalProducts: number;
};

const sortOptions = [
    { label: 'Thứ tự mặc định', value: 'default' },
    { label: 'Thứ tự theo điểm đánh giá', value: 'rating' },
    { label: 'Mới nhất', value: 'newest' },
    { label: 'Thứ tự theo giá: thấp đến cao', value: 'price_asc' },
    { label: 'Thứ tự theo giá: cao xuống thấp', value: 'price_desc' },
];

const HeaderBar: React.FC<HeaderBarProps> = ({
    setSort,
    setSortOrder,
    handleSearch,
    totalProducts,
}) => {
    const [selectedSort, setSelectedSort] = useState('default');

    const handleSortChange = (value: string) => {
        setSelectedSort(value);
        let sort = '';
        let order = '';

        switch (value) {
            case 'rating':
                sort = 'rating';
                order = 'desc';
                break;
            case 'newest':
                sort = 'createdAt';
                order = 'desc';
                break;
            case 'price_asc':
                sort = 'price';
                order = 'asc';
                break;
            case 'price_desc':
                sort = 'price';
                order = 'desc';
                break;
            default:
                sort = '';
                order = '';
        }

        setSort(sort);
        setSortOrder(order);
        handleSearch(1, sort, order);
    };

    // const items = (
    //     <Menu
    //         onClick={({ key }) => handleSortChange(key)}
    //         selectedKeys={[selectedSort]}
    //     >
    //         {sortOptions.map((option) => (
    //             <Menu.Item key={option.value}>{option.label}</Menu.Item>
    //         ))}
    //     </Menu>
    // );

    const items: MenuProps['items'] = sortOptions.map((option) => ({
        key: option.value,
        label: option.label,
        onClick: () => handleSortChange(option.value),
        selected: option.value === selectedSort,
    }));

    return (
        <div className="flex flex-col items-start justify-between gap-3 py-3 sm:flex-row sm:items-center sm:gap-0 sm:py-4">
            <div className="text-xs text-gray-600 sm:text-sm">
                Hiển thị {totalProducts} sản phẩm
            </div>
            <Dropdown
                menu={{ items }}
                placement="bottomRight"
                trigger={['click']}
            >
                <Button className="sm:size-default" size="small">
                    <Space>
                        <span className="hidden sm:inline">
                            {
                                sortOptions.find(
                                    (opt) => opt.value === selectedSort
                                )?.label
                            }
                        </span>
                        <span className="sm:hidden">Sắp xếp</span>
                        <DownOutlined className="ml-1 sm:ml-2" />
                    </Space>
                </Button>
            </Dropdown>
        </div>
    );
};

export default HeaderBar;
