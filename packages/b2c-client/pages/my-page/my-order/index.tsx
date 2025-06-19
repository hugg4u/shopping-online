import { SearchOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Input, Pagination, Tabs, TabsProps } from 'antd';
import { PAGE_SIZE_CLIENT } from '@shopping/common/constant';
import { QueryResponseType } from '@shopping/common/types';
import { Order, orderStatus } from '@shopping/common/types/order';
import * as request from '@shopping/common/utils/http-request';
import { NextPage } from 'next';
import { useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import { Spin } from '@shopping/common/components/spin';
import { OrderCard } from '~/components/order/order-card';

const items: TabsProps['items'] = Object.entries(orderStatus).map(
    ([key, value]) => ({
        key,
        label: value,
    })
);

items.unshift({ key: '', label: 'Tất cả' });

type SearchParams = {
    pageSize?: number;
    currentPage?: number;
    status?: string;
};

const MyOrder: NextPage = () => {
    const [searchParams, setSearchParams] = useState<SearchParams>({
        pageSize: PAGE_SIZE_CLIENT,
        currentPage: 1,
    });

    const [searchValue, setSearchValue] = useState<string>();

    const [searchDebounce, setSearchDebounce] = useDebounceValue(
        searchValue,
        500
    );

    const {
        data: listOrder,
        isLoading,
        refetch,
    } = useQuery<QueryResponseType<Order>>({
        queryKey: ['my-order', searchParams, searchDebounce],
        queryFn: () =>
            request
                .get('/my-order', {
                    params: {
                        ...searchParams,
                        search: searchDebounce,
                    },
                })
                .then((res) => res.data),
    });

    return (
        <div className="w-full">
            <div>
                <Spin spinning={isLoading} />
                <Tabs
                    centered
                    className="mb-4 sm:mb-6"
                    defaultActiveKey="1"
                    items={items}
                    onChange={(key: string) => {
                        setSearchParams({
                            ...searchParams,
                            status: key,
                        });
                    }}
                    size="large"
                />
                <div className="mb-6 flex w-full justify-center">
                    <Input
                        allowClear
                        className="max-w-full rounded-full"
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                            setSearchDebounce(e.target.value);
                        }}
                        placeholder="Nhập mã đơn hàng hoặc tên sản phẩm..."
                        prefix={<SearchOutlined className="text-slate-400" />}
                        size="large"
                        style={{ width: '100%', maxWidth: '800px' }}
                    />
                </div>
                {listOrder?.data && listOrder?.data?.length > 0 ? (
                    <div className="w-full">
                        <div className="space-y-4">
                            {listOrder?.data?.map((order) => (
                                <OrderCard
                                    key={order.id}
                                    order={order as Order}
                                    reload={() => refetch()}
                                />
                            ))}
                        </div>

                        <div className="mt-6 flex w-full justify-center sm:mt-8 sm:justify-end">
                            {listOrder?.pagination?.total ? (
                                <Pagination
                                    className="sm:size-default"
                                    current={searchParams?.currentPage}
                                    defaultCurrent={1}
                                    onChange={(page, pageSize) => {
                                        setSearchParams((prev) => ({
                                            ...prev,
                                            currentPage: page,
                                            pageSize,
                                        }));
                                        setTimeout(() => {
                                            refetch();
                                        });
                                    }}
                                    pageSize={searchParams?.pageSize}
                                    size="small"
                                    total={listOrder?.pagination?.total}
                                />
                            ) : null}
                        </div>
                    </div>
                ) : (
                    <div className="flex h-[300px] w-full flex-col items-center justify-center space-y-4 sm:h-[400px]">
                        <div>
                            <ShoppingOutlined className="text-6xl text-slate-400 sm:text-8xl" />
                        </div>
                        <div className="px-4 text-center text-base sm:text-lg">
                            Chưa có đơn hàng nào.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrder;
