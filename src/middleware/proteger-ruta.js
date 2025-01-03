import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const protectRoute = async (req, res, next) => {
  // Verificar si existe la cookie _token
  const { _token } = req.cookies;

  if (!_token) {
    return res.redirect('/auth/login');
  }

  // Verificar si el token es válido
  try {
    const decoded = jwt.verify(_token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    // Almacenar el usuario en req.user
    if (user) {
      req.user = user;
    } else {
      return res.redirect('/auth/login');
    }

    return next();
  } catch (error) {
    return res.clearCookie('_token').redirect('/auth/login');
  }
};

export default protectRoute;
