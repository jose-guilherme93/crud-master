// app.js
const express = require('express');
const morgan = require('morgan');

const app = express();

// Configura o Morgan no formato 'dev' (colorido e resumido)
app.use(morgan('dev'));

// Rota GET /
app.get('/', (req, res) => {
  res.send('Olá! Essa é a rota GET /');
});

// Inicia o servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
