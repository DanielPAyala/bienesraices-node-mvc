import express from 'express';
import {
  category,
  home,
  noFound,
  searcher
} from '../controllers/app.controller.js';

const router = express.Router();

// Página de inicio
router.get('/', home);

// Categorías
router.get('categories/:id', category);

// Página 404
router.get('/404', noFound);

// Buscador
router.post('/search', searcher);

export default router;
