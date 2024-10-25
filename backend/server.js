import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import sanitizeHtml from 'sanitize-html';

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200,
}));

const connection = new sqlite3.Database('./db/aplikasi.db');

// Sanitasi sederhana
const sanitize = (input) => {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
  });
};

app.get('/api/user/:id', (req, res) => {
  const query = `SELECT * FROM users WHERE id = ?`;
  connection.all(query, [req.params.id], (error, results) => {
    if (error) throw error;

    // Sanitasi data sebelum dikembalikan
    const sanitizedUserData = results.map(user => ({
      name: sanitize(user.name),
      email: sanitize(user.email),
    }));

    res.json(sanitizedUserData);
  });
});

app.post('/api/user/:id/change-email', (req, res) => {
  const newEmail = sanitize(req.body.email); // Sanitasi email sebelum update

  const query = `UPDATE users SET email = ? WHERE id = ?`;
  connection.run(query, [newEmail, req.params.id], function (err) {
    if (err) throw err;
    if (this.changes === 0 ) res.status(404).send('User not found');
    else res.status(200).send('Email updated successfully');
  });
});

app.get('/api/file', (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, 'files', req.query.name);
  res.sendFile(filePath);
});

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
