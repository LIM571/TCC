const express = require('express');
const Usuario = require('../model/Usuario');
const Postagem = require('../model/postagens')
const Evento = require('../model/evento')
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const usuarioAtual = req.user;
        const eventos = await Evento.findAll();
        console.log('Eventos buscados:', eventos); // Log para depuração
        res.render('home', { eventos, usuarioAtual });
    } catch (error) {
        console.error('Erro ao buscar eventos:', error);
        res.status(500).send('Erro ao buscar eventos');
    }
});



module.exports = router;
