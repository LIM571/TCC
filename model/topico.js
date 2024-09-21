const database = require('../db');
const Sequelize = require('sequelize');

const topico = database.define('topicos', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
  titulo: { type: Sequelize.STRING, allowNull: false },
  descricao: { type: Sequelize.STRING, allowNull: false },
});

module.exports = topico;
