const express = require('express');
const Usuario = require('../model/Usuario');
const Evento = require('../model/evento');
const Postagem = require('../model/postagens');
const Resposta = require('../model/Respostas');
const Topico = require('../model/topico');
const Desafio = require('../model/Desafiar');
const crypto = require('crypto');
const transporter = require('../emailService'); // Importe o transporter
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const usuarioAtual = req.user;
        const eventos = await Evento.findAll();
        res.render('home', { eventos, usuarioAtual });
    } catch (error) {
        console.error('Erro ao buscar eventos:', error);
        res.status(500).send('Erro ao buscar eventos');
    }
});

// Rota para renderizar a página de envio de email
router.get('/email-mestre', (req, res) => {
    res.render('emailMestre');
});
// Rota para confirmar o e-mail
router.get('/confirmar-email', async (req, res) => {
    try {
        const { token } = req.query;
        console.log('Token recebido na URL:', token); // Log para verificar o token recebido

        // Verificar se o token existe no banco de dados
        const usuario = await Usuario.findOne({ where: { tokenConfirmacao: token } });

        if (!usuario) {
            console.log('Token não encontrado no banco de dados:', token); // Log para checar token
            return res.status(400).send('Token inválido ou expirado');
        }

        const topicos = await Topico.findAll();
        const postagens = await Postagem.findAll();
        const resposta = await Resposta.findAll();
        const desafios = await Desafio.findAll();


        // Atualizar o campo mestre para true
        await Usuario.update({ mestre: true, tokenConfirmacao: null }, { where: { id: usuario.id } });

        res.status(500).send('Email confirmado com sucesso! Agora você é um mestre. ');
        res.render('home', { postagens, usuarioAtual, resposta, topicos, desafios });

    } catch (error) {
        console.error('Erro ao confirmar o e-mail:', error);
        res.status(500).send('Erro ao confirmar o e-mail');
    }
});


/// Rota para enviar email
router.post('/enviar-email', async (req, res) => {
    try {
        const { email } = req.body;

        // Verificar se o email existe no banco de dados
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(400).send('Usuário com este e-mail não encontrado');
        }

        // Gerar um token de confirmação único
        const token = crypto.randomBytes(32).toString('hex');

        // Salvar o token no banco de dados (associado ao usuário)
        await Usuario.update({ tokenConfirmacao: token }, { where: { email: email } });

        // Configuração do e-mail
        const mailOptions = {
            from: 'ramuaycontact@gmail.com',
            to: email,
            subject: 'Confirmação de Envio',
            text: `Clique no link abaixo para confirmar seu e-mail:\n\nhttp://localhost:3000/home/confirmar-email?token=${token}`,
        };

        // Enviando o e-mail
        await transporter.sendMail(mailOptions);
        console.log('Email enviado para:', email);

        res.redirect('/home');
    } catch (error) {
        console.error('Erro ao enviar o e-mail:', error);
        res.status(500).send('Erro ao enviar o e-mail');
    }
});

// Sua rota existente


// Rota existente para mestre
router.get('/mestre', async (req, res) => {
    try {
        const usuarioAtual = req.user;
        const eventos = await Evento.findAll();

        if (!usuarioAtual) {
            return res.status(401).send('Usuário não autenticado');
        }

        // Atualizar o campo mestre para true
        await Usuario.update({ mestre: true }, { where: { id: usuarioAtual.id } });

        // Renderizar a página desejada após a atualização
        res.render('home', { eventos, usuarioAtual });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao atualizar o usuário');
    }
});

module.exports = router;
