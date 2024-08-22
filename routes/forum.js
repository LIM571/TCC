const express = require('express');
const Usuario = require('../model/Usuario');
const Postagem = require('../model/postagens')
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const usuario = await Usuario.findAll();
        const postagens = await Postagem.findAll();
        res.render('forum', { usuario, postagens });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao carregar o fórum');
    }
});






module.exports = router;
