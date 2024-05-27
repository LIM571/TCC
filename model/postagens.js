const database = require('../db');
const Sequelize = require('sequelize');
const Usuario = require('./Usuario');

const postagens = database.define('postagens', {
  id_post: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
  usuario_id: { 
    type: Sequelize.INTEGER, 
    allowNull: true, 
    references: { 
      model: Usuario, 
      key: 'id' 
    } 
  }, 
  midia: { type: Sequelize.STRING, allowNull: true },
  descricao: { type: Sequelize.STRING, allowNull: true },
  createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
  updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW }
});

// Estabelecendo a relação entre as tabelas
postagens.belongsTo(Usuario, {
  foreignKey: 'usuario_id'
});

module.exports = postagens;
