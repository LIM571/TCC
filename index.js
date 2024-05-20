const express = require('express');
const app = express();
const session = require('express-session');
const port = 3000;
const database = require('./db');
const passport = require('passport');

// routes
const CadastroEventoRouter = require('./routes/cadastroEvento');
app.use('/cadastroEvento', CadastroEventoRouter);
const CadastroRouter = require('./routes/cadastro');
app.use('/cadastro', CadastroRouter);
const CadastroPostRouter = require('./routes/cadastroPostagen');
app.use('/cadastroPostagen', CadastroPostRouter);

// Configurar o motor de visualização EJS
app.set('view engine', 'ejs');

// Middleware para parsear o corpo das requisições
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use o express-session antes de qualquer configuração do Passport
app.use(session({
    secret: 'secreto', // Chave secreta para assinar a sessão, você pode alterar isso
    resave: false,
    saveUninitialized: false
}));

// Configure o Passport
require('./auth')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Defina a rota para a página inicial
app.get('/', (req, res) => {
    res.render('home');
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
