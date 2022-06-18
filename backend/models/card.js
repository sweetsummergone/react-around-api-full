const mongoose = require('mongoose');

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
    type: String,
    required: [true, 'Owner ID is required'],
  },
  likes: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model('card', cardSchema);
