const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { validatedUserSchema } = require('../utils/validations');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, 'This email is already used'],
  },
  password: {
    type: String,
    select: false,
  },
  name: {
    type: String,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
  },
  avatar: {
    type: String,
    default: 'guitarist',
  },
});

userSchema.statics.validateUser = function validateUser(obj) {
  return validatedUserSchema.validateAsync(obj);
};

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Incorrect email or password'));
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
