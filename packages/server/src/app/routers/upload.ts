/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import path from 'path';
import fs from 'fs';
import { deleteFromPublic, uploadToPublic } from '../controllers/upload';

// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cấu hình storage cho Cloudinary
const cloudinaryStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'shopping-online',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        // transformation: [{ width: 1000, height: 1000, crop: 'limit' }],
    } as any,
});

// Cấu hình storage cho local
const publicUploadsDir = path.join(process.cwd(), 'public', 'uploads');

// Tạo thư mục uploads nếu chưa tồn tại
if (!fs.existsSync(publicUploadsDir)) {
    fs.mkdirSync(publicUploadsDir, { recursive: true });
}

const localStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, publicUploadsDir);
    },
    filename: (req, file, cb) => {
        // Tạo tên file duy nhất bằng cách thêm timestamp
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
});

const uploadCloud = multer({ storage: cloudinaryStorage });
const uploadLocal = multer({ storage: localStorage });

export default (router: Router) => {
    // Upload lên Cloudinary
    // eslint-disable-next-line consistent-return
    router.post('/upload', uploadCloud.array('files'), (req, res) => {
        try {
            const uploadedFiles = req.files as Express.Multer.File[]; // Type casting

            if (!uploadedFiles) {
                return res.status(400).json({ message: 'No images uploaded' });
            }

            const imageUrls = uploadedFiles.map((file) => {
                // Lấy URL từ Cloudinary
                return (file as any).path;
            });

            res.status(200).json({
                message: 'Images uploaded successfully',
                imageUrls,
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    // Upload vào thư mục public
    router.post('/upload-public', uploadLocal.array('files'), uploadToPublic);

    // Xóa file từ thư mục public
    router.delete('/delete-public/:filename', deleteFromPublic);
};
