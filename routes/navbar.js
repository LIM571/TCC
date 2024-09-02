const express = require('express');
const Usuario = require('../model/Usuario');
const router = express.Router();

router.get('/', async (req, res) => {
    try {

        const usuarioAtual = req.user;
        console.log('user: '+ req.user)
        res.render('navbar', { usuarioAtual });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao carregar o navbar');
    }
});

module.exports = router;
