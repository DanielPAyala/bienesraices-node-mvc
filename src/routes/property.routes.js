import express from 'express';
import { body } from 'express-validator';
import {
  addImage,
  admin,
  create,
  save,
  storeImage,
  edit,
  saveChanges,
  deleteProperty,
  showProperty
} from '../controllers/property.controller.js';
import protectRoute from '../middleware/proteger-ruta.js';
import upload from '../middleware/upload-image.js';

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

router.get('/properties/add-image/:id', protectRoute, addImage);
router.post(
  '/properties/add-image/:id',
  protectRoute,
  upload.single('image'),
  storeImage
);

router.get('/properties/edit/:id', protectRoute, edit);

router.post(
  '/properties/edit/:id',
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
  saveChanges
);

router.post('/properties/delete/:id', protectRoute, deleteProperty);

router.get('/property/:id', showProperty)

export default router;
