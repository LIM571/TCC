const express = require('express');
const app = express();
const router = express.Router();
const Organizacao = require("../model/Organizacao"); // Modelo de organização
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const crypto = require("crypto");
const bcrypt = require('bcryptjs');
const transporter = require('../emailService');

var saltRounds = 10;

// Rota GET para /cadastroOrganizacao

router.get('/', (req, res) => {
    res.render('cadastroOrganizacao'); // Renderiza o formulário de organização
});

router.post("/", async function (req, res) {
    try {
        const form = new formidable.IncomingForm();

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error(err);
                return res.redirect("/cadastroOrganizacao");
            }

            const senha = fields["senha"][0];

            if (
                senha.length == 0 &&
                fields.email[0].length == 0 &&
                fields.nome[0].length == 0
            ) {
                return res.redirect("/cadastroOrganizacao");
            }

            const existeOrganizacao = await Organizacao.findOne({
                where: { email: fields["email"][0] },
            });
            if (existeOrganizacao) {
                return res.redirect("/cadastroOrganizacao");
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
                        return res.redirect("/cadastroOrganizacao");
                    }
                    console.log("Arquivo de imagem enviado com sucesso");

                    // Criar a organização no banco de dados
                    const novaOrganizacao = await Organizacao.create({
                        nome: fields["nome"][0],
                        senha: senhacripto,
                        email: fields["email"][0],
                        img: nomeimg,
                    });

                    // Enviar e-mail de confirmação
                    const verificationLink = `http://localhost:3000/confirmar-email-organizacao?token=${novaOrganizacao.id}`;

                    const mailOptions = {
                        from: 'ramuaycontact@gmail.com',
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
        res.redirect("/cadastroOrganizacao");
    }
});

module.exports = router;
