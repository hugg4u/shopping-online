/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
/* eslint-disable react/no-unescaped-entities */
import {
    ClockCircleOutlined,
    CopyOutlined,
    DownOutlined,
    MailOutlined,
} from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Card, Image, QRCode, Spin, Typography } from 'antd';
import {
    genderType,
    Order,
    orderPaymentMethod,
    orderStatus,
} from 'common/types/order';
import {
    CheckPaymentStatusResponse,
    PaymentResponse,
} from 'common/types/payment';
import { currencyFormatter } from 'common/utils/formatter';
import { getImageUrl } from 'common/utils/getImageUrl';
import request from 'common/utils/http-request';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { copy } from 'common/utils/copy';
import { useAuth } from '~/hooks/useAuth';

const { Text } = Typography;

const CartCompletion = () => {
    const router = useRouter();
    const [qrCode, setQRCode] = useState<string | undefined>();
    const [paymentData, setPaymentData] = useState<
        PaymentResponse | undefined
    >();
    const auth = useAuth();

    const [visibleReceiverInformation, setVisibleReceiverInformation] =
        useState(true);
    const [visibleProductInformation, setVisibleProductInformation] =
        useState(true);
    const [visiblePaymentInformation, setVisiblePaymentInformation] =
        useState(true);

    const { data: orderDetail, isLoading: isLoadingOrder } = useQuery<Order>({
        queryKey: ['order-completion', router.query.orderId],
        queryFn: () =>
            request
                .get(`/order-completion/${router.query.orderId}`)
                .then((res) => res.data)
                .then((res) => res.data),
    });

    const { mutateAsync: createPaymentLink } = useMutation({
        mutationFn: (data: { orderId: string }) =>
            request
                .post('/payment/create-payment-link', data)
                .then((res) => res.data)
                .then((res) => res.data),
    });

    const { mutateAsync: checkPaymentStatus } = useMutation<
        CheckPaymentStatusResponse,
        Error,
        { paymentId: string }
    >({
        mutationFn: (order: { paymentId: string }) =>
            request
                .get(`/payment/check-payment-status/${order.paymentId}`)
                .then((res) => res.data)
                .then((res) => res.data),
    });

    const { mutateAsync: updateStatusOrderAfterPayment } = useMutation({
        mutationFn: (order: { id: string; paymentId: string }) =>
            request
                .post('/payment/update-order-status', {
                    orderId: order.id,
                    paymentId: order.paymentId,
                })
                .then((res) => res.data)
                .then((res) => res.data),
    });

    const { data: isAcceptDetail, isLoading: isLoadingCheckAcceptDetail } =
        useQuery<{
            isOk: boolean;
        }>({
            queryKey: ['check-accept-order-detail', auth],
            queryFn: () =>
                request
                    .get(`/check-accept-order-detail/${router.query.orderId}`)
                    .then((res) => res.data),
            enabled: !!auth,
        });

    useEffect(() => {
        (async () => {
            if (
                orderDetail &&
                orderDetail.paymentMethod === 'BANK_TRANSFER' &&
                orderDetail.status === 'PAYMENT_PENDING'
            ) {
                const res: PaymentResponse = await createPaymentLink({
                    orderId: orderDetail.id ?? '',
                });

                setQRCode(res?.qrCode);
                setPaymentData(res);
            }
        })();
    }, [orderDetail]);

    useEffect(() => {
        const handleCheckPaymentStatus = setInterval(async () => {
            if (
                orderDetail?.paymentMethod === 'BANK_TRANSFER' &&
                orderDetail.status === 'PAYMENT_PENDING'
            ) {
                // interval query order ZLP status
                const res = await checkPaymentStatus({
                    paymentId: paymentData?.appTransId ?? '',
                });

                if (res.status === 'PAID') {
                    await updateStatusOrderAfterPayment({
                        id: orderDetail?.id ?? '',
                        paymentId: paymentData?.appTransId ?? '',
                    });
                    toast.success('Đơn hàng đã được thanh toán thành công');
                    router.push(`/my-page/my-order/${orderDetail?.id}`);
                }
            }
        }, 1000);

        return () => {
            clearInterval(handleCheckPaymentStatus);
        };
    });

    return (
        <Spin spinning={isLoadingOrder || isLoadingCheckAcceptDetail}>
            <div className="w-full text-base">
                <div className="flex  w-full justify-center">
                    <div className="flex w-[1000px] min-w-[500px] max-w-[1000px] flex-col items-center space-y-4">
                        <div className="w-full space-y-2 text-center">
                            <p className=" space-x-2 text-[#f43f5e]">
                                <ClockCircleOutlined />
                                <span>Cảm ơn bạn đã mua hàng!</span>
                            </p>
                            <p className="text-[#f43f5e]">
                                Đơn hàng của bạn đang được xử lí
                            </p>
                            <p>
                                <span>Mã đơn hàng: {orderDetail?.id} </span>
                                <span>
                                    <Button
                                        icon={<CopyOutlined />}
                                        onClick={() => {
                                            if (orderDetail?.id) {
                                                copy(orderDetail?.id);
                                                toast.success(
                                                    'Sao chép mã đơn hàng thành công.'
                                                );
                                            }
                                        }}
                                        type="text"
                                    />
                                </span>
                            </p>
                            <p>
                                Trạng thái đơn hàng:{' '}
                                {
                                    orderStatus[
                                        orderDetail?.status as keyof typeof orderStatus
                                    ]
                                }
                            </p>
                            <p>
                                Đặt hàng vào{' '}
                                {moment(orderDetail?.createdAt).format(
                                    'YYYY-MM-DD'
                                )}
                            </p>
                        </div>
                        <div className="flex w-full items-center space-x-4">
                            <div className="flex w-full border-spacing-2 items-center justify-center space-x-4 rounded-lg border border-solid px-6 py-3">
                                <MailOutlined className="text-[#f43f5e]" />
                                <span>
                                    Thông báo về yêu cầu đặt hàng của bạn đã
                                    được gửi tới: {orderDetail?.email}
                                </span>
                            </div>
                        </div>
                        {isAcceptDetail && (
                            <div className="flex items-center">
                                <Button
                                    onClick={() =>
                                        router.push(
                                            `my-page/my-order/${orderDetail?.id}`
                                        )
                                    }
                                    size="large"
                                >
                                    Chi tiết đơn hàng
                                </Button>
                            </div>
                        )}

                        {/* Thông tin thanh toán */}
                        <div className="w-full border-spacing-2 flex-col items-center justify-center rounded-lg  border border-solid p-4 pt-0">
                            <div
                                className="flex cursor-pointer items-center justify-between pt-4 font-bold"
                                onClick={() => {
                                    setVisiblePaymentInformation(
                                        !visiblePaymentInformation
                                    );
                                }}
                                role="presentation"
                            >
                                <h3>Thông tin thanh toán</h3>
                                <div className="pr-2 transition-transform duration-500 ease-in-out">
                                    <DownOutlined
                                        className={` transform transition-transform duration-300 ease-in-out ${visiblePaymentInformation && 'rotate-180'}`}
                                    />
                                </div>
                            </div>
                            <div
                                className={`transform transition-all duration-300 ease-in-out ${
                                    visiblePaymentInformation
                                        ? 'max-h-screen opacity-100'
                                        : 'max-h-0 opacity-0'
                                } overflow-hidden`}
                            >
                                <p className="text-base text-gray-500">
                                    Phương thức thanh toán:{' '}
                                    {
                                        orderPaymentMethod[
                                            orderDetail?.paymentMethod as keyof typeof orderPaymentMethod
                                        ]
                                    }
                                </p>

                                {/* Hiển thị QR và thông tin thanh toán */}
                                {orderDetail?.paymentMethod ===
                                    'BANK_TRANSFER' &&
                                    orderDetail.status ===
                                        'PAYMENT_PENDING' && (
                                        <div className="my-4 flex w-full flex-col items-center justify-center gap-8 md:flex-row">
                                            {/* QR Code bên trái */}
                                            <div className="flex flex-col items-center">
                                                <QRCode
                                                    size={250}
                                                    value={qrCode ?? ''}
                                                />
                                                <Text className="mt-2 text-gray-600">
                                                    Quét mã QR để thanh toán
                                                </Text>
                                            </div>

                                            {/* Thông tin thanh toán bên phải */}
                                            <div className="flex w-full flex-col gap-3 md:w-1/2">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex flex-row items-center gap-2">
                                                        <Image
                                                            height={55}
                                                            preview={false}
                                                            src={getImageUrl(
                                                                paymentData?.bankLogo
                                                            )}
                                                            width={100}
                                                        />
                                                        <div className="flex flex-col">
                                                            <Text className="text-base text-gray-500">
                                                                Ngân hàng
                                                            </Text>
                                                            <Text className="text-lg font-bold text-gray-800">
                                                                {
                                                                    paymentData?.bankName
                                                                }
                                                            </Text>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <Text className="text-sm text-gray-500">
                                                        Chủ tài khoản:
                                                    </Text>
                                                    <Text className="text-sm font-bold text-gray-800">
                                                        {paymentData?.accountName ||
                                                            ''}
                                                    </Text>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <Text className="text-sm text-gray-500">
                                                            Số tài khoản:
                                                        </Text>
                                                        <Text className="text-sm font-bold text-gray-800">
                                                            {paymentData?.accountNumber ||
                                                                ''}
                                                        </Text>
                                                    </div>
                                                    <Button
                                                        icon={<CopyOutlined />}
                                                        onClick={() => {
                                                            if (
                                                                paymentData?.accountNumber
                                                            ) {
                                                                copy(
                                                                    paymentData?.accountNumber
                                                                );
                                                                toast.success(
                                                                    'Sao chép số tài khoản thành công.'
                                                                );
                                                            }
                                                        }}
                                                        type="text"
                                                    />
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <Text className="text-sm text-gray-500">
                                                            Số tiền:
                                                        </Text>
                                                        <Text className="text-sm font-bold text-gray-800">
                                                            {currencyFormatter(
                                                                Number(
                                                                    paymentData?.amount
                                                                )
                                                            )}
                                                        </Text>
                                                    </div>
                                                    <Button
                                                        icon={<CopyOutlined />}
                                                        onClick={() => {
                                                            if (
                                                                paymentData?.amount
                                                            ) {
                                                                copy(
                                                                    paymentData?.amount?.toString()
                                                                );
                                                                toast.success(
                                                                    'Sao chép số tiền thành công.'
                                                                );
                                                            }
                                                        }}
                                                        type="text"
                                                    />
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <Text className="text-sm text-gray-500">
                                                            Nội dung:
                                                        </Text>
                                                        <Text className="max-w-[200px] truncate text-sm font-bold text-gray-800">
                                                            {paymentData?.description ??
                                                                ''}
                                                        </Text>
                                                    </div>
                                                    <Button
                                                        icon={<CopyOutlined />}
                                                        onClick={() => {
                                                            if (
                                                                paymentData?.description
                                                            ) {
                                                                copy(
                                                                    paymentData?.description
                                                                );
                                                                toast.success(
                                                                    'Sao chép nội dung chuyển khoản thành công.'
                                                                );
                                                            }
                                                        }}
                                                        type="text"
                                                    />
                                                </div>

                                                <div className="mt-2 rounded-md bg-gray-100 p-3">
                                                    <Text className="text-sm text-gray-700">
                                                        Vui lòng không thay đổi
                                                        nội dung chuyển khoản để
                                                        đơn hàng được xử lý tự
                                                        động.
                                                    </Text>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                {/* Hiển thị trạng thái cho COD */}
                                {/* {orderDetail?.paymentMethod ===
                                    'CASH_ON_DELIVERY' && (
                                    <p className="text-base text-gray-500">
                                        Đơn hàng thanh toán khi nhận hàng
                                    </p>
                                )} */}

                                {/* Hiển thị trạng thái đã thanh toán */}
                                {orderDetail?.paymentMethod ===
                                    'BANK_TRANSFER' &&
                                    orderDetail.status !==
                                        'PAYMENT_PENDING' && (
                                        <p className="text-base text-gray-500">
                                            Đơn hàng đã được thanh toán thành
                                            công
                                        </p>
                                    )}
                            </div>
                        </div>
                        {/* Thông tin nhận hàng */}
                        <div className="w-full border-spacing-2 flex-col items-center justify-center rounded-lg  border border-solid p-4 pt-0">
                            <div
                                className="flex cursor-pointer items-center justify-between pt-4 font-bold"
                                onClick={() => {
                                    setVisibleReceiverInformation(
                                        !visibleReceiverInformation
                                    );
                                }}
                                role="presentation"
                            >
                                <h3>Thông tin nhận hàng</h3>
                                <div className="pr-2 transition-transform duration-500 ease-in-out">
                                    <DownOutlined
                                        className={` transform transition-transform duration-300 ease-in-out ${visibleReceiverInformation && 'rotate-180'}`}
                                    />
                                </div>
                            </div>
                            <div
                                className={`transform transition-all duration-300 ease-in-out ${
                                    visibleReceiverInformation
                                        ? 'max-h-screen opacity-100'
                                        : 'max-h-0 opacity-0'
                                } overflow-hidden`}
                            >
                                <div
                                    className="grid  grid-cols-2 items-center space-y-2 pt-2"
                                    role="menu"
                                >
                                    <span>Người nhận:</span>
                                    <span className="ml-1">
                                        {orderDetail?.name}
                                    </span>
                                    <span>Giới tính:</span>
                                    <span className="ml-1">
                                        {
                                            genderType[
                                                orderDetail?.gender as keyof typeof genderType
                                            ]
                                        }
                                    </span>
                                    <span>Email:</span>
                                    <span className="ml-1">
                                        {orderDetail?.email}
                                    </span>
                                    <span>Số điện thoại:</span>
                                    <span className="ml-1">
                                        {orderDetail?.phone}
                                    </span>
                                    <span>Địa chỉ:</span>
                                    <span className="ml-1">
                                        {orderDetail?.address}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Chi tiết đơn hàng */}
                        <div className="w-full rounded-lg border border-solid p-4 pt-0">
                            <div
                                className="flex cursor-pointer items-center justify-between pt-4 font-bold"
                                onClick={() => {
                                    setVisibleProductInformation(
                                        !visibleProductInformation
                                    );
                                }}
                                role="presentation"
                            >
                                <h3>Thông tin sản phẩm</h3>
                                <div className="pr-2 transition-transform duration-500 ease-in-out">
                                    <DownOutlined
                                        className={` transform transition-transform duration-300 ease-in-out ${visibleProductInformation && 'rotate-180'}`}
                                    />
                                </div>
                            </div>
                            <div
                                className={`transform transition-all duration-300 ease-in-out ${
                                    visibleProductInformation
                                        ? 'max-h-screen opacity-100'
                                        : 'max-h-0 opacity-0'
                                } overflow-hidden`}
                            >
                                {orderDetail?.orderDetail?.map((detail) => (
                                    <Card
                                        bordered={false}
                                        className="my-2"
                                        hoverable
                                        key={detail.id}
                                        onClick={() =>
                                            router.push(
                                                `/product/${detail.productId}`
                                            )
                                        }
                                    >
                                        <div className=" flex h-full items-center">
                                            <Image
                                                className="pr-4"
                                                height={80}
                                                preview={false}
                                                src={getImageUrl(
                                                    detail.thumbnail
                                                        ? detail.thumbnail
                                                        : ''
                                                )}
                                            />
                                            <div className="flex h-full w-full justify-between">
                                                <div className="flex-col gap-8">
                                                    <p className="text-xl">
                                                        {detail.productName}
                                                    </p>
                                                    <p className="text-base text-gray-500">
                                                        Phân loại hàng:{' '}
                                                        {detail?.category},{' '}
                                                        {detail?.size}
                                                        ml
                                                    </p>
                                                    <p className="text-base ">
                                                        x {detail?.quantity}
                                                    </p>
                                                </div>
                                                <div className="flex  items-center justify-center gap-8">
                                                    <div className="flex gap-2 text-base">
                                                        <span
                                                            className={
                                                                detail?.discountPrice
                                                                    ? 'text-gray-400 line-through'
                                                                    : ''
                                                            }
                                                        >
                                                            {detail?.originalPrice &&
                                                                currencyFormatter(
                                                                    Number(
                                                                        detail?.originalPrice
                                                                    )
                                                                )}
                                                        </span>
                                                        <span>
                                                            {detail?.discountPrice &&
                                                                currencyFormatter(
                                                                    Number(
                                                                        detail?.discountPrice
                                                                    )
                                                                )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            {/* Thành tiền */}
                            <div className="flex items-center justify-end text-center">
                                <span className="text-primary text-2xl">
                                    {currencyFormatter(
                                        Number(orderDetail?.totalAmount)
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Spin>
    );
};

export default CartCompletion;
