'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const pool = new Pool({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME
// });
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, // Database name
process.env.DB_USER, // Username
process.env.DB_PASSWORD, // Password
{
    host: process.env.DB_HOST, // Database host
    dialect: 'postgres', // Using PostgreSQL dialect
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432, // Database port (defaults to 5432 for PostgreSQL)
    logging: process.env.DB_LOGGING === "true" ? console.log : false,
    pool: {
        max: 10, // Maximum number of connections
        min: 2, // Minimum number of connections
        acquire: 30000, // Maximum time (in ms) to wait for a connection
        idle: 10000 // Maximum time (in ms) a connection can be idle before being released
    },
    dialectOptions: process.env.DB_SSL === "true"
        ? {
            ssl: {
                require: true,
                rejectUnauthorized: false, // Allow self-signed certificates
            },
        }
        : {},
});
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log('Database connection established successfully!');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
testConnection();
module.exports = sequelize;
