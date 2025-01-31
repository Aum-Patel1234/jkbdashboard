'use strict';

const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// const pool = new Pool({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME
// });
const sequelize = new Sequelize(
  process.env.DB_NAME,   // Database name
  process.env.DB_USER,   // Username
  process.env.DB_PASSWORD,   // Password
  {
    host: process.env.DB_HOST, // Database host
    dialect: 'postgres',      // Using PostgreSQL dialect
    port: process.env.DB_PORT, // Database port (defaults to 5432 for PostgreSQL)
    logging: msg => console.log(msg),
    pool: {
      max: 5,                // Maximum number of connections
      min: 0,                // Minimum number of connections
      acquire: 30000,        // Maximum time (in ms) to wait for a connection
      idle: 10000            // Maximum time (in ms) a connection can be idle before being released
    }
  });

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

module.exports = sequelize;
