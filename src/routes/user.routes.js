import express from 'express';
import {
  loginForm,
  registerForm,
  forgotPasswordForm
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/login', loginForm);
router.get('/register', registerForm);
router.get('/forgot-password', forgotPasswordForm);

export default router;
