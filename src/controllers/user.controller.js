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

export { loginForm, registerForm };
