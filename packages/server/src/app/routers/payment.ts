import { Router } from 'express';
import {
    zaloPayCallBack,
    zaloPayCheckStatusOrder,
    zaloPayCreateOrder,
} from '../controllers/payment/zalopay';
import {
    checkPaymentStatus,
    createPaymentLink,
    handleWebhook,
    updateOrderStatusAfterPayment,
} from '../controllers/payment/payOS';

export default (router: Router) => {
    router.post('/zalo-pay/create-order', zaloPayCreateOrder);
    router.post('/zalo-pay/check-status-order/', zaloPayCheckStatusOrder);
    router.post('/zalo-pay/callback', zaloPayCallBack);

    router.post('/payment/create-payment-link', createPaymentLink);
    router.post('/payment/handle-webhook', handleWebhook);
    router.get('/payment/check-payment-status/:paymentId', checkPaymentStatus);
    router.post('/payment/update-order-status', updateOrderStatusAfterPayment);
};
