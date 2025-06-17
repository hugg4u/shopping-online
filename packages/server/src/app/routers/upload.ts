/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cấu hình storage cho Cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'shopping-online',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        // transformation: [{ width: 1000, height: 1000, crop: 'limit' }],
    } as any,
});

const upload = multer({ storage });

export default (router: Router) => {
    // eslint-disable-next-line consistent-return
    router.post('/upload', upload.array('files'), (req, res) => {
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
};
