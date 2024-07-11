/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unstable-nested-components */
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import * as request from 'common/utils/http-request';
import {
    Button,
    DatePicker,
    Form,
    FormProps,
    Input,
    Select,
    Spin,
    Table,
    TableColumnsType,
    TableProps,
} from 'antd';
import type { QueryResponseType, Sorts } from 'common/types';
import type { OrderCms } from 'common/types/order';

import moment from 'moment';
import { currencyFormatter } from 'common/utils/formatter';

import { ORDER_STATUS, PAGE_SIZE } from 'common/constant';
import { toast } from 'react-toastify';
import { getSortOrder } from 'common/utils/getSortOrder';
import OrderDescription from './order-description';
import AssignSeller from './assign-seller';

type FormType = {
    id?: string;
    customer?: string;
    status?: string;
    date?: Date[];
};

type SearchParams = FormType & {
    pageSize?: number;
    currentPage?: number;
};

const { RangePicker } = DatePicker;

const OrderList = () => {
    const [searchParams, setSearchParams] = useState<SearchParams>({
        pageSize: PAGE_SIZE,
        currentPage: 1,
    });
    const [sortedInfo, setSortedInfo] = useState<Sorts<FormType>>({});

    const { data, isFetching, refetch } = useQuery<QueryResponseType<OrderCms>>(
        {
            queryKey: ['order-list-cms', sortedInfo],
            queryFn: () =>
                request
                    .get('order/list-order-cms', {
                        params: {
                            orderName: sortedInfo?.field,
                            order: getSortOrder(sortedInfo?.order),
                        },
                    })
                    .then((res) => res.data),
        }
    );

    const { mutate } = useMutation({
        mutationFn: ({
            orderId,
            status,
        }: {
            orderId: string;
            status: string;
        }) =>
            request
                .put(`order/update-status/${orderId}`, { status })
                .then((res) => res.data),
        onSuccess: (res) => {
            toast.success(res.message);
            refetch();
        },
        onError: () => {
            toast.error('Something went wrong!');
        },
    });

    const columns: TableColumnsType<Partial<OrderCms>> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Ordered Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: true,
            sortOrder:
                sortedInfo.columnKey === 'createdAt' ? sortedInfo.order : null,
            render(value) {
                return <div>{moment(value).format('YYYY-MM-DD HH:mm')}</div>;
            },
        },
        {
            title: 'Customer name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            sortOrder:
                sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
        },
        {
            title: 'Product',
            dataIndex: 'orderDetail',
            key: 'orderDetail',
            render(_, record) {
                return (
                    <div>
                        <div className="text-base font-medium">
                            {record?.orderDetail?.[0]?.productName}
                        </div>
                        <div className="text-slate-500">
                            {record?._count?.orderDetail} more product
                        </div>
                    </div>
                );
            },
        },
        {
            title: 'Total amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            sorter: true,
            sortOrder:
                sortedInfo.columnKey === 'totalAmount'
                    ? sortedInfo.order
                    : null,
            render(value) {
                return <div>{currencyFormatter(value)}</div>;
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            sorter: true,
            sortOrder:
                sortedInfo.columnKey === 'status' ? sortedInfo.order : null,
            render(value, record) {
                return (
                    <Select
                        className="w-[160px]"
                        onChange={(selected) => {
                            if (!record.id) {
                                return;
                            }
                            mutate({
                                orderId: record.id,
                                status: selected,
                            });
                        }}
                        optionFilterProp="label"
                        options={ORDER_STATUS}
                        placeholder="Select a person"
                        value={value}
                    />
                );
            },
        },
        {
            title: 'Assignee',
            dataIndex: 'seller',
            key: 'Assignee',
            render(_, record) {
                return (
                    <AssignSeller
                        orderId={record.id ?? ''}
                        reload={() => {
                            refetch();
                        }}
                        seller={record?.seller}
                    />
                );
            },
        },
    ];

    const handleTableChange: TableProps<Partial<OrderCms>>['onChange'] = (
        pagination,
        _,
        sorter
    ) => {
        setSearchParams((prev) => ({
            ...prev,
            pageSize: pagination.pageSize,
            currentPage: pagination.current,
        }));
        setSortedInfo(sorter as Sorts<FormType>);
    };

    const onFinish: FormProps<FormType>['onFinish'] = (values) => {
        // eslint-disable-next-line no-console
        console.log(values);
    };

    return (
        <Spin spinning={isFetching}>
            <div>
                <Form onFinish={onFinish}>
                    <Form.Item<FormType> label="ID" name="id">
                        <Input />
                    </Form.Item>
                    <Form.Item<FormType> label="Customer" name="customer">
                        <Input />
                    </Form.Item>
                    <Form.Item<FormType> label="Ordered date" name="date">
                        <RangePicker format="YYYY-MM-DD" />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">
                            Search
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div>
                <Table
                    columns={columns}
                    dataSource={data?.data}
                    expandable={{
                        expandedRowRender: (record: Partial<OrderCms>) => {
                            return <OrderDescription data={record} />;
                        },
                    }}
                    onChange={handleTableChange}
                    pagination={{
                        total: data?.pagination?.total,
                        defaultCurrent: 1,
                        current: searchParams?.currentPage,
                        pageSizeOptions: [5, 10, 20, 50],
                        showSizeChanger: true,
                        pageSize: searchParams?.pageSize,
                    }}
                    rowKey="id"
                />
            </div>
        </Spin>
    );
};

export default OrderList;
