import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    mensaje: 'GET'
  });
});

router.post('/', (req, res) => {
  res.json({
    mensaje: 'POST'
  });
});

export default router;
