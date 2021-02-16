const Sequelize = require("sequelize");

const connection = new Sequelize("crud", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
