const database = require('../db');
const Sequelize = require('sequelize');
const Usuario = require('./Usuario');

const Desafio = database.define('desafios', {
  id_desafio: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  usuario_desafiante: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Usuario, // Referência ao modelo Usuario
      key: 'id'
    }
  },
  usuario_desafiado: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Usuario, // Referência ao modelo Usuario
      key: 'id'
    }
  }
});

module.exports = Desafio;
