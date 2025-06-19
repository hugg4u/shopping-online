import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export const uploadToPublic = (req: Request, res: Response): Response => {
    try {
        const uploadedFiles = req.files as Express.Multer.File[];

        if (!uploadedFiles || uploadedFiles.length === 0) {
            return res.status(400).json({ message: 'No images uploaded' });
        }

        const imageUrls = uploadedFiles.map((file) => {
            return `/public/uploads/${file.filename}`;
        });

        res.status(200).json({
            message: 'Images uploaded successfully',
            imageUrls,
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteFromPublic = (req: Request, res: Response) => {
    try {
        const { filename } = req.params;

        if (!filename) {
            return res.status(400).json({ message: 'Filename is required' });
        }

        const filePath = path.join(
            process.cwd(),
            'public',
            'uploads',
            filename
        );

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return res.status(200).json({
                message: 'File deleted successfully',
                filename,
            });
        }
        return res.status(404).json({ message: 'File not found' });
    } catch (error) {
        console.error('Delete file error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
