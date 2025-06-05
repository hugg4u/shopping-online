import React from 'react';
import CartDetails from '~/components/cart-details';

const CartDetailsPage = () => {
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
