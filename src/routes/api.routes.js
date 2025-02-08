import express from 'express';
import { properties } from '../controllers/api.controller.js';
const router = express.Router();

router.get('/properties', properties);

export default router;