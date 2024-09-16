const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Resposta = require('../model/Respostas'); // Certifique-se de que o caminho está correto

router.get('/cadastro', function (req, res) {
    const usuarioAtual = req.user;
    res.render('cadastro', {usuarioAtual});

});

router.post('/cadastro', function (req, res)  {
    let postagem_id = req.body.postagem_id;
    console.log(postagem_id)
    res.render('cadastroResposta' , {postagem_id});  // Redirecione após o sucesso
});


router.post('/envio', async function  (req, res) {

    try {
        const conteudo  = req.body.conteudo;
        const usuario_id = req.user.id;  // Pegue o ID do usuário logado
        let postagem_id = req.body.postagem_id;  // ID da postagem (deve ser passado ou no corpo ou no hidden field)

        // Criação da nova resposta
        await Resposta.create({
            conteudo: conteudo,
            usuario_id: usuario_id,
            postagem_id: postagem_id,
        });

        res.redirect('/forum');  // Redirecione após o sucesso
    } catch (error) {
        console.error("Erro ao cadastrar resposta:", error);
        res.status(500).send('Erro ao cadastrar a resposta');
    }
});



// Rota POST para /cadastroEvento

module.exports = router;
