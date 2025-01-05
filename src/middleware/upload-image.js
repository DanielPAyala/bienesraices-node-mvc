import multer from 'multer';
import path from 'path';
import { generateToken } from '../helpers/tokens.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${generateToken()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

export default upload;
