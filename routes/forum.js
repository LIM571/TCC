const express = require('express');
const Usuario = require('../model/Usuario');
const Postagem = require('../model/postagens');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        const postagens = await Postagem.findAll();

        // Incluindo o usuário atual, se estiver logado
        const usuarioAtual = req.user;

        res.render('forum', { usuarios, postagens, usuarioAtual });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao carregar o fórum');
    }
});

module.exports = router;
