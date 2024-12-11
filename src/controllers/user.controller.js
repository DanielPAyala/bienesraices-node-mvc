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

const forgotPasswordForm = (req, res) => {
  res.render('auth/forgot-password', {
    page: 'Recuperar tu acceso a Bienes Raices'
  });
};

export { loginForm, registerForm, forgotPasswordForm };
