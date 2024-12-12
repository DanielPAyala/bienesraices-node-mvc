import { check, validationResult } from 'express-validator';
import User from '../models/User.model.js';
import { generateToken } from '../helpers/tokens.js';

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
  await check('name')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .run(req);
  await check('email').isEmail().withMessage('Email no válido').run(req);
  await check('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres')
    .run(req);
  await check('repeat_password')
    .equals('password')
    .withMessage('Las contraseñas no coinciden')
    .run(req);

  let result = validationResult(req);

  // Verificar si hay errores
  if (!result.isEmpty()) {
    return res.render('auth/register', {
      page: 'Crear Cuenta',
      errors: result.array(),
      user: {
        name: req.body.name,
        email: req.body.email
      }
    });
  }

  // Extraer datos
  const { name, email, password } = req.body;

  // Verificar que el usuario no exista
  const userExist = await User.findOne({ where: { email } });
  if (userExist) {
    return res.render('auth/register', {
      page: 'Crear Cuenta',
      errors: [{ msg: 'El correo ya está registrado' }],
      user: {
        name,
        email
      }
    });
  }

  // Crear usuario
  await User.create({
    name,
    email,
    password,
    token: generateToken()
  });
};

const forgotPasswordForm = (req, res) => {
  res.render('auth/forgot-password', {
    page: 'Recuperar tu acceso a Bienes Raices'
  });
};

export { loginForm, registerForm, register, forgotPasswordForm };
