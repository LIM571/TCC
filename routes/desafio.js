const express = require('express');
const app = express();
const router = express.Router();
const Desafio = require('../model/Desafiar');
const Usuario = require('../model/Usuario');

// Armazena os desafios recentes temporariamente
let desafiosRecentes = [];

// Rota para desafiar
router.post('/', async (req, res) => {
    const { usuario_desafiante, usuario_desafiado, id_postagem } = req.body;

     // Verifica se já existe um desafio entre os usuários para a mesma postagem
    const desafioExistente = await Desafio.findOne({
        where: {
            usuario_desafiante,
            usuario_desafiado,
            id_postagem
        }
    });

    // Se já existir um desafio, retorne uma mensagem de erro
    if (desafioExistente) {
        return res.status(400).json({ error: "Você já desafiou este usuário nesta postagem." });
    }


    try {
        // Verifique se o campo id_postagem foi fornecido
        if (!id_postagem) {
            return res.status(400).send('O campo id_postagem é obrigatório');
        }

        // Busque os nomes dos lutadores (desafiante e desafiado) pelos seus IDs
        const desafiante = await Usuario.findByPk(usuario_desafiante);
        const desafiado = await Usuario.findByPk(usuario_desafiado);

        // Verifique se ambos os usuários existem
        if (!desafiante || !desafiado) {
            return res.status(404).send('Usuário não encontrado');
        }

        // Cria o novo desafio com o id_postagem
        const novoDesafio = await Desafio.create({
            usuario_desafiante: usuario_desafiante,
            usuario_desafiado: usuario_desafiado,
            id_postagem: id_postagem // Agora estamos passando o id da postagem
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


// Exemplo de como deveria ser a rota para resposta ao desafio
router.post('/resposta', async (req, res) => {
    const { desafio_id, resposta } = req.body;

    try {
        if (typeof desafio_id === 'undefined' || typeof resposta === 'undefined') {
            console.error('Erro: desafio_id ou resposta não definidos');
            return res.status(400).send('Dados não fornecidos corretamente');
        }

        if (resposta === 'aceitar') {
            await Desafio.update({ estado: 'aceito' }, { where: { id_desafio: desafio_id } });
            res.send('Desafio aceito!');
        } else if (resposta === 'negar') {
            await Desafio.update({ estado: 'negado' }, { where: { id_desafio: desafio_id } });
            res.send('Desafio negado!');
        }

        // Atualiza a lista de desafios recentes
        desafiosRecentes = desafiosRecentes.filter(desafio => desafio.id_desafio !== desafio_id);

    } catch (error) {
        console.error('Erro ao processar a resposta do desafio:', error);
        res.status(500).send('Erro ao processar a resposta do desafio');
    }
});


// Exporta os desafios recentes
router.get('/recentes', (req, res) => {
    res.json(desafiosRecentes);
});

module.exports = router;
