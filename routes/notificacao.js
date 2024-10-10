const express = require('express');
const router = express.Router();
const Desafio = require('../model/Desafiar');

// Rota para buscar a contagem de desafios feitos ao usuarioAtual
router.get('/desafios/contagem', async (req, res) => {
  const usuario_id = req.user.id; // Usando o ID do usuário logado

  try {
    const contagemDesafios = await Desafio.count({
      where: {
        usuario_desafiado: usuario_id,
        estado: 'pendente'
      }
    });

    res.json({ contagem: contagemDesafios });
  } catch (error) {
    console.error('Erro ao buscar contagem de desafios:', error);
    res.status(500).send('Erro ao buscar contagem de desafios');
  }
});

module.exports = router;