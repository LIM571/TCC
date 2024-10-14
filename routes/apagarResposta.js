const express = require('express');
const router = express.Router();
const Resposta = require('../model/Respostas'); // Modelo de respostas

router.get('/:id', async function (req, res) {
    const id = req.params.id;

    try {
        // Busca a resposta pelo ID
        const resposta = await Resposta.findByPk(id);

        if (!resposta) {
            return res.status(404).send('Resposta não encontrada');
        }

        // Deleta a resposta
        await Resposta.destroy({ where: { id_resposta: id } });

        res.redirect('/home');
    } catch (error) {
        console.error('Erro ao deletar resposta:', error);
        res.status(500).send('Erro ao processar a solicitação');
    }
});

module.exports = router;
