const loginForm = (req, res) => {
  res.render('auth/login', {});
};

const registerForm = (req, res) => {
  res.render('auth/register', {});
};

export { loginForm, registerForm };
