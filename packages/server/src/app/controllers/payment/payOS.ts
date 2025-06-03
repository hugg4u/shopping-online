/* eslint-disable no-console */
import { Request, Response } from 'express';
import { CheckoutRequestType } from '@payos/node/lib/type';
import PayOS from '@payos/node';
import axios from 'axios';
import { db } from '../../../lib/db';

// Khởi tạo PayOS với thông tin từ tài khoản của bạn
const payOS = new PayOS(
    process.env.PAYOS_CLIENT_ID,
    process.env.PAYOS_API_KEY,
    process.env.PAYOS_CHECKSUM_KEY
);

export const createPaymentLink = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.body;
        // Lấy thông tin đơn hàng
        const order = await db.order.findUnique({
            where: { id: orderId },
            include: { orderDetail: true },
        });

        if (!order) {
            return res.status(404).json({
                isOk: false,
                message: 'Order not found',
            });
        }

        // Tạo mã đơn hàng duy nhất
        // const orderCode = Number(orderId);

        // Danh sách sản phẩm
        const items = order.orderDetail.map((item) => ({
            name: item.productName,
            quantity: item.quantity,
            price: Math.round(item.totalPrice / item.quantity),
        }));

        // Tạo payment request
        const paymentData: CheckoutRequestType = {
            orderCode: Date.now() + Math.floor(Math.random() * 1000),
            amount: Math.round(order.totalAmount),
            description: `${order.id.split('-')[0]}${order.id.split('-')[1]}`,
            items,
            cancelUrl: `${process.env.CLIENT_URL || 'http://localhost:3000'}/payment/cancel?orderId=${orderId}`,
            returnUrl: `${process.env.CLIENT_URL || 'http://localhost:3000'}/payment/success?orderId=${orderId}`,
        };
        console.log('paymentData', paymentData);

        // Tạo payment link
        const paymentLink = await payOS.createPaymentLink(paymentData);

        // Lưu thông tin thanh toán
        await db.order.update({
            where: { id: orderId },
            data: {
                appTransId: paymentLink.paymentLinkId,
                status: 'PAYMENT_PENDING',
            },
        });

        const listBank = await axios({
            method: 'GET',
            url: `${process.env.LISTS_BANK_URL}`,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('listBank', listBank.data.data);

        const bank = listBank.data.data?.find(
            // eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/no-explicit-any
            (bank: any) => bank.bin === paymentLink.bin
        );

        // Trả về thông tin thanh toán
        return res.status(200).json({
            isOk: true,
            data: {
                checkoutUrl: paymentLink.checkoutUrl,
                qrCode: paymentLink.qrCode,
                appTransId: paymentLink.paymentLinkId,
                accountNumber: paymentLink.accountNumber,
                accountName: paymentLink.accountName,
                description: paymentLink.description,
                bankName: bank.name,
                bankLogo: bank.logo,
                amount: paymentLink.amount,
            },
            message: 'Create payment link successfully',
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('PayOS payment error:', error);
        return res.status(500).json({
            isOk: false,
            message: 'Server error when creating payment',
        });
    }
};

export const handleWebhook = async (req: Request, res: Response) => {
    try {
        // Xác thực webhook
        const webhookBody = req.body;

        // Kiểm tra signature
        const isValid = payOS.verifyPaymentWebhookData(webhookBody);

        if (!isValid) {
            return res.status(400).json({
                isOk: false,
                message: 'Invalid signature',
            });
        }

        // Xử lý thông tin thanh toán
        const { data } = webhookBody;

        if (data && data.description) {
            // Trích xuất orderId từ description
            const orderId = data.description.split('#')[1];

            // Cập nhật trạng thái thanh toán
            await db.order.updateMany({
                where: { appTransId: data.paymentLinkId },
                data: {
                    status: data.status === 'PAID' ? 'PAID' : data.status,
                },
            });

            // Nếu thanh toán thành công, cập nhật đơn hàng
            if (data.status === 'PAID') {
                await db.order.update({
                    where: { id: orderId },
                    data: { status: 'PAID' },
                });
            }
        }

        // Trả về 200 OK cho PayOS
        return res.status(200).json({
            isOk: true,
            message: 'Webhook received',
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('PayOS webhook error:', error);
        return res.status(500).json({
            isOk: false,
            message: 'Webhook processing error',
        });
    }
};

export const checkPaymentStatus = async (req: Request, res: Response) => {
    try {
        const { paymentId } = req.params;

        // Kiểm tra trạng thái thanh toán
        const paymentInfo = await payOS.getPaymentLinkInformation(paymentId);

        // Cập nhật trạng thái trong DB nếu cần
        if (paymentInfo.status === 'PAID') {
            // Tìm thông tin thanh toán trong DB
            const payment = await db.order.findFirst({
                where: { appTransId: paymentId },
            });

            if (payment && payment.status !== 'PAID') {
                // Cập nhật trạng thái thanh toán
                await db.order.update({
                    where: { id: payment.id },
                    data: { status: 'PAID' },
                });

                // Cập nhật trạng thái đơn hàng
                await db.order.update({
                    where: { id: payment.id },
                    data: { status: 'PAID' },
                });
            }
        }

        return res.status(200).json({
            isOk: true,
            data: {
                status: paymentInfo.status,
                amount: paymentInfo.amount,
                orderCode: paymentInfo.orderCode,
            },
            message: 'Get payment information successfully',
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Check payment status error:', error);
        return res.status(500).json({
            isOk: false,
            message: 'Error when checking payment status',
        });
    }
};

// Cập nhật trạng thái đơn hàng sau khi thanh toán thành công
export const updateOrderStatusAfterPayment = async (
    req: Request,
    res: Response
) => {
    try {
        const { orderId, paymentId } = req.body;

        // Kiểm tra xem thanh toán có thành công không
        const paymentInfo = await payOS.getPaymentLinkInformation(paymentId);

        if (paymentInfo.status !== 'PAID') {
            return res.status(400).json({
                isOk: false,
                message: 'Payment not completed',
            });
        }

        // Cập nhật trạng thái đơn hàng
        await db.order.update({
            where: { id: orderId },
            data: { status: 'PAID' },
        });

        return res.status(200).json({
            isOk: true,
            message: 'Update order status successfully',
        });
    } catch (error) {
        console.error('Update order status error:', error);
        return res.status(500).json({
            isOk: false,
            message: 'Error when updating order status',
        });
    }
};
