import { validationResult } from 'express-validator';
import { Category, Price, Property } from '../models/index.js';

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

  if (!result.isEmpty()) {
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

  const {
    title,
    description,
    category: categoryId,
    price: priceId,
    bedrooms,
    parking,
    bathrooms,
    lat,
    lng
  } = req.body;

  return;

  try {
    const property = await Property.create({
      title,
      description,
      categoryId,
      priceId,
      bedrooms,
      parking,
      bathrooms,
      lat,
      lng
      // userId: req.user.id
    });
  } catch (error) {
    console.log(error);
    return res.render('property/create', {
      page: 'Crear Propiedad',
      csrfToken: req.csrfToken(),
      navBar: true,
      categories,
      prices,
      errors: [{ msg: error.message }],
      data: req.body
    });
  }
};

export { admin, create, save };
