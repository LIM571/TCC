const express = require('express');
const router = express.Router();
const Desafio = require('../model/Desafiar');
const Usuario = require('../model/Usuario');

// Armazena os desafios recentes temporariamente
let desafiosRecentes = [];

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

        // Armazena o desafio recente
        desafiosRecentes.push(`${desafiante.nome_lutador} desafiou ${desafiado.nome_lutador}!`);

        // Redireciona de volta para o fórum após o desafio
        res.redirect('/forum');
    } catch (error) {
        console.error('Erro ao criar desafio:', error);
        res.status(500).send('Erro ao criar desafio');
    }
});

// Exporta os desafios recentes
router.get('/recentes', (req, res) => {
    res.json(desafiosRecentes);
});

module.exports = router;
