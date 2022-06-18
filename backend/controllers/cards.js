// controllers/cards.js
// this file is the card controller

const Card = require('../models/card');
const { handleError } = require('../utils/utils');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards.reverse()))
    .catch((err) => {
      const [status, error] = handleError(err);
      res.status(status).send({ message: `Error: ${error.message}` });
    });
};

// the createUser request handler
module.exports.createCard = (req, res) => {
  const { name, link, owner } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      const [status, error] = handleError(err);
      res.status(status).send({ message: `Error: ${error.message}` });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.deleteOne({ _id: cardId })
    .orFail(() => {
      const error = new Error('No card found with that id');
      error.name = 'DocumentNotFoundError';
      error.statusCode = 404;
      throw error; // Remember to throw an error so .catch handles it instead of .then
    })
    .then((card) => res.send(card))
    .catch((err) => {
      const [status, error] = handleError(err);
      res.status(status).send({ message: `Error: ${error.message}` });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => {
      const [status, error] = handleError(err);
      res.status(status).send({ message: `Error: ${error.message}` });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => {
      const [status, error] = handleError(err);
      res.status(status).send({ message: `Error: ${error.message}` });
    });
};
