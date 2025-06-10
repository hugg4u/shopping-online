import { useEffect } from 'react';
import CartContact from '~/components/cart-contact';
import Sidebar from '~/components/product/Sidebar';
import * as analytics from '~/lib/analytics';

const CartContactPage = () => {
    useEffect(() => {
        analytics.trackCheckoutStep(2, 'Contact Information');
    }, []);

    return (
        <div className="mt-20 flex px-10">
            <div className="sticky top-10 hidden h-[90vh] w-[350px] min-w-[350px] xl:block">
                <Sidebar />
            </div>
            <div className="flex-1">
                <CartContact />
            </div>
        </div>
    );
};

export default CartContactPage;
