const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Evento = require('../model/evento'); // Certifique-se de que o caminho está correto
const Usuario = require('../model/Usuario'); // Para garantir que você tenha acesso ao modelo de usuário

// Rota GET para /cadastroEvento
router.get('/', function (req, res) {
    const usuarioAtual = req.user;
    
    // Verifica se o usuário é mestre
    if (usuarioAtual.mestre) {
        res.render('cadastroEvento', { usuarioAtual });
    } else {
        // Se não for mestre, redireciona ou mostra uma mensagem de erro
        res.status(403).send('Acesso negado. Apenas mestres podem cadastrar eventos.');
    }
});

// Rota POST para /cadastroEvento
router.post('/', async function (req, res) {
    const usuarioAtual = req.user;

    // Verifica se o usuário é mestre antes de permitir o cadastro do evento
    if (!usuarioAtual.mestre) {
        return res.status(403).send('Acesso negado. Apenas mestres podem cadastrar eventos.');
    }

    const form = new formidable.IncomingForm();
    
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error(err);
            return res.redirect('/cadastroEvento');
        }
        
        const id_usuario = usuarioAtual.id;
        const nome_evento = fields['nome_evento'][0];
        const descricao_evento = fields['descricao_evento'][0];
        const ingresso = parseFloat(fields['ingresso'][0]);
        const local = fields['local'][0];
        const insta = fields['insta'][0];
        const nomeimg = crypto.createHash('md5').update(Date.now().toString()).digest('hex') + path.extname(files.midia[0].originalFilename);
        const newpath = path.join(__dirname, "../public/imagens/", nomeimg);

        fs.rename(files.midia[0].filepath, newpath, async (err) => {
            if (err) {
                console.error(err);
                return res.redirect('/cadastroEvento');
            }

            try {
                await Evento.create({
                    id_usuario: id_usuario,
                    nome_evento: nome_evento,
                    descricao_evento: descricao_evento,
                    ingresso: ingresso,
                    local: local,
                    insta: insta,
                    midia: nomeimg
                });
                
                console.log("Número de registros inseridos: 1");
                res.redirect('/home');
            } catch (err) {
                console.error(err);
                res.redirect('/cadastroEvento');
            }
        });
    });
});

module.exports = router;
