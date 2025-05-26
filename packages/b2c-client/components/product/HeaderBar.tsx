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
        <Header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
            <div className="flex flex-grow items-center">
                <span className="mr-4 text-base text-gray-600">
                    Sắp xếp theo
                </span>
                <Menu
                    className="flex flex-grow items-center border-b-0 bg-white"
                    mode="horizontal"
                    overflowedIndicator={null}
                >
                    <Menu.Item
                        onClick={() => handleSortChange('updatedAt', 'desc')}
                    >
                        Mới Nhất
                    </Menu.Item>

                    <Dropdown
                        overlay={
                            <Menu
                                onClick={(e) => {
                                    const sortOrder = e.key as string;
                                    handleSortChange(
                                        'discount_price',
                                        sortOrder
                                    );
                                }}
                            >
                                <Menu.Item key="asc">
                                    Giá thấp đến cao
                                </Menu.Item>
                                <Menu.Item key="desc">
                                    Giá cao đến thấp
                                </Menu.Item>
                            </Menu>
                        }
                        trigger={['click']}
                    >
                        <Menu.Item
                            className="ml-4 flex h-10 flex-shrink-0 cursor-pointer items-center justify-center rounded border-none bg-white px-4 leading-10 text-gray-600 transition-all duration-300 hover:bg-red-500 hover:text-white"
                            key="4"
                        >
                            Giá <DownOutlined />
                        </Menu.Item>
                    </Dropdown>
                </Menu>
            </div>
        </Header>
    );
};

export default HeaderBar;
