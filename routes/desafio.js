const express = require('express');
const router = express.Router();
const Desafio = require('../model/Desafiar'); // Importe o modelo de Desafio

// Rota para desafiar
router.post('/desafiar', async (req, res) => {
    const { usuario_desafiante, usuario_desafiado } = req.body;

    try {
        // Cria o novo desafio
        const novoDesafio = await Desafio.create({
            usuario_desafiante: usuario_desafiante,
            usuario_desafiado: usuario_desafiado
        });

        // Redireciona para uma página ou responde com sucesso
        res.redirect('/forum');
    } catch (error) {
        console.error('Erro ao criar desafio:', error);
        res.status(500).send('Erro ao criar desafio');
    }
});

module.exports = router;
