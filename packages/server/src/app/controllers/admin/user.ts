import { hashSync } from 'bcrypt';
import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';
import {
    ERROR_RES,
    PAGE_SIZE,
    SALT,
    SuccessResponseType,
} from '../../../constant';
import { db } from '../../../lib/db';
import { getToken } from '../../../lib/utils';
import { TokenDecoded } from '../../../types';
import { sendMail } from '../../../lib/send-mail';

export const getUser = async (req: Request, res: Response) => {
    const accessToken = getToken(req);

    const tokenDecoded = jwtDecode(accessToken) as TokenDecoded;

    try {
        const user = await db.user.findUnique({
            where: {
                id: tokenDecoded.id,
            },
            select: {
                name: true,
                email: true,
                image: true,
                address: true,
                gender: true,
                dob: true,
                phone: true,
                id: true,
            },
        });

        if (!user) {
            return res.status(403).json({
                message: 'User not found!',
            });
        }

        const successObj = {
            isOk: true,
            data: user,
            message: 'Get user successfully!',
        };

        return res.status(200).json(successObj);
    } catch (error) {
        return res.sendStatus(500);
    }
};

export const getListUser = async (req: Request, res: Response) => {
    const {
        search,
        searchBy,
        pageSize,
        currentPage,
        sortBy,
        fillterByRole,
        fillterByGender,
        fillterByStatus,
        startDate,
        endDate,
    } = req.query;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (searchBy && search) {
        where[String(searchBy)] = { contains: String(search) };
    }

    if (fillterByGender) {
        where.gender = String(fillterByGender);
    }
    if (fillterByRole) {
        where.role = String(fillterByRole);
    }

    if (fillterByStatus) {
        where.status = String(fillterByStatus);
    }

    if (startDate || endDate) {
        where.createdAt = {};
        if (startDate) {
            where.createdAt.gte = new Date(startDate as string);
        }
        if (endDate) {
            const nextDay = new Date(endDate as string);
            nextDay.setDate(nextDay.getDate() + 1);
            where.createdAt.lt = nextDay;
        }
    }

    const prismaQuery = {
        skip: (Number(currentPage) - 1) * Number(pageSize || PAGE_SIZE),
        take: Number(pageSize),
        where,
    };

    try {
        const total = await db.user.count({
            where,
        });

        let listUser;

        switch (sortBy) {
            case 'LATEST':
                listUser = await db.user.findMany({
                    ...prismaQuery,
                    orderBy: {
                        createdAt: 'desc',
                    },
                });
                break;
            case 'OLDEST':
                listUser = await db.user.findMany({
                    ...prismaQuery,
                    orderBy: {
                        createdAt: 'asc',
                    },
                });
                break;
            case 'NAME_A_TO_Z':
                listUser = await db.user.findMany({
                    ...prismaQuery,
                    orderBy: {
                        name: 'asc',
                    },
                });
                break;
            case 'NAME_Z_TO_A':
                listUser = await db.user.findMany({
                    ...prismaQuery,
                    orderBy: {
                        name: 'desc',
                    },
                });
                break;
            case 'EMAIL_A_TO_Z':
                listUser = await db.user.findMany({
                    ...prismaQuery,
                    orderBy: {
                        email: 'asc',
                    },
                });
                break;
            case 'EMAIL_Z_TO_A':
                listUser = await db.user.findMany({
                    ...prismaQuery,
                    orderBy: {
                        email: 'desc',
                    },
                });
                break;
            case 'GENDER_A_TO_Z':
                listUser = await db.user.findMany({
                    ...prismaQuery,
                    orderBy: {
                        gender: 'asc',
                    },
                });
                break;
            case 'GENDER_Z_TO_A':
                listUser = await db.user.findMany({
                    ...prismaQuery,
                    orderBy: {
                        gender: 'desc',
                    },
                });
                break;
            case 'PHONE_LOW_TO_HIGH':
                listUser = await db.user.findMany({
                    ...prismaQuery,
                    orderBy: {
                        phone: 'asc',
                    },
                });
                break;
            case 'PHONE_HIGH_TO_LOW':
                listUser = await db.user.findMany({
                    ...prismaQuery,
                    orderBy: {
                        phone: 'desc',
                    },
                });
                break;
            case 'ROLE_A_TO_Z':
                listUser = await db.user.findMany({
                    ...prismaQuery,
                    orderBy: {
                        role: 'asc',
                    },
                });
                break;
            case 'ROLE_Z_TO_A':
                listUser = await db.user.findMany({
                    ...prismaQuery,
                    orderBy: {
                        role: 'desc',
                    },
                });
                break;
            case 'STATUS_A_TO_Z':
                listUser = await db.user.findMany({
                    ...prismaQuery,
                    orderBy: {
                        status: 'asc',
                    },
                });
                break;
            case 'STATUS_Z_TO_A':
                listUser = await db.user.findMany({
                    ...prismaQuery,
                    orderBy: {
                        status: 'desc',
                    },
                });
                break;
            default:
                listUser = await db.user.findMany({
                    ...prismaQuery,
                    orderBy: {
                        createdAt: 'desc',
                    },
                });
        }

        return res.status(200).json({
            isOk: true,
            data: listUser,
            message: 'Get list user successfully!',
            pagination: {
                total,
            },
        });
    } catch (error) {
        return res.sendStatus(500);
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await db.user.findUnique({
            where: {
                id,
            },
        });

        return res.status(201).json({
            isOk: true,
            data: user,
            message: 'Get user successfully!',
        });
    } catch (error) {
        return res.sendStatus(500);
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const {
            name,
            email,
            role,
            status,
            gender,
            address,
            dob,
            phone,
            image,
        } = req.body;

        let user = await db.user.findFirst({
            where: { email },
        });

        if (user) {
            return res.status(400).json({
                ...ERROR_RES,
                errors: { message: 'Account already exist!' },
            });
        }

        user = await db.user.create({
            data: {
                name,
                email,
                hashedPassword: hashSync(phone, SALT),
                phone,
                role,
                status,
                gender,
                address,
                image,
                dob,
            },
        });

        const subject = 'User have been created account';
        const title = `Hi ${user.name},`;
        const mainContent =
            '    You have just created an account. You can use this account to login.Please change your password to increase security.';
        const secondContent = `Email: ${email}<br>
        Password: ${phone}<br>
        Best regards,<br>
        Soma Tea.`;

        await sendMail({
            to: user.email,
            subject,
            title,
            mainContent,
            secondContent,
            label: undefined,
            link: undefined,
        });

        const successObj: SuccessResponseType = {
            data: {
                data: user,
                meta_data: undefined,
            },
            message: 'Create new user successfully!',
        };

        return res.status(200).json(successObj);
    } catch (error) {
        return res.sendStatus(500);
    }
};

