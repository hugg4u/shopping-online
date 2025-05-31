import React, { useMemo } from 'react';
import { Popover } from 'antd';
import Link from 'next/link';
import * as request from 'common/utils/http-request';
import { useQuery } from '@tanstack/react-query';
import type { QueryResponseType } from 'common/types';
import type { Category } from 'common/types/product';
import { DoubleRightOutlined } from '@ant-design/icons';

const CategoryPopover = () => {
    const { data } = useQuery<QueryResponseType<Category>>({
        queryKey: ['category-list'],
        queryFn: () => request.get('category').then((res) => res.data),
    });

    const content = useMemo(() => {
        if (data?.data && data?.data?.length === 0) {
            return (
                <div className="p-6 text-center" style={{ color: '#6B5B4F' }}>
                    <div className="mb-2 text-2xl">🍃</div>
                    Chưa có danh mục!
                </div>
            );
        }

        return (
            <div
                className="customScroll grid max-h-[500px] max-w-[800px] grid-cols-3 gap-4 rounded-lg"
                style={{
                    backgroundColor: '#FAF6F0',
                    border: '1px solid #E5DDD5',
                }}
            >
                {data?.data?.map((item) => (
                    <Link
                        className="group rounded-lg border p-3 transition-all duration-300 hover:shadow-md"
                        href={{
                            pathname: '/product',
                            query: {
                                category: item?.id,
                            },
                        }}
                        key={item.id}
                        style={{
                            borderColor: '#E5DDD5',
                            backgroundColor: '#F5F1E8',
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <DoubleRightOutlined
                                className="text-sm transition-colors duration-300"
                                style={{ color: '#C8965F' }}
                            />
                            <p
                                className="line-clamp-1 font-medium transition-colors duration-300"
                                style={{
                                    color: '#3C2415',
                                    margin: 0,
                                }}
                            >
                                {item?.name}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        );
    }, [data]);

    return (
        <Popover content={content} placement="bottom" title="" zIndex={50}>
            <Link className="font-semibold uppercase" href="/product">
                Danh mục
            </Link>
        </Popover>
    );
};

export default CategoryPopover;
