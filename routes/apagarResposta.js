const express = require('express');
const Respostas = require('../model/Respostas'); // Importando o modelo de Respostas
const router = express.Router();

router.get('/:id', async function (req, res) {
    const id = req.params.id;

    try {
        // Buscar a resposta pelo id
        const resposta = await Respostas.findByPk(id);

        if (!resposta) {
            return res.status(404).send('Resposta não encontrada');
        }

        // Deleta o registro da tabela Respostas
        await Respostas.destroy({ where: { id_resposta: id } });

        // Redirecionar após a exclusão (ajuste a rota conforme necessário)
        res.redirect('/forum'); // Redirecione para a página apropriada

    } catch (error) {
        console.error('Erro ao tentar apagar a resposta:', error);
        res.status(500).send('Erro ao tentar apagar a resposta');
    }
});

module.exports = router;