export const editUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { role, status } = req.body;

    try {
        const brand = await db.user.update({
            where: {
                id,
            },
            data: {
                role,
                status,
            },
        });

        return res.status(200).json({
            isOk: true,
            data: brand,
            message: 'Update user successfully!',
        });
    } catch (error) {
        return res.sendStatus(500);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await db.user.delete({
            where: {
                id,
            },
        });

        return res.status(200).json({
            isOk: true,
            data: user,
            message: 'Delete user successfully!',
        });
    } catch (error) {
        return res.sendStatus(500);
    }
};

export const getSeller = async (req: Request, res: Response) => {
    const { search } = req.query;

    try {
        const user = await db.user.findMany({
            where: {
                OR: [
                    {
                        email: {
                            contains: search ? String(search) : undefined,
                        },
                        role: 'SELLER',
                    },
                    {
                        email: {
                            contains: search ? String(search) : undefined,
                        },
                        role: 'SELLERMANAGER',
                    },
                    {
                        name: {
                            contains: search ? String(search) : undefined,
                        },
                        role: 'SELLER',
                    },
                    {
                        name: {
                            contains: search ? String(search) : undefined,
                        },
                        role: 'SELLERMANAGER',
                    },
                ],
            },
            select: {
                id: true,
                image: true,
                name: true,
                email: true,
            },
        });

        return res.status(200).json({
            isOk: true,
            data: user,
            message: 'Get seller successfully!',
        });
    } catch (error) {
        return res.sendStatus(500);
    }
};
