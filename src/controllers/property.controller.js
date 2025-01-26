import { unlink } from 'node:fs/promises';
import { validationResult } from 'express-validator';
import { Category, Price, Property } from '../models/index.js';

const admin = async (req, res) => {
  const properties = await Property.findAll({
    where: {
      userId: req.user.id
    },
    include: [
      { model: Category, as: 'category' },
      { model: Price, as: 'price' }
    ]
  });

  res.render('property/admin', {
    page: 'Mis Propiedades',
    csrfToken: req.csrfToken(),
    properties
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
  const { id } = req.params;

  // Validar que la propiedad exista
  const property = await Property.findByPk(id);

  if (!property) {
    return res.redirect('/my-properties');
  }

  // Validar que la propiedad no esté publicada
  if (property.published) {
    return res.redirect('/my-properties');
  }

  // Validar que la propiedad sea del usuario autenticado
  if (property.userId.toString() !== req.user.id.toString()) {
    return res.redirect('/my-properties');
  }

  res.render('property/add-image', {
    page: 'Agregar Imagen',
    csrfToken: req.csrfToken(),
    property
  });
};

const storeImage = async (req, res, next) => {
  const { id } = req.params;

  // Validar que la propiedad exista
  const property = await Property.findByPk(id);

  if (!property) {
    return res.redirect('/my-properties');
  }

  // Validar que la propiedad no esté publicada
  if (property.published) {
    return res.redirect('/my-properties');
  }

  // Validar que la propiedad sea del usuario autenticado
  if (property.userId.toString() !== req.user.id.toString()) {
    return res.redirect('/my-properties');
  }

  try {
    // Almacenar la imagen y publicar la propiedad
    property.image = req.file.filename;
    property.published = true;
    await property.save();

    next();
  } catch (error) {
    console.log(error);
    return res.render('property/add-image', {
      page: 'Agregar Imagen',
      csrfToken: req.csrfToken()
    });
  }
};

const edit = async (req, res) => {
  // Validar que la propiedad exista
  const property = await Property.findByPk(req.params.id);

  if (!property) {
    return res.redirect('/my-properties');
  }

  // Validar que la propiedad sea del usuario autenticado
  if (property.userId.toString() !== req.user.id.toString()) {
    return res.redirect('/my-properties');
  }

  // Obtener las categorías y precios
  const [categories, prices] = await Promise.all([
    Category.findAll(),
    Price.findAll()
  ]);

  res.render('property/edit', {
    page: 'Editar Propiedad',
    csrfToken: req.csrfToken(),
    categories,
    prices,
    data: property
  });
};

const saveChanges = async (req, res) => {
  let result = validationResult(req);

  const [categories, prices] = await Promise.all([
    Category.findAll(),
    Price.findAll()
  ]);

  if (!result.isEmpty()) {
    return res.render('property/edit', {
      page: 'Editar Propiedad',
      csrfToken: req.csrfToken(),
      categories,
      prices,
      errors: result.array(),
      data: req.body
    });
  }

  // Validar que la propiedad exista
  const property = await Property.findByPk(req.params.id);

  if (!property) {
    return res.redirect('/my-properties');
  }

  // Validar que la propiedad sea del usuario autenticado
  if (property.userId.toString() !== req.user.id.toString()) {
    return res.redirect('/my-properties');
  }

  // Actualizar la propiedad
  try {
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

    property.set({
      title,
      description,
      categoryId,
      priceId,
      bedrooms,
      parking,
      bathrooms,
      street,
      lat,
      lng
    });

    await property.save();

    res.redirect('/my-properties');
  } catch (error) {
    console.log(error);
    return res.render('property/edit', {
      page: 'Editar Propiedad',
      csrfToken: req.csrfToken(),
      categories,
      prices,
      errors: [{ msg: error.message }],
      data: req.body
    });
  }
};

const deleteProperty = async (req, res) => {
  // Validar que la propiedad exista
  const property = await Property.findByPk(req.params.id);

  if (!property) {
    return res.redirect('/my-properties');
  }

  // Validar que la propiedad sea del usuario autenticado
  if (property.userId.toString() !== req.user.id.toString()) {
    return res.redirect('/my-properties');
  }

  // Eliminar la imagen de la propiedad
  try {
    await unlink(`public/uploads/${property.image}`);
  } catch (error) {
    console.error(`Error deleting image file: ${error.message}`);
  }
  // Eliminar la propiedad
  await property.destroy();

  res.redirect('/my-properties');
};

export {
  admin,
  create,
  save,
  addImage,
  storeImage,
  edit,
  saveChanges,
  deleteProperty
};
