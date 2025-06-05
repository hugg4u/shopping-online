import { Request, Response } from 'express';
import { db } from '../../../lib/db';
import { TAKE_HOT_SEARCH_CLIENT_DEFAULT } from '../../../constant';

type ProductConditions = {
    categoryId?: string;
    name?: {
        contains: string;
    };
    brandId?: {
        in: string[];
    };
    isShow?: boolean;
    AND?: Array<{
        OR?: Array<{
            discount_price?: {
                gte?: number;
                lte?: number;
            };
            AND?: Array<{
                discount_price?: null;
                original_price?: {
                    gte?: number;
                    lte?: number;
                };
            }>;
        }>;
    }>;
};

type OrderByField =
    | 'views'
    | 'rating'
    | 'createdAt'
    | 'discount_price'
    | 'updatedAt';
type SortOrder = 'asc' | 'desc';
type OrderByConfig = {
    [key in OrderByField]?: SortOrder;
};

export const getListProductSelect = async (req: Request, res: Response) => {
    try {
        const listProduct = await db.product.findMany({
            select: {
                id: true,
                name: true,
            },
            orderBy: {
                name: 'asc',
            },
        });

        return res.status(200).json({
            isOk: true,
            data: listProduct,
            message: 'Get list product successfully!',
        });
    } catch (error) {
        return res.sendStatus(500);
    }
};

export const getListProductFeatured = async (req: Request, res: Response) => {
    try {
        const listProduct = await db.product.findMany({
            where: {
                isShow: true,
                isFeatured: true,
            },
            select: {
                id: true,
                name: true,
                thumbnail: true,
                description: true,
                original_price: true,
                discount_price: true,
                briefInfo: true,
                quantity: true,
                rating: true,
            },
            orderBy: {
                updatedAt: 'desc',
            },
        });

        return res.status(200).json({
            isOk: true,
            data: listProduct,
            message: 'Get list product featured successfully!',
        });
    } catch (error) {
        return res.sendStatus(500);
    }
};

export const searchProducts = async (req: Request, res: Response) => {
    const {
        categoryId,
        search,
        sortBy,
        sortOrder,
        brandIds,
        minPrice,
        maxPrice,
    } = req.query;
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const pageSize = req.query.pageSize
        ? parseInt(req.query.pageSize as string, 10)
        : 4;

    try {
        // Build search conditions
        const conditions: ProductConditions = { isShow: true };
        if (categoryId) {
            conditions.categoryId = String(categoryId);
        }
        if (search) {
            conditions.name = {
                contains: String(search),
            };
        }
        if (brandIds) {
            const brandIdsArray = Array.isArray(brandIds)
                ? (brandIds as string[])
                : [String(brandIds)];
            conditions.brandId = { in: brandIdsArray };
        }

        // Add price range filter
        if (minPrice || maxPrice) {
            conditions.AND = [
                {
                    OR: [
                        {
                            discount_price: {
                                gte: minPrice ? Number(minPrice) : undefined,
                                lte: maxPrice ? Number(maxPrice) : undefined,
                            },
                        },
                        {
                            AND: [
                                { discount_price: null },
                                {
                                    original_price: {
                                        gte: minPrice
                                            ? Number(minPrice)
                                            : undefined,
                                        lte: maxPrice
                                            ? Number(maxPrice)
                                            : undefined,
                                    },
                                },
                            ],
                        },
                    ],
                },
            ];
        }

        // Get price range
        const priceStats = await db.product.aggregate({
            where: {
                isShow: true,
            },
            _min: {
                discount_price: true,
                original_price: true,
            },
            _max: {
                discount_price: true,
                original_price: true,
            },
        });

        const minProductPrice = Math.min(
            priceStats._min.discount_price || Infinity,
            priceStats._min.original_price || Infinity
        );

        const maxProductPrice = Math.max(
            priceStats._max.discount_price || 0,
            priceStats._max.original_price || 0
        );

        // Build orderBy object based on sort parameters
        const orderBy: OrderByConfig = {};
        if (sortBy) {
            switch (sortBy) {
                case 'rating':
                    orderBy.rating = (sortOrder as SortOrder) || 'desc';
                    break;
                case 'createdAt':
                    orderBy.createdAt = (sortOrder as SortOrder) || 'desc';
                    break;
                case 'price':
                    orderBy.discount_price = (sortOrder as SortOrder) || 'asc';
                    break;
                default:
                    orderBy.updatedAt = 'desc';
            }
        }

        // Fetch products with sorting
        const products = await db.product.findMany({
            where: conditions,
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy,
            select: {
                id: true,
                name: true,
                discount_price: true,
                original_price: true,
                quantity: true,
                description: true,
                thumbnail: true,
                updatedAt: true,
                briefInfo: true,
                rating: true,
                createdAt: true,
            },
        });

        // Count total products matching search conditions
        const totalProducts = await db.product.count({
            where: conditions,
        });

        // Calculate total pages
        const totalPages = Math.ceil(totalProducts / pageSize);

        return res.status(200).json({
            isOk: true,
            data: products,
            total: totalProducts,
            currentPage: page,
            totalPages,
            priceRange: {
                min: minProductPrice,
                max: maxProductPrice,
            },
            message: 'Search products successfully!',
        });
    } catch (error) {
        return res.sendStatus(500);
    }
};

