const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Usuario = require('./model/Usuario'); // Certifique-se de que o caminho está correto

async function findUser(email) {
    return await Usuario.findOne({ where: { email: email } });
}

module.exports = function(passport) {
    passport.use(
        new LocalStrategy(
            { usernameField: "email", passwordField: "senha" },
            async (email, senha, done) => {
                try {
                    const user = await findUser(email);
                    if (!user) {
                        return done(null, false, { message: 'Usuário não encontrado' });
                    }
                    const isValid = bcrypt.compareSync(senha, user.senha);
                    if (!isValid) return done(null, false, { message: 'Senha incorreta' });
                    return done(null, user);
                } catch (err) {
                    return done(err);
                }
            }
        )
    );


    passport.serializeUser((user, done) => {
        done(null, user.id);
        console.log(user)
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await Usuario.findOne({ where: { id: id } });
            if (user) {
                done(null, user); 
            } else {
                done(null, false);
            }
        } catch (err) {
            done(err, null);
        }
    });
};
