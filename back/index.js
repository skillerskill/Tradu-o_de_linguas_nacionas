const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 9000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Substitua pelo seu usuário do MySQL
  password: '', // Substitua pela sua senha do MySQL
  database: 'translate_app', // Nome do banco de dados
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

app.get('/api/users', (req, res) => {
    const query = 'SELECT id, name, email, createdAt FROM users'; // Substitua pela sua tabela de usuários
    db.query(query, (err, results) => {
      if (err) {
        console.error('Erro ao buscar usuários:', err);
        res.status(500).send('Erro ao buscar usuários');
      } else {
        res.status(200).json(results);
      }
    });
  });
  app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const query = 'DELETE FROM users WHERE id = ?'; // Substitua pela sua tabela de usuários
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error('Erro ao deletar usuário:', err);
        res.status(500).send('Erro ao deletar usuário');
      } else {
        res.status(200).send('Usuário deletado com sucesso');
      }
    });
  });
// Rota para adicionar uma nova tradução
app.post('/api/translations', (req, res) => {
  const { language, word, meaning } = req.body;

  const query = 'INSERT INTO translations (language, word, meaning) VALUES (?, ?, ?)';
  db.query(query, [language, word, meaning], (err, result) => {
    if (err) {
      console.error('Erro ao inserir tradução:', err);
      res.status(500).send('Erro ao adicionar tradução');
    } else {
      res.status(200).send('Tradução adicionada com sucesso');
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});