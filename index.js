const express = require('express');
const app = express();
const session = require('express-session');
const port = 3000;
const path = require('path');
const passport = require('passport');
const Evento = require('./model/evento');
const Postagem = require('./model/postagens'); 
const Usr = require('./model/Usuario')
const Respostas = require('./model/Respostas')
const Desafiar = require('./model/Desafiar');
const email = require('./emailService');

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
        res.locals.nome = req.session.passport.user.nome;
        res.locals.usuario = req.session.passport.user; 

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


const home = require('./routes/home');
app.use('/home', authenticationMiddleware, home);

const topicosRouter = require('./routes/topicos');
app.use('/forum/topicos', authenticationMiddleware, topicosRouter);

const desafioRoutes = require('./routes/desafio'); // ajuste o caminho conforme sua estrutura
app.use('/desafio', desafioRoutes);


const NotificacaoRoutes = require('./routes/notificacao'); // ajuste o caminho conforme sua estrutura
app.use('/notificacoes', NotificacaoRoutes);



const editar = require('./routes/editar');
app.use('/editar', authenticationMiddleware, editar);

const cadastroResposta = require('./routes/resposta');
app.use('/resposta', cadastroResposta);  // Use as rotas definidas

const perfil = require('./routes/perfil')
app.use('/perfil', authenticationMiddleware, perfil);

const Forum = require('./routes/forum');
app.use('/forum', authenticationMiddleware, Forum);

const notificacaoRoutes = require('./routes/notificacao');

const apagarPostagem = require('./routes/apagarPostagem');
app.use('/apagarPostagem', authenticationMiddleware, apagarPostagem);
//ACABOU
const apagarTopcico = require('./routes/apagarTopico');
app.use('/apagarTopico', authenticationMiddleware, apagarTopcico);

const apagarResposta = require('./routes/apagarResposta');
app.use('/apagarResposta', authenticationMiddleware, apagarResposta);

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
