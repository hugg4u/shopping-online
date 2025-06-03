import React from 'react';
import { useRouter } from 'next/router';
import { getImageUrl } from '~/../common/utils/getImageUrl';

type LatestBlogCardProps = {
    id: string;
    title: string;
    thumbnail: string;
};

const LatestBlogCard: React.FC<LatestBlogCardProps> = ({
    id,
    title,
    thumbnail,
}) => {
    const router = useRouter();
    const imageUrl = thumbnail
        ? getImageUrl(thumbnail)
        : '/images/blog-default.jpg';

    const handleCardClick = () => {
        router.push(`/blog/${id}`);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            handleCardClick();
        }
    };

    return (
        <div
            className="hover:scale-102 group mb-3 flex w-full cursor-pointer rounded-lg border border-gray-100 bg-white p-3 shadow-sm transition-all duration-300 hover:border-amber-200 hover:shadow-md"
            onClick={handleCardClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
        >
            <div className="mr-3 flex flex-1 items-center justify-center overflow-hidden rounded-md">
                <img
                    alt={title}
                    className="h-auto w-full max-w-[65px] rounded-md object-cover transition-transform duration-300 group-hover:scale-110"
                    src={imageUrl}
                />
            </div>
            <div className="flex flex-[2] flex-col justify-center space-y-1">
                <span className="line-clamp-2 text-sm font-semibold text-gray-800 transition-colors duration-300 group-hover:text-amber-600">
                    {title}
                </span>
            </div>
        </div>
    );
};

export default LatestBlogCard;
