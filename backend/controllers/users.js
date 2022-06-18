const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { handleError } = require('../utils/utils');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => res.status(500).send({ message: `Error: ${err}` }));
};

// the getUser request handler
module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error('No user found with that id');
      error.name = 'DocumentNotFoundError';
      error.statusCode = 404;
      throw error; // Remember to throw an error so .catch handles it instead of .then
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      const [status, error] = handleError(err);
      res.status(status).send({ message: `Error: ${error.message}` });
    });
};

// the createUser request handler
module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.validateUser({
    name, about, avatar, email, password,
  })
    .then((user) => bcrypt.hash(user.password, 10))
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((finalData) => res.send({ user: finalData }))
    .catch((err) => {
      const [status, error] = handleError(err);
      res.status(status).send({ message: `Error: ${error.message}` });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      // authentication error
      res.status(401).send({ message: err.message });
    });
};

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.params._id,
    {
      name: req.body.name,
      about: req.body.about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      const [status, error] = handleError(err);
      res.status(status).send({ message: `Error: ${error.message}` });
    });
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.params._id,
    {
      avatar: req.body.avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      const [status, error] = handleError(err);
      res.status(status).send({ message: `Error: ${error.message}` });
    });
};
