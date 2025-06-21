import { useEffect } from 'react';
import CartContact from '~/components/cart-contact';
import Sidebar from '~/components/product/Sidebar';
import * as analytics from '~/lib/analytics';

const CartContactPage = () => {
    useEffect(() => {
        analytics.trackCheckoutStep(2, 'Contact Information');
    }, []);

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
                        <CartContact />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartContactPage;
