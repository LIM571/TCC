const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const Usuario = await Usr.findAll();
        res.render('usuario', { Usuario });
    } catch (error) {
        console.error('Erro ao buscar usuarios:', error);
        res.status(500).send('Erro ao buscar usarios');
    }
});

module.exports = router;
