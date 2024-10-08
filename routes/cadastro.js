const express = require('express');
const app = express();
const router = express.Router();
const Usuario = require("../model/Usuario");
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const crypto = require("crypto");
const bcrypt = require('bcryptjs');
const transporter = require('../emailService');

var saltRounds = 10;

// Rota GET para /cadastro

router.get('/', (req, res) => {
    res.render('cadastro');
});

router.post("/", async function (req, res) {
    try {
        const form = new formidable.IncomingForm();

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error(err);
                return res.redirect("/cadastro");
            }

            const senha = fields["senha"][0];

            if (
                senha.length == 0 &&
                fields.email[0].length == 0 &&
                fields.nome[0].length == 0
            ) {
                return res.redirect("/cadastro");
            }

            const existeUser = await Usuario.findOne({
                where: { email: fields["email"][0] },
            });
            if (existeUser) {
                return res.redirect("/cadastro");
            }

            const senhacripto = await bcrypt.hash(senha, saltRounds);

            if (files.imagem[0] && files.imagem[0].size > 0) {
                const file = files.imagem[0];

                const hash = crypto
                    .createHash("md5")
                    .update(Date.now().toString())
                    .digest("hex");

                var oldpath = files.imagem[0].filepath;
                var hash1 = crypto.createHash('md5').update(Date.now().toString()).digest('hex');
                var ext = path.extname(files.imagem[0].originalFilename);
                var nomeimg = hash1 + ext;
                var newpath = path.join(__dirname, '../public/imagens/', nomeimg);

                fs.rename(files.imagem[0].filepath, newpath, async function (err) {
                    if (err) {
                        console.error(err);
                        return res.redirect("/cadastro");
                    }
                    console.log("Arquivo de imagem enviado com sucesso");

                    // Criar o usuário no banco de dados
                    const novoUsuario = await Usuario.create({
                        nome: fields["nome"][0],
                        senha: senhacripto,
                        email: fields["email"][0],
                        nome_lutador: fields["nome_lutador"][0],
                        lvl_profissional: fields["lvl_profissional"][0],
                        categoria: fields["categoria"][0],
                        img: nomeimg,
                        mestre: false,  // Por padrão, não é mestre até a confirmação
                    });

                    // Enviar e-mail de confirmação
                    const verificationLink = `http://localhost:3000/confirmar-email?token=${novoUsuario.id}`; // O token pode ser o ID do usuário

                    const mailOptions = {
                        from: 'seu-email@gmail.com',
                        to: fields["email"][0],
                        subject: 'Confirme seu email',
                        text: `Olá, clique no link para confirmar seu email: ${verificationLink}`,
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.error('Erro ao enviar email:', error);
                        } else {
                            console.log('Email enviado: ' + info.response);
                        }
                    });

                    return res.redirect("/login?emailEnviado=true");
                });
            }
        });
    } catch (err) {
        console.error(err);
        res.redirect("/cadastro");
    }
});



module.exports = router;