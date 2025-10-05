// Backend Express básico con SQLite y autenticación JWT
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 4000;
const config = require('./config');
const JWT_SECRET = process.env.JWT_SECRET || config.JWT_SECRET;

// Usuario admin hardcodeado
const ADMIN_USER = {
  username: 'admin',
  // password: admin123
  passwordHash: '$2b$10$JlbMfTGNImbs43MBei.KzOf.hzu/4n5AzLWvb0cptiOnmYSLeCEJK',
};

// Configuración middlewares
app.use(cors());
app.use(bodyParser.json());

// Inicializar base de datos SQLite
const dbPath = path.join(__dirname, 'news.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Middleware de autenticación
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Endpoint de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Intento de login:', { username, password });
    console.log('Hash esperado:', ADMIN_USER.passwordHash);
    console.log('Comparación:', bcrypt.compareSync(password, ADMIN_USER.passwordHash));
    if (username !== ADMIN_USER.username) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }
    if (!bcrypt.compareSync(password, ADMIN_USER.passwordHash)) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  });

// Obtener todas las noticias (protegido)
app.get('/news', authenticateToken, (req, res) => {
  db.all('SELECT * FROM news ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Crear noticia (protegido)
app.post('/news', authenticateToken, (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Título y contenido requeridos' });
  }
  db.run('INSERT INTO news (title, content) VALUES (?, ?)', [title, content], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, title, content });
  });
});

// Servir el backend
app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
}); 