import React from 'react';
import { useRouter } from 'next/router';
import { currencyFormatter } from '~/../common/utils/formatter';
import { getImageUrl } from '~/../common/utils/getImageUrl';

type LatestProductCardProps = {
    id: string;
    name: string;
    original_price: number;
    discount_price: number | null;
    thumbnail: string;
};

const LatestProductCard: React.FC<LatestProductCardProps> = ({
    id,
    name,
    original_price,
    discount_price,
    thumbnail,
}) => {
    const router = useRouter();
    const imageUrl = thumbnail ? getImageUrl(thumbnail) : '/images/sp1.jpg';

    const handleCardClick = () => {
        router.push(`/product/${id}`);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            handleCardClick();
        }
    };
    const finalDiscountPrice =
        discount_price !== null && discount_price !== original_price;
    return (
        <div
            className="hover:scale-102 group mb-3 flex w-full cursor-pointer rounded-lg border border-gray-100 bg-white p-3 shadow-sm transition-all duration-300 hover:border-rose-200 hover:shadow-md"
            onClick={handleCardClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
        >
            <div className="mr-3 flex flex-1 items-center justify-center overflow-hidden rounded-md">
                <img
                    alt={name}
                    className="h-auto w-full max-w-[65px] rounded-md object-cover transition-transform duration-300 group-hover:scale-110"
                    src={imageUrl}
                />
            </div>
            <div className="flex flex-[2] flex-col justify-center space-y-1">
                <span className="line-clamp-2 text-sm font-semibold text-gray-800 transition-colors duration-300 group-hover:text-rose-600">
                    {name}
                </span>
                <span
                    className="text-xs text-gray-400 line-through"
                    style={{
                        visibility: finalDiscountPrice ? 'visible' : 'hidden',
                    }}
                >
                    <del>{currencyFormatter(original_price)}</del>
                </span>
                <span className="text-sm font-bold text-rose-600">
                    {currencyFormatter(
                        finalDiscountPrice ? discount_price : original_price
                    )}
                </span>
            </div>
        </div>
    );
};

export default LatestProductCard;
