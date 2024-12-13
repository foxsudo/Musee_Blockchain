// hashPassword.js
const bcrypt = require('bcrypt');

const password = 'Admin@'; // Mot de passe en texte brut
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
        console.error('Erreur de hachage:', err);
    } else {
        console.log('Mot de passe haché:', hash);
    }
});
