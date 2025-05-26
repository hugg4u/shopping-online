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
            className="mb-2.5 flex w-full rounded border border-gray-100 bg-white p-2.5 shadow-md transition-shadow duration-300 hover:shadow-lg"
            onClick={handleCardClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
        >
            <div className="mr-2.5 flex flex-1 items-center justify-center">
                <img
                    alt={name}
                    className="h-auto w-full max-w-[60px] rounded object-cover"
                    src={imageUrl}
                />
            </div>
            <div className="flex flex-[2] flex-col justify-center">
                <span className="mb-1.5 text-sm font-bold">{name}</span>
                <span
                    className="mb-1 text-sm text-gray-500 line-through"
                    style={{
                        visibility: finalDiscountPrice ? 'visible' : 'hidden',
                    }}
                >
                    <del>{currencyFormatter(original_price)}</del>
                </span>
                <span className="text-primary text-sm">
                    {currencyFormatter(
                        finalDiscountPrice ? discount_price : original_price
                    )}
                </span>
            </div>
        </div>
    );
};

export default LatestProductCard;
