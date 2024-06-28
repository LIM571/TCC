const express = require('express');
const app = express();
const session = require('express-session');
const port = 3000;
const database = require('./db');
const passport = require('passport');
const Evento = require('./model/evento');
const Topico = require('./model/topico')

app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
}));

require('./auth')(passport);
app.use(passport.initialize());
app.use(passport.session());

function authenticationMiddleware(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.imagem = req.session.passport.user.imagem;
        res.locals.logado = true;
        return next();
    }
    res.redirect('/login?erro=1');
}

// Middleware para servir arquivos estáticos
app.use(express.static('public'));

// Routes
const CadastroEventoRouter = require('./routes/cadastroEvento');
app.use('/cadastroEvento', authenticationMiddleware, CadastroEventoRouter);
const CadastroRouter = require('./routes/cadastro');
app.use('/cadastro', CadastroRouter);
const CadastroPostRouter = require('./routes/cadastroPostagen');
app.use('/cadastroPostagen', authenticationMiddleware, CadastroPostRouter);

// Configurar o motor de visualização EJS
app.set('view engine', 'ejs');

// Middleware para parsear o corpo das requisições
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const eventos = await Evento.findAll();
        res.render('home', { eventos });
    } catch (error) {
        console.error('Erro ao buscar eventos:', error);
        res.status(500).send('Erro ao buscar eventos');
    }
});

// Importe e use as rotas de login
const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

// Inicie o servidor e conecte ao banco de dados
(async () => {
    try {
        await database.sync();
        console.log('Conexão com o banco de dados estabelecida com sucesso');
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
    }
})();

const server = app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`);
});
