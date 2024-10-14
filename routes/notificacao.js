const express = require('express');
const router = express.Router();
const Desafio = require('../model/Desafiar');

router.delete('/:id', async (req, res) => {
  try {
      const id = req.params.id;
      await Notificacao.destroy({ where: { id: id } });
      res.status(200).send({ message: 'Notificação removida com sucesso' });
  } catch (error) {
      console.error('Erro ao remover notificação:', error);
      res.status(500).send({ message: 'Erro ao remover notificação' });
  }
});

// Rota para buscar a contagem de desafios feitos ao usuarioAtual
router.get('/desafios/contagem', async (req, res) => {

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