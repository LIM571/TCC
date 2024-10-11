const database = require('../db');
const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const Usuario = require('./Usuario');
const Postagem = require('./postagens'); 



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
      model: Usuario, 
      key: 'id'
    }
  },
  usuario_desafiado: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Usuario, 
      key: 'id'
    }
  },
  estado: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'pendente'  // Estado inicial é "pendente"
  },
  id_postagem: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Postagem, 
      key: 'id_post'
    }
  }
});

// Rota para aceitar o desafio
app.post('/desafio/aceitar', async (req, res) => {
  const { desafio_id } = req.body;
  try {
    await Desafio.update({ estado: 'aceito' }, { where: { id_desafio: desafio_id } });
    res.redirect('/forum'); // Redireciona para o fórum
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao aceitar o desafio');
  }
});

// Rota para negar o desafio
app.post('/desafio/negar', async (req, res) => {
  const { desafio_id } = req.body;
  try {
    await Desafio.update({ estado: 'negado' }, { where: { id_desafio: desafio_id } });
    res.redirect('/forum');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao negar o desafio');
  }
});

module.exports = Desafio;
