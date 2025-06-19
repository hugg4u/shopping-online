import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import * as request from '@shopping/common/utils/http-request';
import * as analytics from '~/lib/analytics';
import CartCompletion from '~/components/cart-completion';
import Sidebar from '~/components/product/Sidebar';

const CartCompletionPage = () => {
    const router = useRouter();
    const { orderId } = router.query;

    const { data } = useQuery({
        queryKey: ['order-detail', orderId],
        queryFn: () => request.get(`order/${orderId}`).then((res) => res.data),
        enabled: !!orderId,
    });

    useEffect(() => {
        if (data?.data) {
            analytics.trackCheckoutStep(3, 'Order Complete');
            analytics.trackPurchase({
                id: data.data.id,
                total: data.data.total,
                items: data.data.orderDetail.map((item: any) => ({
                    id: item.productId,
                    name: item.productName,
                    price: item.price,
                    quantity: item.quantity,
                })),
            });
        }
    }, [data?.data]);

    return (
        <div className="min-h-screen bg-white">
            <div className="responsive-container py-4 sm:py-6 lg:py-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                    <div className="hidden lg:block lg:w-[350px] lg:flex-shrink-0">
                        <div className="sticky top-4">
                            <Sidebar />
                        </div>
                    </div>
                    <div className="min-w-0 flex-1">
                        <CartCompletion />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartCompletionPage;
