const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) =>
        /^https?:\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(\/[A-Za-z0-9._~:/?%#[\]@!$&'()*+,;=-]*)?(#.*)?$/.test(
          v
        ),
    },
  },
});

module.exports = mongoose.model('user', userSchema);
