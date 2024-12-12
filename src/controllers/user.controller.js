import { check, validationResult } from 'express-validator';
import User from '../models/User.model.js';
import { generateToken } from '../helpers/tokens.js';
import { registrationEmail } from '../helpers/emails.js';

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
    .equals(req.body.password)
    .withMessage('Las contraseñas no coinciden')
    .run(req);

  console.log(req.body);
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
  const user = await User.create({
    name,
    email,
    password,
    token: generateToken()
  });

  // Enviar correo de confirmación
  await registrationEmail({
    name: user.name,
    email: user.email,
    token: user.token
  });

  res.render('templates/message', {
    page: 'Cuenta Creada Correctamente',
    message:
      'Enviamos un correo para confirmar tu cuenta, presiona el enlace para activar tu cuenta'
  });
};

const confirmAccount = async (req, res) => {
  const { token } = req.params;

  // Verificar si el token es válido
  const user = await User.findOne({ where: { token } });

  if (!user) {
    return res.render('auth/confirm-account', {
      page: 'Error al confirmar tu cuenta',
      message: 'Token no válido o la cuenta ya ha sido confirmada',
      error: true
    });
  }

  // Confirmar cuenta
  user.token = null;
  user.confirmed = true;
  await user.save();

  res.render('auth/confirm-account', {
    page: 'Cuenta Confirmada',
    message: 'Cuenta confirmada correctamente'
  });
};

const forgotPasswordForm = (req, res) => {
  res.render('auth/forgot-password', {
    page: 'Recuperar tu acceso a Bienes Raices'
  });
};

export {
  loginForm,
  registerForm,
  register,
  confirmAccount,
  forgotPasswordForm
};
