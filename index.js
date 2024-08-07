const express = require('express');
const app = express();
const session = require('express-session');
const port = 3000;
const path = require('path');
const passport = require('passport');
const Evento = require('./model/evento');
const Postagem = require('./model/postagens'); 
const Usr = require('./model/Usuario')
const database = require('./db')

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

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.locals.logado = req.isAuthenticated();
    next();
});

app.get('/', function (req, res) {
    res.render('inicial');
});

app.get('/home', async (req, res) => {
    try {
        const eventos = await Evento.findAll();
        console.log('Eventos buscados:', eventos); // Log para depuração
        res.render('home', { eventos });
    } catch (error) {
        console.error('Erro ao buscar eventos:', error);
        res.status(500).send('Erro ao buscar eventos');
    }
});

const Forum = require('./routes/forum');
app.use('/forum', authenticationMiddleware, Forum);

const Apagar = require('./routes/apagar');
app.use('/apagar', authenticationMiddleware, Apagar);

const CadastroRouter = require('./routes/cadastro');
app.use('/cadastro', CadastroRouter);

const cadastroEventos = require('./routes/cadastroEvento');
app.use('/cadastroEvento',  authenticationMiddleware, cadastroEventos);

const CadastroPostRouter = require('./routes/cadastroPostagen');
app.use('/cadastroPostagen', authenticationMiddleware, CadastroPostRouter);

const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

app.get('/logout', function (req, res, next) {
    req.logout(function (err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
  

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
