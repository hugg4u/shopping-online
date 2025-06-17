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
        <div className="mt-20 flex px-10">
            <div className="sticky top-10 hidden h-[90vh] w-[350px] min-w-[350px] xl:block">
                <Sidebar />
            </div>
            <div className="flex-1">
                <CartCompletion />
            </div>
        </div>
    );
};

export default CartCompletionPage;
