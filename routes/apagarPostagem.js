const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Postagem = require('../model/postagens'); // Importar o modelo de Postagem

const router = express.Router();

router.get('/:id', async function (req, res) {
    const id = req.params.id;

    try {
        // Buscar a postagem pelo id
        const postagem = await Postagem.findByPk(id);

        if (!postagem) {
            return res.status(404).send('Postagem não encontrada');
        }

        // Verificar se há um arquivo de mídia para apagar
        if (postagem.midia) {
            const filePath = path.join(__dirname, "../public/imagens/", postagem.midia);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Erro ao tentar excluir a mídia:', err);
                } else {
                    console.log('Mídia excluída com sucesso:', postagem.midia);
                }
            });
        }

        // Excluir a postagem do banco de dados
        await Postagem.destroy({ where: { id_post: id } });

        // Redirecionar após a exclusão
        res.redirect('/forum'); // Ajuste o redirecionamento conforme necessário

    } catch (error) {
        console.error('Erro ao tentar apagar a postagem:', error);
        res.status(500).send('Erro ao tentar apagar a postagem');
    }
});

module.exports = router;
