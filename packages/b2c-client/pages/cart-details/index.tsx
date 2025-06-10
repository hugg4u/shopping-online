import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import CartDetails from '~/components/cart-details';
import * as analytics from '~/lib/analytics';

const CartDetailsPage = () => {
    const router = useRouter();

    useEffect(() => {
        analytics.trackCheckoutStep(1, 'Cart Review');
    }, []);

    return (
        <div className="min-h-screen py-8" style={{ backgroundColor: '#ffff' }}>
            <div className="container mx-auto px-4">
                <div className="flex gap-8">
                    <div className="flex-1">
                        <div
                            className="rounded-xl border p-6 shadow-sm"
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
        </div>
    );
};

export default CartDetailsPage;
