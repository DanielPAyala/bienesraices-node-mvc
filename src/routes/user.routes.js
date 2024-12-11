import express from 'express';
import { loginForm } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/login', loginForm);

export default router;
