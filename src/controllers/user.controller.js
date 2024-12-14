import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import User from '../models/User.model.js';
import { generateToken } from '../helpers/tokens.js';
import { registrationEmail, forgotPasswordEmail } from '../helpers/emails.js';

const loginForm = (req, res) => {
  res.render('auth/login', {
    page: 'Iniciar Sesión',
    csrfToken: req.csrfToken()
  });
};

const authenticate = async (req, res) => {
  // Validar campos
  await check('email')
    .notEmpty()
    .withMessage('El email es obligatorio')
    .run(req);
  await check('password')
    .notEmpty()
    .withMessage('La contraseña es obligatoria')
    .run(req);

  let result = validationResult(req);
  console.log(result.array());

  // Verificar si hay errores
  if (!result.isEmpty()) {
    return res.render('auth/login', {
      page: 'Iniciar Sesión',
      csrfToken: req.csrfToken(),
      errors: result.array()
    });
  }

  const { email, password } = req.body;

  // Verificar si el usuario existe y la contraseña es correcta
  const user = await User.findOne({ where: { email } });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.render('auth/login', {
      page: 'Iniciar Sesión',
      csrfToken: req.csrfToken(),
      errors: [{ msg: 'Email o contraseña incorrectos' }]
    });
  }

  // Verificar cuenta confirmada
  if (!user.confirmed) {
    return res.render('auth/login', {
      page: 'Iniciar Sesión',
      csrfToken: req.csrfToken(),
      errors: [{ msg: 'Confirma tu cuenta para iniciar sesión' }]
    });
  }

  res.redirect('/');
};

const registerForm = (req, res) => {
  res.render('auth/register', {
    page: 'Crear Cuenta',
    csrfToken: req.csrfToken()
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

  let result = validationResult(req);

  // Verificar si hay errores
  if (!result.isEmpty()) {
    return res.render('auth/register', {
      page: 'Crear Cuenta',
      csrfToken: req.csrfToken(),
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
      csrfToken: req.csrfToken(),
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
    page: 'Recuperar tu acceso a Bienes Raices',
    csrfToken: req.csrfToken()
  });
};

const resetPassword = async (req, res) => {
  await check('email').isEmail().withMessage('Email no válido').run(req);

  let result = validationResult(req);
  if (!result.isEmpty()) {
    return res.render('auth/forgot-password', {
      page: 'Recuperar tu acceso a Bienes Raices',
      csrfToken: req.csrfToken(),
      errors: result.array()
    });
  }

  const { email } = req.body;
  // Verificar si el usuario existe
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.render('auth/forgot-password', {
      page: 'Recuperar tu acceso a Bienes Raices',
      csrfToken: req.csrfToken(),
      errors: [{ msg: 'No existe una cuenta con ese correo' }]
    });
  }

  // Generar token
  user.token = generateToken();
  await user.save();

  // Enviar correo
  await forgotPasswordEmail({
    name: user.name,
    email: user.email,
    token: user.token
  });

  res.render('templates/message', {
    page: 'Correo enviado',
    message: 'Hemos enviado un correo para restablecer tu contraseña'
  });
};

const verifyToken = async (req, res) => {
  const { token } = req.params;

  // Verificar si el token es válido
  const user = await User.findOne({ where: { token } });

  if (!user) {
    return res.render('templates/message', {
      page: 'Error al restablecer tu contraseña',
      message: 'Token no válido',
      error: true
    });
  }

  // Mostrar formulario para restablecer contraseña
  res.render('auth/reset-password', {
    page: 'Restablecer Contraseña',
    csrfToken: req.csrfToken()
  });
};
const newPassword = async (req, res) => {
  await check('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres')
    .run(req);

  let result = validationResult(req);
  if (!result.isEmpty()) {
    return res.render('auth/reset-password', {
      page: 'Restablecer Contraseña',
      csrfToken: req.csrfToken(),
      errors: result.array()
    });
  }

  const { password } = req.body;
  const { token } = req.params;

  // Verificar si el token es válido
  const user = await User.findOne({ where: { token } });

  if (!user) {
    return res.render('templates/message', {
      page: 'Error al restablecer tu contraseña',
      message: 'Token no válido',
      error: true
    });
  }

  // Actualizar contraseña
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  user.token = null;
  await user.save();

  res.render('auth/confirm-account', {
    page: 'Contraseña Restablecida',
    message: 'Contraseña actualizada correctamente'
  });
};

export {
  loginForm,
  authenticate,
  registerForm,
  register,
  confirmAccount,
  forgotPasswordForm,
  resetPassword,
  verifyToken,
  newPassword
};
