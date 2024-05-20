const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Evento = require('../model/evento'); // Certifique-se de que o caminho está correto

// Rota GET para /cadastroEvento
router.get('/', function (req, res) {
    res.render('cadastroEvento');
});

// Rota POST para /cadastroEvento
router.post('/', function (req, res) {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error(err);
            return res.redirect('/cadastroEvento');
        }

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
                    nome_evento: nome_evento,
                    descricao_evento: descricao_evento,
                    ingresso: ingresso,
                    local: local,
                    insta: insta,
                    midia: nomeimg
                });

                console.log("Número de registros inseridos: 1");
                res.redirect('/');
            } catch (err) {
                console.error(err);
                res.redirect('/cadastroEvento');
            }
        });
    });
});

module.exports = router;
