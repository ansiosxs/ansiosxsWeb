require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const dbConfig = require('./config-db');

const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());  
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

async function main() {
  let db;
  try {
    // Usar configuración de variables de entorno o archivo de configuración
    const connectionConfig = {
      host: process.env.DB_HOST || dbConfig.host,
      user: process.env.DB_USER || dbConfig.user,
      password: process.env.DB_PASSWORD || dbConfig.password,
      database: process.env.DB_NAME || dbConfig.database,
      port: process.env.DB_PORT || dbConfig.port,
      ssl: process.env.DB_SSL === 'true' || dbConfig.ssl
    };
    
    console.log('🔗 Intentando conectar a:', connectionConfig.host + ':' + connectionConfig.port);
    console.log('📊 Base de datos:', connectionConfig.database);
    
    db = await mysql.createConnection(connectionConfig);
    console.log('✅ Conectado a MySQL correctamente');
  } catch (err) {
    console.error('❌ Error conectando o consultando la DB:', err);
    process.exit(1);
  }

  const isDev = process.env.NODE_ENV !== 'production';

  function coerceDateTime(value) {
    if (!value || String(value).trim() === '') return null;
    return String(value).replace('T', ' ').slice(0, 19);
  }

  function validateArticlePayload(body, { isUpdate = false } = {}) {
    const errors = [];
    const out = { ...body };

    if (!isUpdate) {
      if (!out.slug || typeof out.slug !== 'string') errors.push('slug es requerido');
      if (!out.title || typeof out.title !== 'string') errors.push('title es requerido');
    }

    if (out.slug && !/^[a-z0-9-]+$/.test(out.slug)) errors.push('slug inválido: usa minúsculas, números y guiones');

    if (out.date !== undefined) out.date = coerceDateTime(out.date);
    if (out.eventDate !== undefined) out.eventDate = coerceDateTime(out.eventDate);

    if (out.isEvent !== undefined) out.isEvent = out.isEvent ? 1 : 0;

    if (errors.length) {
      const err = new Error('Validación fallida');
      err.status = 400;
      err.details = errors;
      throw err;
    }

    return out;
  }

  function sendDbError(res, err, fallbackMessage) {
    const payload = {
      error: fallbackMessage,
      code: err.code,
      sqlMessage: err.sqlMessage
    };
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ ...payload, error: 'Duplicado: probablemente slug ya existe' });
    }
    return res.status(500).json(isDev ? payload : { error: fallbackMessage });
  }

  app.get('/api/articles', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM articles');
      res.json(rows);
    } catch (err) {
      console.error(err);
      sendDbError(res, err, 'Error al obtener artículos');
    }
  });

  app.get('/api/articles/:slug', async (req, res) => {
    try {
      const { slug } = req.params;
      const [rows] = await db.query('SELECT * FROM articles WHERE slug = ?', [slug]);
      if (rows.length === 0) return res.status(404).json({ error: 'Artículo no encontrado' });
      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      sendDbError(res, err, 'Error al obtener el artículo');
    }
  });

  const ADMIN_USER = process.env.ADMIN_USER || 'admin';
  const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';
  const FAKE_TOKEN = process.env.ADMIN_TOKEN || 'secredtoken';

  app.post('/login', (req, res) => {
    const { username, password } = req.body || {};
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      return res.json({ token: FAKE_TOKEN });
    }
    return res.status(401).json({ message: 'Credenciales inválidas' });
  });

  function requireAuth(req, res, next) {
    const auth = req.headers['authorization'] || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
    if (token !== FAKE_TOKEN) return res.status(401).json({ message: 'No autorizado' });
    next();
  }

  // Crear artículo
  app.post('/api/articles', requireAuth, async (req, res) => {
    try {
      const payload = validateArticlePayload(req.body || {}, { isUpdate: false });
      const sql = `INSERT INTO \`articles\` (\`slug\`, \`title\`, \`excerpt\`, \`content\`, \`category\`, \`date\`, \`author\`, \`imageUrl\`, \`previewImageUrl\`, \`isEvent\`, \`eventDate\`)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const params = [
        payload.slug,
        payload.title,
        payload.excerpt || '',
        payload.content || '',
        payload.category || '',
        payload.date,
        payload.author || '',
        payload.imageUrl || '',
        payload.previewImageUrl || '',
        payload.isEvent || 0,
        payload.eventDate
      ];
      const [result] = await db.query(sql, params);
      const [rows] = await db.query('SELECT * FROM articles WHERE id = ?', [result.insertId]);
      res.status(201).json(rows[0]);
    } catch (err) {
      console.error(err);
      if (err.status) return res.status(err.status).json({ error: err.message, details: err.details });
      sendDbError(res, err, 'Error al crear artículo');
    }
  });

  // Subida de imágenes
  const fs = require('fs');
  const multer = require('multer');
  // Carpeta /uploads ubicada en la raíz del proyecto
  const uploadsDir = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
      const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname) || '.bin';
      cb(null, unique + ext);
    }
  });
  const upload = multer({ storage });

  app.post('/api/upload', requireAuth, upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'Archivo requerido' });
    const publicUrl = `/uploads/${req.file.filename}`;
    return res.status(201).json({ url: publicUrl, filename: req.file.filename });
  });

  // Actualizar artículo
  app.put('/api/articles/:id', requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const payload = validateArticlePayload(req.body || {}, { isUpdate: true });
      const sql = `UPDATE \`articles\` SET \`slug\`=?, \`title\`=?, \`excerpt\`=?, \`content\`=?, \`category\`=?, \`date\`=?, \`author\`=?, \`imageUrl\`=?, \`previewImageUrl\`=?, \`isEvent\`=?, \`eventDate\`=? WHERE \`id\`=?`;
      const params = [
        payload.slug,
        payload.title,
        payload.excerpt || '',
        payload.content || '',
        payload.category || '',
        payload.date,
        payload.author || '',
        payload.imageUrl || '',
        payload.previewImageUrl || '',
        payload.isEvent || 0,
        payload.eventDate,
        id
      ];
      await db.query(sql, params);
      const [rows] = await db.query('SELECT * FROM articles WHERE id = ?', [id]);
      if (rows.length === 0) return res.status(404).json({ error: 'Artículo no encontrado' });
      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      if (err.status) return res.status(err.status).json({ error: err.message, details: err.details });
      sendDbError(res, err, 'Error al actualizar artículo');
    }
  });

  // Eliminar artículo
  app.delete('/api/articles/:id', requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      await db.query('DELETE FROM articles WHERE id = ?', [id]);
      res.status(204).end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al eliminar artículo' });
    }
  });

  const PORT = 4000;
  app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
}

main();
