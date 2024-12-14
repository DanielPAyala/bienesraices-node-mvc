import express from 'express';
import {
  loginForm,
  authenticate,
  registerForm,
  register,
  confirmAccount,
  forgotPasswordForm,
  resetPassword,
  verifyToken,
  newPassword
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/login', loginForm);
router.post('/login', authenticate);

router.get('/register', registerForm);
router.post('/register', register);

router.get('/confirm-account/:token', confirmAccount);

router.get('/forgot-password', forgotPasswordForm);
router.post('/forgot-password', resetPassword);

router.get('/forgot-password/:token', verifyToken);
router.post('/forgot-password/:token', newPassword);

export default router;
