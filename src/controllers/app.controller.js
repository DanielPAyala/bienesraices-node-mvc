import { Category, Price, Property } from '../models/index.js';

const home = async (req, res) => {
  const [categories, prices, houses, departments] = await Promise.all([
    Category.findAll({ raw: true }),
    Price.findAll({ raw: true }),
    Property.findAll({
      limit: 3,
      where: {
        categoryId: 1
      },
      include: [
        {
          model: Price,
          as: 'price'
        }
      ],
      prder: [['creadtedAt', 'DESC']]
    }),
    Property.findAll({
      limit: 3,
      where: {
        categoryId: 2
      },
      include: [
        {
          model: Price,
          as: 'price'
        }
      ],
      prder: [['creadtedAt', 'DESC']]
    })
  ]);

  res.render('home', {
    page: 'Inicio',
    categories,
    prices,
    houses,
    departments
  });
};

const category = (req, res) => {};

const noFound = (req, res) => {};

const searcher = (req, res) => {};

export { home, category, noFound, searcher };
