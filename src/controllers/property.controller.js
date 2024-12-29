import { validationResult } from 'express-validator';
import Category from '../models/category.model.js';
import Price from '../models/price.model.js';

const admin = (req, res) => {
  res.render('property/admin', {
    page: 'Mis Propiedades',
    navBar: true
  });
};

const create = async (req, res) => {
  const [categories, prices] = await Promise.all([
    Category.findAll(),
    Price.findAll()
  ]);

  res.render('property/create', {
    page: 'Crear Propiedad',
    csrfToken: req.csrfToken(),
    navBar: true,
    categories,
    prices
  });
};

const save = async (req, res) => {
  let result = validationResult(req);

  const [categories, prices] = await Promise.all([
    Category.findAll(),
    Price.findAll()
  ]);

  if(!result.isEmpty()) {
    return res.render('property/create', {
      page: 'Crear Propiedad',
      csrfToken: req.csrfToken(),
      navBar: true,
      categories,
      prices,
      errors: result.array(),
      data: req.body
    });
  }
};

export { admin, create, save };
