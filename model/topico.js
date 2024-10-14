const database = require('../db');
const Sequelize = require('sequelize');
const Usuario = require('./Usuario');

const topico = database.define('topicos', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
  titulo: { type: Sequelize.STRING, allowNull: false },
  descricao: { type: Sequelize.STRING, allowNull: false },
  usuario_id: { 
    type: Sequelize.INTEGER, 
    allowNull: false, 
    references: { 
      model: Usuario, 
      key: 'id' 
    } 
  },
});

module.exports = topico;
