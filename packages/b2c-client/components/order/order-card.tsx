import { Button, Card, Image } from 'antd';
import {
    Order,
    orderPaymentMethod,
    orderStatus,
} from '@shopping/common/types/order';
import { currencyFormatter } from '@shopping/common/utils/formatter';
import { getImageUrl } from '@shopping/common/utils/getImageUrl';
import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react';
import { CopyButton } from '@shopping/common/components/copy-button';
import { useMutation } from '@tanstack/react-query';
import request from '@shopping/common/utils/http-request';
import Link from 'next/link';
import DeleteOrderAlert from './delete-order-alert';
// import FeedbackModal from '../modals/feedback-modal';
// import ReviewModal from '../modals/review-modal';

interface OrderCardProps {
    order: Order;
    reload: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, reload }) => {
    const { id, status, createdAt, totalAmount, orderDetail, paymentMethod } =
        order;
    // const [isFeedbackModalVisible, setFeedbackModalVisible] = useState(false);

    const { push } = useRouter();

    const { mutate: addCart } = useMutation({
        mutationFn: async (dataAddCart: {
            productId: string;
            quantity: number;
        }) => {
            return request.post('/cart/add', dataAddCart);
        },
    });

    const handleBuyAgain = () => {
        orderDetail?.map((item) =>
            addCart({
                productId: item.productId ?? '',
                quantity: Number(item.quantity ?? 0),
            })
        );

        const queryString = order.orderDetail
            ?.map((e) => `${e.productId}:${e.quantity}`)
            .join(',');
        push(`/cart-details?itemKeys=${queryString}`);
    };

    return (
        <div className="my-4">
            <Card>
                <div className="text-sm sm:text-base">
                    <div className="space-y-3 border-b-2 border-b-gray-200 pb-4 sm:space-y-2">
                        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                            <div className="flex-1 space-y-2">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                    <span className="font-medium">
                                        Mã đơn hàng:
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className="break-all">{id}</span>
                                        <CopyButton
                                            toastInfo="Sao chép mã đơn hàng thành công"
                                            value={id ?? ''}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                                    <span className="flex flex-col sm:flex-row sm:items-center">
                                        <span className="font-medium">
                                            Ngày đặt hàng:
                                        </span>
                                        <span className="text-primary sm:ml-1">
                                            {moment(createdAt).format(
                                                'DD-MM-YYYY'
                                            )}
                                        </span>
                                    </span>
                                    <span className="hidden text-gray-400 sm:inline">
                                        |
                                    </span>
                                    <span className="flex flex-col sm:flex-row sm:items-center">
                                        <span className="font-medium sm:font-normal">
                                            Trạng thái đơn hàng:
                                        </span>
                                        <span className="text-primary sm:ml-1">
                                            {
                                                orderStatus[
                                                    status as keyof typeof orderStatus
                                                ]
                                            }
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 sm:flex-row lg:flex-shrink-0">
                                {status === 'PAYMENT_PENDING' && (
                                    <Link
                                        href={`/cart-completion?orderId=${id}`}
                                    >
                                        <Button
                                            className="w-full sm:w-auto"
                                            color="primary"
                                            size="small"
                                            type="primary"
                                        >
                                            <span className="hidden sm:inline">
                                                Thanh toán đơn hàng
                                            </span>
                                            <span className="sm:hidden">
                                                Thanh toán
                                            </span>
                                        </Button>
                                    </Link>
                                )}
                                <Link href={`/my-page/my-order/${id}`}>
                                    <Button
                                        className="w-full sm:w-auto"
                                        size="small"
                                    >
                                        <span className="hidden sm:inline">
                                            Chi tiết đơn hàng
                                        </span>
                                        <span className="sm:hidden">
                                            Chi tiết
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {orderDetail && (
                        <div>
                            <div className="border-b-2 border-b-gray-200 py-4">
                                <div className="flex gap-3 sm:gap-4">
                                    <div className="flex-shrink-0">
                                        <Image
                                            className="sm:!h-20 sm:!w-20"
                                            height={60}
                                            preview={false}
                                            src={getImageUrl(
                                                orderDetail[0]?.thumbnail
                                                    ? orderDetail[0]?.thumbnail
                                                    : ''
                                            )}
                                            width={60}
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:justify-between">
                                        <div className="flex-1 space-y-1 sm:space-y-2">
                                            <p className="line-clamp-2 text-base font-medium sm:text-lg lg:text-xl">
                                                {orderDetail[0]?.productName}
                                            </p>
                                            <p className="text-sm text-gray-500 sm:text-base">
                                                Phân loại hàng:{' '}
                                                {orderDetail[0]?.category},{' '}
                                                {orderDetail[0]?.size} g
                                            </p>
                                            <p className="text-sm sm:text-base">
                                                x {orderDetail[0]?.quantity}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-end sm:justify-start">
                                            <div className="flex flex-col gap-1 text-right sm:flex-row sm:gap-2 sm:text-left">
                                                <span
                                                    className={`text-sm sm:text-base ${
                                                        orderDetail[0]
                                                            ?.discountPrice
                                                            ? 'text-gray-400 line-through'
                                                            : ''
                                                    }`}
                                                >
                                                    {orderDetail[0]
                                                        ?.originalPrice &&
                                                        currencyFormatter(
                                                            Number(
                                                                orderDetail[0]
                                                                    ?.originalPrice
                                                            )
                                                        )}
                                                </span>
                                                {orderDetail[0]
                                                    ?.discountPrice && (
                                                    <span className="text-sm font-medium sm:text-base">
                                                        {currencyFormatter(
                                                            Number(
                                                                orderDetail[0]
                                                                    ?.discountPrice
                                                            )
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {order.count !== undefined &&
                                    order.count !== null &&
                                    order.count > 0 && (
                                        <div className="mt-3 text-sm text-gray-600 sm:text-base">
                                            {orderDetail[0]?.productName} và{' '}
                                            {order.count} sản phẩm khác
                                        </div>
                                    )}
                            </div>
                            <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                                    {(order.status === 'DELIVERED' ||
                                        order.status === 'CANCELED') && (
                                        <Button
                                            className="w-full sm:w-auto"
                                            onClick={handleBuyAgain}
                                            size="small"
                                            type="primary"
                                        >
                                            Mua lại
                                        </Button>
                                    )}

                                    {((order && order.status === 'PENDING') ||
                                        order.status === 'PAYMENT_PENDING') && (
                                        <div className="w-full sm:w-auto">
                                            <DeleteOrderAlert
                                                orderId={order.id ?? ''}
                                                productName={
                                                    order.orderDetail
                                                        ?.map(
                                                            (e) => e.productName
                                                        )
                                                        .filter(
                                                            (name) =>
                                                                name !== null
                                                        ) as string[]
                                                }
                                                reload={() => reload()}
                                                width={100}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col items-end space-y-1 text-sm sm:text-base">
                                    <div className="flex items-center gap-2">
                                        <span>Thành tiền:</span>
                                        <span className="text-primary font-semibold">
                                            {currencyFormatter(
                                                Number(totalAmount)
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-600 sm:text-sm">
                                        <span>Hình thức thanh toán:</span>
                                        <span className="text-primary">
                                            {
                                                orderPaymentMethod[
                                                    paymentMethod as keyof typeof orderPaymentMethod
                                                ]
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};
