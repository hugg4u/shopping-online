import React from 'react';
import { StarFilled, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const CustomerReviews: React.FC = () => {
    const reviews = [
        {
            id: 'review1',
            name: 'Chị Lan Anh',
            location: 'Hà Nội',
            rating: 5,
            comment:
                'Sản phẩm rất tốt, tôi đã sử dụng được 2 tuần và cảm thấy cơ thể khỏe khoắn hơn rất nhiều. Vị trà thơm ngon, dễ uống.',
            avatar: null,
        },
        {
            id: 'review2',
            name: 'Anh Minh Tuấn',
            location: 'TP.HCM',
            rating: 5,
            comment:
                'Trà thanh nhiệt này thực sự hiệu quả. Sau khi uống, tôi cảm thấy mát gan, giải nhiệt rất tốt. Sẽ tiếp tục sử dụng.',
            avatar: null,
        },
        {
            id: 'review3',
            name: 'Cô Hương',
            location: 'Đà Nẵng',
            rating: 5,
            comment:
                'Chất lượng sản phẩm tuyệt vời, đóng gói cẩn thận. Uống vào cảm thấy thanh mát, giải độc rất tốt. Recommend cho mọi người.',
            avatar: null,
        },
        {
            id: 'review4',
            name: 'Chị Thu Hà',
            location: 'Hải Phòng',
            rating: 5,
            comment:
                'Tôi đã thử nhiều loại trà thanh nhiệt khác nhưng loại này là tốt nhất. Hiệu quả nhanh, an toàn và giá cả hợp lý.',
            avatar: null,
        },
    ];

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <StarFilled
                className={`text-lg ${
                    index < rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
                key={index}
            />
        ));
    };

    return (
        <div className="container">
            <div className="mx-auto max-w-6xl text-center">
                <h2 className="mb-6 bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-3xl font-bold text-transparent">
                    Khách hàng nói gì về chúng tôi
                </h2>
                <p className="mb-12 text-lg text-gray-600">
                    Hàng nghìn khách hàng đã tin tưởng và sử dụng sản phẩm của
                    chúng tôi
                </p>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
                    {reviews.map((review) => (
                        <div
                            className="rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
                            key={review.id}
                        >
                            <div className="mb-4 flex items-center">
                                <Avatar
                                    className="mr-4 bg-green-100 text-green-600"
                                    icon={<UserOutlined />}
                                    size={60}
                                />
                                <div className="text-left">
                                    <h4 className="text-lg font-bold text-gray-800">
                                        {review.name}
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                        {review.location}
                                    </p>
                                    <div className="mt-1 flex">
                                        {renderStars(review.rating)}
                                    </div>
                                </div>
                            </div>

                            <div className="text-left">
                                <p className="leading-relaxed text-gray-700">
                                    &ldquo;{review.comment}&rdquo;
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12">
                    <div className="rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            <div className="text-center">
                                <div className="mb-2 text-4xl font-bold">
                                    5000+
                                </div>
                                <div className="text-green-100">
                                    Khách hàng hài lòng
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="mb-2 text-4xl font-bold">
                                    4.9/5
                                </div>
                                <div className="text-green-100">
                                    Đánh giá trung bình
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="mb-2 text-4xl font-bold">
                                    98%
                                </div>
                                <div className="text-green-100">
                                    Tỷ lệ mua lại
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerReviews;
