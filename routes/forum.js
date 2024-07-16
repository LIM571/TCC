const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const postagens = await Post.findAll();
        res.render('forum', { postagens });
    } catch (error) {
        console.error('Erro ao buscar postagens:', error);
        res.status(500).send('Erro ao buscar postagens');
    }
});

module.exports = router;
