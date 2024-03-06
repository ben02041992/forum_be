const Sequelize = require("sequelize");

const MYSQL_URI = process.env.MYSQL_URI;

const sequelize = new Sequelize(MYSQL_URI);
sequelize.authenticate();
console.log("DB Connection is running");

module.exports = sequelize;
