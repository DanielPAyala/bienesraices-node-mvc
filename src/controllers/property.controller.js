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
    navBar: true,
    categories,
    prices
  });
};

export { admin, create };
