import { Category, Price } from '../models/index.js';

const home = async (req, res) => {
  const [categories, prices] = await Promise.all([
    Category.findAll({ raw: true }),
    Price.findAll({ raw: true })
  ]);

  console.log(categories);

  res.render('home', {
    page: 'Inicio',
    categories,
    prices
  });
};

const category = (req, res) => {};

const noFound = (req, res) => {};

const searcher = (req, res) => {};

export { home, category, noFound, searcher };
