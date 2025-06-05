import React, { useEffect, useState } from 'react';
import { Dropdown, Layout, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { Header } = Layout;

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
    currentSort: string;
    currentSortOrder: string;
};

const HeaderBar: React.FC<HeaderBarProps> = ({
    setSort,
    setSortOrder,
    handleSearch,
    currentSort,
    currentSortOrder,
}) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    useEffect(() => {
        const selected: string[] = [];
        if (currentSort === 'updatedAt' && currentSortOrder === 'desc') {
            selected.push('2');
        }
        if (currentSort === 'discount_price') {
            selected.push(`discount_price-${currentSortOrder}`);
        }
        setSelectedItems(selected);
    }, [currentSort, currentSortOrder]);

    const handleSortChange = (sort: string, sortOrder: string) => {
        if (
            selectedItems.includes(`${sort}-${sortOrder}`) ||
            (sort === 'updatedAt' &&
                sortOrder === 'desc' &&
                selectedItems.includes('2'))
        ) {
            setSort('');
            setSortOrder('');
            handleSearch(1);
            setSelectedItems([]);
        } else {
            setSort(sort);
            setSortOrder(sortOrder);
            handleSearch(1, sort, sortOrder);
            setSelectedItems([`${sort}-${sortOrder}`]);
        }
    };

    return (
        <div
            className="flex h-16 items-center justify-between border-b px-6"
            style={{
                backgroundColor: '#ffff',
                borderBottomColor: '#ffff',
            }}
        >
            <div className="flex flex-grow items-center">
                <span className="mr-6 text-base font-semibold">
                    Sắp xếp theo
                </span>
                <Menu
                    className="flex flex-grow items-center border-b-0 bg-transparent"
                    mode="horizontal"
                    overflowedIndicator={null}
                >
                    <Menu.Item
                        className="rounded-md font-medium transition-all duration-300"
                        onClick={() => handleSortChange('updatedAt', 'desc')}
                        style={{
                            color: selectedItems.includes('2')
                                ? '#C8965F'
                                : '#6B5B4F',
                            backgroundColor: selectedItems.includes('2')
                                ? '#FAF6F0'
                                : 'transparent',
                        }}
                    >
                        Mới Nhất
                    </Menu.Item>
                </Menu>
            </div>
        </div>
    );
};

export default HeaderBar;
