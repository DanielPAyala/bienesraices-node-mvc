import User from '../models/User.model.js';

const loginForm = (req, res) => {
  res.render('auth/login', {
    page: 'Iniciar Sesión'
  });
};

const registerForm = (req, res) => {
  res.render('auth/register', {
    page: 'Crear Cuenta'
  });
};

const register = async (req, res) => {
  const usuario = await User.create(req.body);
  res.json(usuario);
};

const forgotPasswordForm = (req, res) => {
  res.render('auth/forgot-password', {
    page: 'Recuperar tu acceso a Bienes Raices'
  });
};

export { loginForm, registerForm, register, forgotPasswordForm };
