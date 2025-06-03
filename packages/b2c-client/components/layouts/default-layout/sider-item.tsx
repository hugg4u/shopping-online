import { HomeOutlined } from '@ant-design/icons';
import { cn } from '@shopping/common/utils';
import Link from 'next/link';
import React from 'react';

type SiderItemProps = {
    title: string;
    href: string;
    query?: Record<string, string | number | boolean>;
};
export const SiderItem: React.FC<SiderItemProps> = ({ title, href, query }) => {
    return (
        <Link
            className={cn('font-semibold uppercase')}
            href={{ pathname: href, query }}
        >
            {title === 'Trang chủ' ? (
                <HomeOutlined style={{ fontSize: '1.2rem' }} />
            ) : (
                title
            )}
        </Link>
    );
};

SiderItem.defaultProps = {
    query: undefined,
};
