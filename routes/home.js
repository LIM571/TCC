const express = require('express');
const Usuario = require('../model/Usuario');
const Evento = require('../model/evento');
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

// Rota para enviar email
router.post('/enviar-email', async (req, res) => {
    try {
        const { email } = req.body; // Captura o email do formulário

        // Configuração do e-mail aqui gpt
        const mailOptions = {
            from: 'ramuaycontact@gmail.com', // Seu e-mail
            to: email, // E-mail que foi enviado no formulário
            subject: 'Confirmação de Envio',
            text: 'Seu e-mail foi enviado com sucesso!',
        };

        // Enviando o e-mail
        await transporter.sendMail(mailOptions);
        console.log('Email enviado para:', email);

        // Após enviar o e-mail, redirecione para a rota /mestre
        res.redirect('/home/mestre');
    } catch (error) {
        console.error('Erro ao enviar o e-mail:', error);
        res.status(500).send('Erro ao enviar o e-mail');
    }
});

// Sua rota existente
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
