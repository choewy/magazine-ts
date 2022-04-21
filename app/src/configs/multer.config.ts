import path from 'path';
import multer from 'multer';

export const uploadPath = path.join(__dirname, '../../upload');

console.log(uploadPath);
export const ImageUploader = multer({ dest: uploadPath });
