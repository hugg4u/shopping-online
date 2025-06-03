import type { QueryResponseType } from '@shopping/common/types';
import type { Brand } from '@shopping/common/types/product';
import * as request from '@shopping/common/utils/http-request';
import { useQuery } from '@tanstack/react-query';
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
