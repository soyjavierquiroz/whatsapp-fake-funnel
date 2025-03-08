const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Database = require('better-sqlite3');

const app = express();
const db = new Database('chatbot.db'); // Base de datos SQLite

app.use(cors());
app.use(bodyParser.json());

// Crear tabla si no existe
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender TEXT,
    message TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Ruta para obtener mensajes almacenados
app.get('/messages', (req, res) => {
  const messages = db.prepare('SELECT * FROM messages').all();
  res.json(messages);
});

// Ruta para guardar un nuevo mensaje
app.post('/messages', (req, res) => {
  const { sender, message } = req.body;
  db.prepare('INSERT INTO messages (sender, message) VALUES (?, ?)').run(sender, message);
  res.json({ success: true });
});

// Ruta para obtener respuesta del bot
app.post('/bot-response', (req, res) => {
  const { message } = req.body;
  let response = 'Lo siento, no entiendo.';

  if (message.toLowerCase().includes('hola')) {
    response = '¡Hola! Soy la Dra. Maria, ¿en qué puedo ayudarte?';
  } else if (message.toLowerCase().includes('cita')) {
    response = 'Puedo agendar una cita para ti. ¿Cuál es tu nombre?';
  }

  db.prepare('INSERT INTO messages (sender, message) VALUES (?, ?)').run('bot', response);
  res.json({ message: response });
});

// Iniciar el servidor
app.listen(5000, () => console.log('Servidor corriendo en http://localhost:5000'));
