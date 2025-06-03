import { PrismaClient, Role, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

async function main() {
    try {
        const hashedPassword = await hashPassword('password');

        // Định nghĩa tất cả các role
        const roles = [
            Role.USER,
            Role.ADMIN,
            Role.SELLER,
            Role.MARKETER,
            Role.SELLERMANAGER
        ];

        // Tạo user cho mỗi role
        for (const role of roles) {
            const roleLower = role.toLowerCase();
            const email = `${roleLower}@gmail.com`;

            // Kiểm tra xem user đã tồn tại chưa
            const existingUser = await prisma.user.findUnique({
                where: { email }
            });

            if (existingUser) {
                console.log(`User ${email} already exists`);
                continue;
            }

            // Tạo user mới
            const user = await prisma.user.create({
                data: {
                    email,
                    name: role.charAt(0) + role.slice(1).toLowerCase(),
                    hashedPassword,
                    role,
                    isVerified: true,
                    status: UserStatus.ACTIVE,
                    phone: `098${Math.floor(1000000 + Math.random() * 9000000)}`,
                    address: `${role} Address`,
                    gender: Math.random() > 0.5 ? 'MALE' : 'FEMALE'
                }
            });

            console.log(`Created ${role} user: ${email}`);
        }

        console.log('All users created successfully');
    } catch (error) {
        console.error('Error creating users:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });