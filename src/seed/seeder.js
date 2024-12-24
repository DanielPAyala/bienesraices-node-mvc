import { exit } from 'process';
import Category from '../models/Category.model.js';
import categories from './categories.js';
import db from '../config/db.js';

const importData = async () => {
  try {
    // Connect to the database
    await db.authenticate();

    // Sync the model with the database
    await db.sync();

    // Create the categories
    await Category.bulkCreate(categories);
    
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
