import React from 'react';
import CartDetails from '~/components/cart-details';
import Sidebar from '~/components/product/Sidebar';

const CartDetailsPage = () => {
    return (
        <div
            className="min-h-screen py-8"
            style={{ backgroundColor: '#FAF6F0' }}
        >
            <div className="container mx-auto px-4">
                <div className="flex gap-8">
                    <div className="sticky top-10 hidden h-[90vh] w-[350px] min-w-[350px] xl:block">
                        <div
                            className="rounded-xl border p-6 shadow-sm"
                            style={{
                                backgroundColor: '#F5F1E8',
                                borderColor: '#E5DDD5',
                            }}
                        >
                            <Sidebar />
                        </div>
                    </div>
                    <div className="flex-1">
                        <div
                            className="rounded-xl border p-6 shadow-sm"
                            style={{
                                backgroundColor: '#F5F1E8',
                                borderColor: '#E5DDD5',
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
