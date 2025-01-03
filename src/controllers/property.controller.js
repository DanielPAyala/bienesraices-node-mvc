import { validationResult } from 'express-validator';
import { Category, Price, Property } from '../models/index.js';

const admin = (req, res) => {
  res.render('property/admin', {
    page: 'Mis Propiedades'
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
    street,
    lat,
    lng
  } = req.body;

  const { id: userId } = req.user;

  try {
    const propertySaved = await Property.create({
      title,
      description,
      categoryId,
      priceId,
      bedrooms,
      parking,
      bathrooms,
      street,
      lat,
      lng,
      userId,
      image: ''
    });

    const { id } = propertySaved;

    res.redirect(`/properties/add-image/${id}`);
  } catch (error) {
    console.log(error);
    return res.render('property/create', {
      page: 'Crear Propiedad',
      csrfToken: req.csrfToken(),
      categories,
      prices,
      errors: [{ msg: error.message }],
      data: req.body
    });
  }
};

const addImage = async (req, res) => {
  res.render('property/add-image', {
    page: 'Agregar Imagen'
  });
};

export { admin, create, save, addImage };
