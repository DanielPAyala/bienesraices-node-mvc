import User from './User.model.js';
import Property from './Property.model.js';
import Category from './Category.model.js';
import Price from './Price.model.js';

// Category.hasOne(Property); // A category can have one property
// Price.hasOne(Property); // A price can have one property

// A property can have one category and one price
Property.belongsTo(Category, { foreignKey: 'categoryId' }); // A property belongs to a category
Property.belongsTo(Price, { foreignKey: 'priceId' }); // A property belongs to a price

// A user can have many properties
User.hasMany(Property);

export { User, Property, Category, Price };
