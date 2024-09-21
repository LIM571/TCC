const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Postagem = require('../model/postagens');

router.post('/', function (req, res) {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error(err);
            return res.redirect('/cadastroPostagen');
        }

        const usuario_id = req.user.id;
        const topico_id = req.params.topicoId; // Captura o ID do tópico da URL
        const descricao = fields['descricao'][0];
        const nomeimg = crypto.createHash('md5').update(Date.now().toString()).digest('hex') + path.extname(files.midia[0].originalFilename);
        const newpath = path.join(__dirname, "../public/imagens/", nomeimg);

        fs.rename(files.midia[0].filepath, newpath, async (err) => {
            if (err) {
                console.error(err);
                return res.redirect('/cadastroPostagen');
            }

            try {
                await Postagem.create({
                    descricao: descricao,
                    midia: nomeimg,
                    id_topico: topico_id,
                    usuario_id: usuario_id
                });

                console.log("Número de registros inseridos: 1");
                res.redirect('/forum');
            } catch (err) {
                console.error(err);
                res.redirect('/forum');
            }
        });
    });
});

module.exports = router;
