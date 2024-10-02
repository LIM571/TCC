const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Evento = require('../model/evento'); 

router.get('/:id', async function (req, res) {
    const id = req.params.id;

    try {
        // Busca o registro do evento pelo ID
        const evento = await Evento.findByPk(id);

        if (!evento) {
            return res.status(404).send('Evento não encontrado');
        }

        const fileName = evento.img; // Assume que o nome do arquivo está na coluna `img`

        // Verifica se fileName não está undefined
        if (fileName) {
            const filePath = path.join(__dirname, '../public/imagens', fileName); // Corrigido caminho

            // Remove o arquivo
            fs.unlink(filePath, async (err) => {
                if (err) {
                    return res.status(500).send('Falha ao deletar o arquivo');
                }

                // Deleta o registro do banco de dados
                await Evento.destroy({ where: { id: id } });
                res.send('Registro deletado com sucesso');
            });
        } else {
            // Se não houver imagem associada, apenas deleta o registro do banco de dados
            await Evento.destroy({ where: { id: id } });
            res.send('Registro deletado com sucesso, sem imagem associada');
        }
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).send('Erro ao processar a solicitação');
    }
});

module.exports = router;
