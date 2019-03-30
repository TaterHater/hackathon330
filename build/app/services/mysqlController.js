"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql2");
const dotenv = require('dotenv');
dotenv.config();
console.log(process.env.MYSQL_USER);
exports.connection = mysql.createConnection({
    host: process.env.MYSQL_ADDRESS,
    port: process.env.PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
});
module.exports = exports.connection;
