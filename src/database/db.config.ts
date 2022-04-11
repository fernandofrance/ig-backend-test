import { Sequelize } from "sequelize";
require("dotenv").config();

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPass = process.env.DB_PASS as string;
const dbHost = process.env.DB_HOST;
const dbPort = Number(process.env.DB_PORT);

const database = new Sequelize(dbName, dbUser, dbPass, {
  dialect: "postgres",
  host: dbHost,
  port: dbPort,
  logging: false
});

export default database;