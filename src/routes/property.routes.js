import express from 'express';
import { body } from 'express-validator';
import { admin, create, save } from '../controllers/property.controller.js';
import protectRoute from '../middleware/protegerRuta.js';

const router = express.Router();

router.get('/my-properties', protectRoute, admin);
router.get('/properties/create', protectRoute, create);
router.post(
  '/properties/create',
  protectRoute,
  body('title').notEmpty().withMessage('El título es requerido'),
  body('description')
    .notEmpty()
    .withMessage('La descripción es requerida')
    .isLength({ max: 200 })
    .withMessage('La descripción no puede tener más de 200 caracteres'),
  body('category').isNumeric().withMessage('Selecciona una categoría'),
  body('price').isNumeric().withMessage('Selecciona un precio'),
  body('bedrooms')
    .isNumeric()
    .withMessage('Selecciona el número de habitaciones'),
  body('parking')
    .isNumeric()
    .withMessage('Selecciona el número de estacionamientos'),
  body('bathrooms').isNumeric().withMessage('Selecciona el número de baños'),
  body('lat').notEmpty().withMessage('Selecciona la ubicación en el mapa'),
  save
);

export default router;
