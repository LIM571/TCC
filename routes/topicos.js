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
// Rota para criar um novo tópico
router.post('/', async (req, res) => {
    const { titulo, descricao } = req.body;
    
    // Pegando o usuário atual (você pode ajustar isso de acordo com como o sistema de login está implementado)
    const usuario_id = req.user.id; // ou req.user.id, dependendo de como você obtém o usuário logado

    if (!usuario_id) {
        return res.status(400).send('Usuário não autenticado.');
    }

    try {
        // Cria o tópico com o ID do usuário
        await Topico.create({ titulo, descricao, usuario_id });
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
        const usuario_id = await Topico.findByPk(usuario_id);

        const postagens = await Postagem.findAll({ 
            where: { id_topico: topicoId } 
        });
        res.render('topico', { topico, postagens, usuario_id }); // Renderiza a página do tópico específico
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao carregar o tópico');
    }
});

module.exports = router;
