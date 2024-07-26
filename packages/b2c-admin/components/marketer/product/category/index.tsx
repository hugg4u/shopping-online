import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import * as request from 'common/utils/http-request';
import { Button, Space, Spin, Table, TableColumnsType, TableProps } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getSortOrder } from 'common/utils/getSortOrder';
import { Category } from '~/types/product';
import { Pagination, QueryResponseType, Sorts } from '~/types';
import CategoryFormModal from './category-form-modal';

type FormType = {
    search?: string;
};

const ListCategory = () => {
    const [paginationQuery, setPaginationQuery] = useState<Partial<Pagination>>(
        {
            current: 1,
            pageSize: 5,
        }
    );
    const [sortedInfo, setSortedInfo] = useState<Sorts<FormType>>({});

    const { data, isLoading } = useQuery<QueryResponseType<Category>>({
        queryKey: ['list-category-manage', paginationQuery, sortedInfo],
        queryFn: () =>
            request
                .get('manage/category', {
                    params: {
                        pageSize: paginationQuery.pageSize,
                        currentPage: paginationQuery.current,
                        sortBy: sortedInfo.field,
                        sortOrder: getSortOrder(sortedInfo.order),
                    },
                })
                .then((res) => res.data),
    });

    const columns: TableColumnsType<Category> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
            sortOrder:
                sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
        },
        {
            title: 'Create At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: true,
            sortOrder:
                sortedInfo.columnKey === 'createdAt' ? sortedInfo.order : null,
            render: (value: Date) => (
                <p>{value ? moment(value).format('YYYY-MM-DD') : ''}</p>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 150,
            render: () => (
                <Space>
                    <Button icon={<EditOutlined />} type="link" />
                    <Button danger icon={<DeleteOutlined />} type="link" />
                </Space>
            ),
        },
    ];

    const handleTableChange: TableProps<Category>['onChange'] = (
        pagination,
        _,
        sorter
    ) => {
        setPaginationQuery({
            current: pagination.current,
            pageSize: pagination.pageSize,
        });
        setSortedInfo(sorter as Sorts<FormType>);
    };

    return (
        <Spin spinning={isLoading}>
            <div className="space-y-4">
                <div>Form</div>
                <div>
                    <CategoryFormModal />
                </div>
                <Table
                    columns={columns}
                    dataSource={data?.data}
                    onChange={handleTableChange}
                    pagination={{
                        total: data?.pagination?.total,
                        current: paginationQuery.current,
                        pageSize: paginationQuery.pageSize,
                        defaultPageSize: paginationQuery.pageSize,
                        pageSizeOptions: [5, 10, 20, 50],
                        showSizeChanger: true,
                    }}
                />
            </div>
        </Spin>
    );
};

export default ListCategory;
