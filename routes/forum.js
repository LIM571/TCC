const express = require('express');
const Usuario = require('../model/Usuario');
const Postagem = require('../model/postagens');
const Resposta = require('../model/Respostas');
const Topico = require('../model/topico');
const Desafio = require('../model/Desafiar');
const Notificacao = require('../model/Notificacao'); // Importe o modelo de Desafio
const { where } = require('sequelize');


const router = express.Router();

// Rota para listar todos os tópicos no fórum
router.get('/', async (req, res) => {
    try {
        const topicos = await Topico.findAll();
        const usuarios = await Usuario.findAll();
        const postagens = await Postagem.findAll();
        const resposta = await Resposta.findAll();
        const desafios = await Desafio.findAll();

        const usuarioAtual = req.user;

        // Renderizar a página de fórum com os dados
        res.render('forum', { usuarios, postagens, usuarioAtual, resposta, topicos, desafios });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao carregar o fórum');
    }
});
router.get('/postagem/:id', async (req, res) => {
    const idPostagem = req.params.id;
    const usuario_id = req.user.id; // ID do usuário logado
  
    try {
        const idForum = await Postagem.findAll({ where: { id_post: idPostagem } });
        if (idForum.length === 0) {
            throw new Error(`Postagem com id ${idPostagem} não encontrada`);
        }
  
        const notificacao = await Notificacao.findOne({
            where: {
                id_postagem: idPostagem,
                usuario_id: usuario_id
            }
        });
      
        if (!notificacao) {
            throw new Error(`Notificação para o usuário ${usuario_id} e a postagem ${idPostagem} não encontrada`);
        }
  
        const desafio = await Desafio.findOne({
            where: {
                id_postagem: idPostagem,
                usuario_desafiado: usuario_id
            }
        });
  
        // Verificar se o desafio foi aceito ou negado
        if (desafio && (desafio.estado === 'aceito' || desafio.estado === 'negado')) {
            await Notificacao.destroy({
                where: {
                    id_postagem: idPostagem,
                    usuario_id: usuario_id
                }
            });
        }

        res.redirect('/forum/' + idForum[0].id_topico + '#' + idPostagem);
    } catch (error) {
        console.error('Erro ao redirecionar e verificar/destruir a notificação:', error.message);
        res.status(500).send('Erro ao redirecionar e verificar/destruir a notificação');
    }
});


// Rota para exibir postagens de um tópico específico
router.get('/:id', async (req, res) => {
    const topicoId = req.params.id;
    try {
        const topico = await Topico.findByPk(topicoId);
        const usuarios = await Usuario.findAll();
        const resposta = await Resposta.findAll();
        const desafios = await Desafio.findAll();
        const postagens = await Postagem.findAll({
            where: { id_topico: topicoId }
        });

        const usuarioAtual = req.user;
        const topicos = await Topico.findAll(); // Adicione isso para garantir que topicos seja passado

        // Renderize a página com a variável topicos incluída
        res.render('forum', { topico, postagens, usuarioAtual, topicos, usuarios, resposta, desafios });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao carregar o tópico');
    }
});


module.exports = router;
