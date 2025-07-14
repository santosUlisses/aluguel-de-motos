const { Sequelize } = require('sequelize');

const conn = new Sequelize("aluguelmotos", "root", "98955497", { host: "localhost", dialect: "mysql" });



module.exports = conn;