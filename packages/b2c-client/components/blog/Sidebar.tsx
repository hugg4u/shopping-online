import React, { useEffect, useState } from 'react';
import { Button, Input, Layout, Menu } from 'antd';

import { useQuery } from '@tanstack/react-query';
import * as request from 'common/utils/http-request';
import { QueryResponseType } from 'common/types';
import { Category } from 'common/types/product';
import LatestBlogCard from './LatestBlogCard';

const { Sider } = Layout;
const { Search } = Input;

type SidebarProps = {
    setCategory?: (category: string) => void;
    handleResetFilters?: () => void;
    handleSearch?: (
        page: number,
        sort?: string,
        sortOrder?: string,
        category?: string,
        searchTerm?: string,
        pageSize?: number
    ) => void;
    currentSort?: string;
    currentSortOrder?: string;
    currentCategory?: string;
    isDetailPage?: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({
    setCategory,
    handleResetFilters,
    handleSearch,
    currentSort,
    currentSortOrder,
    currentCategory,
    isDetailPage = false,
}) => {
    const [expandedCategories, setExpandedCategories] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<
        string | undefined
    >(currentCategory);

    const { data: categories } = useQuery<QueryResponseType<Category>>({
        queryKey: ['blog-categories'],
        queryFn: () => request.get('post-category').then((res) => res.data),
    });

    const { data: latestBlogs } = useQuery({
        queryKey: ['latest-blogs'],
        queryFn: () =>
            request
                .get('post-search', {
                    params: {
                        limit: 5,
                        sortBy: 'createdAt',
                        sortOrder: 'desc',
                    },
                })
                .then((res) => res.data.data),
    });

    useEffect(() => {
        setSelectedCategory(currentCategory);
    }, [currentCategory]);

    const handleCategoryChange = (category: string) => {
        if (!setCategory || !handleSearch) return;

        if (selectedCategory === category) {
            setCategory('');
            setSelectedCategory('');
            handleSearch(
                1,
                currentSort,
                currentSortOrder,
                '',
                undefined,
                undefined
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
                undefined
            );
        }
    };

    const onSearch = (value: string) => {
        if (!handleSearch) return;
        handleSearch(
            1,
            currentSort,
            currentSortOrder,
            selectedCategory,
            value,
            undefined
        );
    };

    const visibleCategories = expandedCategories
        ? categories?.data || []
        : (categories?.data || []).slice(0, 3);

    return (
        <Sider
            className="fixed bottom-6 left-6 top-6 w-[280px] overflow-y-auto rounded-l-lg border-r border-gray-200 bg-gradient-to-b from-white to-gray-50 p-4 shadow-xl"
            style={{ backgroundColor: 'transparent' }}
            width={320}
        >
            {!isDetailPage && (
                <div className="mb-6">
                    <Search
                        className="rounded-lg shadow-sm"
                        enterButton
                        onSearch={onSearch}
                        placeholder="Tìm kiếm bài viết..."
                    />
                </div>
            )}

            {!isDetailPage && (
                <div className="mb-8">
                    <div className="mb-4 text-lg font-bold text-gray-800">
                        <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                            Danh mục
                        </span>
                    </div>
                    <Menu
                        className="bg-transparent"
                        mode="inline"
                        selectedKeys={[selectedCategory || '']}
                        style={{
                            borderRight: 0,
                            backgroundColor: 'transparent',
                        }}
                    >
                        {visibleCategories.map((category) => (
                            <Menu.Item
                                className="rounded-md font-medium text-gray-700 hover:bg-rose-50 hover:text-rose-600"
                                key={category.id}
                                onClick={() =>
                                    handleCategoryChange(category.id || '')
                                }
                            >
                                {category.name}
                            </Menu.Item>
                        ))}
                        {(categories?.data?.length || 0) > 3 && (
                            <Menu.Item
                                className="rounded-md font-medium text-gray-700 hover:bg-rose-50 hover:text-rose-600"
                                key="toggle"
                            >
                                <Button
                                    className="w-full pl-0 text-left text-rose-600 hover:text-rose-700"
                                    onClick={() =>
                                        setExpandedCategories(
                                            !expandedCategories
                                        )
                                    }
                                    type="link"
                                >
                                    {expandedCategories ? 'Rút gọn' : 'Thêm'}
                                </Button>
                            </Menu.Item>
                        )}
                    </Menu>
                </div>
            )}

            {!isDetailPage && handleResetFilters && (
                <Button
                    className="mb-6 w-full cursor-pointer rounded-lg border-none bg-gradient-to-r from-rose-500 to-pink-500 py-3 text-center font-bold text-white shadow-md transition-all duration-300 hover:from-rose-600 hover:to-pink-600 hover:shadow-lg"
                    onClick={handleResetFilters}
                    type="primary"
                >
                    Xóa bộ lọc
                </Button>
            )}

            <div className="my-6 border-b border-gray-200" />

            <div className="mt-6">
                <div className="mb-4 text-lg font-bold text-gray-800">
                    <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                        Blog mới nhất
                    </span>
                </div>
                <div className="space-y-3">
                    {latestBlogs?.map(
                        (blog: {
                            id: string;
                            title: string;
                            thumbnail: string;
                        }) => (
                            <LatestBlogCard
                                id={blog.id}
                                key={blog.id}
                                thumbnail={blog.thumbnail}
                                title={blog.title}
                            />
                        )
                    )}
                </div>
            </div>
        </Sider>
    );
};

Sidebar.defaultProps = {
    setCategory: undefined,
    handleResetFilters: undefined,
    handleSearch: undefined,
    currentSort: '',
    currentSortOrder: '',
    currentCategory: '',
    isDetailPage: false,
};

export default Sidebar;
