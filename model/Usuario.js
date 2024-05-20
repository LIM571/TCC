const database = require('../db');
const Sequelize = require('sequelize');

const Usuario = database.define('usuarios', {
  id: { type: Sequelize.INTEGER, autoIncrement: true,allowNull: false, primaryKey: true},
  nome: {type: Sequelize.STRING,allowNull: false},
  email: {type: Sequelize.STRING,allowNull: false,unique: true },
  nome_lutador: {type: Sequelize.STRING,allowNull: false},
  lvl_profissional: {type: Sequelize.STRING,allowNull: false},
  categoria: {type: Sequelize.FLOAT,allowNull: false},
  senha: {type: Sequelize.STRING,allowNull: false},
  mestre: {type: Sequelize.BOOLEAN,defaultValue: false,allowNull: true},
  img: {type: Sequelize.STRING,allowNull: false}
});

module.exports = Usuario;