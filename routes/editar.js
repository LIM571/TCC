const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const Usuario = require('../model/Usuario'); // Modelo Sequelize
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

// Rota para editar o perfil do usuário
router.post('/:id', async (req, res) => {
    const form = new formidable.IncomingForm({
        allowEmptyFiles: true,
        minFileSize: 0,
    
        uploadDir: path.join(__dirname, "../public/imagens"), // Define o diretório temporário para uploads
        keepExtensions: true, // Mantém a extensão do arquivo
    });

    form.parse(req, async (err, fields, files) => {
        try {
            if (err) {
                console.error("Erro ao processar o formulário:", err);
                return res.status(400).send('Erro ao processar o formulário');
            }

            // Atualizando os valores do usuário
            const updateValues = {
                nome: String(fields['nome']),
                email: String(fields['email']),
                nome_lutador: String(fields['nome_lutador']),
                lvl_profissional: String(fields['lvl_profissional']),
                categoria: String(fields['categoria']),
            };

            // Verifique se uma nova imagem foi carregada
            if (files.img && files.img[0].originalFilename.length  > 0) {
                console.log("Nova imagem carregada:", files.img[0].originalFilename);
                console.log() // Log para depuração
                
                // Se uma nova imagem for fornecida, gera o nome e salva
                let nomeimg = crypto.createHash('md5').update(Date.now().toString()).digest('hex');
                const ext = path.extname(files.img[0].originalFilename);
                nomeimg += ext;

                const newpath = path.join(__dirname, "../public/imagens", nomeimg);

                // Mover o arquivo para o novo caminho
                await fs.promises.rename(files.img[0].filepath, newpath);
                console.log(`Imagem salva em: ${newpath}`); // Log para depuração

                updateValues.img = nomeimg; // Atualiza o nome da imagem no banco de dados
            } else {
                console.log("Nenhuma nova imagem foi carregada.");
            }

            // Atualizando o usuário no banco de dados
            const [updated] = await Usuario.update(updateValues, {
                where: { id: req.params.id }
            });

            if (updated) {
                console.log("Usuário atualizado com sucesso!");
                res.redirect('/home');
            } else {
                console.error("Erro ao atualizar o usuário.");
                res.status(400).send('Usuário não encontrado ou não atualizado.');
            }
        } catch (error) {
            console.error("Erro ao atualizar o usuário:", error);
            res.status(500).send('Erro interno do servidor');
        }
    });
});

module.exports = router;