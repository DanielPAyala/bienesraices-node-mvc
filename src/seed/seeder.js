import { exit } from 'process';
import { Category, Price } from '../models/index.js';
import categories from './categories.js';
import prices from './prices.js';
import db from '../config/db.js';

const importData = async () => {
  try {
    // Connect to the database
    await db.authenticate();

    // Sync the model with the database
    await db.sync();

    // Create the categories and prices
    await Promise.all([
      Category.bulkCreate(categories),
      Price.bulkCreate(prices)
    ]);

    // Log the success message
    exit(0);
  } catch (error) {
    console.error(error);
    exit(1);
  }
};

const deleteData = async () => {
  try {
    // Connect to the database
    await db.authenticate();

    // Sync the model with the database
    await db.sync();

    // Delete the categories and prices
    // await Promise.all([
    //   Category.destroy({ truncate: true }),
    //   Price.destroy({ truncate: true })
    // ]);

    // Drop the tables and recreate them
    await db.sync({ force: true });

    // Log the success message
    exit(0);
  } catch (error) {
    console.error(error);
    exit(1);
  }
};

if (process.argv[2] === '-i') {
  importData();
}

if (process.argv[2] === '-d') {
  deleteData();
}
