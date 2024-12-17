import express from 'express';
import { admin } from '../controllers/property.controller';

const router = express.Router();

router.get('/my-properties', admin);

export default router;
