const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("web", "root", "root", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = sequelize;