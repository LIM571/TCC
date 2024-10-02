const express = require('express');
const Usuario = require('../model/Usuario');
const Postagem = require('../model/postagens');
const Resposta = require('../model/Respostas');
const Topico = require('../model/topico');
const Desafio = require('../model/Desafiar'); // Importe o modelo de Desafio


const router = express.Router();

// Rota para listar todos os tópicos no fórum
router.get('/', async (req, res) => {
    try {
        const topicos = await Topico.findAll();
        const usuarios = await Usuario.findAll();
        const postagens = await Postagem.findAll();
        const resposta = await Resposta.findAll();
        const desafios = await Desafio.findAll();

        const usuarioAtual = req.user;

        // Renderizar a página de fórum com os dados
        res.render('postEventos', { usuarios, postagens, usuarioAtual, resposta, topicos, desafios });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao carregar os eventos');
    }
});

// Rota para exibir postagens de um tópico específico


module.exports = router;
