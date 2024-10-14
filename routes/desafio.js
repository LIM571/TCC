const express = require('express');
const app = express();
const router = express.Router();
const Desafio = require('../model/Desafiar');
const Usuario = require('../model/Usuario');
const Notificacao = require('../model/Notificacao');

// Rota para desafiar um usuário
app.post('/desafio', async (req, res) => {
  const { usuario_desafiante, usuario_desafiado, id_postagem } = req.body;
  
  try {
    // Cria o desafio
    const novoDesafio = await Desafio.create({
      usuario_desafiante: usuario_desafiante,
      usuario_desafiado: usuario_desafiado,
      id_postagem: id_postagem
    });

    // Buscar nome do desafiante
    const desafiante = await Usuario.findByPk(usuario_desafiante);
    const mensagem = `${desafiante.nome_lutador} desafiou você!`;

    // Cria a notificação
    await Notificacao.create({
      usuario_id: usuario_desafiado,
      mensagem: mensagem
    });

    res.redirect('/forum');
  } catch (error) {
    console.error('Erro ao criar desafio:', error);
    res.status(500).send('Erro ao criar desafio');
  }
});

// Armazena os desafios recentes temporariamente
let desafiosRecentes = [];

// Rota para desafiar
// Atualização na rota desafio.js

// Exemplo de rota para obter notificações pendentes
router.get('/notificacoes', async (req, res) => {
  const { usuario_id } = req.query;  // ID do usuário logado

  try {
    // Buscar notificações pendentes do usuário
    const notificacoesPendentes = await Notificacao.findAll({
      where: {
        usuario_id: usuario_id,
        estado: 'pendente'
      }
    });

    // Retorna o total de notificações pendentes
    const totalNotificacoes = notificacoesPendentes.length;

    res.json({ totalNotificacoes });
  } catch (error) {
    console.error('Erro ao buscar notificações:', error);
    res.status(500).send('Erro ao buscar notificações');
  }
});



router.post('/', async (req, res) => {
    const { usuario_desafiante, usuario_desafiado, id_postagem } = req.body;

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

        // Cria o novo desafio
        const novoDesafio = await Desafio.create({
            usuario_desafiante,
            usuario_desafiado,
            id_postagem
        });

        // Cria a notificação para o desafiado com estado 'pendente' e adiciona id_postagem
        await Notificacao.create({
            usuario_id: usuario_desafiado,
            id_postagem: id_postagem,
            estado: 'pendente',
            lida: false  // Define como não lida inicialmente
        });

        res.redirect('/forum');
    } catch (error) {
        console.error('Erro ao criar desafio:', error);
        res.status(500).send('Erro ao criar desafio');
    }
});

// Rota para buscar notificações pendentes
router.get('/contagem', async (req, res) => {
    const usuario_id = req.session.passport.user.id; // ID do usuário logado
  
    try {
      const contagemNotificacoes = await Notificacao.count({
        where: {
          usuario_id: usuario_id,
          estado: 'pendente',
          lida: false
        }
      });
  
      res.json({ contagem: contagemNotificacoes });
    } catch (error) {
      console.error('Erro ao buscar contagem de notificações:', error);
      res.status(500).send('Erro ao buscar contagem de notificações');
    }
  });
  


// Exemplo de como deveria ser a rota para resposta ao desafio
// Exemplo de como deveria ser a rota para resposta ao desafio
router.post('/resposta', async (req, res) => {
  const { desafio_id, resposta } = req.body;

  try {
      if (typeof desafio_id === 'undefined' || typeof resposta === 'undefined') {
          console.error('Erro: desafio_id ou resposta não definidos');
          return res.status(400).send('Dados não fornecidos corretamente');
      }

      // Atualiza o estado do desafio
      if (resposta === 'aceitar') {
          await Desafio.update({ estado: 'aceito' }, { where: { id_desafio: desafio_id } });
          return res.redirect('/forum');
      } else if (resposta === 'negar') {
          await Desafio.update({ estado: 'negado' }, { where: { id_desafio: desafio_id } });
          return res.redirect('/forum');
      }

      // Busca o desafio para pegar o id_postagem
      const desafio = await Desafio.findByPk(desafio_id);
      if (!desafio) {
          return res.status(404).send('Desafio não encontrado');
      }

      // Atualiza o estado da notificação correspondente à postagem do desafio
      await Notificacao.update({ estado: resposta }, { where: { id_postagem: desafio.id_postagem } });

      // Remove o desafio da lista de desafios recentes
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
