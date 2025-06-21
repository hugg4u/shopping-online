import { Button, Popover } from 'antd';
import { Cart } from '@shopping/common/types/cart';
import { getImageUrl } from '@shopping/common/utils/getImageUrl';
import React, { useMemo } from 'react';
import Image from 'next/image';
import { currencyFormatter } from '@shopping/common/utils/formatter';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import * as request from '@shopping/common/utils/http-request';
import { QueryResponseGetOneType } from '@shopping/common/types';
import { Product } from '@shopping/common/types/product';
import { useAuth } from '~/hooks/useAuth';
import useCartStore from '~/hooks/useCartStore';

type Props = {
    children: React.ReactNode;
    data?: Cart[];
    total?: number;
};

type CartStorePopoverItemProps = {
    productId: string;
};

const CartStorePopoverItem: React.FC<CartStorePopoverItemProps> = ({
    productId,
}) => {
    const router = useRouter();

    const { data } = useQuery<QueryResponseGetOneType<Product>>({
        queryKey: ['product-info-cart', productId],
        queryFn: () =>
            request
                .get(`productPublicInfo/${productId}`)
                .then((res) => res.data),
        enabled: !!productId,
    });

    return (
        <div
            className="cursor-pointer rounded-md p-2 transition-colors hover:bg-gray-50"
            key={data?.data?.id}
            onClick={() => router.push(`/product/${data?.data?.id}`)}
            role="presentation"
        >
            <div className="flex items-center gap-2 sm:gap-3">
                <Image
                    alt=""
                    className="flex-shrink-0 rounded-md border object-cover"
                    height={40}
                    src={getImageUrl(data?.data?.thumbnail ?? '')}
                    width={40}
                />
                <div className="line-clamp-1 flex-1 pr-2 text-sm sm:text-base">
                    {data?.data?.name}
                </div>
                <div className="text-primary min-w-[60px] text-right text-xs font-medium sm:min-w-[80px] sm:text-sm">
                    {data?.data?.discount_price
                        ? currencyFormatter(data?.data?.discount_price)
                        : currencyFormatter(data?.data?.original_price ?? 0)}
                </div>
            </div>
        </div>
    );
};

const CartPopover: React.FC<Props> = ({ children, data, total }) => {
    const router = useRouter();
    const auth = useAuth();

    const { data: cartStoreData } = useCartStore();

    const content = useMemo(() => {
        if (!total) {
            return (
                <div className="text-primary py-4 text-center text-sm sm:py-5 sm:text-base">
                    Chưa có sản phẩm!
                </div>
            );
        }
        if (!auth) {
            return (
                <div className="mt-5 grid grid-cols-1 gap-2">
                    {cartStoreData?.map((item) => (
                        <CartStorePopoverItem
                            key={item?.productId}
                            productId={item.productId}
                        />
                    ))}
                    <div className="mt-2 flex justify-end border-t border-gray-100 py-3">
                        <Link href="/cart-details">
                            <Button
                                className="sm:size-default"
                                size="small"
                                type="primary"
                            >
                                <span className="hidden sm:inline">
                                    Xem giỏ hàng
                                </span>
                                <span className="sm:hidden">Giỏ hàng</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            );
        }
        return (
            <div className="mt-5 grid grid-cols-1 gap-2">
                {data?.map((item) => (
                    <div
                        className="cursor-pointer rounded-md p-2 transition-colors hover:bg-gray-50"
                        key={item.id}
                        onClick={() =>
                            router.push(`/product/${item?.product?.id}`)
                        }
                        role="presentation"
                    >
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Image
                                alt=""
                                className="flex-shrink-0 rounded-md border object-cover"
                                height={40}
                                src={getImageUrl(
                                    item?.product?.thumbnail ?? ''
                                )}
                                width={40}
                            />
                            <div className="line-clamp-1 flex-1 pr-2 text-sm sm:text-base">
                                {item?.product?.name}
                            </div>
                            <div className="text-primary min-w-[60px] text-right text-xs font-medium sm:min-w-[80px] sm:text-sm">
                                {item?.product?.discount_price
                                    ? currencyFormatter(
                                          item?.product?.discount_price
                                      )
                                    : currencyFormatter(
                                          item?.product?.original_price ?? 0
                                      )}
                            </div>
                        </div>
                    </div>
                ))}
                <div className="mt-2 flex justify-end border-t border-gray-100 py-3">
                    <Link href="/cart-details">
                        <Button
                            className="sm:size-default"
                            size="small"
                            type="primary"
                        >
                            <span className="hidden sm:inline">
                                Xem giỏ hàng
                            </span>
                            <span className="sm:hidden">Giỏ hàng</span>
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }, [data, total]);

    return (
        <Popover
            content={
                <div className="w-[280px] max-w-[calc(100vw-40px)] sm:w-[350px]">
                    {content}
                </div>
            }
            placement="bottomRight"
            title={
                <div className="font-normal text-slate-500">
                    Sản phẩm mới thêm
                </div>
            }
            trigger="click"
        >
            {children}
        </Popover>
    );
};

CartPopover.defaultProps = {
    data: undefined,
    total: undefined,
};

export default CartPopover;
