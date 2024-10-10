const database = require('../db');
const Sequelize = require('sequelize');
const Usuario = require('./Usuario');
const Postagem = require('./postagens');

const Notificacao = database.define('notificacoes', {
  id: { 
    type: Sequelize.INTEGER, 
    autoIncrement: true, 
    allowNull: false, 
    primaryKey: true 
  },
  usuario_id: { 
    type: Sequelize.INTEGER, 
    allowNull: false, 
    references: { 
      model: Usuario, 
      key: 'id' 
    } 
  },
  id_postagem: { 
    type: Sequelize.INTEGER, 
    allowNull: false, 
    references: { 
      model: Postagem, 
      key: 'id_post' 
    } 
  },
  total_notificacoes: { 
    type: Sequelize.INTEGER, 
    allowNull: false, 
    defaultValue: 1 
  },
  estado: { 
    type: Sequelize.STRING, 
    allowNull: false, 
    defaultValue: 'pendente' 
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
Notificacao.belongsTo(Usuario, {
  foreignKey: 'usuario_id'
});

Notificacao.belongsTo(Postagem, {
  foreignKey: 'id_postagem'
});

module.exports = Notificacao;
