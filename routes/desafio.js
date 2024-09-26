const express = require('express');
const router = express.Router();
const Desafio = require('../model/Desafiar');
const Usuario = require('../model/Usuario'); // Importe o modelo de Usuario

// Rota para desafiar
router.post('/', async (req, res) => {
    const { usuario_desafiante, usuario_desafiado } = req.body;

    try {
        // Busque os nomes dos lutadores (desafiante e desafiado) pelos seus IDs
        const desafiante = await Usuario.findByPk(usuario_desafiante);
        const desafiado = await Usuario.findByPk(usuario_desafiado);

        // Verifique se ambos os usuários existem
        if (!desafiante || !desafiado) {
            return res.status(404).send('Usuário não encontrado');
        }

        // Cria o novo desafio
        const novoDesafio = await Desafio.create({
            usuario_desafiante: usuario_desafiante,
            usuario_desafiado: usuario_desafiado
        });

        // Envie a resposta com os nomes dos lutadores
        res.send(  `${desafiante.nome_lutador} desafiou ${desafiado.nome_lutador}!`);
    } catch (error) {
        console.error('Erro ao criar desafio:', error);
        res.status(500).send('Erro ao criar desafio');
    }
});

module.exports = router;
