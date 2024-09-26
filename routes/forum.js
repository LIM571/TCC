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
        const desafio = await Desafio.findAll();

        const usuarioAtual = req.user;

        // Renderizar a página de fórum com os dados
        res.render('forum', { usuarios, postagens, usuarioAtual, resposta, topicos, desafio });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao carregar o fórum');
    }
});

// Rota para exibir postagens de um tópico específico
router.get('/:id', async (req, res) => {
    const topicoId = req.params.id;
    try {
        const topico = await Topico.findByPk(topicoId);
        const usuarios = await Usuario.findAll();
        const resposta = await Resposta.findAll();
        const desafio = await desafio.findAll();
        const postagens = await Postagem.findAll({
            where: { id_topico: topicoId }
        });

        const usuarioAtual = req.user;
        const topicos = await Topico.findAll(); // Adicione isso para garantir que topicos seja passado

        // Renderize a página com a variável topicos incluída
        res.render('forum', { topico, postagens, usuarioAtual, topicos, usuarios, resposta });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao carregar o tópico');
    }
});


module.exports = router;
