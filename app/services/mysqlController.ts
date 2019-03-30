const mysql = require("mysql2");
const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.MYSQL_USER)
export const connection = mysql.createConnection({
  host: process.env.MYSQL_ADDRESS,
  port: process.env.PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
});

module.exports = connection;
