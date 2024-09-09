const database = require('../db');
const Sequelize = require('sequelize');
const postagens = require('./postagens');  // Importando o modelo de postagens
const Usuario = require('./Usuario'); // Importando o modelo de usuário

const Respostas = database.define('respostas', {
  id_resposta: { 
    type: Sequelize.INTEGER, 
    autoIncrement: true, 
    allowNull: false, 
    primaryKey: true 
  },
  postagem_id: { 
    type: Sequelize.INTEGER, 
    allowNull: false, 
    references: { 
      model: postagens, 
      key: 'id_post' 
    } 
  }, 
  usuario_id: { 
    type: Sequelize.INTEGER, 
    allowNull: false, 
    references: { 
      model: Usuario, 
      key: 'id' 
    } 
  },
  conteudo: { 
    type: Sequelize.TEXT, 
    allowNull: false 
  },
  createdAt: { 
    type: Sequelize.DATE, 
    allowNull: false, 
    defaultValue: Sequelize.NOW 
  },
  updatedAt: { 
    type: Sequelize.DATE, 
    allowNull: false, 
    defaultValue: Sequelize.NOW 
  }
});

// Estabelecendo a relação entre as tabelas
Respostas.belongsTo(postagens, {
  foreignKey: 'id_post',
});

Respostas.belongsTo(Usuario, {
  foreignKey: 'usuario_id'
});

module.exports = Respostas;
