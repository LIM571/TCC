const express = require('express');
const app = express();
const router = express.Router();
const Usuario = require("../model/Usuario");
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const crypto = require("crypto");
const bcrypt = require('bcryptjs');

var saltRounds = 10;

// Rota GET para /cadastro
router.get('/', (req, res) => {
    res.render('cadastro');
});

// Rota POST para /cadastro
router.post("/", async function (req, res) {
    try {
        const form = new formidable.IncomingForm();

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error(err);
                return res.render("cadastro", { erro: "Selecione uma Imagem." });
            }

            const senha = fields["senha"];

            // Verifique se os campos obrigatórios estão preenchidos
            if (!senha || !fields.email || !fields.nome) {
                return res.render("cadastro", { erro: "Todos os campos são obrigatórios." });
            }

            // Verifique se o e-mail já está cadastrado
            const existeUser = await Usuario.findOne({
                where: { email: fields["email"] },
            });

            if (existeUser) {
                return res.render("cadastro", { erro: "Esse e-mail já foi cadastrado." });
            }

            // Verifique se uma imagem foi enviada
            if (!files.imagem || files.imagem.size === 0) {
                return res.render("cadastro", { erro: "Por favor, envie uma imagem." });
            }

            // Criptografa a senha
            const senhacripto = await bcrypt.hash(senha, saltRounds);

            const file = files.imagem;
            const hash1 = crypto.createHash('md5').update(Date.now().toString()).digest('hex');
            const ext = path.extname(file.originalFilename);
            const nomeimg = hash1 + ext;
            const newpath = path.join(__dirname, '../public/imagens/', nomeimg);

            fs.rename(file.filepath, newpath, async function (err) {
                if (err) {
                    console.error(err);
                    return res.render("cadastro", { erro: "Erro ao salvar a imagem. Tente novamente." });
                }

                // Cria o usuário no banco de dados
                try {
                    await Usuario.create({
                        nome: fields["nome"],
                        senha: senhacripto,
                        email: fields["email"],
                        nome_lutador: fields["nome_lutador"],
                        lvl_profissional: fields["lvl_profissional"],
                        categoria: fields["categoria"],
                        img: nomeimg,
                    });

                    return res.redirect("/login");
                } catch (dbError) {
                    console.error(dbError);
                    return res.render("cadastro", { erro: "Erro ao criar o usuário. Tente novamente." });
                }
            });
        });
    } catch (err) {
        console.error(err);
        return res.render("cadastro", { erro: "Erro interno. Por favor, tente novamente." });
    }
});

module.exports = router;
