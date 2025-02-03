'use strict';

import {Sequelize} from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// const pool = new Pool({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME
// });
const sequelize = new Sequelize(
  process.env.DB_NAME as string,   // Database name
  process.env.DB_USER as string,   // Username
  process.env.DB_PASSWORD as string,   // Password
  {
    host: process.env.DB_HOST as string, // Database host
    dialect: 'postgres',      // Using PostgreSQL dialect
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432, // Database port (defaults to 5432 for PostgreSQL)
    logging: (msg:string) => console.log(msg),
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