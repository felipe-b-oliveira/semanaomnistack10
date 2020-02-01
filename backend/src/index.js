const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

// Constantes são usadas em variáveis que não se alteram
const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-bh7zb.mongodb.net/week10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//app.use(cors({ origin: 'http://localhost:3333/' }));
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);

// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros

// Query Params: request.query (Filtros, ordenação, paginação, ...)
// Route Params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para a criação ou alteração de um registro)

// MongoDB (Não-relacional)
// Bom para aplicações que não possuam muitos relacionamentos em banco