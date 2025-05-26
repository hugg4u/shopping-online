import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';
import { TokenDecoded } from 'types';
import { getToken } from '../../../lib/utils';
import { db } from '../../../lib/db';

type CreateCartData = {
    productId: string;
    quantity: number;
};

type CartItem = {
    id: string;
    quantity: number;
    userId: string;
    productId: string;
    createdAt: Date;
    updatedAt: Date;
};

export const getListCart = async (req: Request, res: Response) => {
    const accessToken = getToken(req);
    const tokenDecoded = (await jwtDecode(accessToken)) as TokenDecoded;

    try {
        const listCart = await db.cart.findMany({
            where: {
                userId: tokenDecoded.id,
            },
            select: {
                id: true,
                userId: true,
                quantity: true,
                product: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return res.status(200).json({
            isOk: true,
            data: listCart,
            message: 'Lấy danh sách giỏ hàng thành công!',
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error!' });
    }
};

export const getContactUser = async (req: Request, res: Response) => {
    const accessToken = getToken(req);
    const tokenDecoded = (await jwtDecode(accessToken)) as TokenDecoded;

    try {
        const user = await db.user.findUnique({
            where: {
                id: tokenDecoded.id,
            },
        });
        return res.status(200).json({
            isOk: true,
            data: user,
            message: 'Lấy thông tin người dùng thành công!',
        });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi server!' });
    }
};
export const addToCart = async (req: Request, res: Response) => {
    const { productId, quantity }: CreateCartData = req.body;
    const accessToken = req.headers.authorization?.split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ message: 'Không có token truy cập!' });
    }

    try {
        const decodedToken = jwtDecode<TokenDecoded>(accessToken);
        const userId = decodedToken.id;

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        const existingCartItem = await db.cart.findFirst({
            where: {
                userId,
                productId,
            },
        });

        if (existingCartItem) {
            // Nếu sản phẩm đã tồn tại, cập nhật số lượng
            // const updatedCartItem: CartItem = await db.cart.update({
            //     where: {
            //         id: existingCartItem.id,
            //     },
            //     data: {
            //         quantity: existingCartItem.quantity + quantity,
            //     },
            // });

            // Có ròi thì không cập nhật nữa
            return res.status(204).json({
                isOk: false,
                message: 'Sản phẩm đã có trong giỏ hàng!',
            });
        }

        // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
        const newCartItem: CartItem = await db.cart.create({
            data: {
                userId,
                productId,
                quantity,
            },
        });

        return res.status(201).json({
            isOk: true,
            data: newCartItem,
            message: 'Thêm sản phẩm vào giỏ hàng thành công!',
        });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi server!' });
    }
};

export const deleteCartProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const cart = await db.cart.delete({
            where: {
                id,
            },
        });

        return res.status(200).json({
            isOk: true,
            data: cart,
            message: 'Xoá sản phẩm trong giỏ hàng thành công!',
        });
    } catch (error) {
        return res.sendStatus(500);
    }
};

export const updateQuantity = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await db.cart.update({
            where: {
                id,
            },
            data: {
                quantity,
            },
        });

        return res.status(200).json({
            isOk: true,
            data: cart,
            message: 'Cập nhật số lượng thành công!',
        });
    } catch (error) {
        return res.sendStatus(500);
    }
};

export const getListCartLatest = async (req: Request, res: Response) => {
    const accessToken = getToken(req);
    const tokenDecoded = (await jwtDecode(accessToken)) as TokenDecoded;

    try {
        const total = await db.cart.count({
            where: {
                userId: tokenDecoded.id,
            },
        });
        const listCart = await db.cart.findMany({
            take: 5,
            where: {
                userId: tokenDecoded.id,
            },
            select: {
                id: true,
                product: {
                    select: {
                        id: true,
                        name: true,
                        thumbnail: true,
                        original_price: true,
                        discount_price: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return res.status(200).json({
            isOk: true,
            data: listCart,
            pagination: {
                total,
            },
            message: 'Lấy danh sách giỏ hàng thành công!',
        });
    } catch (error) {
        return res.status(500).json({ message: 'Lỗi server!' });
    }
};
