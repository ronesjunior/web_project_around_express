const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect('mongodb://localhost:27017/aroundb')
  .then(() => console.log('MongoDB conectado com sucesso'))
  .catch((err) => console.error('Erro ao conectar no MongoDB:', err));

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133', // cole o _id do usuário teste criado no passo anterior
  };

  next();
});

app.use('/users', require('./routes/users.js'));

app.use('/cards', require('./routes/cards.js'));

app.use(/.*/, (req, res) => {
  res.status(404).send({ message: 'Endereço de rota não foi encontrado' });
});

app.listen(port, () => {
  console.log(`Servidor conectado na porta ${port}`);
});
