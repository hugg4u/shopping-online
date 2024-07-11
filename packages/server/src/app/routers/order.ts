import { Router } from 'express';

import { isAuthenticated, isSeller, isSellerManager } from '../../middlewares';
import {
    createOrderForGuest,
    createOrderForUser,
    deleteOrder,
    editOrderInformation,
    getListOrder,
    getOrderDetail,
    updateOrderStatusAfterPayment,
} from '../controllers/order';
import {
    getListOrderCms,
    updateAssignee,
    updateOrderStatus,
} from '../controllers/order/order-cms';

export default (router: Router) => {
    router.get('/my-order', isAuthenticated, getListOrder);
    router.get('/order-detail/:id', getOrderDetail);
    router.put('/my-order/edit/:id', editOrderInformation);
    router.delete('/my-order/delete/:id', deleteOrder);
    router.post('/my-order/user/create', isAuthenticated, createOrderForUser);
    router.post('/my-order/guest/create', createOrderForGuest);
    router.put(
        '/order/update-status-after-payment/:id',
        updateOrderStatusAfterPayment
    );

    // CMS
    router.get(
        '/order/list-order-cms',
        isAuthenticated,
        isSeller,
        getListOrderCms
    );
    router.put(
        '/order/update-assignee/:id',
        isAuthenticated,
        isSellerManager,
        updateAssignee
    );
    router.put(
        '/order/update-status/:id',
        isAuthenticated,
        isSellerManager,
        updateOrderStatus
    );
};
