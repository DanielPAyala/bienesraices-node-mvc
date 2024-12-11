import { Sequelize } from 'sequelize';

const db = new Sequelize('bienesraices_node_mvc', 'root', 'mysql', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  define: {
    timestamps: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: 0,
  logging: false
});

export default db;