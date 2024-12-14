import jwt from 'jsonwebtoken';

const generateJWT = ({ id, name }) => {
  const payload = {
    id,
    name,
    iat: Date.now()
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
};

const generateToken = (user) =>
  Math.random().toString(36).substring(2) + Date.now().toString(36);

export { generateJWT, generateToken };
