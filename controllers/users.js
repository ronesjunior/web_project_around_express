const User = require('../models/User');
const ERROR_CODE = 400;
const DOCUMENT_NOTFOUND = 404;
const ERROR_GENERAL = 500;

module.exports.getUser = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch((err) => {
      res
        .status(ERROR_GENERAL)
        .send({ message: 'Erro interno do servidor.Servidor parado!' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(ERROR_CODE)
          .send({ message: 'Dados inválidos para criação do usuário' });
      }
      res.status(ERROR_GENERAL).send({ message: 'Erro interno do servidor' });
    });
};

module.exports.idUser = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'ID inválido' });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(DOCUMENT_NOTFOUND)
          .send({ message: 'Usuário não encontrado' });
      }

      res.status(ERROR_GENERAL).send({ message: 'Erro interno do servidor' });
    });
};

module.exports.delUser = (req, res) => {
  const { id } = req.params;

  User.findByIdAndDelete(id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'ID inválido' });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(DOCUMENT_NOTFOUND)
          .send({ message: 'Usuário não encontrado' });
      }

      res.status(ERROR_GENERAL).send({ message: 'Erro interno do servidor' });
    });
};

module.exports.updateMe = (req, res) => {
  const { name, about } = req.body;
  const { id } = req.params;

  User.findByIdAndUpdate(id, { name, about }, { new: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'ID inválido' });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(DOCUMENT_NOTFOUND)
          .send({ message: 'Usuário não encontrado' });
      }

      res.status(ERROR_GENERAL).send({ message: 'Erro interno do servidor' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { id } = req.params;
  const { avatar } = req.body;

  User.findByIdAndUpdate(id, { avatar }, { new: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'ID inválido' });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(DOCUMENT_NOTFOUND)
          .send({ message: 'Avatar não encontrado' });
      }

      res.status(ERROR_GENERAL).send({ message: 'Erro interno do servidor' });
    });
};
