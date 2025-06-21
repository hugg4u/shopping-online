import React, { useEffect } from 'react';
import CartDetails from '~/components/cart-details';
import * as analytics from '~/lib/analytics';

const CartDetailsPage = () => {
    useEffect(() => {
        analytics.trackCheckoutStep(1, 'Cart Review');
    }, []);

    return (
        <div
            className="min-h-screen py-4 sm:py-6 lg:py-8"
            style={{ backgroundColor: '#ffff' }}
        >
            <div className="responsive-container">
                <div className="w-full">
                    <div
                        className="rounded-lg border p-4 shadow-sm sm:rounded-xl sm:p-6"
                        style={{
                            backgroundColor: '#ffff',
                            borderColor: '#ffff',
                        }}
                    >
                        <CartDetails />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDetailsPage;
