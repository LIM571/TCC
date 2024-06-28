const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Postagem = require('../model/postagens'); 

// Rota GET para /cadastroPostagen
router.get('/', function (req, res) {
    res.render('cadastroPostagen');
});

// Rota POST para /cadastroPostagen
router.post('/', function (req, res) {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error(err);
            return res.redirect('/cadastroPostagen');
        }
        const usuario_id = req.user.id;
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
                    usuario_id: usuario_id
                });

                console.log("Número de registros inseridos: 1");
                res.redirect('/');
            } catch (err) {
                console.error(err);
                res.redirect('/cadastroPostagen');
            }
        });
    });
});







module.exports = router;
