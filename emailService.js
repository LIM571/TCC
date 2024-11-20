const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

// Configuração do transporte para o envio de emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
        user: 'ramuaycontact@gmail.com',
        pass: 'a', 
    },
    tls: {
        rejectUnauthorized: false, // Para evitar erros com certificados
    },
});

module.exports = transporter;
