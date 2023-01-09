import { check, validationResult } from 'express-validator';
import { emailRegistro } from '../helpers/emails.js';
import { generarId } from '../helpers/token.js';
import Usuario from '../models/Usuario.js';

const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesión',
    });
};

const formularioRegistro = (req, res) => {
    res.render('auth/registro', {
        pagina: 'Crear Cuenta',
        csrfToken: req.csrfToken(),
    });
};

const registrarUsuario = async (req, res) => {
    // Extraer los datos
    const { nombre, email, password } = req.body;

    // Validacion
    await check('nombre')
        .notEmpty()
        .withMessage('El nombre no puede ir vacío.')
        .run(req);
    await check('email')
        .isEmail()
        .withMessage('El email no puede ir vacío.')
        .run(req);
    await check('password')
        .isLength({ min: 6 })
        .withMessage('El password debe ser de al menos 6 caracteres.')
        .run(req);
    await check('repetir_password')
        .equals(password)
        .withMessage('Los passwords no son iguales.')
        .run(req);

    let resultado = validationResult(req);

    // Verificar que el resultado este vacío
    if (!resultado.isEmpty()) {
        // Errores
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
            usuario: {
                nombre,
                email,
            },
        });
    }

    // Verificar que el usuario no este duplicado
    const existeUsuario = await Usuario.findOne({ where: { email } });

    if (existeUsuario) {
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            csrfToken: req.csrfToken(),
            errores: [{ msg: 'El usuario ya esta registrado' }],
            usuario: {
                nombre,
                email,
            },
        });
    }

    // Almacenar un usuario
    const usuario = await Usuario.create({
        nombre,
        email,
        password,
        token: generarId(),
    });

    // Envía email de confirmacion
    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token,
    });

    // Mostrar mensaje de confirmacion
    res.render('templates/mensaje', {
        pagina: 'Cuenta creada correctamente',
        mensaje:
            'Hemos enviado un correo de confirmacion, presiona en el enlace',
    });
};

const confirmarCuenta = async (req, res) => {
    const { token } = req.params;

    // Verificar si el token es válido
    const usuario = await Usuario.findOne({ where: token });

    if (!usuario) {
        return res.render('auth/confirmar-cuenta', {
            pagina: 'Error al confirmar tu cuenta',
            mensaje: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
            error: true,
        });
    }
    // Confirmar la cuenta
    usuario.token = null;
    usuario.confirmado = true;
    await usuario.save();

    res.render('auth/confirmar-cuenta', {
        pagina: 'Cuenta Confirmada',
        mensaje: 'La cuenta se confirmó correctamente',
    });
};

const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recupera tu acceso a Bienes Raíces',
    });
};

export {
    formularioLogin,
    formularioRegistro,
    registrarUsuario,
    confirmarCuenta,
    formularioOlvidePassword,
};
