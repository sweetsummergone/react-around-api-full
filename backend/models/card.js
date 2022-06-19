const mongoose = require('mongoose');
const { ErrorHandler } = require('../utils/error');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: [true, 'Link is required'],
    validate: {
      validator(v) {
        /^https?:\/\/[w{3}.]?[A-Z0-9\-._~:?%#[\]/@!$&'()*+,;=]+[/#]?/gim.test(v);
      },
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Owner ID is required'],
  },
  likes: {
    type: Array,
    default: [],
  },
});

cardSchema.statics.authAndDelete = function authAndDelete({ cardId, reqUserId, ownerId }) {
  if (reqUserId === ownerId) {
    return this.deleteOne({ _id: cardId })
      .orFail(() => {
        throw new ErrorHandler(404, `No card found with ${cardId}`);
      });
  }
  return Promise.reject(new ErrorHandler(403, 'Access denied'));
};

module.exports = mongoose.model('card', cardSchema);
