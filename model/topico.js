const database = require('../db');
const Sequelize = require('sequelize');

const Topico = database.define('topicos', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
  id_postagem {type}
  titulo: { type: Sequelize.STRING, allowNull: false },
  descricao: { type: Sequelize.STRING, allowNull: false },
});

module.exports = Topico;
