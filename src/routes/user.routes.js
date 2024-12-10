import express from 'express';

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/', (req, res) => {
  res.json({
    mensaje: 'POST'
  });
});

export default router;
