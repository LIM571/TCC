const express = require('express');
const Topico = require('../model/topico');

const router = express.Router();

// Exibe todos os tópicos
router.get('/', async (req, res) => {
    try {
        const topicos = await Topico.findAll(); // Carrega todos os tópicos
        res.render('forum', { topicos }); // Renderiza os tópicos na página de fórum
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao carregar o fórum');
    }
});

// Rota para criar um novo tópico
router.post('/', async (req, res) => {
    const { titulo, descricao } = req.body;

    try {
        await Topico.create({ titulo, descricao });
        res.redirect('/forum'); // Redireciona para a página do fórum após adicionar o tópico
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao criar o tópico');
    }
});

// Exibe as postagens de um tópico específico
router.get('/:id', async (req, res) => {
    const topicoId = req.params.id;
    try {
        const topico = await Topico.findByPk(topicoId);
        const postagens = await Postagem.findAll({ 
            where: { id_topico: topicoId } 
        });
        res.render('topico', { topico, postagens }); // Renderiza a página do tópico específico
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao carregar o tópico');
    }
});

module.exports = router;
