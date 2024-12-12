import express from 'express';
import {
  loginForm,
  registerForm,
  register,
  confirmAccount,
  forgotPasswordForm
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/login', loginForm);
router.get('/register', registerForm);
router.post('/register', register);
router.get('/confirm-account/:token', confirmAccount);
router.get('/forgot-password', forgotPasswordForm);

export default router;
