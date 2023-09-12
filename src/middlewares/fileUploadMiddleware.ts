import multer from 'multer';
import { generateId } from '../helpers/generateId';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/');
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = generateId(10);

    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage });

export const fileUploadMiddleware = upload.single('productImage');
