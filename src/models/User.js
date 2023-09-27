const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  catchphrases: {
    type: Number,
    default: 0,
  },
});

module.exports = model('User', userSchema);
