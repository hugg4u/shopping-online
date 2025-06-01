import React, { useMemo } from 'react';
import { Popover } from 'antd';
import Link from 'next/link';
import * as request from 'common/utils/http-request';
import { useQuery } from '@tanstack/react-query';
import type { QueryResponseType } from 'common/types';
import type { Brand } from 'common/types/product';
import { SiderItem } from './sider-item';

const BrandPopover = () => {
    const { data } = useQuery<QueryResponseType<Brand>>({
        queryKey: ['brand'],
        queryFn: () => request.get('brand').then((res) => res.data),
    });

    return (
        <div className="flex flex-row gap-6">
            {data?.data?.map((item) => (
                <SiderItem
                    href="/product"
                    key={item.id}
                    query={{ brand: item.id ?? '' }}
                    title={item.name ?? ''}
                />
            ))}
        </div>
    );
};

export default BrandPopover;