export const getLatestProducts = async (req: Request, res: Response) => {
    const { limit } = req.query;
    const productLimit = limit ? parseInt(limit as string, 10) : 4; // Default to 4 if no limit is provided

    try {
        const latestProducts = await db.product.findMany({
            where: {
                isShow: true,
            },
            orderBy: {
                updatedAt: 'desc',
            },
            take: productLimit,
            select: {
                id: true,
                name: true,
                discount_price: true,
                original_price: true,
                description: true,
                thumbnail: true,
                updatedAt: true,
            },
        });

        return res.status(200).json({
            isOk: true,
            data: latestProducts,
            message: 'Get latest products successfully!',
        });
    } catch (error) {
        return res.sendStatus(500);
    }
};

export const getListHotSearchProduct = async (req: Request, res: Response) => {
    const { search } = req.query;

    try {
        const listProduct = await db.product.findMany({
            where: {
                name: {
                    contains: search ? String(search) : undefined,
                },
                isShow: true,
            },
            select: {
                id: true,
                name: true,
                thumbnail: true,
                original_price: true,
                discount_price: true,
            },
            orderBy: {
                updatedAt: 'desc',
            },
            take: TAKE_HOT_SEARCH_CLIENT_DEFAULT,
        });

        return res.status(200).json({
            isOk: true,
            data: listProduct,
            message: 'Get list product successfully!',
        });
    } catch (error) {
        return res.sendStatus(500);
    }
};

export const getProductPublicInfoById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product = await db.product.findUnique({
            where: {
                id,
                isShow: true,
            },
            select: {
                id: true,
                brand: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                original_price: true,
                discount_price: true,
                rating: true,
                product_image: {
                    select: {
                        id: true,
                        url: true,
                    },
                },
                name: true,
                quantity: true,
                size: true,
                sold_quantity: true,
                description: true,
                thumbnail: true,
            },
        });

        if (!product) {
            return res.status(400).json({
                isOk: false,
                data: null,
                message: 'This product does not exist!',
            });
        }

        return res.status(200).json({
            isOk: true,
            data: product,
            message: 'Get product successfully!',
        });
    } catch (error) {
        return res.sendStatus(500);
    }
};

export const getListProductCart = async (req: Request, res: Response) => {
    const { listProductId } = req.query;

    if (!Array.isArray(listProductId) || listProductId.length === 0) {
        return res.status(200).json({
            isOk: true,
            data: [],
        });
    }

    try {
        const products = await db.product.findMany({
            where: {
                id: {
                    in: listProductId as string[],
                },
            },
            include: {
                category: true,
                brand: true,
            },
        });

        return res.status(200).json({
            isOk: true,
            data: products,
        });
    } catch (error) {
        return res.sendStatus(500);
    }
};

export const getListProduct = async (req: Request, res: Response) => {
    try {
        const listProduct = await db.product.findMany({});

        return res.status(200).json({
            isOk: true,
            data: listProduct,
            message: 'Get list product successfully!',
        });
    } catch (error) {
        return res.sendStatus(500);
    }
};
