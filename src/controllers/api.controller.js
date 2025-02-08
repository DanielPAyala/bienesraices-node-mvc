import { Property, Price, Category } from '../models/index.js';

const properties = async (req, res) => {
  const properties = await Property.findAll({
    include: [
      { model: Price },
      { model: Category },
    ],
  });

  res.json(properties);
};

export { properties };
