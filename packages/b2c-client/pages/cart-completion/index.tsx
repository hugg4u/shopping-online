import React from 'react';
import CartCompletion from '~/components/cart-completion';
import Sidebar from '~/components/product/Sidebar';

const CartCompletionPage = () => {
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
