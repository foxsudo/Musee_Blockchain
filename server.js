// server.js
require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à MySQL :', err);
        return;
    }
    console.log('Connecté à la base de données MySQL');
});

const JWT_SECRET = process.env.JWT_SECRET;

// Route pour la connexion
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    console.log("Requête reçue pour /login avec username:", username);

    db.query('SELECT * FROM users WHERE nomUser = ?', [username], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur de serveur' });
        }

        const user = results[0];
        console.log("Utilisateur trouvé dans la base de données:", user);

        if (user) {
            // Comparer les mots de passe en utilisant bcrypt
            const match = await bcrypt.compare(password, user.password);
            console.log("Résultat de la comparaison des mots de passe:", match);

            if (match) {
                if (!JWT_SECRET) {
                    console.error('JWT_SECRET est non défini !');
                    return res.status(500).json({ message: 'Erreur de configuration du serveur' });
                }
                
                const token = jwt.sign({ userId: user.codeUser, username: user.nomUser }, JWT_SECRET, { expiresIn: '1h' });
                console.log("Jeton généré:", token);
                return res.json({ token });
            } else {
                console.log("Mot de passe incorrect");
                return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
            }
        } else {
            console.log("Utilisateur non trouvé");
            return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
        }
    });
});

// Middleware pour vérifier le JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.sendStatus(403);

    jwt.verify(token.split(" ")[1], JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Route protégée pour vérifier l'accès à la page admin
app.get('/admin', authenticateToken, (req, res) => {
    res.json({ message: 'Bienvenue dans l\'interface administrateur' });
});

// Configuration de multer pour l'upload d'images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'images');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath); // Crée le dossier s'il n'existe pas
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Route pour uploader une image
app.post('/upload', upload.single('image'), (req, res) => {
    console.log('Requête reçue pour /upload');
    console.log('Fichier uploadé :', req.file);

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded!' });
    }

    // Renvoie les informations de l'image enregistrée
    res.status(200).json({
        filePath: `/public/images/${req.file.filename}`,
        fileName: req.file.originalname,
    });
});

app.get('/public/images-data', (req, res) => {
    const uploadPath = path.join(__dirname, 'images');

    fs.readdir(uploadPath, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Unable to read images directory' });
        }

        const images = files.map((file, index) => ({
            id: index + 1,
            title: `Image ${index + 1}`, // Titre par défaut
            image: `/public/images/${file}`, // Chemin relatif
            description: 'Default description', // Description par défaut
        }));

        res.status(200).json(images);
    });
});

// Rendre le dossier images accessible
app.use('/public/images', express.static(path.join(__dirname, 'images')));

app.get('/', (req, res) => {
    res.send('Backend is running');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
