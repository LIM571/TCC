const express = require('express');
const router = express.Router();
const Topico = require('../model/topico'); // Modelo de tópicos
const Postagem = require('../model/postagens'); // Modelo de postagens
const Resposta = require('../model/Respostas'); // Modelo de respostas

router.get('/:id', async function (req, res) {
    const id = req.params.id;

    try {
        // Busca o tópico pelo ID
        const topico = await Topico.findByPk(id);

        if (!topico) {
            return res.status(404).send('Tópico não encontrado');
        }

        // Deleta todas as postagens associadas ao tópico
        const postagens = await Postagem.findAll({ where: { id_topico: id } });
        for (const postagem of postagens) {
            // Deleta as respostas associadas a cada postagem
            await Resposta.destroy({ where: { postagem_id: postagem.id_post } });

            // Deleta a postagem
            await Postagem.destroy({ where: { id_post: postagem.id_post } });
        }

        // Deleta o tópico
        await Topico.destroy({ where: { id: id } });

        res.redirect('/home');
    } catch (error) {
        console.error('Erro ao deletar tópico:', error);
        res.status(500).send('Erro ao processar a solicitação');
    }
});

module.exports = router;
