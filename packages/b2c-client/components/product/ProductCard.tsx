import { useMutation } from '@tanstack/react-query';
import { Card, Rate } from 'antd';
import {
    EyeOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
} from '@ant-design/icons';
import * as request from '@shopping/common/utils/http-request';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import { currencyFormatter } from '@shopping/common/utils/formatter';
import { getImageUrl } from '@shopping/common/utils/getImageUrl';
import { useAuth } from '~/hooks/useAuth';
import { Product } from '~/types/product';
import { useCartQuery } from '~/hooks/useCartQuery';
import useCartStore from '~/hooks/useCartStore';

type ProductCardProps = Omit<Product, 'updatedAt'>;

const ProductCard: React.FC<ProductCardProps> = ({
    id,
    name,
    discount_price,
    original_price,
    quantity,
    thumbnail,
    rating,
}) => {
    const auth = useAuth();
    const router = useRouter();
    const { reload } = useCartQuery();
    const { addProduct } = useCartStore();

    const addToCart = useMutation({
        mutationFn: async (data: { productId: string; quantity: number }) => {
            if (!auth || !(auth as { access_token: string }).access_token) {
                throw new Error('No access token available');
            }
            return request.post('/cart/add', data);
        },
        onSuccess: () => {
            toast.success('Sản phẩm được thêm vào giỏ hàng thành công!');
            setTimeout(() => {
                reload();
            }, 200);
        },
        onError: () => {
            toast.error('Không thể thêm sản phẩm vào giỏ hàng.');
        },
    });

    const handleAddToCart = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.stopPropagation();
        if (quantity > 0) {
            const productData = { productId: id, quantity: 1 };
            if (auth && (auth as { access_token: string }).access_token) {
                addToCart.mutate(productData);
            } else {
                addProduct(productData);
                toast.success('Sản phẩm được thêm vào giỏ hàng thành công!');
            }
        }
    };

    const handleBuyNow = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (quantity > 0) {
            const productData = { productId: id, quantity: 1 };
            if (auth && (auth as { access_token: string }).access_token) {
                addToCart.mutate(productData);
            } else {
                addProduct(productData);
            }
            router.push(`/cart-details?itemKeys=${id}`);
        }
    };

    const handleViewProduct = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        router.push(`/product/${id}`);
    };

    const handleCardClick = () => {
        router.push(`/product/${id}`);
    };

    const imageUrl = thumbnail ? getImageUrl(thumbnail) : '/images/sp1.jpg';
    const isOutOfStock = quantity <= 0;
    const hasDiscount = !!(
        discount_price &&
        discount_price !== original_price &&
        discount_price > 0
    );

    const finalPrice = hasDiscount ? discount_price : original_price;

    return (
        <Card
            bodyStyle={{ padding: '0px' }}
            className="group relative h-[400px] w-[280px] cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl"
            onClick={handleCardClick}
        >
            {/* Image Container */}
            <div className="relative h-[280px] overflow-hidden">
                <img
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={imageUrl}
                />

                {/* Status Badge */}
                <div className="absolute left-0 top-0">
                    {isOutOfStock && (
                        <div className="bg-red-500 px-3 py-1 text-sm font-semibold text-white">
                            HẾT HÀNG
                        </div>
                    )}
                    {!isOutOfStock && hasDiscount && (
                        <div className="bg-[#D92D20] px-3 py-1 text-sm font-semibold text-white">
                            SALE
                        </div>
                    )}
                </div>

                {/* Hover Actions */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex gap-3">
                        <button
                            aria-label="Xem chi tiết sản phẩm"
                            className="text-primary hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full bg-white transition-all hover:text-white"
                            onClick={handleViewProduct}
                            type="button"
                        >
                            <EyeOutlined className="text-lg" />
                        </button>
                        {!isOutOfStock && (
                            <>
                                <button
                                    aria-label="Thêm vào giỏ hàng"
                                    className="text-primary hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full bg-white transition-all hover:text-white"
                                    onClick={handleAddToCart}
                                    type="button"
                                >
                                    <ShoppingCartOutlined className="text-lg" />
                                </button>
                                <button
                                    aria-label="Mua ngay"
                                    className="text-primary hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full bg-white transition-all hover:text-white"
                                    onClick={handleBuyNow}
                                    type="button"
                                >
                                    <ShoppingOutlined className="text-lg" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mt-2 space-y-2">
                {/* Rating */}
                <div className="flex justify-center">
                    <Rate
                        className="text-sm text-yellow-400"
                        defaultValue={rating}
                        disabled
                    />
                </div>

                {/* Product Name */}
                <h3 className="line-clamp-2 text-center text-base font-medium text-gray-800">
                    {name}
                </h3>

                {/* Price */}
                <div className="text-center">
                    {hasDiscount && (
                        <span className="mr-2 text-sm text-gray-400 line-through">
                            {currencyFormatter(original_price)}
                        </span>
                    )}
                    <span className="text-lg font-bold text-[#D92D20]">
                        {currencyFormatter(finalPrice)}
                    </span>
                </div>
            </div>
        </Card>
    );
};

export default ProductCard;
