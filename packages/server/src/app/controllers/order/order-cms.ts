import { TokenDecoded } from 'types';
import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';
import { SortOrder } from '../../../types/index';
import { getToken } from '../../../lib/utils';
import { db } from '../../../lib/db';
import { PAGE_SIZE } from '../../../constant';
import { getNextDate } from '../../../lib/getNextDate';

// type WhereClause = {
//     isVerified: boolean;
//     status?: string;
//     OR?: Record<string, Record<string, string | undefined>>[];
// };

export const getListOrderCms = async (req: Request, res: Response) => {
    const {
        currentPage,
        pageSize,
        order,
        orderName,
        orderId,
        customer,
        startDate,
        endDate,
    } = req.query;

    try {
        let orderBy:
            | Record<string, SortOrder | Record<string, SortOrder>>
            | undefined;

        if (orderName && order) {
            orderBy = {
                [String(orderName)]: order as SortOrder,
            };
        }

        const total = await db.order.count();

        const orderList = await db.order.findMany({
            skip:
                (Number(currentPage ?? 1) - 1) * Number(pageSize ?? PAGE_SIZE),
            take: Number(pageSize ?? PAGE_SIZE),
            where: {
                id: {
                    contains: orderId as string,
                },
                user: {
                    name: {
                        contains: customer as string,
                    },
                },
                createdAt: {
                    gte: startDate ? new Date(startDate as string) : undefined,
                    lt: endDate ? getNextDate(endDate as string) : undefined,
                },
            },
            select: {
                id: true,
                name: true,
                totalAmount: true,
                status: true,
                paymentMethod: true,
                createdAt: true,
                seller: {
                    select: {
                        id: true,
                        role: true,
                        name: true,
                        image: true,
                        email: true,
                        phone: true,
                    },
                },
                orderDetail: {
                    take: 1,
                },
                _count: true,
            },
            orderBy: orderBy ?? { createdAt: 'desc' },
        });

        return res.status(200).json({
            isOk: true,
            data: orderList,
            pagination: {
                total,
            },
            message: 'Get order list successfully!',
        });
    } catch (error) {
        return res.sendStatus(500);
    }
};

export const getOrderDetailCms = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const orderDetail = await db.order.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                createdAt: true,
                name: true,
                orderDetail: {
                    select: {
                        productId: true,
                        productName: true,
                        thumbnail: true,
                        quantity: true,
                        originalPrice: true,
                        discountPrice: true,
                        size: true,
                    },
                },
                totalAmount: true,
                status: true,
            },
        });

        if (!orderDetail) {
            return res.status(400).json({
                isOk: false,
                message: 'Order not found!',
            });
        }

        return res.status(200).json({
            isOk: true,
            data: orderDetail,
            message: 'Get order detail successfully!',
        });
    } catch (error) {
        return res.sendStatus(500);
    }
};

export const updateAssignee = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { assigneeId } = req.body;

    try {
        const accessToken = getToken(req);

        const tokenDecoded = jwtDecode(accessToken) as TokenDecoded;

        const manager = await db.user.findFirst({
            where: {
                id: tokenDecoded.id,
            },
        });

        const order = await db.order.update({
            where: {
                id,
            },
            data: {
                sellerId: assigneeId,
            },
        });

        const seller = await db.user.findFirst({
            where: { id: assigneeId },
        });

        await db.auditLog.create({
            data: {
                userId: manager.id,
                action: 'UPDATE',
                orderId: order.id,
                title: `assigned to: ${seller.name}`,
                userImage: manager.image ?? '',
                userName: manager.name ?? '',
                userEmail: manager.email,
            },
        });

        return res.status(200).json({
            isOk: true,
            data: order,
            message: 'Update assignee successfully!',
        });
    } catch (error) {
        return res.sendStatus(500);
    }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const accessToken = getToken(req);

        const tokenDecoded = jwtDecode(accessToken) as TokenDecoded;

        const seller = await db.user.findFirst({
            where: {
                id: tokenDecoded.id,
            },
        });

        const prevOrder = await db.order.findFirst({
            where: { id },
        });

        const order = await db.order.update({
            where: {
                id,
            },
            data: {
                status,
            },
        });

        await db.auditLog.create({
            data: {
                userId: seller.id,
                action: 'UPDATE',
                orderId: order.id,
                title: `changed status from ${prevOrder.status} to ${order.status}`,
                userImage: seller.image ?? '',
                userName: seller.name ?? '',
                userEmail: seller.email,
            },
        });

        return res.status(200).json({
            isOk: true,
            data: order,
            message: 'Update order status successfully!',
        });
    } catch (error) {
        return res.sendStatus(500);
    }
};
