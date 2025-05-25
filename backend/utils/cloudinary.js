import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',            // Optional: folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif',"webp"],  // Allowed file types
  },
});

export const upload = multer({ storage });
