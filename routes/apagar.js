const express = require('express');
const router = express.Router();
const Desafio = require('../model/Desafiar'); // Supondo que você tenha um modelo de desafios

router.get('/:id', async function (req, res) {
    const usuario_id = req.user ? req.user.id : null; // Defina usuario_id aqui

    if (!usuario_id) {
        return res.status(403).send('Usuário não autenticado');
    }

    try {
        // Aqui você deve ter a lógica para buscar a contagem de desafios
        const contagemDesafios = await Desafio.count({ where: { usuario_id: usuario_id } });
        
        // Continue com sua lógica...
        res.json({ contagem: contagemDesafios });
    } catch (error) {
        console.error('Erro ao buscar contagem de desafios:', error);
        res.status(500).send('Erro ao processar a solicitação');
    }
});

module.exports = router;
