const { Schema, model } = require('mongoose');

const quoteSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  quote: {
    type: String,
    required: true,
  },
});

module.exports = model('Quote', quoteSchema);
