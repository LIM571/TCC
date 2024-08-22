const database = require('../db');
const Sequelize = require('sequelize');
const Usuario = require('./Usuario');


const Evento = database.define('eventos', {
  id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
  nome_evento: {type: Sequelize.STRING, allowNull: false},
  id_usuario: { 
    type: Sequelize.INTEGER, 
    allowNull: true, 
    references: { 
      model: Usuario, 
      key: 'id' 
    } 
  }, 
  descricao_evento: {type: Sequelize.STRING, allowNull: false},
  ingresso: {type: Sequelize.FLOAT, allowNull: false},
  local: {type: Sequelize.STRING, allowNull: false},
  insta: {type: Sequelize.STRING, allowNull: false},
  midia: {type: Sequelize.STRING, allowNull: true} // Adicionando o campo midia
});

module.exports = Evento;
