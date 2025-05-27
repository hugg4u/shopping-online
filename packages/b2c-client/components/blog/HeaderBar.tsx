import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';

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
        pageSize?: number
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
            selected.push('desc');
        }
        if (currentSort === 'updatedAt' && currentSortOrder === 'asc') {
            selected.push('asc');
        }
        setSelectedItems(selected);
    }, [currentSort, currentSortOrder]);

    const handleSortChange = (sort: string, sortOrder: string) => {
        if (selectedItems.includes(sortOrder)) {
            setSort('');
            setSortOrder('');
            handleSearch(1);
            setSelectedItems([]);
        } else {
            setSort(sort);
            setSortOrder(sortOrder);
            handleSearch(1, sort, sortOrder);
            setSelectedItems([sortOrder]);
        }
    };

    return (
        <Header className="flex h-16 items-center justify-between border-b border-gray-200 bg-gradient-to-r from-white to-gray-50 px-6 shadow-sm">
            <div className="flex flex-grow items-center">
                <span className="mr-6 text-base font-semibold text-gray-700">
                    Sắp xếp theo
                </span>
                <Menu
                    className="flex flex-grow items-center border-b-0 bg-transparent"
                    mode="horizontal"
                    overflowedIndicator={null}
                >
                    <Menu.Item
                        className={`ml-4 flex h-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-md border-none bg-white px-4 leading-10 text-gray-600 shadow-sm transition-all duration-300 hover:bg-rose-500 hover:text-white hover:shadow-md ${selectedItems.includes('desc') ? 'bg-rose-500 text-white' : ''}`}
                        onClick={() => handleSortChange('updatedAt', 'desc')}
                    >
                        Mới nhất
                    </Menu.Item>
                    <Menu.Item
                        className={`ml-4 flex h-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-md border-none bg-white px-4 leading-10 text-gray-600 shadow-sm transition-all duration-300 hover:bg-rose-500 hover:text-white hover:shadow-md ${selectedItems.includes('asc') ? 'bg-rose-500 text-white' : ''}`}
                        onClick={() => handleSortChange('updatedAt', 'asc')}
                    >
                        Cũ nhất
                    </Menu.Item>
                </Menu>
            </div>
        </Header>
    );
};

export default HeaderBar;
