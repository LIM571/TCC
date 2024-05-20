const database = require('../db');
const Sequelize = require('sequelize');
const Usuario = require('./Usuario');

const postagens = database.define('postagens', {
  id_post: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
  usuario_id: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'usuarios', key: 'id' } }, 
  midia: { type: Sequelize.STRING, allowNull: true }, //ajeitar a chave estrangeira
  descricao: { type: Sequelize.STRING, allowNull: true } 
});

module.exports = postagens;
