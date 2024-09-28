const database = require('../db');
const Sequelize = require('sequelize');
const Usuario = require('./Usuario');
const Postagem = require('./postagens'); // Importar a model de postagens

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
  },
  estado: {
    type: Sequelize.STRING, // Novo campo 'estado'
    allowNull: false // Define se pode ser nulo ou não
  },
  id_postagem: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Postagem, // Referência ao modelo de Postagens
      key: 'id_post'
    }
  }
});

// Exporta o modelo
module.exports = Desafio;
