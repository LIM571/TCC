const express = require('express');
const Usuario = require('../model/Usuario');
const Postagem = require('../model/postagens');
const Notificacao = require('../model/Notificacao');
const Topico = require('../model/topico');
const Desafio = require('../model/Desafiar');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const notificacoes = await Notificacao.findAll();
        const usuarios = await Usuario.findAll();
        const postagens = await Postagem.findAll();
        const topico = await Topico.findAll();
        const desafios = await Desafio.findAll();

        const usuarioAtual = req.user;



        res.render('perfil', { usuarios, postagens, usuarioAtual, notificacoes, topico, desafios });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao carregar o fórum');
    }
});

module.exports = router;
