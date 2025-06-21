import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Product } from '@shopping/common/types/product';
import { Button, Rate, Space } from 'antd';
import { currencyFormatter } from '@shopping/common/utils/formatter';
import { cn } from '@shopping/common/utils';
import {
    MinusOutlined,
    PlusOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import * as request from '@shopping/common/utils/http-request';
import { toast } from 'react-toastify';
import { QueryResponseGetOneType } from '@shopping/common/types';
import { Cart } from '@shopping/common/types/cart';
import * as analytics from '~/lib/analytics';
import ProductImageSlider from './product-image-slider';
import useCartStore from '~/hooks/useCartStore';
import { useAuth } from '~/hooks/useAuth';
import { useCartQuery } from '~/hooks/useCartQuery';
import Feedback from './feedback';
import Comment from './comment';

type Props = {
    data?: Product;
};

type ProductSpecificationsProps = {
    title: string;
    name: string;
};

type AddToCartRequest = {
    productId: string;
    quantity: number;
};

const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({
    title,
    name,
}) => {
    return (
        <div className="flex flex-col gap-1 text-sm sm:grid sm:grid-cols-10 sm:gap-0 sm:text-base">
            <div className="font-medium text-slate-500 sm:col-span-2 sm:font-normal">
                {title}
            </div>
            <div className="sm:col-span-6">{name}</div>
        </div>
    );
};

const ProductDetail: React.FC<Props> = ({ data }) => {
    const router = useRouter();
    const auth = useAuth();
    const { addProduct } = useCartStore();
    const { reload } = useCartQuery();

    useEffect(() => {
        if (data) {
            analytics.trackProductView({
                id: data.id,
                name: data.name,
                price: data.discount_price || data.original_price || 0,
                category: data.category?.name,
            });
        }
    }, [data]);

    const { mutateAsync: addToCartTrigger } = useMutation({
        mutationFn: ({
            productId,
            quantity,
        }: AddToCartRequest): Promise<QueryResponseGetOneType<Cart>> =>
            request
                .post('cart/add', { productId, quantity })
                .then((res) => res.data),

        onError: () => {
            toast.error('Có lỗi xảy ra. Vui long thử lại!');
        },
    });

    const [buyQuantity, setByQuantity] = useState<number>(1);

    useEffect(() => {
        setByQuantity(1);
    }, [data?.id]);

    useLayoutEffect(() => {
        if (data?.quantity && data?.quantity >= 0) {
            if (buyQuantity <= 0) {
                setByQuantity(1);
            } else if (data?.quantity && buyQuantity > data?.quantity) {
                setByQuantity(data?.quantity);
            }
        }
    }, [buyQuantity, data?.quantity]);

    const disable = useMemo(() => {
        if (!data?.quantity) {
            return true;
        }
        if (data?.quantity && data?.quantity <= 0) {
            return true;
        }
        return false;
    }, [data?.quantity]);

    const handleAddToCard = async () => {
        if (data?.id) {
            analytics.trackButtonClick(
                'Add to Cart',
                'Product Detail',
                `${data.name} (${data.id})`
            );

            if (!auth) {
                addProduct({ productId: data?.id, quantity: buyQuantity });
            } else {
                const response = await addToCartTrigger({
                    productId: data?.id,
                    quantity: buyQuantity,
                });
                if (response?.isOk) {
                    toast.success(response?.message);
                    reload();
                } else {
                    toast.error(response?.message);
                }
            }
        }
    };

    const handleBuyNow = async () => {
        if (data?.id) {
            analytics.trackButtonClick(
                'Buy Now',
                'Product Detail',
                `${data.name} (${data.id})`
            );

            if (!auth) {
                addProduct({ productId: data?.id, quantity: buyQuantity });
                router.push(`/cart-details?itemKeys=${data?.id}`);
            } else {
                const response = await addToCartTrigger({
                    productId: data?.id,
                    quantity: buyQuantity,
                });

                if (response?.isOk) {
                    toast.success('Thêm sản phẩm vào giỏ hàng thành công.');
                    reload();
                    router.push(`/cart-details?itemKeys=${data?.id}`);
                }
            }
        }
    };

    if (!data) {
        return <div>Sản phẩm này không tồn tại</div>;
    }

    return (
        <div className="w-full">
            <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
                <div className="w-full lg:w-1/2">
                    <ProductImageSlider listImage={data?.product_image ?? []} />
                </div>
                <div className="flex flex-1 flex-col gap-6 lg:gap-10">
                    <div>
                        <div className="line-clamp-2 text-xl font-semibold sm:text-2xl">
                            {data?.name}
                        </div>
                        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
                            {data?.rating ? (
                                <div className="text-primary flex items-center gap-2">
                                    <span className="text-lg underline underline-offset-4 sm:text-xl">
                                        {data?.rating}
                                    </span>
                                    <span>
                                        <Rate
                                            allowHalf
                                            className="text-primary text-sm"
                                            disabled
                                            value={data?.rating ?? 0}
                                        />
                                    </span>
                                </div>
                            ) : (
                                <div className="text-base text-slate-500 sm:text-lg">
                                    Chưa có đánh giá
                                </div>
                            )}

                            <div className="flex items-center gap-2">
                                <span className="text-lg sm:text-xl">
                                    {data?.sold_quantity}
                                </span>
                                <span className="text-sm text-slate-500 sm:text-base">
                                    Đã bán
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="text-primary flex items-center gap-3 bg-slate-100 p-3 text-xl sm:gap-5 sm:p-5 sm:text-2xl lg:text-3xl">
                        {data?.original_price && (
                            <div
                                className={cn(
                                    data?.discount_price &&
                                        'text-lg text-slate-500 line-through'
                                )}
                            >
                                {currencyFormatter(data?.original_price)}
                            </div>
                        )}
                        {data?.discount_price && (
                            <div>{currencyFormatter(data?.discount_price)}</div>
                        )}
                    </div>
                    <div className="flex flex-col gap-3 text-base sm:flex-row sm:items-center sm:gap-10 sm:text-lg">
                        <p className="font-medium text-slate-500 sm:font-normal">
                            Khối lượng
                        </p>
                        <div className="w-fit border px-3 py-2 sm:px-5">
                            {data?.size}g
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 text-base sm:flex-row sm:items-center sm:gap-10 sm:text-lg">
                        <p className="text-slate-500 font-medium sm:font-normal">Số lượng</p>
                        <div className="flex w-fit items-center">
                        <div className="flex border border-slate-300">
                            <div
                                className={cn(
                                    'flex h-[30px] w-[30px] cursor-pointer select-none items-center justify-center border-r border-r-slate-300',
                                    disable && 'cursor-not-allowed'
                                )}
                                onClick={() =>
                                    disable
                                        ? null
                                        : setByQuantity((prev) => prev - 1)
                                }
                                role="presentation"
                            >
                                <MinusOutlined />
                            </div>
                            <div className="flex w-[60px] items-center justify-center">
                                {buyQuantity}
                            </div>
                            <div
                                className={cn(
                                    'flex h-[30px] w-[30px] cursor-pointer select-none items-center justify-center border-l border-l-slate-300',
                                    disable && 'cursor-not-allowed'
                                )}
                                onClick={() =>
                                    disable
                                        ? null
                                        : setByQuantity((prev) => prev + 1)
                                }
                                role="presentation"
                            >
                                <PlusOutlined />
                            </div>
                        </div>
                        </div>
                        <div className="text-slate-500 text-sm sm:text-base mt-2 sm:mt-0">
                            {data?.quantity && data?.quantity > 0
                                ? data?.quantity
                                : 0}{' '}
                            sản phẩm có sẵn
                        </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <Button
                            className="border-primary text-primary w-full sm:w-[200px] order-2 sm:order-1"
                            disabled={disable}
                            icon={<ShoppingCartOutlined />}
                            onClick={handleAddToCard}
                            size="large"
                        >
                            <span className="hidden sm:inline">Thêm vào giỏ hàng</span>
                            <span className="sm:hidden">Thêm vào giỏ</span>
                        </Button>
                        <Button
                            className="w-full sm:w-[200px] order-1 sm:order-2"
                            disabled={disable}
                            onClick={handleBuyNow}
                            size="large"
                            type="primary"
                        >
                            Mua ngay
                        </Button>
                    </div>
                </div>
            </div>
            <div className="mt-20 flex flex-col gap-10 rounded-lg border p-5">
                <div className="flex flex-col gap-5">
                    <p className="text-xl uppercase underline underline-offset-4">
                        Chi tiết sản phẩm
                    </p>
                    <ProductSpecifications
                        name={data?.brand?.name ?? ''}
                        title="Loại sản phẩm"
                    />
                    <ProductSpecifications
                        name={data?.category?.name ?? ''}
                        title="Danh mục"
                    />
                    <ProductSpecifications
                        name={data?.size ? `${data?.size}g` : ''}
                        title="Khối lượng"
                    />
                </div>
                <div className="flex flex-col gap-5">
                    <p className="text-xl uppercase underline underline-offset-4">
                        Mô tả sản phẩm
                    </p>
                    <div>{data?.description}</div>
                </div>
            </div>
            <div className="mt-10">
                <Feedback
                    productId={data?.id ?? ''}
                    productRate={data?.rating ?? 0}
                />
            </div>
            <div className="mt-10">
                <Comment productId={data?.id ?? ''} />
            </div>
        </div>
    );
};

ProductDetail.defaultProps = {
    data: undefined,
};

export default ProductDetail;
