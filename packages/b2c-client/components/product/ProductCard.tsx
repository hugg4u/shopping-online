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
    briefInfo,
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
        event:
            | React.MouseEvent<HTMLDivElement>
            | React.KeyboardEvent<HTMLDivElement>
    ) => {
        event.stopPropagation();
        if (quantity > 0) {
            const productData = { productId: id, quantity: 1 };

            // Check if user is authenticated
            if (auth && (auth as { access_token: string }).access_token) {
                addToCart.mutate(productData);
            } else {
                // Add to Zustand store instead of localStorage
                addProduct(productData);
                toast.success('Sản phẩm được thêm vào giỏ hàng thành công!');
            }
        }
    };

    const handleBuyNow = async (
        event:
            | React.MouseEvent<HTMLDivElement>
            | React.KeyboardEvent<HTMLDivElement>
    ) => {
        event.stopPropagation();
        if (quantity > 0) {
            const productData = { productId: id, quantity: 1 };

            // Check if user is authenticated
            if (auth && (auth as { access_token: string }).access_token) {
                addToCart.mutate(productData);
            } else {
                // Add to Zustand store instead of localStorage
                addProduct(productData);
            }

            router.push(`/cart-details?itemKeys=${id}`);
        }
    };

    const handleViewProduct = (
        event:
            | React.MouseEvent<HTMLDivElement>
            | React.KeyboardEvent<HTMLDivElement>
    ) => {
        event.stopPropagation();
        router.push(`/product/${id}`);
    };

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLDivElement>,
        action: () => void
    ) => {
        if (event.key === 'Enter' || event.key === ' ') {
            action();
        }
    };

    const handleCardClick = () => {
        router.push(`/product/${id}`);
    };

    // Computed values
    const imageUrl = thumbnail ? getImageUrl(thumbnail) : '/images/sp1.jpg';
    const isOutOfStock = quantity <= 0;
    const hasDiscount =
        discount_price &&
        discount_price !== original_price &&
        discount_price > 0;
    const finalPrice = hasDiscount ? discount_price : original_price;
    const discountPercentage = hasDiscount
        ? Math.round(((original_price - discount_price) / original_price) * 100)
        : 0;

    // Stock status helper
    const getStockStatus = () => {
        if (isOutOfStock) {
            return {
                text: 'Hết hàng',
                className: 'bg-red-100 text-red-600',
            };
        }
        if (quantity <= 5) {
            return {
                text: `Chỉ còn ${quantity}`,
                className: 'bg-yellow-100 text-yellow-700',
            };
        }
        return {
            text: `Còn ${quantity}`,
            className: 'bg-green-100 text-green-600',
        };
    };

    const stockStatus = getStockStatus();

    return (
        <Card
            className="group relative mb-6 flex h-[440px] w-[260px] flex-col justify-between overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
            cover={
                <div className="relative h-[240px] overflow-hidden">
                    <img
                        alt={name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        src={imageUrl}
                    />

                    {/* Discount badge */}
                    {hasDiscount && !isOutOfStock && (
                        <div className="absolute left-3 top-3 z-10">
                            <span className="rounded-full bg-gradient-to-r from-red-500 to-amber-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                                -{discountPercentage}%
                            </span>
                        </div>
                    )}

                    {/* Hover overlay with action icons */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-50">
                        <div className="flex space-x-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
                            {/* View Product Icon */}
                            <div
                                aria-label="Xem chi tiết sản phẩm"
                                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white text-gray-700 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-500 hover:text-white"
                                onClick={handleViewProduct}
                                onKeyDown={(e) =>
                                    handleKeyDown(e, () => handleViewProduct(e))
                                }
                                role="button"
                                tabIndex={0}
                                title="Xem chi tiết"
                            >
                                <EyeOutlined className="text-base" />
                            </div>

                            {/* Add to Cart Icon */}
                            {!isOutOfStock && (
                                <>
                                    <div
                                        aria-label="Thêm sản phẩm vào giỏ hàng"
                                        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white text-gray-700 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-green-500 hover:text-white"
                                        onClick={handleAddToCart}
                                        onKeyDown={(e) =>
                                            handleKeyDown(e, () =>
                                                handleAddToCart(e)
                                            )
                                        }
                                        role="button"
                                        tabIndex={0}
                                        title="Thêm vào giỏ hàng"
                                    >
                                        <ShoppingCartOutlined className="text-base" />
                                    </div>

                                    <div
                                        aria-label="Mua ngay sản phẩm"
                                        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white text-gray-700 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-amber-500 hover:text-white"
                                        onClick={handleBuyNow}
                                        onKeyDown={(e) =>
                                            handleKeyDown(e, () =>
                                                handleBuyNow(e)
                                            )
                                        }
                                        role="button"
                                        tabIndex={0}
                                        title="Mua ngay"
                                    >
                                        <ShoppingOutlined className="text-base" />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            }
            hoverable
            onClick={handleCardClick}
        >
            <div className="flex h-full flex-col justify-between p-1">
                {/* Product Info */}
                <div className="space-y-2">
                    <h3 className="line-clamp-2 text-base font-semibold text-gray-800 transition-colors duration-300 group-hover:text-amber-600">
                        {name}
                    </h3>

                    {briefInfo && (
                        <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
                            {briefInfo}
                        </p>
                    )}
                </div>

                {/* Price and Stock Info */}
                <div className="mt-4 space-y-3">
                    {/* Price Section */}
                    <div className="space-y-1">
                        {hasDiscount && (
                            <div className="text-sm text-gray-400 line-through">
                                {currencyFormatter(original_price)}
                            </div>
                        )}
                        <div className="text-xl font-bold text-amber-600">
                            {currencyFormatter(finalPrice)}
                        </div>
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center justify-between">
                        <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${stockStatus.className}`}
                        >
                            {stockStatus.text}
                        </span>

                        {/* Rating placeholder - có thể thêm sau */}
                        <div className="flex items-center space-x-1 text-yellow-400">
                            <Rate disabled value={rating} />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ProductCard;
