// WHERE THE CONNECTION TO THE MYSQL DB IS CREATED

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  // process.env.DB_NAME
  'courierbot',
  // process.env.DB_USER
  'root',
  // process.env.DB_PASSWORD,
  'password',
  {
    host: '149.28.70.215',
    port: 3306,
    dialect: 'mysql',
    logging: false
  }
);

module.exports = sequelize;
