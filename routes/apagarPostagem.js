const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Postagem = require('../model/postagens'); // Modelo de postagens
const Resposta = require('../model/Respostas'); // Modelo de respostas

router.post('/:id', async function (req, res) {
    const id = req.params.id;

    try {
        // Busca a postagem pelo ID
        const postagem = await Postagem.findByPk(id);

        if (!postagem) {
            return res.status(404).send('Postagem não encontrada');
        }

        const usuario_id = req.user.id; // Ajuste conforme a sua autenticação

        // Verifica se o usuário é o dono da postagem
        if (postagem.usuario_id !== usuario_id) {
            return res.status(403).send('Você não tem permissão para deletar esta postagem');
        }

        // Verifica se a postagem tem mídia associada
        if (postagem.midia) {
            const filePath = path.join(__dirname, '../public/imagens', postagem.midia);

            // Remove o arquivo de mídia associado
            fs.unlink(filePath, async (err) => {
                if (err) {
                    console.error('Erro ao deletar a mídia:', err);
                    return res.status(500).send('Falha ao deletar a mídia');
                }

                // Deleta as respostas associadas à postagem
                await Resposta.destroy({ where: { postagem_id: id } });

                // Deleta a postagem
                await Postagem.destroy({ where: { id_post: id } });

                res.redirect('/home');
            });
        } else {
            // Se não houver mídia associada, apenas deleta a postagem e respostas
            await Resposta.destroy({ where: { postagem_id: id } });
            await Postagem.destroy({ where: { id_post: id } });
            res.redirect('/home');
        }

    } catch (error) {
        console.error('Erro ao deletar postagem:', error);
        res.status(500).send('Erro ao processar a solicitação');
    }
});

module.exports = router;
